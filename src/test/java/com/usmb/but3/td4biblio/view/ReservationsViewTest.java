package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.List;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link ReservationsView} : états non connecté / vide / liste,
 * et annulation d'une réservation.
 */
@DisplayName("ReservationsView - tests Karibu")
class ReservationsViewTest extends AbstractViewTest {

    @MockitoBean private ReservationService reservationService;

    private ReservationsView vue() {
        return _get(ReservationsView.class);
    }

    private static Reservation reservation(String titre) {
        Document d = new Document();
        d.setIdDocument(7);
        d.setTitre(titre);
        Reservation r = new Reservation();
        r.setDocument(d);
        r.setDateDebut(LocalDate.now());
        r.setDateFin(LocalDate.now().plusWeeks(2));
        return r;
    }

    @Test
    @DisplayName("non connecté : invite à se connecter")
    void nonConnecte() {
        UI.getCurrent().navigate("reservations");
        _get(vue(), Paragraph.class, spec -> spec.withText("Connectez-vous pour voir vos réservations."));
    }

    @Test
    @DisplayName("connecté sans réservation : état vide")
    void aucuneReservation() {
        connecter(new Utilisateur());
        when(reservationService.getReservationsActives(any())).thenReturn(List.of());

        UI.getCurrent().navigate("reservations");
        _assertOne(ReservationsView.class);
        _get(vue(), Span.class, spec -> spec.withText("Aucune réservation"));
    }

    @Test
    @DisplayName("connecté avec une réservation : ligne affichée + annulation déléguée au service")
    void annulation() {
        Utilisateur u = new Utilisateur();
        connecter(u);
        when(reservationService.getReservationsActives(any()))
                .thenReturn(List.of(reservation("Germinal")));

        UI.getCurrent().navigate("reservations");
        _get(vue(), Span.class, spec -> spec.withText("Germinal"));

        _click(_get(vue(), Button.class, spec -> spec.withText("Annuler")));
        verify(reservationService).annuler(eq(7), eq(u));
    }
}
