package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Accès aux rôles (BIBLIOTHECAIRE, EMPRUNTEUR…).
 *
 * <p>⚠ Si un {@code RoleRepository} existe déjà, ignore ce fichier.</p>
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    /** Récupère un rôle par son libellé (ex. "EMPRUNTEUR"). */
    Optional<Role> findByLibelleRole(String libelleRole);
}