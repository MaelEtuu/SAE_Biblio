package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "raison_pas_emprunt")
public class RaisonPasEmprunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idRaison;

    @Column(length = 50)
    private String libelleRaison;

    public boolean isEqualTo(RaisonPasEmprunt r) {
        if (this == r) return true;
        if (r == null) return false;
        if (idRaison != null ? !idRaison.equals(r.idRaison) : r.idRaison != null) return false;
        return libelleRaison != null ? libelleRaison.equals(r.libelleRaison) : r.libelleRaison == null;
    }
}