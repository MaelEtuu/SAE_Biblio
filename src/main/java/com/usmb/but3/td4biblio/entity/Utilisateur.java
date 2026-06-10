package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Utilisateur de l'application (emprunteur ou bibliothécaire, selon le {@link Role}).
 * <p>Conforme au cahier des charges : nom, prénom, adresse, e-mail, date de naissance,
 * date de fin d'abonnement (durée un an), numéro de carte unique (10 chiffres) et
 * mot de passe (haché en base, initialisé sur la date de naissance).</p>
 */
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

    @Column(length = 50)
    private String nom;

    @Column(length = 50)
    private String prenom;

    @Column(length = 100)
    private String adresse;

    @Column(length = 50)
    private String mail;

    /** Mot de passe haché (jamais stocké en clair). */
    @Column(length = 200)
    private String mdp;

    private LocalDate dateNaissance;

    /** Échéance de l'abonnement (durée un an). */
    private LocalDate dateFinAbonnement;

    /** Numéro de carte unique, format 10 chiffres (d'où le type {@code Long}). */
    private Long numeroCarte;

    /** Nombre de prêts en cours (compteur, peut servir d'optimisation). */
    private Integer nombrePret;

    public boolean isEqualTo(Utilisateur u) {
        if (this == u) return true;
        if (u == null) return false;
        if (idUtilisateur != null ? !idUtilisateur.equals(u.idUtilisateur) : u.idUtilisateur != null) return false;
        if (numeroCarte != null ? !numeroCarte.equals(u.numeroCarte) : u.numeroCarte != null) return false;
        if (nombrePret != null ? !nombrePret.equals(u.nombrePret) : u.nombrePret != null) return false;
        if (nom != null ? !nom.equals(u.nom) : u.nom != null) return false;
        if (prenom != null ? !prenom.equals(u.prenom) : u.prenom != null) return false;
        if (adresse != null ? !adresse.equals(u.adresse) : u.adresse != null) return false;
        if (mail != null ? !mail.equals(u.mail) : u.mail != null) return false;
        if (mdp != null ? !mdp.equals(u.mdp) : u.mdp != null) return false;
        if (dateNaissance != null ? !dateNaissance.equals(u.dateNaissance) : u.dateNaissance != null) return false;
        return dateFinAbonnement != null ? dateFinAbonnement.equals(u.dateFinAbonnement) : u.dateFinAbonnement == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Utilisateur other = (Utilisateur) obj;
        return idUtilisateur != null ? idUtilisateur.equals(other.idUtilisateur) : other.idUtilisateur == null;
    }

    @Override
    public int hashCode() {
        return idUtilisateur != null ? idUtilisateur.hashCode() : 0;
    }
}