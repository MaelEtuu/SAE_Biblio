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
@Table(name = "reservation")
@IdClass(Reservation.ReservationId.class)
public class Reservation {

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

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReservationId implements Serializable {
        private Integer document;
        private Integer utilisateur;
    }
}