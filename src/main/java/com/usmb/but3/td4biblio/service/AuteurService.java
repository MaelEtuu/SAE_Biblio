package com.usmb.but3.td4biblio.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.repository.AuteurRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service des auteurs : CRUD hérité de {@link AbstractCrudService},
 * complété par les recherches spécifiques (par nom, prénom…).
 */
@Service
@RequiredArgsConstructor
public class AuteurService extends AbstractCrudService<Auteur, Integer> {

    private final AuteurRepository auteurRepo;

    @Override
    protected JpaRepository<Auteur, Integer> getRepository() {
        return auteurRepo;
    }

    // =====================================================================
    // Alias de compatibilité (conservent les anciens noms appelés ailleurs)
    // =====================================================================

    /** Tous les auteurs, triés par identifiant croissant. */
    public List<Auteur> getAllAuteurs() {
        return auteurRepo.findAll(Sort.by(Sort.Direction.ASC, "idAuteur"));
    }

    public Auteur getAuteurById(Integer id) {
        return findById(id).orElse(null);
    }

    public Auteur saveAuteur(Auteur auteur) {
        return save(auteur);
    }

    public Auteur updateAuteur(Auteur auteur) {
        return save(auteur);
    }

    public void deleteAuteurById(Integer id) {
        deleteById(id);
    }

    // =====================================================================
    // Recherches spécifiques
    // =====================================================================

    public List<Auteur> getAuteursByNom(String nom) {
        return auteurRepo.findByNom(nom);
    }

    public List<Auteur> getAuteursByNomAndPrenom(String nom, String prenom) {
        return auteurRepo.findByNomAndPrenom(nom, prenom);
    }

    public List<Auteur> getAuteursByNomLikeAndPrenomLike(String nom, String prenom) {
        return auteurRepo.findByNomLikeAndPrenomLike(nom, prenom);
    }

    public List<Auteur> getAuteursByNomStartWithIgnoreCase(String filter) {
        return auteurRepo.findByNomStartsWithIgnoreCase(filter);
    }

    public List<Auteur> getByNomContainingIgnoreCase(String filter) {
        return auteurRepo.findByNomContainingIgnoreCase(filter);
    }
}