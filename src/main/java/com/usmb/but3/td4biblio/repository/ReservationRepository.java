package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Reservation.ReservationId;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, ReservationId> {

    // Réservations actives (non expirées) d'un utilisateur
    List<Reservation> findByUtilisateurAndDateFinGreaterThanEqual(
            Utilisateur utilisateur, LocalDate today);

    // Toutes les réservations d'un utilisateur
    List<Reservation> findByUtilisateur(Utilisateur utilisateur);

    // Vérifier si un document est déjà réservé par un utilisateur
    boolean existsByDocument_IdDocumentAndUtilisateur(
            Integer idDocument, Utilisateur utilisateur);
}