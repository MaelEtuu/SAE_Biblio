package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

    List<Document> findByTitreContainingIgnoreCase(String titre);

    List<Document> findByAuteur_NomSocieteContainingIgnoreCase(String nom);

    List<Document> findByFormat_LargeurContainingIgnoreCase(String libelleFormat);

    // Nouvelles acquisitions : documents acquis récemment, empruntables
    List<Document> findTop5ByEstEmpruntableTrueOrderByDateAcquisitionDesc();

    // Documents disponibles = empruntables et non actuellement empruntés
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