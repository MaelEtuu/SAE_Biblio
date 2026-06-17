package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.TextField;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link CatalogueView} : listing, recherche, et réservation
 * (selon que l'utilisateur est connecté ou non).
 */
@DisplayName("CatalogueView - tests Karibu")
class CatalogueViewTest extends AbstractViewTest {

    @MockitoBean private DocumentService    documentService;
    @MockitoBean private ReservationService reservationService;

    private CatalogueView vue() {
        return _get(CatalogueView.class);
    }

    private static Document doc(int id, String titre, boolean empruntable) {
        Document d = new Document();
        d.setIdDocument(id);
        d.setTitre(titre);
        d.setEstEmpruntable(empruntable);
        return d;
    }

    @Test
    @DisplayName("au chargement : affiche tous les documents et le compteur")
    void listingInitial() {
        when(documentService.getAllDocuments())
                .thenReturn(List.of(doc(1, "Germinal", true), doc(2, "L'Étranger", false)));

        UI.getCurrent().navigate("catalogue");

        _get(vue(), Span.class, spec -> spec.withText("2 documents"));
        // Chaque titre apparaît deux fois (couverture + carte) => on vérifie la présence.
        assertThat(_find(vue(), Span.class, spec -> spec.withText("Germinal"))).isNotEmpty();
        assertThat(_find(vue(), Span.class, spec -> spec.withText("L'Étranger"))).isNotEmpty();
    }

    @Test
    @DisplayName("recherche sans résultat : message « Aucun résultat »")
    void rechercheVide() {
        when(documentService.getAllDocuments()).thenReturn(List.of(doc(1, "Germinal", true)));
        when(documentService.search(any(), any(), any())).thenReturn(List.of());

        UI.getCurrent().navigate("catalogue");
        _setValue(_get(vue(), TextField.class), "zzz");
        _click(_get(vue(), Button.class, spec -> spec.withText("Filtrer")));

        _get(vue(), Span.class, spec -> spec.withText("0 document"));
        _get(vue(), Span.class, spec -> spec.withText("Aucun résultat"));
    }

    @Test
    @DisplayName("réserver sans être connecté : invite à se connecter, aucune réservation")
    void reserverNonConnecte() {
        when(documentService.getAllDocuments()).thenReturn(List.of(doc(1, "Germinal", true)));

        UI.getCurrent().navigate("catalogue");
        _click(_get(vue(), Button.class, spec -> spec.withText("Réserver")));

        expectNotifications("Connectez-vous pour réserver.");
        verify(reservationService, never()).reserver(any(), any());
    }

    @Test
    @DisplayName("réserver connecté : délègue au service et confirme")
    void reserverConnecte() {
        Utilisateur u = new Utilisateur();
        u.setPrenom("Léa");
        connecter(u);

        when(documentService.getAllDocuments()).thenReturn(List.of(doc(1, "Germinal", true)));
        when(documentService.search(any(), any(), any())).thenReturn(List.of());

        UI.getCurrent().navigate("catalogue");
        _click(_get(vue(), Button.class, spec -> spec.withText("Réserver")));

        verify(reservationService).reserver(eq(1), eq(u));
    }
}
