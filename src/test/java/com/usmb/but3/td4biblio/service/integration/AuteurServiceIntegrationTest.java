package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests d'intégration (NON mockés) de {@link AuteurService} sur H2.
 * CRUD réel + requêtes de recherche dérivées exécutées en SQL.
 */
@DataJpaTest
@Import(AuteurService.class)
@DisplayName("AuteurService — tests d'intégration (H2, sans mock)")
class AuteurServiceIntegrationTest {

    @Autowired private AuteurService auteurService;
    @Autowired private AuteurRepository auteurRepository;

    private Auteur hugo;
    private Auteur borges;

    @BeforeEach
    void setUp() {
        hugo   = auteurRepository.saveAndFlush(auteur("Hugo", "Victor"));
        borges = auteurRepository.saveAndFlush(auteur("Borges", "Jorge Luis"));
    }

    @Test
    @DisplayName("getAllAuteurs : retourne les auteurs triés par id croissant")
    void getAllAuteurs() {
        assertThat(auteurService.getAllAuteurs())
                .extracting(Auteur::getNom)
                .containsExactly("Hugo", "Borges");
    }

    @Test
    @DisplayName("getAuteurById : présent / absent")
    void getAuteurById() {
        assertThat(auteurService.getAuteurById(hugo.getIdAuteur())).isEqualTo(hugo);
        assertThat(auteurService.getAuteurById(9999)).isNull();
    }

    @Test
    @DisplayName("saveAuteur puis updateAuteur persistent les modifications")
    void saveEtUpdate() {
        Auteur zola = auteurService.saveAuteur(auteur("Zola", "Émile"));
        assertThat(zola.getIdAuteur()).isNotNull();

        zola.setNationalite("Française");
        Auteur maj = auteurService.updateAuteur(zola);

        assertThat(auteurService.getAuteurById(maj.getIdAuteur()).getNationalite())
                .isEqualTo("Française");
    }

    @Test
    @DisplayName("deleteAuteurById supprime réellement la ligne")
    void deleteAuteurById() {
        auteurService.deleteAuteurById(hugo.getIdAuteur());

        assertThat(auteurService.getAuteurById(hugo.getIdAuteur())).isNull();
        assertThat(auteurRepository.findById(hugo.getIdAuteur())).isEmpty();
    }

    @Test
    @DisplayName("getAuteursByNom filtre sur le nom exact")
    void getAuteursByNom() {
        assertThat(auteurService.getAuteursByNom("Hugo")).containsExactly(hugo);
        assertThat(auteurService.getAuteursByNom("Inconnu")).isEmpty();
    }

    @Test
    @DisplayName("getAuteursByNomAndPrenom filtre sur les deux critères")
    void getAuteursByNomAndPrenom() {
        assertThat(auteurService.getAuteursByNomAndPrenom("Hugo", "Victor"))
                .containsExactly(hugo);
    }

    @Test
    @DisplayName("getByNomContainingIgnoreCase ignore la casse")
    void getByNomContainingIgnoreCase() {
        assertThat(auteurService.getByNomContainingIgnoreCase("hug")).containsExactly(hugo);
    }

    @Test
    @DisplayName("getAuteursByNomStartWithIgnoreCase : préfixe insensible à la casse")
    void getAuteursByNomStartWithIgnoreCase() {
        assertThat(auteurService.getAuteursByNomStartWithIgnoreCase("bor"))
                .containsExactly(borges);
    }

    private static Auteur auteur(String nom, String prenom) {
        Auteur a = new Auteur();
        a.setNom(nom);
        a.setPrenom(prenom);
        a.setDateNaissance(LocalDate.of(1800, 1, 1));
        return a;
    }
}
