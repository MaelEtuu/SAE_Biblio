package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Emprunts.EmpruntsId;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Accès aux données des emprunts (prêts de documents). */
public interface EmpruntsRepository extends JpaRepository<Emprunts, EmpruntsId> {

    /** Emprunts en cours (non rendus) d'un utilisateur. */
    List<Emprunts> findByUtilisateurAndDateRetourIsNull(Utilisateur utilisateur);

    /** Nombre d'emprunts en cours d'un utilisateur (pour le quota). */
    long countByUtilisateurAndDateRetourIsNull(Utilisateur utilisateur);

    /** Tous les emprunts d'un utilisateur. */
    List<Emprunts> findByUtilisateur(Utilisateur utilisateur);

    /** Vrai si le document est actuellement emprunté (non rendu). */
    boolean existsByDocument_IdDocumentAndDateRetourIsNull(Integer idDocument);

    @org.springframework.data.jpa.repository.Query(
            "SELECT DISTINCT e.utilisateur FROM Emprunts e WHERE e.dateRetour IS NULL")
    List<Utilisateur> findEmprunteursAvecEmpruntEnCours();
}