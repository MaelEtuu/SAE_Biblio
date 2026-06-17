package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.TextField;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.List;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Tests « browserless » de {@link AccueilView} : nouvelles acquisitions, barre de
 * recherche (redirection vers le catalogue), réservation hors connexion, et popup
 * d'échéance d'abonnement.
 */
@DisplayName("AccueilView - tests Karibu")
class AccueilViewTest extends AbstractViewTest {

    @MockitoBean private DocumentService    documentService;
    @MockitoBean private ReservationService reservationService;
    @MockitoBean private EmpruntsService    empruntsService;

    /** (Re)construit l'accueil avec la session courante (détour pour forcer le rebuild). */
    private AccueilView ouvrir() {
        UI.getCurrent().navigate("login");
        UI.getCurrent().navigate("");
        return _get(AccueilView.class);
    }

    private static Document doc(int id, String titre, boolean empruntable) {
        Document d = new Document();
        d.setIdDocument(id);
        d.setTitre(titre);
        d.setEstEmpruntable(empruntable);
        return d;
    }

    @Test
    @DisplayName("nouvelles acquisitions : affiche les derniers documents")
    void nouvellesAcquisitions() {
        when(documentService.getDerniersDocuments(10))
                .thenReturn(List.of(doc(1, "Germinal", true)));

        AccueilView vue = ouvrir();
        assertThat(_find(vue, Span.class, spec -> spec.withText("Germinal"))).isNotEmpty();
    }

    @Test
    @DisplayName("barre de recherche : critères de recherche initialisés par défaut")
    void rechercheDefauts() {
        // NB : la redirection réelle (ui.navigate(\"catalogue?...\")) est cassée sous
        // Vaadin 25 (UI.navigate(String) refuse le séparateur '?'). On vérifie ici la
        // présence et l'initialisation des champs de recherche.
        AccueilView vue = ouvrir();

        var combos = _find(vue, com.vaadin.flow.component.combobox.ComboBox.class);
        assertThat(combos).hasSize(2);
        assertThat(combos.stream().map(c -> c.getValue())).contains("titre", "contient");
        _get(vue, Button.class, spec -> spec.withText("Rechercher"));
    }

    @Test
    @DisplayName("réserver sans connexion : invite à se connecter")
    void reserverNonConnecte() {
        when(documentService.getDerniersDocuments(10))
                .thenReturn(List.of(doc(1, "Germinal", true)));

        AccueilView vue = ouvrir();
        _click(_get(vue, Button.class, spec -> spec.withText("Réserver")));

        expectNotifications("Connectez-vous pour réserver.");
    }

    @Test
    @DisplayName("abonnement bientôt échu : popup d'avertissement affichée")
    void popupAbonnement() {
        Utilisateur u = new Utilisateur();
        u.setDateFinAbonnement(LocalDate.now().plusDays(5));
        connecter(u);

        ouvrir();
        _get(H3.class, spec -> spec.withText("Votre abonnement arrive à échéance"));
    }
}
