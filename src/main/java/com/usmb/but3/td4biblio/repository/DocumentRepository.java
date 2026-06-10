package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

/** Accès aux données des documents (livres, CD, DVD...). */
public interface DocumentRepository extends JpaRepository<Document, Integer> {

    List<Document> findByTitreContainingIgnoreCase(String titre);

    /** Recherche par nom d'auteur (corrigé : {@code nom} au lieu de {@code nomSociete}). */
    List<Document> findByAuteur_NomContainingIgnoreCase(String nom);

    List<Document> findByFormat_LargeurContainingIgnoreCase(String libelleFormat);

    /** Nouvelles acquisitions : 5 documents empruntables les plus récents. */
    List<Document> findTop5ByEstEmpruntableTrueOrderByDateAcquisitionDesc();

    /** Documents disponibles = empruntables, ni empruntés, ni réservés (réservation active). */
    @Query("""
        SELECT d FROM Document d
        WHERE d.estEmpruntable = true
          AND d NOT IN (
              SELECT e.document FROM Emprunts e
              WHERE e.dateRetour IS NULL
          )
          AND d NOT IN (
              SELECT r.document FROM Reservation r
              WHERE r.dateFin >= :today
          )
        """)
    List<Document> findDisponibles(LocalDate today);
}