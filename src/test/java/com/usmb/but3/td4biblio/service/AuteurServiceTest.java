package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuteurService — tests unitaires")
class AuteurServiceTest {

    @Mock
    private AuteurRepository auteurRepository;

    @InjectMocks
    private AuteurService auteurService;

    private Auteur hugo;
    private Auteur borges;

    @BeforeEach
    void setUp() {
        hugo = new Auteur(1, null, "Hugo", "Victor", "Française",
                LocalDate.of(1802, 2, 26), LocalDate.of(1885, 5, 22),
                "France", "Besançon", null);
        borges = new Auteur(2, null, "Borges", "Jorge Luis", "Argentine",
                LocalDate.of(1899, 11, 7), LocalDate.of(1986, 1, 4),
                "Argentine", "Buenos Aires", null);
    }

    @Nested
    @DisplayName("Lecture")
    class Lecture {

        @Test
        @DisplayName("getAllAuteurs trie par idAuteur ascendant")
        void getAllAuteurs_trieParId() {
            when(auteurRepository.findAll(any(Sort.class))).thenReturn(List.of(hugo, borges));

            List<Auteur> result = auteurService.getAllAuteurs();

            assertThat(result).containsExactly(hugo, borges);
            verify(auteurRepository).findAll(Sort.by(Sort.Direction.ASC, "idAuteur"));
        }

        @Test
        @DisplayName("getAuteurById renvoie l'auteur quand il existe")
        void getAuteurById_existe() {
            when(auteurRepository.findById(1)).thenReturn(Optional.of(hugo));

            Auteur result = auteurService.getAuteurById(1);

            assertThat(result).isEqualTo(hugo);
        }

        @Test
        @DisplayName("getAuteurById renvoie null quand l'auteur n'existe pas")
        void getAuteurById_inexistant() {
            when(auteurRepository.findById(99)).thenReturn(Optional.empty());

            assertThat(auteurService.getAuteurById(99)).isNull();
        }
    }

    @Nested
    @DisplayName("Écriture")
    class Ecriture {

        @Test
        @DisplayName("saveAuteur délègue au repository")
        void saveAuteur_delegue() {
            when(auteurRepository.save(hugo)).thenReturn(hugo);

            assertThat(auteurService.saveAuteur(hugo)).isEqualTo(hugo);
            verify(auteurRepository).save(hugo);
        }

        @Test
        @DisplayName("updateAuteur délègue au repository")
        void updateAuteur_delegue() {
            when(auteurRepository.save(hugo)).thenReturn(hugo);

            assertThat(auteurService.updateAuteur(hugo)).isEqualTo(hugo);
            verify(auteurRepository).save(hugo);
        }

        @Test
        @DisplayName("deleteAuteurById délègue au repository")
        void deleteAuteurById_delegue() {
            auteurService.deleteAuteurById(1);

            verify(auteurRepository).deleteById(1);
        }
    }

    @Nested
    @DisplayName("Recherches")
    class Recherches {

        @Test
        @DisplayName("getAuteursByNom retourne les auteurs correspondants")
        void getAuteursByNom() {
            when(auteurRepository.findByNom("Hugo")).thenReturn(List.of(hugo));

            assertThat(auteurService.getAuteursByNom("Hugo")).containsExactly(hugo);
        }

        @Test
        @DisplayName("getAuteursByNomAndPrenom filtre sur les deux critères")
        void getAuteursByNomAndPrenom() {
            when(auteurRepository.findByNomAndPrenom("Hugo", "Victor")).thenReturn(List.of(hugo));

            assertThat(auteurService.getAuteursByNomAndPrenom("Hugo", "Victor"))
                    .containsExactly(hugo);
        }

        @Test
        @DisplayName("getByNomContainingIgnoreCase ignore la casse")
        void getByNomContainingIgnoreCase() {
            when(auteurRepository.findByNomContainingIgnoreCase("hug")).thenReturn(List.of(hugo));

            assertThat(auteurService.getByNomContainingIgnoreCase("hug")).containsExactly(hugo);
        }

        @Test
        @DisplayName("getAuteursByNomStartWithIgnoreCase délègue au repository")
        void getAuteursByNomStartWithIgnoreCase() {
            when(auteurRepository.findByNomStartsWithIgnoreCase("hu")).thenReturn(List.of(hugo));

            assertThat(auteurService.getAuteursByNomStartWithIgnoreCase("hu"))
                    .containsExactly(hugo);
        }

        @Test
        @DisplayName("getAuteursByNomLikeAndPrenomLike délègue au repository avec les critères fournis")
        void getAuteursByNomLikeAndPrenomLike() {
            when(auteurRepository.findByNomLikeAndPrenomLike("Hug%", "Vict%"))
                    .thenReturn(List.of(hugo));

            List<Auteur> result = auteurService.getAuteursByNomLikeAndPrenomLike("Hug%", "Vict%");

            assertThat(result).containsExactly(hugo);
            verify(auteurRepository).findByNomLikeAndPrenomLike("Hug%", "Vict%");
        }

        @Test
        @DisplayName("recherche sans résultat retourne une liste vide")
        void recherche_sansResultat() {
            when(auteurRepository.findByNom("Inexistant")).thenReturn(Collections.emptyList());

            assertThat(auteurService.getAuteursByNom("Inexistant")).isEmpty();
        }
    }
}
