package com.usmb.but3.td4biblio.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Rapport d'import CSV : compte les lignes traitées et collecte les erreurs
 * ligne par ligne pour affichage au bibliothécaire.
 */
@Data
public class ImportReport {

    private int totalLignes;
    private int succes;
    private int echecs;
    private final List<LigneErreur> erreurs = new ArrayList<>();

    public void ajouterErreur(int numeroLigne, String contenu, String message) {
        erreurs.add(new LigneErreur(numeroLigne, contenu, message));
        echecs++;
    }

    public void incrementerSucces() {
        succes++;
    }

    public boolean hasErreurs() {
        return !erreurs.isEmpty();
    }

    @Data
    public static class LigneErreur {
        private final int numeroLigne;
        private final String contenu;
        private final String message;
    }
}