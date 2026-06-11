package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "format")
public class Format {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idFormat;

    @Column(length = 50)
    private String longueur;

    @Column(length = 50)
    private String largeur;

    @Column(length = 50)
    private String poids;

    public boolean isEqualTo(Format f) {
        if (this == f) return true;
        if (f == null) return false;
        if (idFormat != null ? !idFormat.equals(f.idFormat) : f.idFormat != null) return false;
        if (longueur != null ? !longueur.equals(f.longueur) : f.longueur != null) return false;
        if (largeur != null ? !largeur.equals(f.largeur) : f.largeur != null) return false;
        return poids != null ? poids.equals(f.poids) : f.poids == null;
    }
}