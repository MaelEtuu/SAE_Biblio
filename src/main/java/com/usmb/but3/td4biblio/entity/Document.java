package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "document")
@Inheritance(strategy = InheritanceType.JOINED)
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDocument;

    @ManyToOne
    @JoinColumn(name = "idFormat")
    private Format format;

    @ManyToOne
    @JoinColumn(name = "idAuteur")
    private Auteur auteur;

    @Column(length = 100)
    private String titre;

    private LocalDateTime dateAcquisition;

    @Column(length = 50)
    private String description;

    private LocalDateTime datePublication;

    @Column(length = 10)
    private String codeEmplacement;

    private Boolean estEmpruntable;

    @Column(length = 2000)
    private String gif;

    public boolean isEqualTo(Document d) {
        if (this == d) return true;
        if (d == null) return false;
        if (idDocument != null ? !idDocument.equals(d.idDocument) : d.idDocument != null) return false;
        if (titre != null ? !titre.equals(d.titre) : d.titre != null) return false;
        if (dateAcquisition != null ? !dateAcquisition.equals(d.dateAcquisition) : d.dateAcquisition != null) return false;
        if (description != null ? !description.equals(d.description) : d.description != null) return false;
        if (datePublication != null ? !datePublication.equals(d.datePublication) : d.datePublication != null) return false;
        if (codeEmplacement != null ? !codeEmplacement.equals(d.codeEmplacement) : d.codeEmplacement != null) return false;
        if (estEmpruntable != null ? !estEmpruntable.equals(d.estEmpruntable) : d.estEmpruntable != null) return false;
        return gif != null ? gif.equals(d.gif) : d.gif == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((Document) obj);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (idDocument != null ? idDocument.hashCode() : 0);
        result = 31 * result + (titre != null ? titre.hashCode() : 0);
        result = 31 * result + (dateAcquisition != null ? dateAcquisition.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (datePublication != null ? datePublication.hashCode() : 0);
        result = 31 * result + (codeEmplacement != null ? codeEmplacement.hashCode() : 0);
        result = 31 * result + (estEmpruntable != null ? estEmpruntable.hashCode() : 0);
        result = 31 * result + (gif != null ? gif.hashCode() : 0);
        return result;
    }
}