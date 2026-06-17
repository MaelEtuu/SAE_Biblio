package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.*;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.tabs.Tabs;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;

/**
 * Tests « browserless » de {@link GestionView} : garde d'accès BIBLIOTHECAIRE et
 * navigation par onglets entre les panneaux (Documents / Emprunteurs / Paramètres).
 */
@DisplayName("GestionView - tests Karibu")
class GestionViewTest extends AbstractViewTest {

    @MockitoBean private DocumentService    documentService;
    @MockitoBean private AuteurService      auteurService;
    @MockitoBean private UtilisateurService utilisateurService;
    @MockitoBean private EmpruntsService    empruntsService;
    @MockitoBean private RegleService       regleService;

    private GestionView vue() {
        return _get(GestionView.class);
    }

    /** Onglets : 0 = Documents, 1 = Emprunteurs, 2 = Paramètres. */
    private void selectionnerOnglet(int index) {
        _get(vue(), Tabs.class).setSelectedIndex(index);
    }

    private static Utilisateur avecRole(String libelle) {
        Utilisateur u = new Utilisateur();
        u.setRole(new Role(1, libelle));
        return u;
    }

    @Test
    @DisplayName("non connecté : redirection vers la connexion")
    void nonConnecteRedirige() {
        UI.getCurrent().navigate("gestion");
        _assertOne(LoginView.class);
        _assertNone(GestionView.class);
    }

    @Test
    @DisplayName("bibliothécaire : onglet Documents affiché par défaut")
    void ongletDocumentsParDefaut() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("gestion");

        _get(vue(), Button.class, spec -> spec.withText("Ajouter un document"));
        verify(documentService, atLeastOnce()).getAllDocuments();
    }

    @Test
    @DisplayName("bibliothécaire : bascule vers l'onglet Emprunteurs")
    void bascleOngletEmprunteurs() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("gestion");
        selectionnerOnglet(1);

        _get(vue(), Button.class, spec -> spec.withText("Nouvel emprunteur"));
        verify(utilisateurService, atLeastOnce()).getTousEmprunteurs();
    }

    @Test
    @DisplayName("bibliothécaire : bascule vers l'onglet Paramètres")
    void bascleOngletParametres() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("gestion");
        selectionnerOnglet(2);

        verify(regleService, atLeastOnce()).getAllRegles();
    }
}
