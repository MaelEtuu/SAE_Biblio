package com.usmb.but3.td4biblio.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.usmb.but3.td4biblio.entity.Auteur;

public interface AuteurRepo extends JpaRepository<Auteur, Integer> {
    List<Auteur> findByNomSociete(String nom);
    List<Auteur> findByNomSocieteAndPrenom(String nom, String prenom);
    List<Auteur> findByNomSocieteLikeAndPrenomLike(String nom, String prenom);
    List<Auteur> findByNomSocieteStartsWithIgnoreCase(String filterText);
    List<Auteur> findByNomSocieteContainingIgnoreCase(String filter);
}