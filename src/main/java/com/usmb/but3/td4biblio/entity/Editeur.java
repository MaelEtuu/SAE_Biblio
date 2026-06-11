package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "editeur")
public class Editeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idEditeur;

    @Column(length = 50)
    private String nomSociete;

    @Column(length = 1000)
    private String lienSite;

    @Column(length = 1000)
    private String lienWikipedia;

    @Column(length = 100)
    private String adresse;

    @Column(length = 100)
    private String ville;

    @Column(length = 50)
    private String pays;

    @Column(length = 10)
    private String codePostal;

    public boolean isEqualTo(Editeur e) {
        if (this == e) return true;
        if (e == null) return false;
        if (idEditeur != null ? !idEditeur.equals(e.idEditeur) : e.idEditeur != null) return false;
        if (nomSociete != null ? !nomSociete.equals(e.nomSociete) : e.nomSociete != null) return false;
        if (lienSite != null ? !lienSite.equals(e.lienSite) : e.lienSite != null) return false;
        if (lienWikipedia != null ? !lienWikipedia.equals(e.lienWikipedia) : e.lienWikipedia != null) return false;
        if (adresse != null ? !adresse.equals(e.adresse) : e.adresse != null) return false;
        if (ville != null ? !ville.equals(e.ville) : e.ville != null) return false;
        if (pays != null ? !pays.equals(e.pays) : e.pays != null) return false;
        return codePostal != null ? codePostal.equals(e.codePostal) : e.codePostal == null;
    }
}