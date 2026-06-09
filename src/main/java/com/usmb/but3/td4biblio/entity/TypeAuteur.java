package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "type_auteur")
public class TypeAuteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTypeAuteur;

    @Column(length = 40)
    private String libelleTypeAuteur;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        TypeAuteur other = (TypeAuteur) obj;
        return idTypeAuteur != null ? idTypeAuteur.equals(other.idTypeAuteur) : other.idTypeAuteur == null;
    }

    @Override
    public int hashCode() {
        return idTypeAuteur != null ? idTypeAuteur.hashCode() : 0;
    }
}
