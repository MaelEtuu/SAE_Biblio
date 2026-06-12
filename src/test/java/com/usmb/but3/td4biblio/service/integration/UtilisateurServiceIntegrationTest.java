package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.RoleRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.util.MotDePasseUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Tests d'intégration (NON mockés) de {@link UtilisateurService} sur H2.
 * Vérifie la création d'un emprunteur bout en bout (rôle, abonnement, carte,
 * mot de passe haché) en s'appuyant sur le rôle EMPRUNTEUR réellement présent en base.
 */
@DataJpaTest
@Import(UtilisateurService.class)
@DisplayName("UtilisateurService — tests d'intégration (H2, sans mock)")
class UtilisateurServiceIntegrationTest {

    @Autowired private UtilisateurService utilisateurService;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private RoleRepository roleRepository;

    @BeforeEach
    void setUp() {
        Role emprunteur = new Role();
        emprunteur.setLibelleRole("EMPRUNTEUR");
        roleRepository.saveAndFlush(emprunteur);
    }

    @Test
    @DisplayName("creerEmprunteur : compte persisté avec rôle, abonnement 1 an, carte et mot de passe")
    void creerEmprunteur_complet() {
        Utilisateur u = new Utilisateur();
        u.setNom("Dupont");
        u.setPrenom("Camille");
        u.setMail("camille.dupont@test.fr");
        u.setDateNaissance(LocalDate.of(1998, 4, 21));

        LocalDate debut = LocalDate.of(2026, 1, 1);
        Utilisateur cree = utilisateurService.creerEmprunteur(u, debut);

        assertThat(cree.getIdUtilisateur()).isNotNull();
        assertThat(cree.getRole().getLibelleRole()).isEqualTo("EMPRUNTEUR");
        assertThat(cree.getDateFinAbonnement()).isEqualTo(debut.plusYears(1));
        assertThat(cree.getNumeroCarte()).isBetween(1_000_000_000L, 9_999_999_999L);
        assertThat(cree.getNombrePret()).isZero();
        assertThat(cree.getPays()).isEqualTo("France");
        assertThat(cree.getMdp())
                .isEqualTo(MotDePasseUtil.motDePasseInitial(LocalDate.of(1998, 4, 21)));

        // Réellement enregistré en base
        assertThat(utilisateurRepository.findByMail("camille.dupont@test.fr")).isPresent();
    }

    @Test
    @DisplayName("creerEmprunteur : e-mail déjà utilisé => IllegalStateException")
    void creerEmprunteur_mailDejaUtilise() {
        utilisateurService.creerEmprunteur(emprunteur("camille.dupont@test.fr"), LocalDate.now());

        assertThatThrownBy(() ->
                utilisateurService.creerEmprunteur(emprunteur("camille.dupont@test.fr"), LocalDate.now()))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("existe déjà");
    }

    @Test
    @DisplayName("creerEmprunteur : rôle EMPRUNTEUR absent en base => IllegalStateException")
    void creerEmprunteur_roleAbsent() {
        roleRepository.deleteAll(); // on retire le rôle créé dans setUp

        assertThatThrownBy(() ->
                utilisateurService.creerEmprunteur(emprunteur("autre@test.fr"), LocalDate.now()))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("introuvable");
    }

    private static Utilisateur emprunteur(String mail) {
        Utilisateur u = new Utilisateur();
        u.setNom("Test");
        u.setMail(mail);
        u.setDateNaissance(LocalDate.of(2000, 1, 1));
        return u;
    }
}
