package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des <b>emprunts</b> (prêts de documents).
 * <p>Règles couvertes :</p>
 * <ul>
 *   <li>création d'un prêt par un bibliothécaire si : quota non atteint,
 *       abonnement non échu, document disponible et non réservé par un autre ;</li>
 *   <li>prolongation : une seule fois pour un emprunteur, sans limite pour un bibliothécaire ;</li>
 *   <li>durée et quota paramétrables via {@link RegleService}.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmpruntsService {

    private final EmpruntsRepository empruntsRepository;
    private final DocumentService documentService;
    private final ReservationService reservationService;
    private final RegleService regleService;

    // =====================================================================
    // Lecture
    // =====================================================================

    /** Emprunts en cours (non rendus) de l'utilisateur. */
    public List<Emprunts> getEmpruntsEnCours(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateurAndDateRetourIsNull(utilisateur);
    }

    /** Tous les emprunts de l'utilisateur (historique inclus). */
    public List<Emprunts> getAllEmprunts(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateur(utilisateur);
    }

    /** Nombre d'emprunts actuellement en cours pour l'utilisateur. */
    public long getNombreEmpruntsEnCours(Utilisateur utilisateur) {
        return empruntsRepository.countByUtilisateurAndDateRetourIsNull(utilisateur);
    }

    // =====================================================================
    // Création d'un prêt (bibliothécaire)
    // =====================================================================

    /**
     * Crée un prêt de document pour un emprunteur. Vérifie l'ensemble des conditions :
     * <ol>
     *   <li>quota de prêts simultanés non atteint ;</li>
     *   <li>abonnement de l'emprunteur non échu ;</li>
     *   <li>document empruntable et non déjà emprunté ;</li>
     *   <li>document non réservé par un autre emprunteur.</li>
     * </ol>
     *
     * @throws IllegalStateException si une condition n'est pas remplie.
     */
    public Emprunts creerPret(Integer idDocument, Utilisateur emprunteur) {

        // 1. Quota de prêts
        long enCours = getNombreEmpruntsEnCours(emprunteur);
        int max = regleService.getMaxPrets();
        if (enCours >= max) {
            throw new IllegalStateException(
                    "Quota de prêts atteint (" + enCours + "/" + max + ").");
        }

        // 2. Abonnement valide
        if (emprunteur.getDateFinAbonnement() == null
                || emprunteur.getDateFinAbonnement().isBefore(LocalDate.now())) {
            throw new IllegalStateException("L'abonnement de l'emprunteur est échu.");
        }

        // 3. Document empruntable et non déjà emprunté
        Document document = documentService.getDocumentById(idDocument);
        if (!Boolean.TRUE.equals(document.getEstEmpruntable())) {
            throw new IllegalStateException("Ce document n'est pas empruntable.");
        }
        if (empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(idDocument)) {
            throw new IllegalStateException("Ce document est déjà emprunté.");
        }

        // 4. Non réservé par un autre emprunteur
        if (reservationService.estReserveParAutre(idDocument, emprunteur)) {
            throw new IllegalStateException("Ce document est réservé par un autre emprunteur.");
        }

        // Création du prêt
        LocalDate debut = LocalDate.now();
        LocalDate fin   = debut.plusDays(regleService.getDureePretJours());
        Emprunts emprunt = new Emprunts(document, emprunteur, debut, fin, false, null, null);
        Emprunts saved = empruntsRepository.save(emprunt);
        log.info("Prêt créé : document={} emprunteur={} retour prévu le {}",
                idDocument, emprunteur.getIdUtilisateur(), fin);
        return saved;
    }

    // =====================================================================
    // Prolongation
    // =====================================================================

    /**
     * Prolonge un emprunt d'une durée standard (durée de prêt paramétrée).
     * <b>Autorisé une seule fois</b> ({@code estProlonge == false}) : usage emprunteur.
     *
     * @throws IllegalStateException si l'emprunt a déjà été prolongé.
     */
    public Emprunts prolonger(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        if (Boolean.TRUE.equals(emprunt.getEstProlonge())) {
            throw new IllegalStateException("Cet emprunt a déjà été prolongé.");
        }
        emprunt.setDateFin(emprunt.getDateFin().plusDays(regleService.getDureePretJours()));
        emprunt.setEstProlonge(true);
        log.info("Prêt prolongé (emprunteur) : document={} nouvelle date de fin {}",
                idDocument, emprunt.getDateFin());
        return empruntsRepository.save(emprunt);
    }

    /**
     * Prolonge un emprunt <b>sans limitation</b> : usage bibliothécaire.
     */
    public Emprunts prolongerSansLimite(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        emprunt.setDateFin(emprunt.getDateFin().plusDays(regleService.getDureePretJours()));
        emprunt.setEstProlonge(true);
        log.info("Prêt prolongé (bibliothécaire) : document={} nouvelle date de fin {}",
                idDocument, emprunt.getDateFin());
        return empruntsRepository.save(emprunt);
    }

    // =====================================================================
    // Retour
    // =====================================================================

    /** Enregistre le retour d'un document (renseigne la date de retour). */
    public Emprunts retourner(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        emprunt.setDateRetour(LocalDate.now());
        log.info("Retour enregistré : document={} utilisateur={}",
                idDocument, utilisateur.getIdUtilisateur());
        return empruntsRepository.save(emprunt);
    }

    // =====================================================================
    // Utilitaire
    // =====================================================================

    private Emprunts getEmprunt(Integer idDocument, Utilisateur utilisateur) {
        Emprunts.EmpruntsId id =
                new Emprunts.EmpruntsId(idDocument, utilisateur.getIdUtilisateur());
        return empruntsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emprunt introuvable."));
    }
}