package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmpruntsService {

    /** Durée de prolongation en jours (3 semaines). */
    public static final int DUREE_PROLONGATION_JOURS = 21;

    private final EmpruntsRepository empruntsRepository;

    public EmpruntsService(EmpruntsRepository empruntsRepository) {
        this.empruntsRepository = empruntsRepository;
    }

    // --- Lecture ---

    /**
     * Emprunts en cours (non rendus) de l'utilisateur.
     */
    public List<Emprunts> getEmpruntsEnCours(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateurAndDateRetourIsNull(utilisateur);
    }

    public List<Emprunts> getAllEmprunts(Utilisateur utilisateur) {
        return empruntsRepository.findByUtilisateur(utilisateur);
    }

    // --- Actions ---

    /**
     * Prolonge un emprunt d'une durée fixe.
     * La prolongation n'est autorisée qu'une seule fois (estProlonge == false).
     */
    public Emprunts prolonger(Integer idDocument, Utilisateur utilisateur) {
        Emprunts.EmpruntsId id =
                new Emprunts.EmpruntsId(idDocument, utilisateur.getIdUtilisateur());

        Emprunts emprunt = empruntsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emprunt introuvable."));

        if (Boolean.TRUE.equals(emprunt.getEstProlonge())) {
            throw new IllegalStateException("Cet emprunt a déjà été prolongé.");
        }

        emprunt.setDateFin(emprunt.getDateFin().plusDays(DUREE_PROLONGATION_JOURS));
        emprunt.setEstProlonge(true);
        return empruntsRepository.save(emprunt);
    }

    /**
     * Enregistre le retour d'un document.
     */
    public Emprunts retourner(Integer idDocument, Utilisateur utilisateur) {
        Emprunts.EmpruntsId id =
                new Emprunts.EmpruntsId(idDocument, utilisateur.getIdUtilisateur());

        Emprunts emprunt = empruntsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emprunt introuvable."));

        emprunt.setDateRetour(LocalDate.now());
        return empruntsRepository.save(emprunt);
    }
}