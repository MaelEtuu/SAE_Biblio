package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.RoleRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.util.MotDePasseUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UtilisateurService — tests unitaires (Moq)")
class UtilisateurServiceTest {

    @Mock private UtilisateurRepository utilisateurRepository;
    @Mock private RoleRepository        roleRepository;

    @InjectMocks
    private UtilisateurService utilisateurService;

    private Utilisateur nouvel;
    private Role roleEmprunteur;

    @BeforeEach
    void setUp() {
        roleEmprunteur = new Role(2, "EMPRUNTEUR");

        nouvel = new Utilisateur();
        nouvel.setNom("Dupont");
        nouvel.setPrenom("Camille");
        nouvel.setMail("camille.dupont@gmail.com");
        nouvel.setDateNaissance(LocalDate.of(1998, 4, 21));
    }

    // =====================================================================
    // creerEmprunteur — chemin nominal
    // =====================================================================

    @Nested
    @DisplayName("creerEmprunteur — succès")
    class Succes {

        @Test
        @DisplayName("renseigne rôle, abonnement 1 an, mot de passe, carte et valeurs par défaut")
        void creerEmprunteur_complet() {
            when(utilisateurRepository.existsByMail("camille.dupont@gmail.com")).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            when(utilisateurRepository.existsByNumeroCarte(anyLong())).thenReturn(false);
            when(utilisateurRepository.save(any(Utilisateur.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            LocalDate debut = LocalDate.of(2026, 1, 1);
            Utilisateur cree = utilisateurService.creerEmprunteur(nouvel, debut);

            assertThat(cree.getRole()).isEqualTo(roleEmprunteur);
            assertThat(cree.getDateFinAbonnement()).isEqualTo(debut.plusYears(1));
            assertThat(cree.getMdp())
                    .isEqualTo(MotDePasseUtil.motDePasseInitial(LocalDate.of(1998, 4, 21)));
            assertThat(cree.getNombrePret()).isZero();
            assertThat(cree.getPays()).isEqualTo("France");
            assertThat(cree.getNumeroCarte())
                    .isBetween(1_000_000_000L, 9_999_999_999L);
        }

        @Test
        @DisplayName("dateDebutAbo null => échéance calculée à partir d'aujourd'hui")
        void creerEmprunteur_debutNull() {
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            when(utilisateurRepository.existsByNumeroCarte(anyLong())).thenReturn(false);
            when(utilisateurRepository.save(any(Utilisateur.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Utilisateur cree = utilisateurService.creerEmprunteur(nouvel, null);

            assertThat(cree.getDateFinAbonnement()).isEqualTo(LocalDate.now().plusYears(1));
        }

        @Test
        @DisplayName("échéance saisie manuellement => conservée")
        void creerEmprunteur_echeanceManuelle() {
            nouvel.setDateFinAbonnement(LocalDate.of(2030, 1, 1));
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            when(utilisateurRepository.existsByNumeroCarte(anyLong())).thenReturn(false);
            when(utilisateurRepository.save(any(Utilisateur.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Utilisateur cree = utilisateurService.creerEmprunteur(nouvel, LocalDate.now());

            assertThat(cree.getDateFinAbonnement()).isEqualTo(LocalDate.of(2030, 1, 1));
        }

        @Test
        @DisplayName("pays renseigné => conservé (pas écrasé par 'France')")
        void creerEmprunteur_paysConserve() {
            nouvel.setPays("Suisse");
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            when(utilisateurRepository.existsByNumeroCarte(anyLong())).thenReturn(false);
            when(utilisateurRepository.save(any(Utilisateur.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Utilisateur cree = utilisateurService.creerEmprunteur(nouvel, LocalDate.now());

            assertThat(cree.getPays()).isEqualTo("Suisse");
        }

        @Test
        @DisplayName("numéro de carte : re-tirage tant que déjà utilisé en base")
        void creerEmprunteur_carteUnique_reroll() {
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            // 1er tirage déjà pris, 2e libre
            when(utilisateurRepository.existsByNumeroCarte(anyLong()))
                    .thenReturn(true, false);
            when(utilisateurRepository.save(any(Utilisateur.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            utilisateurService.creerEmprunteur(nouvel, LocalDate.now());

            verify(utilisateurRepository, times(2)).existsByNumeroCarte(anyLong());
        }

        @Test
        @DisplayName("pays vide (chaîne blanche) => remplacé par 'France'")
        void creerEmprunteur_paysVide() {
            nouvel.setPays("   ");
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.of(roleEmprunteur));
            when(utilisateurRepository.existsByNumeroCarte(anyLong())).thenReturn(false);
            when(utilisateurRepository.save(any(Utilisateur.class))).thenAnswer(inv -> inv.getArgument(0));

            Utilisateur cree = utilisateurService.creerEmprunteur(nouvel, LocalDate.now());

            assertThat(cree.getPays()).isEqualTo("France");
        }
    }

    // =====================================================================
    // creerEmprunteur — contrôles / erreurs
    // =====================================================================

    @Nested
    @DisplayName("creerEmprunteur — contrôles")
    class Controles {

        @Test
        @DisplayName("e-mail null => IllegalArgumentException")
        void mailNull() {
            nouvel.setMail(null);

            assertThatThrownBy(() -> utilisateurService.creerEmprunteur(nouvel, LocalDate.now()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("e-mail");

            verify(utilisateurRepository, never()).save(any());
        }

        @Test
        @DisplayName("e-mail vide => IllegalArgumentException")
        void mailBlank() {
            nouvel.setMail("   ");

            assertThatThrownBy(() -> utilisateurService.creerEmprunteur(nouvel, LocalDate.now()))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("date de naissance null => IllegalArgumentException")
        void dateNaissanceNull() {
            nouvel.setDateNaissance(null);

            assertThatThrownBy(() -> utilisateurService.creerEmprunteur(nouvel, LocalDate.now()))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("naissance");
        }

        @Test
        @DisplayName("e-mail déjà utilisé => IllegalStateException")
        void mailDejaExistant() {
            when(utilisateurRepository.existsByMail("camille.dupont@gmail.com")).thenReturn(true);

            assertThatThrownBy(() -> utilisateurService.creerEmprunteur(nouvel, LocalDate.now()))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("existe déjà");

            verify(utilisateurRepository, never()).save(any());
        }

        @Test
        @DisplayName("rôle EMPRUNTEUR absent en base => IllegalStateException")
        void roleIntrouvable() {
            when(utilisateurRepository.existsByMail(anyString())).thenReturn(false);
            when(roleRepository.findByLibelleRole("EMPRUNTEUR")).thenReturn(Optional.empty());

            assertThatThrownBy(() -> utilisateurService.creerEmprunteur(nouvel, LocalDate.now()))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("introuvable");

            verify(utilisateurRepository, never()).save(any());
        }
    }

    // =====================================================================
    // CRUD hérité d'AbstractCrudService
    // =====================================================================

    @Nested
    @DisplayName("CRUD générique hérité")
    class CrudGenerique {

        @Test
        @DisplayName("getAll délègue au repository")
        void getAll() {
            when(utilisateurRepository.findAll()).thenReturn(List.of(nouvel));

            assertThat(utilisateurService.getAll()).containsExactly(nouvel);
        }

        @Test
        @DisplayName("getById renvoie l'entité si présente")
        void getById_present() {
            when(utilisateurRepository.findById(1)).thenReturn(Optional.of(nouvel));

            assertThat(utilisateurService.getById(1)).isEqualTo(nouvel);
        }

        @Test
        @DisplayName("getById lève IllegalArgumentException si absent")
        void getById_absent() {
            when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> utilisateurService.getById(99))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("introuvable");
        }

        @Test
        @DisplayName("findById renvoie un Optional vide si absent")
        void findById_optionalVide() {
            when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

            assertThat(utilisateurService.findById(99)).isEmpty();
        }

        @Test
        @DisplayName("getByMail délègue au repository")
        void getByMail() {
            when(utilisateurRepository.findByMail("camille.dupont@gmail.com"))
                    .thenReturn(Optional.of(nouvel));

            assertThat(utilisateurService.getByMail("camille.dupont@gmail.com")).isEqualTo(nouvel);
        }

        @Test
        @DisplayName("count délègue au repository")
        void count() {
            when(utilisateurRepository.count()).thenReturn(8L);

            assertThat(utilisateurService.count()).isEqualTo(8L);
        }

        @Test
        @DisplayName("getByMail renvoie null quand aucun utilisateur ne correspond")
        void getByMail_absent() {
            when(utilisateurRepository.findByMail("inconnu@test.fr")).thenReturn(Optional.empty());

            assertThat(utilisateurService.getByMail("inconnu@test.fr")).isNull();
        }
    }
}