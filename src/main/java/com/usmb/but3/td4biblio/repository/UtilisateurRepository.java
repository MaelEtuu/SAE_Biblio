package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/** Accès aux données des utilisateurs (emprunteurs et bibliothécaires). */
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    /** Recherche un utilisateur par son adresse e-mail (pour la connexion). */
    Optional<Utilisateur> findByMail(String mail);

    /** Vérifie qu'un numéro de carte est déjà utilisé (unicité). */
    boolean existsByNumeroCarte(Long numeroCarte);

    boolean existsByMail(String mail);
}