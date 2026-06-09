package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * Une classe entité qui représente une table de la base de données
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "auteur")
public class Auteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAuteur;

    @ManyToOne
    @JoinColumn(name = "idTypeAuteur")
    private TypeAuteur typeAuteur;

    @Column(length = 50)
    private String nomSociete;

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
        if (nomSociete != null ? !nomSociete.equals(auteur.nomSociete) : auteur.nomSociete != null) return false;
        if (prenom != null ? !prenom.equals(auteur.prenom) : auteur.prenom != null) return false;
        if (nationalite != null ? !nationalite.equals(auteur.nationalite) : auteur.nationalite != null)
            return false;
        if (dateNaissance != null ? !dateNaissance.equals(auteur.dateNaissance) : auteur.dateNaissance != null)
            return false;
        return dateDeces != null ? dateDeces.equals(auteur.dateDeces) : auteur.dateDeces == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Auteur other = (Auteur) obj;
        return idAuteur != null ? idAuteur.equals(other.idAuteur) : other.idAuteur == null;
    }

    @Override
    public int hashCode() {
        return idAuteur != null ? idAuteur.hashCode() : 0;
    }

    public String getDesc() {
        String nom = nomSociete != null ? nomSociete : "";
        String p = prenom != null ? prenom + " " : "";
        String annees = (dateNaissance != null ? dateNaissance.getYear() : "?")
                + "-"
                + (dateDeces != null ? String.valueOf(dateDeces.getYear()) : "en vie");
        return p + nom + " (" + annees + ")";
    }
}
