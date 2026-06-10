package com.usmb.but3.td4biblio.repository;

import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Emprunts.EmpruntsId;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpruntsRepository extends JpaRepository<Emprunts, EmpruntsId> {

    // Emprunts en cours d'un utilisateur (non rendus)
    List<Emprunts> findByUtilisateurAndDateRetourIsNull(Utilisateur utilisateur);

    // Tous les emprunts d'un utilisateur
    List<Emprunts> findByUtilisateur(Utilisateur utilisateur);

    // Vérifier si un document est actuellement emprunté
    boolean existsByDocument_IdDocumentAndDateRetourIsNull(Integer idDocument);
}