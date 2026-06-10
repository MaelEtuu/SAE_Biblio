package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ReservationService — tests unitaires")
class ReservationServiceTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private DocumentService documentService;
    @Mock private RegleService regleService;

    @InjectMocks
    private ReservationService reservationService;

    private Utilisateur utilisateur;
    private Utilisateur autreUtilisateur;
    private Document document;

    @BeforeEach
    void setUp() {
        utilisateur = new Utilisateur();
        utilisateur.setIdUtilisateur(1);
        utilisateur.setNom("Dupont");

        autreUtilisateur = new Utilisateur();
        autreUtilisateur.setIdUtilisateur(2);
        autreUtilisateur.setNom("Martin");

        document = new Document();
        document.setIdDocument(10);
        document.setTitre("Les Misérables");
        document.setEstEmpruntable(true);
    }

    // ------------------------------------------------------------------
    // Lecture côté emprunteur
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Lecture — emprunteur")
    class LectureEmprunteur {

        @Test
        @DisplayName("getReservationsActives utilise la date du jour")
        void getReservationsActives() {
            Reservation r = new Reservation(document, utilisateur,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(reservationRepository.findByUtilisateurAndDateFinGreaterThanEqual(
                    eq(utilisateur), any(LocalDate.class))).thenReturn(List.of(r));

            assertThat(reservationService.getReservationsActives(utilisateur))
                    .containsExactly(r);
            verify(reservationRepository).findByUtilisateurAndDateFinGreaterThanEqual(
                    utilisateur, LocalDate.now());
        }

        @Test
        @DisplayName("getAllReservations renvoie historique complet")
        void getAllReservations() {
            when(reservationRepository.findByUtilisateur(utilisateur)).thenReturn(List.of());

            assertThat(reservationService.getAllReservations(utilisateur)).isEmpty();
        }
    }

    // ------------------------------------------------------------------
    // Lecture côté bibliothécaire
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Lecture — bibliothécaire")
    class LectureBibliothecaire {

        @Test
        @DisplayName("getReservationsActivesReseau retourne toutes les réservations actives")
        void getReservationsActivesReseau() {
            Reservation r = new Reservation(document, utilisateur,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(reservationRepository.findByDateFinGreaterThanEqual(any(LocalDate.class)))
                    .thenReturn(List.of(r));

            assertThat(reservationService.getReservationsActivesReseau()).containsExactly(r);
        }

        @Test
        @DisplayName("getReservationsActivesDuDocument délègue avec id document")
        void getReservationsActivesDuDocument() {
            when(reservationRepository
                    .findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(10), any(LocalDate.class)))
                    .thenReturn(List.of());

            assertThat(reservationService.getReservationsActivesDuDocument(10)).isEmpty();
        }

        @Test
        @DisplayName("estReserveParAutre vrai si réservation d'un autre utilisateur")
        void estReserveParAutre_vrai() {
            Reservation r = new Reservation(document, autreUtilisateur,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(reservationRepository
                    .findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(10), any(LocalDate.class)))
                    .thenReturn(List.of(r));

            assertThat(reservationService.estReserveParAutre(10, utilisateur)).isTrue();
        }

        @Test
        @DisplayName("estReserveParAutre faux si réservation par le même utilisateur")
        void estReserveParAutre_fauxQuandMemeUtilisateur() {
            Reservation r = new Reservation(document, utilisateur,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(reservationRepository
                    .findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(10), any(LocalDate.class)))
                    .thenReturn(List.of(r));

            assertThat(reservationService.estReserveParAutre(10, utilisateur)).isFalse();
        }

        @Test
        @DisplayName("estReserveParAutre faux si aucune réservation active")
        void estReserveParAutre_fauxSiAucune() {
            when(reservationRepository
                    .findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(10), any(LocalDate.class)))
                    .thenReturn(List.of());

            assertThat(reservationService.estReserveParAutre(10, utilisateur)).isFalse();
        }
    }

    // ------------------------------------------------------------------
    // Réservation
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("reserver — règles métier")
    class Reserver {

        @Test
        @DisplayName("succès : réservation créée avec dateFin = today + delai")
        void reserver_succes() {
            when(documentService.isDisponible(10)).thenReturn(true);
            when(reservationRepository.existsByDocument_IdDocumentAndUtilisateur(10, utilisateur))
                    .thenReturn(false);
            when(documentService.getDocumentById(10)).thenReturn(document);
            when(regleService.getDelaiReservationJours()).thenReturn(14);
            when(reservationRepository.save(any(Reservation.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            Reservation result = reservationService.reserver(10, utilisateur);

            assertThat(result.getDocument()).isEqualTo(document);
            assertThat(result.getUtilisateur()).isEqualTo(utilisateur);
            assertThat(result.getDateDebut()).isEqualTo(LocalDate.now());
            assertThat(result.getDateFin()).isEqualTo(LocalDate.now().plusDays(14));

            ArgumentCaptor<Reservation> captor = ArgumentCaptor.forClass(Reservation.class);
            verify(reservationRepository).save(captor.capture());
            assertThat(captor.getValue().getDocument()).isEqualTo(document);
        }

        @Test
        @DisplayName("échec : document non disponible")
        void reserver_nonDisponible() {
            when(documentService.isDisponible(10)).thenReturn(false);

            assertThatThrownBy(() -> reservationService.reserver(10, utilisateur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("disponible");

            verify(reservationRepository, never()).save(any());
        }

        @Test
        @DisplayName("échec : déjà réservé par cet utilisateur")
        void reserver_dejaReserveParUtilisateur() {
            when(documentService.isDisponible(10)).thenReturn(true);
            when(reservationRepository.existsByDocument_IdDocumentAndUtilisateur(10, utilisateur))
                    .thenReturn(true);

            assertThatThrownBy(() -> reservationService.reserver(10, utilisateur))
                    .isInstanceOf(IllegalStateException.class)
                    .hasMessageContaining("déjà réservé");

            verify(reservationRepository, never()).save(any());
        }
    }

    // ------------------------------------------------------------------
    // Annulation
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("Annulation")
    class Annulation {

        @Test
        @DisplayName("annuler supprime la réservation par son id composite")
        void annuler() {
            reservationService.annuler(10, utilisateur);

            ArgumentCaptor<Reservation.ReservationId> captor =
                    ArgumentCaptor.forClass(Reservation.ReservationId.class);
            verify(reservationRepository).deleteById(captor.capture());
            Reservation.ReservationId id = captor.getValue();
            assertThat(id.getDocument()).isEqualTo(10);
            assertThat(id.getUtilisateur()).isEqualTo(1);
        }

        @Test
        @DisplayName("annulerReservationsEchues supprime et compte les échues")
        void annulerReservationsEchues() {
            Reservation echue1 = new Reservation(document, utilisateur,
                    LocalDate.now().minusDays(30), LocalDate.now().minusDays(1));
            Reservation echue2 = new Reservation(document, autreUtilisateur,
                    LocalDate.now().minusDays(20), LocalDate.now().minusDays(2));

            when(reservationRepository.findByDateFinBefore(any(LocalDate.class)))
                    .thenReturn(List.of(echue1, echue2));

            int nb = reservationService.annulerReservationsEchues();

            assertThat(nb).isEqualTo(2);
            verify(reservationRepository).deleteAll(List.of(echue1, echue2));
        }

        @Test
        @DisplayName("annulerReservationsEchues retourne 0 si aucune échue")
        void annulerReservationsEchues_aucune() {
            when(reservationRepository.findByDateFinBefore(any(LocalDate.class)))
                    .thenReturn(List.of());

            assertThat(reservationService.annulerReservationsEchues()).isZero();
        }
    }
}
