package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.EmpruntsService;
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
 * Tests « browserless » de {@link EmpruntsView } : états vide / non connecté / liste,
 * et action de prolongation.
 */
@DisplayName("EmpruntsView - tests Karibu")
class EmpruntsViewTest extends AbstractViewTest {

    @MockitoBean private EmpruntsService empruntsService;

    private EmpruntsView vue() {
        return _get(EmpruntsView.class);
    }

    private static Emprunts emprunt(String titre, boolean prolonge) {
        Document d = new Document();
        d.setIdDocument(1);
        d.setTitre(titre);
        Emprunts e = new Emprunts();
        e.setDocument(d);
        e.setDateDebut(LocalDate.now().minusWeeks(1));
        e.setDateFin(LocalDate.now().plusWeeks(2));
        e.setEstProlonge(prolonge);
        return e;
    }

    @Test
    @DisplayName("non connecté : invite à se connecter")
    void nonConnecte() {
        UI.getCurrent().navigate("emprunts");
        _get(vue(), Paragraph.class, spec -> spec.withText("Connectez-vous pour voir vos emprunts."));
    }

    @Test
    @DisplayName("connecté sans emprunt : état vide")
    void aucunEmprunt() {
        connecter(new Utilisateur());
        when(empruntsService.getEmpruntsEnCours(any())).thenReturn(List.of());

        UI.getCurrent().navigate("emprunts");
        _get(vue(), Paragraph.class, spec -> spec.withText("Aucun emprunt en cours."));
    }

    @Test
    @DisplayName("connecté avec un emprunt : ligne affichée + prolongation déléguée au service")
    void prolongation() {
        Utilisateur u = new Utilisateur();
        connecter(u);
        when(empruntsService.getEmpruntsEnCours(any()))
                .thenReturn(List.of(emprunt("Germinal", false)));

        UI.getCurrent().navigate("emprunts");
        _get(vue(), Span.class, spec -> spec.withText("Germinal"));

        _click(_get(vue(), Button.class, spec -> spec.withText("Prolonger")));
        verify(empruntsService).prolonger(eq(1), eq(u));
    }

    @Test
    @DisplayName("emprunt déjà prolongé : bouton désactivé")
    void dejaProlonge() {
        connecter(new Utilisateur());
        when(empruntsService.getEmpruntsEnCours(any()))
                .thenReturn(List.of(emprunt("Germinal", true)));

        UI.getCurrent().navigate("emprunts");
        Button btn = _get(vue(), Button.class, spec -> spec.withText("Prolongé ✓"));
        org.assertj.core.api.Assertions.assertThat(btn.isEnabled()).isFalse();
    }
}
