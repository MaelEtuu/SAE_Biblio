package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "livre")
@PrimaryKeyJoinColumn(name = "idDocument")
public class Livre extends Document {

    @Column(length = 15)
    private String codeISBN;

    private Integer nbPages;

    @ManyToOne
    @JoinColumn(name = "idEditeur")
    private Editeur editeur;

    public boolean isEqualTo(Livre l) {
        if (!super.isEqualTo(l)) return false;
        if (codeISBN != null ? !codeISBN.equals(l.codeISBN) : l.codeISBN != null) return false;
        if (nbPages != null ? !nbPages.equals(l.nbPages) : l.nbPages != null) return false;
        return editeur != null ? editeur.equals(l.editeur) : l.editeur == null;
    }
}