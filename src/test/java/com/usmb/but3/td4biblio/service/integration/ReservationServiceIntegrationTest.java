package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
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
 * Tests d'intégration (NON mockés) de {@link ReservationService} sur une vraie
 * base H2 en mémoire. {@link DataJpaTest} démarre la couche JPA + les repositories ;
 * {@link Import} ajoute les services réels à tester. Aucun mock : on persiste de
 * véritables entités et on vérifie le comportement bout en bout (service → repository → SQL).
 *
 * <p>Aucune règle n'est insérée en base : {@link RegleService} retombe sur ses
 * valeurs par défaut (délai de réservation = 14 jours).</p>
 */
@DataJpaTest
@Import({ReservationService.class, DocumentService.class, RegleService.class})
@DisplayName("ReservationService — tests d'intégration (H2, sans mock)")
class ReservationServiceIntegrationTest {

    @Autowired private ReservationService reservationService;
    @Autowired private ReservationRepository reservationRepository;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;

    private Utilisateur camille;
    private Utilisateur thomas;
    private Document    document;

    @BeforeEach
    void setUp() {
        camille = utilisateurRepository.saveAndFlush(utilisateur("Dupont", "camille@test.fr"));
        thomas  = utilisateurRepository.saveAndFlush(utilisateur("Durand", "thomas@test.fr"));
        document = documentRepository.saveAndFlush(documentEmpruntable("Les Misérables"));
    }

    @Test
    @DisplayName("reserver : crée une réservation de 14 jours et rend le document indisponible")
    void reserver_succes() {
        Reservation r = reservationService.reserver(document.getIdDocument(), camille);

        assertThat(r.getDateDebut()).isEqualTo(LocalDate.now());
        assertThat(r.getDateFin()).isEqualTo(LocalDate.now().plusDays(14));
        assertThat(reservationService.getReservationsActives(camille)).hasSize(1);
        // Réservé => plus disponible
        assertThat(documentRepository.findDisponibles(LocalDate.now()))
                .extracting(Document::getIdDocument)
                .doesNotContain(document.getIdDocument());
    }

    @Test
    @DisplayName("reserver : un document déjà réservé n'est plus disponible (2e réservation refusée)")
    void reserver_documentNonDisponible() {
        reservationService.reserver(document.getIdDocument(), camille);

        assertThatThrownBy(() -> reservationService.reserver(document.getIdDocument(), thomas))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("disponible");
    }

    @Test
    @DisplayName("estReserveParAutre : vrai pour un autre utilisateur, faux pour le réservataire")
    void estReserveParAutre() {
        reservationService.reserver(document.getIdDocument(), camille);

        assertThat(reservationService.estReserveParAutre(document.getIdDocument(), thomas)).isTrue();
        assertThat(reservationService.estReserveParAutre(document.getIdDocument(), camille)).isFalse();
    }

    @Test
    @DisplayName("annuler : supprime la réservation de l'utilisateur")
    void annuler() {
        reservationService.reserver(document.getIdDocument(), camille);
        assertThat(reservationService.getReservationsActives(camille)).hasSize(1);

        reservationService.annuler(document.getIdDocument(), camille);

        assertThat(reservationService.getReservationsActives(camille)).isEmpty();
    }

    @Test
    @DisplayName("annulerReservationsEchues : supprime les échues, garde les actives")
    void annulerReservationsEchues() {
        // réservation active (via le service)
        reservationService.reserver(document.getIdDocument(), camille);

        // réservation échue insérée directement (date de fin dépassée)
        Document autre = documentRepository.saveAndFlush(documentEmpruntable("1984"));
        reservationRepository.saveAndFlush(new Reservation(
                autre, thomas, LocalDate.now().minusDays(30), LocalDate.now().minusDays(1)));

        int nbAnnulees = reservationService.annulerReservationsEchues();

        assertThat(nbAnnulees).isEqualTo(1);
        assertThat(reservationService.getReservationsActives(camille)).hasSize(1);
        assertThat(reservationRepository.findByDateFinBefore(LocalDate.now())).isEmpty();
    }

    // ── Fabriques d'entités de test ─────────────────────────────────────────
    private static Utilisateur utilisateur(String nom, String mail) {
        Utilisateur u = new Utilisateur();
        u.setNom(nom);
        u.setMail(mail);
        u.setDateFinAbonnement(LocalDate.now().plusMonths(6));
        return u;
    }

    private static Document documentEmpruntable(String titre) {
        Document d = new Document();
        d.setTitre(titre);
        d.setEstEmpruntable(true);
        return d;
    }
}
