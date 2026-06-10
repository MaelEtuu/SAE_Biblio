package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.repository.RegleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("RegleService — tests unitaires")
class RegleServiceTest {

    @Mock
    private RegleRepository regleRepository;

    @InjectMocks
    private RegleService regleService;

    private Regle regleMaxPrets;
    private Regle regleDureePret;
    private Regle regleDelaiResa;

    @BeforeEach
    void setUp() {
        regleMaxPrets = new Regle(1, "5", RegleService.TYPE_MAX_PRETS, "Nb max prêts");
        regleDureePret = new Regle(2, "21 jours", RegleService.TYPE_DUREE_PRET, "Durée prêt");
        regleDelaiResa = new Regle(3, "7 jours", RegleService.TYPE_DELAI_RESERVATION, "Délai résa");
    }

    @Nested
    @DisplayName("Lecture des valeurs typées")
    class LectureValeursTypes {

        @Test
        @DisplayName("getMaxPrets retourne la valeur configurée")
        void getMaxPrets_avecRegle() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_MAX_PRETS))
                    .thenReturn(List.of(regleMaxPrets));

            assertThat(regleService.getMaxPrets()).isEqualTo(5);
        }

        @Test
        @DisplayName("getMaxPrets retourne la valeur par défaut sans règle")
        void getMaxPrets_sansRegle() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_MAX_PRETS))
                    .thenReturn(Collections.emptyList());

            assertThat(regleService.getMaxPrets()).isEqualTo(RegleService.DEFAULT_MAX_PRETS);
        }

        @Test
        @DisplayName("getDureePretJours extrait le premier entier (ex: '21 jours' -> 21)")
        void getDureePretJours_avecTexte() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_DUREE_PRET))
                    .thenReturn(List.of(regleDureePret));

            assertThat(regleService.getDureePretJours()).isEqualTo(21);
        }

        @Test
        @DisplayName("getDureePretJours retourne le défaut quand la valeur n'est pas numérique")
        void getDureePretJours_valeurInvalide() {
            Regle invalide = new Regle(2, "indéfini", RegleService.TYPE_DUREE_PRET, "Durée prêt");
            when(regleRepository.findByTypeRegle(RegleService.TYPE_DUREE_PRET))
                    .thenReturn(List.of(invalide));

            assertThat(regleService.getDureePretJours())
                    .isEqualTo(RegleService.DEFAULT_DUREE_PRET_JOURS);
        }

        @Test
        @DisplayName("getDureePretJours retourne le défaut quand la valeur est null")
        void getDureePretJours_valeurNull() {
            Regle nulle = new Regle(2, null, RegleService.TYPE_DUREE_PRET, "Durée prêt");
            when(regleRepository.findByTypeRegle(RegleService.TYPE_DUREE_PRET))
                    .thenReturn(List.of(nulle));

            assertThat(regleService.getDureePretJours())
                    .isEqualTo(RegleService.DEFAULT_DUREE_PRET_JOURS);
        }

        @Test
        @DisplayName("getDelaiReservationJours fonctionne avec '7 jours'")
        void getDelaiReservationJours() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_DELAI_RESERVATION))
                    .thenReturn(List.of(regleDelaiResa));

            assertThat(regleService.getDelaiReservationJours()).isEqualTo(7);
        }

        @Test
        @DisplayName("getDelaiReservationJours retourne 14 par défaut")
        void getDelaiReservationJours_defaut() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_DELAI_RESERVATION))
                    .thenReturn(Collections.emptyList());

            assertThat(regleService.getDelaiReservationJours())
                    .isEqualTo(RegleService.DEFAULT_DELAI_RESERVATION_JOURS);
        }
    }

    @Nested
    @DisplayName("CRUD")
    class Crud {

        @Test
        @DisplayName("getAllRegles délègue au repository")
        void getAllRegles() {
            when(regleRepository.findAll()).thenReturn(List.of(regleMaxPrets, regleDureePret));

            assertThat(regleService.getAllRegles()).hasSize(2);
        }

        @Test
        @DisplayName("getRegleById renvoie la règle si elle existe")
        void getRegleById_existe() {
            when(regleRepository.findById(1)).thenReturn(Optional.of(regleMaxPrets));

            assertThat(regleService.getRegleById(1)).isEqualTo(regleMaxPrets);
        }

        @Test
        @DisplayName("getRegleById renvoie null si la règle n'existe pas")
        void getRegleById_inexistante() {
            when(regleRepository.findById(99)).thenReturn(Optional.empty());

            assertThat(regleService.getRegleById(99)).isNull();
        }

        @Test
        @DisplayName("saveRegle délègue au repository")
        void saveRegle() {
            when(regleRepository.save(regleMaxPrets)).thenReturn(regleMaxPrets);

            assertThat(regleService.saveRegle(regleMaxPrets)).isEqualTo(regleMaxPrets);
        }

        @Test
        @DisplayName("deleteRegleById délègue au repository")
        void deleteRegleById() {
            regleService.deleteRegleById(1);

            verify(regleRepository).deleteById(1);
        }

        @Test
        @DisplayName("getRegleByType retourne la première règle correspondante")
        void getRegleByType() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_MAX_PRETS))
                    .thenReturn(List.of(regleMaxPrets));

            assertThat(regleService.getRegleByType(RegleService.TYPE_MAX_PRETS))
                    .isEqualTo(regleMaxPrets);
        }

        @Test
        @DisplayName("getRegleByType retourne null si aucune règle n'existe")
        void getRegleByType_inexistante() {
            when(regleRepository.findByTypeRegle("AUTRE")).thenReturn(Collections.emptyList());

            assertThat(regleService.getRegleByType("AUTRE")).isNull();
        }
    }

    @Nested
    @DisplayName("Mise à jour")
    class MiseAJour {

        @Test
        @DisplayName("updateValeur sur une règle existante modifie la valeur")
        void updateValeur_regleExistante() {
            when(regleRepository.findByTypeRegle(RegleService.TYPE_MAX_PRETS))
                    .thenReturn(List.of(regleMaxPrets));
            when(regleRepository.save(any(Regle.class))).thenAnswer(inv -> inv.getArgument(0));

            Regle result = regleService.updateValeur(
                    RegleService.TYPE_MAX_PRETS, "15", "Nb max prêts");

            assertThat(result.getValeurRegle()).isEqualTo("15");
            assertThat(result.getIdRegle()).isEqualTo(1); // règle existante conservée
        }

        @Test
        @DisplayName("updateValeur sur une règle absente la crée")
        void updateValeur_creationNouvelleRegle() {
            when(regleRepository.findByTypeRegle("NOUVEAU")).thenReturn(Collections.emptyList());
            when(regleRepository.save(any(Regle.class))).thenAnswer(inv -> inv.getArgument(0));

            Regle result = regleService.updateValeur("NOUVEAU", "42", "Intitulé test");

            ArgumentCaptor<Regle> captor = ArgumentCaptor.forClass(Regle.class);
            verify(regleRepository).save(captor.capture());
            Regle saved = captor.getValue();
            assertThat(saved.getTypeRegle()).isEqualTo("NOUVEAU");
            assertThat(saved.getValeurRegle()).isEqualTo("42");
            assertThat(saved.getIntituleRegle()).isEqualTo("Intitulé test");
            assertThat(result).isEqualTo(saved);
        }
    }
}
