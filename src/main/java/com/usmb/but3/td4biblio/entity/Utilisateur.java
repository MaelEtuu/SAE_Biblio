package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "utilisateur")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUtilisateur;

    @ManyToOne
    @JoinColumn(name = "idRole")
    private Role role;

    private LocalDate dateFinAbonnement;
    private Integer numeroCarte;
    private Integer nombrePret;

    @Column(length = 50)
    private String prenom;

    @Column(length = 50)
    private String mail;

    @Column(length = 200)
    private String mdp;

    private LocalDate dateNaissance;

    public boolean isEqualTo(Utilisateur u) {
        if (this == u) return true;
        if (u == null) return false;
        if (idUtilisateur != null ? !idUtilisateur.equals(u.idUtilisateur) : u.idUtilisateur != null) return false;
        if (numeroCarte != null ? !numeroCarte.equals(u.numeroCarte) : u.numeroCarte != null) return false;
        if (nombrePret != null ? !nombrePret.equals(u.nombrePret) : u.nombrePret != null) return false;
        if (prenom != null ? !prenom.equals(u.prenom) : u.prenom != null) return false;
        if (mail != null ? !mail.equals(u.mail) : u.mail != null) return false;
        if (mdp != null ? !mdp.equals(u.mdp) : u.mdp != null) return false;
        if (dateNaissance != null ? !dateNaissance.equals(u.dateNaissance) : u.dateNaissance != null) return false;
        return dateFinAbonnement != null ? dateFinAbonnement.equals(u.dateFinAbonnement) : u.dateFinAbonnement == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((Utilisateur) obj);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (idUtilisateur != null ? idUtilisateur.hashCode() : 0);
        result = 31 * result + (numeroCarte != null ? numeroCarte.hashCode() : 0);
        result = 31 * result + (nombrePret != null ? nombrePret.hashCode() : 0);
        result = 31 * result + (prenom != null ? prenom.hashCode() : 0);
        result = 31 * result + (mail != null ? mail.hashCode() : 0);
        result = 31 * result + (mdp != null ? mdp.hashCode() : 0);
        result = 31 * result + (dateNaissance != null ? dateNaissance.hashCode() : 0);
        result = 31 * result + (dateFinAbonnement != null ? dateFinAbonnement.hashCode() : 0);
        return result;
    }
}