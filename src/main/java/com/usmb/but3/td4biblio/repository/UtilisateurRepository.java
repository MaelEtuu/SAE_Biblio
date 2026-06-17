package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/** Accès aux données des utilisateurs (emprunteurs et bibliothécaires). */
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    /** Recherche un utilisateur par son adresse e-mail (pour la connexion). */
    Optional<Utilisateur> findByMail(String mail);

    /** Vérifie qu'un numéro de carte est déjà utilisé (unicité). */
    boolean existsByNumeroCarte(Long numeroCarte);

    boolean existsByMail(String mail);

    // ── Recherches côté bibliothécaire (gestion des emprunteurs) ──

    /** Tous les utilisateurs d'un rôle donné (ex. "EMPRUNTEUR"). */
    List<Utilisateur> findByRole_LibelleRole(String libelleRole);

    /** Recherche par nom (contient, insensible à la casse), filtrée par rôle. */
    List<Utilisateur> findByNomContainingIgnoreCaseAndRole_LibelleRole(String nom, String libelleRole);

    /** Emprunteurs dont l'abonnement est échu (date de fin avant la date donnée). */
    List<Utilisateur> findByDateFinAbonnementBeforeAndRole_LibelleRole(LocalDate date, String libelleRole);

    /** Recherche par numéro de carte (unique). */
    Optional<Utilisateur> findByNumeroCarte(Long numeroCarte);
}