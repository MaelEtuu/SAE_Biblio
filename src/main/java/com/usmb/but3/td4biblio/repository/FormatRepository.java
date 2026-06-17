package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Format;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormatRepository extends JpaRepository<Format, Integer> {
    Optional<Format> findByLargeur(String largeur);
}