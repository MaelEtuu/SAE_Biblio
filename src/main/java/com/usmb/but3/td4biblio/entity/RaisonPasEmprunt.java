package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "raison_pas_emprunt")
public class RaisonPasEmprunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRaison;

    @Column(length = 50)
    private String libelleRaison;

    public boolean isEqualTo(RaisonPasEmprunt r) {
        if (this == r) return true;
        if (r == null) return false;
        if (idRaison != null ? !idRaison.equals(r.idRaison) : r.idRaison != null) return false;
        return libelleRaison != null ? libelleRaison.equals(r.libelleRaison) : r.libelleRaison == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((RaisonPasEmprunt) obj);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (idRaison != null ? idRaison.hashCode() : 0);
        result = 31 * result + (libelleRaison != null ? libelleRaison.hashCode() : 0);
        return result;
    }
}