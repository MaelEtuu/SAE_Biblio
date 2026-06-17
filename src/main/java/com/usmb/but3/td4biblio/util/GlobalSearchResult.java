package com.usmb.but3.td4biblio.util;

/**
 * Résultat unifié de la recherche globale multi-entités.
 * Chaque résultat porte le type de l'entité, son identifiant, et les
 * champs principaux nécessaires à l'affichage dans la grille.
 */
public record GlobalSearchResult(
        EntityType type,
        Integer    id,
        String     champ1,   // titre / prénom+nom
        String     champ2,   // auteur / n° carte
        String     champ3,   // format / fin abonnement
        String     champ4,   // emplacement / emprunteur
        String     champ5,   // date début
        String     champ6,   // date fin / date retour
        String     statut    // Disponible, Emprunté, En cours, Rendu, Expiré, Active…
) {
    public enum EntityType {
        DOCUMENT("Document"),
        EMPRUNTEUR("Emprunteur"),
        EMPRUNT("Emprunt"),
        RESERVATION("Réservation");

        private final String libelle;

        EntityType(String libelle) { this.libelle = libelle; }

        public String getLibelle() { return libelle; }
    }
}