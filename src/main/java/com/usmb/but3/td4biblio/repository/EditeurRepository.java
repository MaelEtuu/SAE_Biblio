package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Editeur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EditeurRepository extends JpaRepository<Editeur, Integer> {
    Optional<Editeur> findByNomSociete(String nomSociete);
}