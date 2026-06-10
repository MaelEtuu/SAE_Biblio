package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des <b>réservations</b> (domaine du groupe 1).
 * <p>
 * Règles couvertes :
 * <ul>
 *   <li>un emprunteur peut réserver un document trouvé en recherche, à condition
 *       qu'il ne soit ni emprunté ni déjà réservé (par lui ou un autre) ;</li>
 *   <li>une réservation est tenue pendant le délai max de réservation
 *       (paramétrable, valeur initiale 2 semaines) ;</li>
 *   <li>annulation manuelle, et annulation automatique des réservations échues.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final DocumentService documentService;
    private final RegleService regleService;

    // =====================================================================
    // Lecture — côté emprunteur
    // =====================================================================

    /** Réservations actives (non expirées) de l'utilisateur courant. */
    public List<Reservation> getReservationsActives(Utilisateur utilisateur) {
        return reservationRepository.findByUtilisateurAndDateFinGreaterThanEqual(
                utilisateur, LocalDate.now());
    }

    /** Toutes les réservations de l'utilisateur (historique inclus). */
    public List<Reservation> getAllReservations(Utilisateur utilisateur) {
        return reservationRepository.findByUtilisateur(utilisateur);
    }

    // =====================================================================
    // Lecture — côté bibliothécaire
    // =====================================================================

    /** Tous les documents actuellement réservés sur le réseau. */
    public List<Reservation> getReservationsActivesReseau() {
        return reservationRepository.findByDateFinGreaterThanEqual(LocalDate.now());
    }

    /** Réservations actives portant sur un document précis. */
    public List<Reservation> getReservationsActivesDuDocument(Integer idDocument) {
        return reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(
                idDocument, LocalDate.now());
    }

    /** Vrai si le document est réservé (réservation active) par un AUTRE utilisateur. */
    public boolean estReserveParAutre(Integer idDocument, Utilisateur utilisateur) {
        return getReservationsActivesDuDocument(idDocument).stream()
                .anyMatch(r -> !r.getUtilisateur().equals(utilisateur));
    }

    // =====================================================================
    // Actions
    // =====================================================================

    /**
     * Crée une réservation pour l'utilisateur sur le document donné.
     * <p>Vérifie que le document est disponible (ni emprunté ni réservé) et
     * qu'il n'est pas déjà réservé par cet utilisateur.</p>
     *
     * @throws IllegalStateException si les conditions ne sont pas remplies.
     */
    public Reservation reserver(Integer idDocument, Utilisateur utilisateur) {
        if (!documentService.isDisponible(idDocument)) {
            throw new IllegalStateException("Le document n'est pas disponible (emprunté ou déjà réservé).");
        }
        if (reservationRepository.existsByDocument_IdDocumentAndUtilisateur(idDocument, utilisateur)) {
            throw new IllegalStateException("Vous avez déjà réservé ce document.");
        }

        Document document = documentService.getDocumentById(idDocument);
        LocalDate debut = LocalDate.now();
        LocalDate fin   = debut.plusDays(regleService.getDelaiReservationJours());

        Reservation reservation = new Reservation(document, utilisateur, debut, fin);
        Reservation saved = reservationRepository.save(reservation);
        log.info("Réservation créée : document={} utilisateur={} jusqu'au {}",
                idDocument, utilisateur.getIdUtilisateur(), fin);
        return saved;
    }

    /** Annule une réservation identifiée par son document et son utilisateur. */
    public void annuler(Integer idDocument, Utilisateur utilisateur) {
        Reservation.ReservationId id =
                new Reservation.ReservationId(idDocument, utilisateur.getIdUtilisateur());
        reservationRepository.deleteById(id);
        log.info("Réservation annulée : document={} utilisateur={}",
                idDocument, utilisateur.getIdUtilisateur());
    }

    /**
     * Annule (supprime) toutes les réservations échues, c.-à-d. dont la date de fin
     * est dépassée. À déclencher périodiquement ou à la connexion d'un bibliothécaire.
     *
     * @return le nombre de réservations annulées.
     */
    @Transactional
    public int annulerReservationsEchues() {
        List<Reservation> echues = reservationRepository.findByDateFinBefore(LocalDate.now());
        reservationRepository.deleteAll(echues);
        log.info("{} réservation(s) échue(s) annulée(s).", echues.size());
        return echues.size();
    }
}