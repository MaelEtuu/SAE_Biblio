package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.UtilisateurService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
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
 * Tests « browserless » de {@link EmprunteursPanel} : listing initial et recherche
 * par nom déléguée au service.
 */
@DisplayName("EmprunteursPanel - tests Karibu")
class EmprunteursPanelTest extends AbstractViewTest {

    private UtilisateurService utilisateurService;
    private EmpruntsService    empruntsService;
    private EmprunteursPanel   panel;

    @BeforeEach
    void creerPanel() {
        utilisateurService = mock(UtilisateurService.class);
        empruntsService    = mock(EmpruntsService.class);
        when(utilisateurService.getTousEmprunteurs()).thenReturn(List.of(new Utilisateur()));

        panel = new EmprunteursPanel(utilisateurService, empruntsService);
        UI.getCurrent().add(panel);
    }

    @Test
    @DisplayName("au chargement : la grille liste tous les emprunteurs")
    void listingInitial() {
        verify(utilisateurService).getTousEmprunteurs();
        assertThat(_size(_get(panel, Grid.class))).isEqualTo(1);
    }

    @Test
    @DisplayName("recherche par nom : déléguée au service")
    void rechercheParNom() {
        @SuppressWarnings("unchecked")
        ComboBox<String> typeRecherche = _get(panel, ComboBox.class);
        _setValue(typeRecherche, "Par nom");

        _setValue(_get(panel, TextField.class), "Dupont");
        _click(_get(panel, Button.class, spec -> spec.withText("Rechercher")));

        verify(utilisateurService).rechercherParNom("Dupont");
    }
}
