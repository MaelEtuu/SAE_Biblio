package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Accès aux données des utilisateurs (emprunteurs et bibliothécaires).
 *
 * <p>⚠ Si un {@code UtilisateurRepository} existe déjà, n'ajoute que les
 * méthodes qui te manquent ({@code existsByNumeroCarte}, {@code existsByMail}).</p>
 */
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    /** Vérifie l'unicité du numéro de carte (généré à la création). */
    boolean existsByNumeroCarte(Long numeroCarte);

    /** Vérifie qu'aucun compte n'utilise déjà cet e-mail. */
    boolean existsByMail(String mail);

    /** Recherche d'un compte par e-mail (utile pour l'authentification à venir). */
    Optional<Utilisateur> findByMail(String mail);
}