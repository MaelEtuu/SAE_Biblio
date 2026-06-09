package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "cddvd")
@PrimaryKeyJoinColumn(name = "idDocument")
public class CDDVD extends Document {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCDDVD;

    public boolean isEqualTo(CDDVD c) {
        if (!super.isEqualTo(c)) return false;
        return idCDDVD != null ? idCDDVD.equals(c.idCDDVD) : c.idCDDVD == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((CDDVD) obj);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (idCDDVD != null ? idCDDVD.hashCode() : 0);
        return result;
    }
}