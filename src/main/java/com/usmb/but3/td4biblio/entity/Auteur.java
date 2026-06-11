package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * Une classe entité qui représente une table de la base de données
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "auteur")
public class Auteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idAuteur;

    @ManyToOne
    @JoinColumn(name = "idTypeAuteur")
    private TypeAuteur typeAuteur;

    @Column(length = 50)
    private String nom;

    @Column(length = 50)
    private String prenom;

    @Column(length = 50)
    private String nationalite;

    private LocalDate dateNaissance;
    private LocalDate dateDeces;

    @Column(length = 50)
    private String paysNaissance;

    @Column(length = 100)
    private String villeNaissance;

    @Column(length = 1000)
    private String lienWikipedia;

    public boolean isEqualTo(Auteur auteur) {
        if (this == auteur) return true;
        if (auteur == null) return false;
        if (idAuteur != null ? !idAuteur.equals(auteur.idAuteur) : auteur.idAuteur != null) return false;
        if (nom != null ? !nom.equals(auteur.nom) : auteur.nom != null) return false;
        if (prenom != null ? !prenom.equals(auteur.prenom) : auteur.prenom != null) return false;
        if (nationalite != null ? !nationalite.equals(auteur.nationalite) : auteur.nationalite != null)
            return false;
        if (dateNaissance != null ? !dateNaissance.equals(auteur.dateNaissance) : auteur.dateNaissance != null)
            return false;
        return dateDeces != null ? dateDeces.equals(auteur.dateDeces) : auteur.dateDeces == null;
    }

    public String getDesc() {
        String n = nom != null ? nom : "";
        String p = prenom != null ? prenom + " " : "";
        String annees = (dateNaissance != null ? dateNaissance.getYear() : "?")
                + "-"
                + (dateDeces != null ? String.valueOf(dateDeces.getYear()) : "en vie");
        return p + nom + " (" + annees + ")";
    }
}
