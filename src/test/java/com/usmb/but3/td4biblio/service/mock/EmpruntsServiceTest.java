package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.RegleService;
import com.usmb.but3.td4biblio.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("EmpruntsService — tests unitaires (règles métier)")
class EmpruntsServiceTest {

    @Mock private EmpruntsRepository    empruntsRepository;
    @Mock private ReservationRepository reservationRepository;
    @Mock private DocumentService       documentService;
    @Mock private ReservationService    reservationService;
    @Mock private RegleService          regleService;

    @InjectMocks
    private EmpruntsService empruntsService;

    private Utilisateur emprunteur;
    private Document document;

    @BeforeEach
    void setUp() {
        emprunteur = new Utilisateur();
        emprunteur.setIdUtilisateur(1);
        emprunteur.setNom("Dupont");
        emprunteur.setPrenom("Camille");
        emprunteur.setDateFinAbonnement(LocalDate.now().plusMonths(6));

        document = new Document();
        document.setIdDocument(10);
        document.setTitre("Les Misérables");
        document.setEstEmpruntable(true);
    }

    // ------------------------------------------------------------------
    // Lecture
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Lecture")
    class Lecture {

        @Test
        @DisplayName("getEmpruntsEnCours délègue au repository")
        void getEmpruntsEnCours() {
            Emprunts e = new Emprunts(document, emprunteur, LocalDate.now(),
                    LocalDate.now().plusDays(35), false, null, null);
            when(empruntsRepository.findByUtilisateurAndDateRetourIsNull(emprunteur))
                    .thenReturn(List.of(e));

            assertThat(empruntsService.getEmpruntsEnCours(emprunteur)).containsExactly(e);
        }

        @Test
        @DisplayName("getNombreEmpruntsEnCours délègue au repository")
        void getNombreEmpruntsEnCours() {
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur))
                    .thenReturn(3L);

            assertThat(empruntsService.getNombreEmpruntsEnCours(emprunteur)).isEqualTo(3L);
        }

        @Test
        @DisplayName("getAllEmprunts récupère l'historique complet")
        void getAllEmprunts() {
            when(empruntsRepository.findByUtilisateur(emprunteur)).thenReturn(List.of());

            assertThat(empruntsService.getAllEmprunts(emprunteur)).isEmpty();
        }
    }

    // ------------------------------------------------------------------
    // Création de prêt — toutes les règles métier
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("creerPret — règles métier")
    class CreerPret {

        @Test
        @DisplayName("succès : prêt créé avec dates correctes")
        void creerPret_succes() {
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);
            when(documentService.getDocumentById(10)).thenReturn(document);
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(10))
                    .thenReturn(false);
            when(reservationRepository.existsByDocument_IdDocumentAndUtilisateur(10, emprunteur))
                    .thenReturn(false);
            when(reservationService.estReserveParAutre(10, emprunteur)).thenReturn(false);
            when(regleService.getDureePretJours()).thenReturn(35);
            when(empruntsRepository.save(any(Emprunts.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Emprunts result = empruntsService.creerPret(10, emprunteur);

            assertThat(result.getDocument()).isEqualTo(document);
            assertThat(result.getUtilisateur()).isEqualTo(emprunteur);
            assertThat(result.getDateDebut()).isEqualTo(LocalDate.now());
            assertThat(result.getDateFin()).isEqualTo(LocalDate.now().plusDays(35));
            assertThat(result.getEstProlonge()).isFalse();
            assertThat(result.getDateRetour()).isNull();

            ArgumentCaptor<Emprunts> captor = ArgumentCaptor.forClass(Emprunts.class);
            verify(empruntsRepository).save(captor.capture());
            assertThat(captor.getValue().getDocument()).isEqualTo(document);
        }

        @Test
        @DisplayName("échec : quota atteint")
        void creerPret_quotaAtteint() {
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur))
                    .thenReturn(10L);
            when(regleService.getMaxPrets()).thenReturn(10);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("Quota");

            verify(empruntsRepository, never()).save(any());
        }

        @Test
        @DisplayName("échec : abonnement échu")
        void creerPret_abonnementEchu() {
            emprunteur.setDateFinAbonnement(LocalDate.now().minusDays(1));
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("abonnement");

            verify(empruntsRepository, never()).save(any());
        }

        @Test
        @DisplayName("échec : abonnement null")
        void creerPret_abonnementNull() {
            emprunteur.setDateFinAbonnement(null);
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("abonnement");
        }

        @Test
        @DisplayName("échec : document non empruntable")
        void creerPret_documentNonEmpruntable() {
            document.setEstEmpruntable(false);
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);
            when(documentService.getDocumentById(10)).thenReturn(document);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("pas empruntable");
        }

        @Test
        @DisplayName("échec : document déjà emprunté")
        void creerPret_dejaEmprunte() {
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);
            when(documentService.getDocumentById(10)).thenReturn(document);
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(10))
                    .thenReturn(true);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("déjà emprunté");
        }

        @Test
        @DisplayName("échec : document réservé par un autre emprunteur")
        void creerPret_reserveParAutre() {
            when(empruntsRepository.countByUtilisateurAndDateRetourIsNull(emprunteur)).thenReturn(0L);
            when(regleService.getMaxPrets()).thenReturn(10);
            when(documentService.getDocumentById(10)).thenReturn(document);
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(10))
                    .thenReturn(false);
            when(reservationRepository.existsByDocument_IdDocumentAndUtilisateur(10, emprunteur))
                    .thenReturn(false);
            when(reservationService.estReserveParAutre(10, emprunteur)).thenReturn(true);

            assertThatThrownBy(() -> empruntsService.creerPret(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("réservé");
        }
    }

    // ------------------------------------------------------------------
    // Prolongation
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Prolongation")
    class Prolongation {

        @Test
        @DisplayName("prolonger : OK quand l'emprunt n'a jamais été prolongé")
        void prolonger_premierePolongation() {
            LocalDate finInitiale = LocalDate.now().plusDays(35);
            Emprunts e = new Emprunts(document, emprunteur, LocalDate.now(),
                    finInitiale, false, null, null);
            Emprunts.EmpruntsId id = new Emprunts.EmpruntsId(10, 1);

            when(empruntsRepository.findById(id)).thenReturn(Optional.of(e));
            when(regleService.getDureePretJours()).thenReturn(35);
            when(empruntsRepository.save(any(Emprunts.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Emprunts result = empruntsService.prolonger(10, emprunteur);

            assertThat(result.getEstProlonge()).isTrue();
            assertThat(result.getDateFin()).isEqualTo(finInitiale.plusDays(35));
        }

        @Test
        @DisplayName("prolonger : KO quand l'emprunt a déjà été prolongé")
        void prolonger_dejaProlonge() {
            Emprunts e = new Emprunts(document, emprunteur, LocalDate.now(),
                    LocalDate.now().plusDays(35), true, null, null);
            Emprunts.EmpruntsId id = new Emprunts.EmpruntsId(10, 1);

            when(empruntsRepository.findById(id)).thenReturn(Optional.of(e));

            assertThatThrownBy(() -> empruntsService.prolonger(10, emprunteur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("déjà été prolongé");

            verify(empruntsRepository, never()).save(any());
        }

        @Test
        @DisplayName("prolongerSansLimite : marche même si déjà prolongé")
        void prolongerSansLimite_okMemeDejaProlonge() {
            LocalDate finInitiale = LocalDate.now().plusDays(35);
            Emprunts e = new Emprunts(document, emprunteur, LocalDate.now(),
                    finInitiale, true, null, null);
            Emprunts.EmpruntsId id = new Emprunts.EmpruntsId(10, 1);

            when(empruntsRepository.findById(id)).thenReturn(Optional.of(e));
            when(regleService.getDureePretJours()).thenReturn(35);
            when(empruntsRepository.save(any(Emprunts.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Emprunts result = empruntsService.prolongerSansLimite(10, emprunteur);

            assertThat(result.getEstProlonge()).isTrue();
            assertThat(result.getDateFin()).isEqualTo(finInitiale.plusDays(35));
        }

        @Test
        @DisplayName("prolonger : emprunt introuvable lève IllegalArgumentException")
        void prolonger_empruntIntrouvable() {
            Emprunts.EmpruntsId id = new Emprunts.EmpruntsId(10, 1);
            when(empruntsRepository.findById(id)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> empruntsService.prolonger(10, emprunteur))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Emprunt introuvable");
        }
    }

    // ------------------------------------------------------------------
    // Retour
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Retour")
    class Retour {

        @Test
        @DisplayName("retourner enregistre la date de retour")
        void retourner_ok() {
            Emprunts e = new Emprunts(document, emprunteur, LocalDate.now().minusDays(5),
                    LocalDate.now().plusDays(30), false, null, null);
            Emprunts.EmpruntsId id = new Emprunts.EmpruntsId(10, 1);

            when(empruntsRepository.findById(id)).thenReturn(Optional.of(e));
            when(empruntsRepository.save(any(Emprunts.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Emprunts result = empruntsService.retourner(10, emprunteur);

            assertThat(result.getDateRetour()).isEqualTo(LocalDate.now());
        }
    }
}
