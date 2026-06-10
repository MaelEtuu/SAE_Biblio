package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Regle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Accès aux règles paramétrables (nb max de prêts, durée de prêt, délai de réservation). */
public interface RegleRepository extends JpaRepository<Regle, Integer> {
    List<Regle> findByTypeRegle(String typeRegle);
}