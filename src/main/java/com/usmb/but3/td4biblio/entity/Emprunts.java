package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "emprunts")
@IdClass(Emprunts.EmpruntsId.class)
public class Emprunts {

    @Id
    @ManyToOne
    @JoinColumn(name = "idDocument")
    @EqualsAndHashCode.Include
    private Document document;

    @Id
    @ManyToOne
    @JoinColumn(name = "idUtilisateur")
    @EqualsAndHashCode.Include
    private Utilisateur utilisateur;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Boolean estProlonge;

    @Column(length = 200)
    private String notes;

    private LocalDate dateRetour;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmpruntsId implements Serializable {
        private Integer document;
        private Integer utilisateur;
    }
}