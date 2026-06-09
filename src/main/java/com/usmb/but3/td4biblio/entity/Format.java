package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "format")
public class Format {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((Format) obj);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (idFormat != null ? idFormat.hashCode() : 0);
        result = 31 * result + (longueur != null ? longueur.hashCode() : 0);
        result = 31 * result + (largeur != null ? largeur.hashCode() : 0);
        result = 31 * result + (poids != null ? poids.hashCode() : 0);
        return result;
    }
}