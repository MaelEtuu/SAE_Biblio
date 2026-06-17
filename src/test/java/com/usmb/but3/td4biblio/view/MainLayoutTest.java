package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.server.VaadinSession;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests « browserless » de {@link MainLayout} : zone compte de la barre de navigation
 * selon l'état de connexion, et déconnexion.
 */
@DisplayName("MainLayout - tests Karibu")
class MainLayoutTest extends AbstractViewTest {

    // Services de CatalogueView (route publique utilisée pour matérialiser le layout).
    @MockitoBean private DocumentService    documentService;
    @MockitoBean private ReservationService reservationService;

    private MainLayout layout() {
        return _get(MainLayout.class);
    }

    @Test
    @DisplayName("non connecté : la barre propose « Se connecter »")
    void barreNonConnecte() {
        UI.getCurrent().navigate("catalogue");
        _get(layout(), Button.class, spec -> spec.withText("Se connecter"));
    }

    @Test
    @DisplayName("connecté : la barre affiche le nom et permet la déconnexion")
    void barreConnecte() {
        Utilisateur u = new Utilisateur();
        u.setPrenom("Léa");
        u.setNom("Martin");
        connecter(u);

        UI.getCurrent().navigate("catalogue");

        _get(layout(), Span.class, spec -> spec.withText("Léa Martin"));
        _click(_get(layout(), Button.class, spec -> spec.withText("Déconnexion")));

        // Session vidée et redirection vers la connexion.
        assertThat(VaadinSession.getCurrent().getAttribute(Utilisateur.class)).isNull();
        _assertOne(LoginView.class);
    }
}
