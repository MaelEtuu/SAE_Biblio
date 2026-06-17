package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.service.RegleService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.textfield.TextField;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.github.mvysny.kaributesting.v10.GridKt._size;
import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link ReglesPanel} : listing des paramètres et modification
 * de la valeur d'une règle via l'éditeur.
 */
@DisplayName("ReglesPanel - tests Karibu")
class ReglesPanelTest extends AbstractViewTest {

    private RegleService regleService;
    private ReglesPanel  panel;
    private Regle        regle;

    @BeforeEach
    void creerPanel() {
        regleService = mock(RegleService.class);
        regle = new Regle();
        regle.setIdRegle(1);
        regle.setIntituleRegle("Nombre max de prêts");
        regle.setTypeRegle("MAX_PRETS");
        regle.setValeurRegle("5");
        when(regleService.getAllRegles()).thenReturn(List.of(regle));

        panel = new ReglesPanel(regleService);
        UI.getCurrent().add(panel);
    }

    @Test
    @DisplayName("au chargement : la grille liste les paramètres")
    void listingInitial() {
        verify(regleService).getAllRegles();
        assertThat(_size(_get(panel, Grid.class))).isEqualTo(1);
    }

    @Test
    @DisplayName("modification de la valeur : enregistrement délégué au service")
    void modificationValeur() {
        @SuppressWarnings("unchecked")
        Grid<Regle> grid = _get(panel, Grid.class);
        grid.select(regle);   // ouvre l'éditeur

        _setValue(_get(TextField.class, spec -> spec.withLabel("Valeur")), "10");
        _click(_get(Button.class, spec -> spec.withText("Enregistrer")));

        verify(regleService).saveRegle(regle);
        assertThat(regle.getValeurRegle()).isEqualTo("10");
    }
}
