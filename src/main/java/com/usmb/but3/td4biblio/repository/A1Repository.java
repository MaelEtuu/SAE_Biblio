package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.A1;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Association Document ↔ motif de non-emprunt (table a1). */
public interface A1Repository extends JpaRepository<A1, A1.A1Id> {

    /** Motifs de non-emprunt associés à un document. */
    List<A1> findByDocument_IdDocument(Integer idDocument);

    /** Supprime les motifs associés à un document (avant réenregistrement). */
    void deleteByDocument_IdDocument(Integer idDocument);
}