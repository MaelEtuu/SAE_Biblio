package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "bibliotheque")
public class Bibliotheque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idBibliotheque;

    @Column(length = 50)
    private String nom;

    @Column(length = 100)
    private String adresse;

    private LocalTime heureOuverture;
    private LocalTime heureFermeture;

    @Column(length = 100)
    private String ville;

    @Column(length = 50)
    private String pays;

    @Column(length = 10)
    private String codePostal;

    public boolean isEqualTo(Bibliotheque b) {
        if (this == b) return true;
        if (b == null) return false;
        if (idBibliotheque != null ? !idBibliotheque.equals(b.idBibliotheque) : b.idBibliotheque != null) return false;
        if (nom != null ? !nom.equals(b.nom) : b.nom != null) return false;
        if (adresse != null ? !adresse.equals(b.adresse) : b.adresse != null) return false;
        if (heureOuverture != null ? !heureOuverture.equals(b.heureOuverture) : b.heureOuverture != null) return false;
        if (heureFermeture != null ? !heureFermeture.equals(b.heureFermeture) : b.heureFermeture != null) return false;
        if (ville != null ? !ville.equals(b.ville) : b.ville != null) return false;
        if (pays != null ? !pays.equals(b.pays) : b.pays != null) return false;
        return codePostal != null ? codePostal.equals(b.codePostal) : b.codePostal == null;
    }
}