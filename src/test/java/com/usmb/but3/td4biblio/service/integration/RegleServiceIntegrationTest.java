package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.repository.RegleRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests d'intégration (NON mockés) de {@link RegleService} sur H2 :
 * lecture typée avec valeurs par défaut, mise à jour (création/modification).
 */
@DataJpaTest
@Import(RegleService.class)
@DisplayName("RegleService — tests d'intégration (H2, sans mock)")
class RegleServiceIntegrationTest {

    @Autowired private RegleService regleService;
    @Autowired private RegleRepository regleRepository;

    @Test
    @DisplayName("valeurs par défaut quand aucune règle n'est en base")
    void valeursParDefaut() {
        assertThat(regleService.getMaxPrets()).isEqualTo(RegleService.DEFAULT_MAX_PRETS);            // 10
        assertThat(regleService.getDureePretJours()).isEqualTo(RegleService.DEFAULT_DUREE_PRET_JOURS); // 35
        assertThat(regleService.getDelaiReservationJours())
                .isEqualTo(RegleService.DEFAULT_DELAI_RESERVATION_JOURS);                            // 14
    }

    @Test
    @DisplayName("lecture typée : valeurs lues en base, extraction du premier entier")
    void lectureTypee() {
        regleRepository.saveAndFlush(regle("5", RegleService.TYPE_MAX_PRETS));
        regleRepository.saveAndFlush(regle("21 jours", RegleService.TYPE_DUREE_PRET));
        regleRepository.saveAndFlush(regle("7 jours", RegleService.TYPE_DELAI_RESERVATION));

        assertThat(regleService.getMaxPrets()).isEqualTo(5);
        assertThat(regleService.getDureePretJours()).isEqualTo(21);
        assertThat(regleService.getDelaiReservationJours()).isEqualTo(7);
    }

    @Test
    @DisplayName("updateValeur : crée la règle si absente")
    void updateValeur_creation() {
        Regle cree = regleService.updateValeur(RegleService.TYPE_MAX_PRETS, "15", "Nb max prêts");

        assertThat(cree.getIdRegle()).isNotNull();
        assertThat(regleService.getMaxPrets()).isEqualTo(15);
    }

    @Test
    @DisplayName("updateValeur : met à jour la règle existante (même id)")
    void updateValeur_miseAJour() {
        Regle existante = regleRepository.saveAndFlush(regle("10", RegleService.TYPE_MAX_PRETS));

        Regle maj = regleService.updateValeur(RegleService.TYPE_MAX_PRETS, "20", "Nb max prêts");

        assertThat(maj.getIdRegle()).isEqualTo(existante.getIdRegle());
        assertThat(regleService.getMaxPrets()).isEqualTo(20);
        assertThat(regleService.getAllRegles()).hasSize(1); // pas de doublon
    }

    @Test
    @DisplayName("getRegleById et getRegleByType")
    void lectureParIdEtType() {
        Regle r = regleRepository.saveAndFlush(regle("10", RegleService.TYPE_MAX_PRETS));

        assertThat(regleService.getRegleById(r.getIdRegle())).isEqualTo(r);
        assertThat(regleService.getRegleById(9999)).isNull();
        assertThat(regleService.getRegleByType(RegleService.TYPE_MAX_PRETS)).isEqualTo(r);
        assertThat(regleService.getRegleByType("INCONNU")).isNull();
    }

    private static Regle regle(String valeur, String type) {
        Regle r = new Regle();
        r.setValeurRegle(valeur);
        r.setTypeRegle(type);
        r.setIntituleRegle("Intitulé test");
        return r;
    }
}
