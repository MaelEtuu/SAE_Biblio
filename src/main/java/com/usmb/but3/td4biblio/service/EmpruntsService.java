package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des emprunts.
 * Modification : lors de la création d'un prêt, si l'emprunteur a lui-même
 * réservé le document, la réservation est automatiquement annulée.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmpruntsService extends AbstractCrudService<Emprunts, Emprunts.EmpruntsId> {

    private final EmpruntsRepository    empruntsRepository;
    private final ReservationRepository reservationRepository;
    private final DocumentService       documentService;
    private final ReservationService    reservationService;
    private final RegleService          regleService;

    @Override
    protected JpaRepository<Emprunts, Emprunts.EmpruntsId> getRepository() {
        return empruntsRepository;
    }

    // =====================================================================
    // Lecture
    // =====================================================================

    public List<Emprunts> getEmpruntsEnCours(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateurAndDateRetourIsNull(utilisateur);
    }

    public List<Emprunts> getAllEmprunts(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateur(utilisateur);
    }

    public long getNombreEmpruntsEnCours(Utilisateur utilisateur) {
        return empruntsRepository.countByUtilisateurAndDateRetourIsNull(utilisateur);
    }

    // =====================================================================
    // Création d'un prêt
    // =====================================================================

    /**
     * Crée un prêt pour {@code emprunteur} sur le document {@code idDocument}.
     * <p>
     * Règles vérifiées :
     * <ol>
     *   <li>Quota de prêts simultanés non atteint.</li>
     *   <li>Abonnement valide.</li>
     *   <li>Document empruntable et non déjà emprunté.</li>
     *   <li>Document non réservé par un <b>autre</b> emprunteur.
     *       Si l'emprunteur possède lui-même la réservation, elle est
     *       automatiquement annulée à la création du prêt.</li>
     * </ol>
     */
    @Transactional
    public Emprunts creerPret(Integer idDocument, Utilisateur emprunteur) {

        // 1. Quota de prêts
        long enCours = getNombreEmpruntsEnCours(emprunteur);
        int  max     = regleService.getMaxPrets();
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

        // 4. Vérification réservations
        //    - Réservé par cet emprunteur → on annule sa réservation et on continue.
        //    - Réservé par un autre        → on bloque.
        boolean reserveParMoi = reservationRepository
                .existsByDocument_IdDocumentAndUtilisateur(idDocument, emprunteur);

        if (reserveParMoi) {
            // Annulation automatique de la réservation de l'emprunteur
            reservationService.annuler(idDocument, emprunteur);
            log.info("Réservation annulée automatiquement lors du prêt : document={} emprunteur={}",
                    idDocument, emprunteur.getIdUtilisateur());
        } else if (reservationService.estReserveParAutre(idDocument, emprunteur)) {
            throw new IllegalStateException("Ce document est réservé par un autre emprunteur.");
        }

        // 5. Création du prêt
        LocalDate debut = LocalDate.now();
        LocalDate fin   = debut.plusDays(regleService.getDureePretJours());
        Emprunts  emprunt = new Emprunts(document, emprunteur, debut, fin, false, null, null);
        Emprunts  saved   = save(emprunt);
        log.info("Prêt créé : document={} emprunteur={} retour prévu le {}",
                idDocument, emprunteur.getIdUtilisateur(), fin);
        return saved;
    }

    // =====================================================================
    // Prolongation
    // =====================================================================

    /** Prolonge une fois (usage emprunteur). */
    public Emprunts prolonger(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        if (Boolean.TRUE.equals(emprunt.getEstProlonge())) {
            throw new IllegalStateException("Cet emprunt a déjà été prolongé.");
        }
        emprunt.setDateFin(emprunt.getDateFin().plusDays(regleService.getDureePretJours()));
        emprunt.setEstProlonge(true);
        log.info("Prêt prolongé (emprunteur) : document={} nouvelle date de fin {}",
                idDocument, emprunt.getDateFin());
        return save(emprunt);
    }

    /** Prolonge sans limitation (usage bibliothécaire). */
    public Emprunts prolongerSansLimite(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        emprunt.setDateFin(emprunt.getDateFin().plusDays(regleService.getDureePretJours()));
        emprunt.setEstProlonge(true);
        log.info("Prêt prolongé (bibliothécaire) : document={} nouvelle date de fin {}",
                idDocument, emprunt.getDateFin());
        return save(emprunt);
    }

    // =====================================================================
    // Retour
    // =====================================================================

    public Emprunts retourner(Integer idDocument, Utilisateur utilisateur) {
        Emprunts emprunt = getEmprunt(idDocument, utilisateur);
        emprunt.setDateRetour(LocalDate.now());
        log.info("Retour enregistré : document={} utilisateur={}",
                idDocument, utilisateur.getIdUtilisateur());
        return save(emprunt);
    }

    // =====================================================================
    // Utilitaire
    // =====================================================================

    private Emprunts getEmprunt(Integer idDocument, Utilisateur utilisateur) {
        Emprunts.EmpruntsId id =
                new Emprunts.EmpruntsId(idDocument, utilisateur.getIdUtilisateur());
        return findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emprunt introuvable."));
    }
}