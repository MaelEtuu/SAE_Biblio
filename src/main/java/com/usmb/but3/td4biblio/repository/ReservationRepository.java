package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Reservation.ReservationId;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
public interface ReservationRepository extends JpaRepository<Reservation, ReservationId> {
    
    /** Réservations actives (non expirées) d'un utilisateur. */
    List<Reservation> findByUtilisateurAndDateFinGreaterThanEqual(
            Utilisateur utilisateur, LocalDate today);

    /** Toutes les réservations d'un utilisateur. */
    List<Reservation> findByUtilisateur(Utilisateur utilisateur);

    /** Vérifie qu'un document est déjà réservé par cet utilisateur. */
    boolean existsByDocument_IdDocumentAndUtilisateur(
            Integer idDocument, Utilisateur utilisateur);

    // --- Par document / pour le bibliothécaire ---

    /** Toutes les réservations actives du réseau (recherche des documents réservés). */
    List<Reservation> findByDateFinGreaterThanEqual(LocalDate today);

    /** Réservations actives portant sur un document donné. */
    List<Reservation> findByDocument_IdDocumentAndDateFinGreaterThanEqual(
            Integer idDocument, LocalDate today);

    /** Toutes les réservations d'un document (actives ou échues). */
    List<Reservation> findByDocument_IdDocument(Integer idDocument);

    /** Réservations échues (date de fin dépassée). */
    List<Reservation> findByDateFinBefore(LocalDate today);
}