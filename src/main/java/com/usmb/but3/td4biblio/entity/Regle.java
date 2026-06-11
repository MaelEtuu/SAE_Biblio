package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "regle")
public class Regle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idRegle;

    @Column(length = 40)
    private String valeurRegle;

    @Column(length = 100)
    private String typeRegle;

    @Column(length = 100)
    private String intituleRegle;

    public boolean isEqualTo(Regle regle) {
        if (this == regle) return true;
        if (regle == null) return false;
        if (idRegle != null ? !idRegle.equals(regle.idRegle) : regle.idRegle != null) return false;
        if (valeurRegle != null ? !valeurRegle.equals(regle.valeurRegle) : regle.valeurRegle != null) return false;
        if (typeRegle != null ? !typeRegle.equals(regle.typeRegle) : regle.typeRegle != null) return false;
        return intituleRegle != null ? intituleRegle.equals(regle.intituleRegle) : regle.intituleRegle == null;
    }
}
