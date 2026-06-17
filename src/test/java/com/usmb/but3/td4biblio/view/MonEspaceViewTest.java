package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.List;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link MonEspaceView} : garde d'accès (connexion requise),
 * en-tête personnalisé et action de prolongation depuis le tableau de bord.
 */
@DisplayName("MonEspaceView - tests Karibu")
class MonEspaceViewTest extends AbstractViewTest {

    @MockitoBean private EmpruntsService    empruntsService;
    @MockitoBean private ReservationService reservationService;
    @MockitoBean private DocumentService    documentService;

    private MonEspaceView vue() {
        return _get(MonEspaceView.class);
    }

    private static Emprunts emprunt(String titre) {
        Document d = new Document();
        d.setIdDocument(3);
        d.setTitre(titre);
        Emprunts e = new Emprunts();
        e.setDocument(d);
        e.setDateDebut(LocalDate.now().minusDays(2));
        e.setDateFin(LocalDate.now().plusWeeks(2));
        e.setEstProlonge(false);
        return e;
    }

    @Test
    @DisplayName("non connecté : redirection vers la page de connexion")
    void nonConnecteRedirige() {
        UI.getCurrent().navigate("mon-espace");
        _assertOne(LoginView.class);
        _assertNone(MonEspaceView.class);
    }

    @Test
    @DisplayName("connecté : en-tête personnalisé et sections affichées")
    void tableauDeBord() {
        Utilisateur u = new Utilisateur();
        u.setPrenom("Léa");
        u.setNom("Martin");
        connecter(u);

        UI.getCurrent().navigate("mon-espace");

        _get(vue(), H1.class, spec -> spec.withText("Bonjour, Léa Martin."));
        _get(vue(), H2.class, spec -> spec.withText("Mes emprunts en cours"));
    }

    @Test
    @DisplayName("connecté : prolongation d'un emprunt déléguée au service")
    void prolongerDepuisEspace() {
        Utilisateur u = new Utilisateur();
        u.setPrenom("Léa");
        connecter(u);
        when(empruntsService.getEmpruntsEnCours(any())).thenReturn(List.of(emprunt("Germinal")));

        UI.getCurrent().navigate("mon-espace");
        _click(_get(vue(), Button.class, spec -> spec.withText("Prolonger")));

        verify(empruntsService).prolonger(eq(3), eq(u));
    }
}
