package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@Entity
@Table(name = "cddvd")
@PrimaryKeyJoinColumn(name = "idDocument")
public class CDDVD extends Document {
    public boolean isEqualTo(CDDVD c) {
        if (!super.isEqualTo(c)) return false;
        return getIdDocument() != null ? getIdDocument().equals(c.getIdDocument()) : c.getIdDocument() == null;
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
        result = 31 * result + (getIdDocument() != null ? getIdDocument().hashCode() : 0);
        return result;
    }
}