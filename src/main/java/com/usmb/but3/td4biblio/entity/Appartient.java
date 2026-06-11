package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "appartient")
@IdClass(Appartient.AppartientId.class)
public class Appartient {

    @Id
    @ManyToOne
    @JoinColumn(name = "idBibliotheque")
    @EqualsAndHashCode.Include
    private Bibliotheque bibliotheque;

    @Id
    @ManyToOne
    @JoinColumn(name = "idDocument")
    @EqualsAndHashCode.Include
    private Document document;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppartientId implements Serializable {
        private Integer bibliotheque;
        private Integer document;
    }
}