package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    /** Durée de maintien d'une réservation en jours (14 jours = 2 semaines). */
    public static final int DUREE_RESERVATION_JOURS = 14;

    private final ReservationRepository reservationRepository;
    private final DocumentService documentService;

    public ReservationService(ReservationRepository reservationRepository,
                              DocumentService documentService) {
        this.reservationRepository = reservationRepository;
        this.documentService       = documentService;
    }

    // --- Lecture ---

    /**
     * Réservations actives (non expirées) de l'utilisateur courant.
     */
    public List<Reservation> getReservationsActives(Utilisateur utilisateur) {
        return reservationRepository.findByUtilisateurAndDateFinGreaterThanEqual(
                utilisateur, LocalDate.now());
    }

    public List<Reservation> getAllReservations(Utilisateur utilisateur) {
        return reservationRepository.findByUtilisateur(utilisateur);
    }

    // --- Actions ---

    /**
     * Crée une réservation pour l'utilisateur sur le document donné.
     * Vérifie que le document est disponible et non déjà réservé par cet utilisateur.
     */
    public Reservation reserver(Integer idDocument, Utilisateur utilisateur) {
        if (!documentService.isDisponible(idDocument)) {
            throw new IllegalStateException("Le document n'est pas disponible.");
        }
        if (reservationRepository.existsByDocument_IdDocumentAndUtilisateur(idDocument, utilisateur)) {
            throw new IllegalStateException("Vous avez déjà réservé ce document.");
        }

        Document document = documentService.getDocumentById(idDocument);
        LocalDate debut = LocalDate.now();
        LocalDate fin   = debut.plusDays(DUREE_RESERVATION_JOURS);

        Reservation reservation = new Reservation(document, utilisateur, debut, fin);
        return reservationRepository.save(reservation);
    }

    /**
     * Annule une réservation identifiée par son document et son utilisateur.
     */
    public void annuler(Integer idDocument, Utilisateur utilisateur) {
        Reservation.ReservationId id =
                new Reservation.ReservationId(idDocument, utilisateur.getIdUtilisateur());
        reservationRepository.deleteById(id);
    }
}