package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.RoleRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.util.MotDePasseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des utilisateurs. CRUD de base hérité de {@link AbstractCrudService},
 * complété par la <b>création d'un compte emprunteur</b> (cahier des charges, section 1) :
 * <ul>
 *   <li>durée initiale d'abonnement : 1 an ;</li>
 *   <li>génération automatique d'un numéro de carte unique sur 10 chiffres ;</li>
 *   <li>mot de passe initial = date de naissance (JJMMAAAA), haché.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UtilisateurService extends AbstractCrudService<Utilisateur, Integer> {

    public static final String ROLE_EMPRUNTEUR     = "EMPRUNTEUR";
    public static final String ROLE_BIBLIOTHECAIRE = "BIBLIOTHECAIRE";

    /** Durée initiale d'abonnement (cahier des charges). */
    private static final int DUREE_ABONNEMENT_ANNEES = 1;

    private static final long CARTE_MIN = 1_000_000_000L; // 10 chiffres
    private static final long CARTE_MAX = 9_999_999_999L;

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository        roleRepository;
    private final SecureRandom          random = new SecureRandom();

    @Override
    protected JpaRepository<Utilisateur, Integer> getRepository() {
        return utilisateurRepository;
    }

    // =====================================================================
    // Lecture spécifique
    // =====================================================================

    /** Recherche un utilisateur par e-mail (connexion). */
    public Utilisateur getByMail(String mail) {
        return utilisateurRepository.findByMail(mail).orElse(null);
    }

    // =====================================================================
    // Création d'un emprunteur
    // =====================================================================

    /**
     * Crée un nouvel emprunteur. Renseigne automatiquement le rôle, l'échéance
     * d'abonnement, le mot de passe initial et le numéro de carte.
     *
     * @param u              l'emprunteur à créer (nom, prénom, adresse, mail, date de naissance…)
     * @param dateDebutAbo   début d'abonnement saisi (sert au calcul de l'échéance) ; {@code null} = aujourd'hui
     * @return l'emprunteur persisté (id et numéro de carte renseignés)
     */
    @Transactional
    public Utilisateur creerEmprunteur(Utilisateur u, LocalDate dateDebutAbo) {

        // 1. Contrôles d'unicité / champs obligatoires
        if (u.getMail() == null || u.getMail().isBlank()) {
            throw new IllegalArgumentException("L'e-mail est obligatoire.");
        }
        if (u.getDateNaissance() == null) {
            throw new IllegalArgumentException("La date de naissance est obligatoire.");
        }
        if (utilisateurRepository.existsByMail(u.getMail())) {
            throw new IllegalStateException("Un compte existe déjà avec cet e-mail.");
        }

        // 2. Rôle emprunteur
        Role emprunteur = roleRepository.findByLibelleRole(ROLE_EMPRUNTEUR)
                .orElseThrow(() -> new IllegalStateException(
                        "Rôle '" + ROLE_EMPRUNTEUR + "' introuvable en base."));
        u.setRole(emprunteur);

        // 3. Abonnement : 1 an à partir du début (sauf échéance saisie manuellement)
        LocalDate debut = (dateDebutAbo != null) ? dateDebutAbo : LocalDate.now();
        if (u.getDateFinAbonnement() == null) {
            u.setDateFinAbonnement(debut.plusYears(DUREE_ABONNEMENT_ANNEES));
        }

        // 4. Mot de passe initial = date de naissance (JJMMAAAA) hachée
        u.setMdp(MotDePasseUtil.motDePasseInitial(u.getDateNaissance()));

        // 5. Numéro de carte unique (10 chiffres)
        u.setNumeroCarte(genererNumeroCarteUnique());

        // 6. Valeurs par défaut
        u.setNombrePret(0);
        if (u.getPays() == null || u.getPays().isBlank()) {
            u.setPays("France");
        }

        Utilisateur sauvegarde = save(u);
        log.info("Compte emprunteur créé : id={} carte={} mail={}",
                sauvegarde.getIdUtilisateur(), sauvegarde.getNumeroCarte(), sauvegarde.getMail());
        return sauvegarde;
    }

    // =====================================================================
    // Recherches / gestion côté bibliothécaire
    // =====================================================================

    /** Tous les emprunteurs. */
    public List<Utilisateur> getTousEmprunteurs() {
        return utilisateurRepository.findByRole_LibelleRole(ROLE_EMPRUNTEUR);
    }

    /** Recherche d'emprunteurs par nom (contient, insensible à la casse). */
    public List<Utilisateur> rechercherParNom(String nom) {
        return utilisateurRepository.findByNomContainingIgnoreCaseAndRole_LibelleRole(nom, ROLE_EMPRUNTEUR);
    }

    /** Recherche d'un emprunteur par son numéro de carte. */
    public Utilisateur rechercherParCarte(Long carte) {
        return utilisateurRepository.findByNumeroCarte(carte).orElse(null);
    }

    /** Emprunteurs dont l'abonnement est échu. */
    public List<Utilisateur> rechercherAbonnementExpire() {
        return utilisateurRepository.findByDateFinAbonnementBeforeAndRole_LibelleRole(
                LocalDate.now(), ROLE_EMPRUNTEUR);
    }

    /** Met à jour un emprunteur existant. */
    public Utilisateur modifier(Utilisateur u) {
        return save(u);
    }

    /** Supprime un emprunteur par son identifiant. */
    public void supprimer(Integer id) {
        deleteById(id);
    }
    
    /** Tire un numéro de carte aléatoire à 10 chiffres, garanti unique en base. */
    private Long genererNumeroCarteUnique() {
        long carte;
        do {
            carte = random.nextLong(CARTE_MIN, CARTE_MAX + 1);
        } while (utilisateurRepository.existsByNumeroCarte(carte));
        return carte;
    }
}