package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "a1")
@IdClass(A1.A1Id.class)
public class A1 {

    @Id
    @ManyToOne
    @JoinColumn(name = "idDocument")
    @EqualsAndHashCode.Include
    private Document document;

    @Id
    @ManyToOne
    @JoinColumn(name = "idRaison")
    @EqualsAndHashCode.Include
    private RaisonPasEmprunt raison;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class A1Id implements Serializable {
        private Integer document;
        private Integer raison;
    }
}