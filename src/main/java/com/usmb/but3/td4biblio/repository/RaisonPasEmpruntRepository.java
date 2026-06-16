package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.RaisonPasEmprunt;
import org.springframework.data.jpa.repository.JpaRepository;

/** Accès aux motifs de non-emprunt (Valeur, Fragilité, Mauvais état…). */
public interface RaisonPasEmpruntRepository extends JpaRepository<RaisonPasEmprunt, Integer> {
}