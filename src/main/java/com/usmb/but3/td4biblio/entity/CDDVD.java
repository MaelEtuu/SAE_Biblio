package com.usmb.but3.td4biblio.entity;

import java.time.Duration;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "cddvd")
@PrimaryKeyJoinColumn(name = "idDocument")
public class CDDVD extends Document {

    private Duration duree;

    public boolean isEqualTo(CDDVD c) {
        if (!super.isEqualTo(c)) return false;
        return getIdDocument() != null ? getIdDocument().equals(c.getIdDocument()) : c.getIdDocument() == null;
    }
}