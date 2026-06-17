package com.usmb.but3.td4biblio.view;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;

/**
 * Test « browserless » de {@link MainView} (route « test ») : page d'accueil interne
 * statique invitant à choisir une option dans le menu.
 */
@DisplayName("MainView - tests Karibu")
class MainViewTest extends AbstractViewTest {

    @Test
    @DisplayName("affiche l'invitation à choisir une option du menu")
    void afficheInvitation() {
        UI.getCurrent().navigate("test");

        MainView vue = _get(MainView.class);
        _get(vue, Div.class, spec -> spec.withText("Choisissez une option dans le menu à gauche."));
    }
}
