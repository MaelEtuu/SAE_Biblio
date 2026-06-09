package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "appartient")
@IdClass(Appartient.AppartientId.class)
public class Appartient {

    @Id
    @ManyToOne
    @JoinColumn(name = "idBibliotheque")
    private Bibliotheque bibliotheque;

    @Id
    @ManyToOne
    @JoinColumn(name = "idDocument")
    private Document document;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AppartientId implements Serializable {
        private Integer bibliotheque;
        private Integer document;
    }
}