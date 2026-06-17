package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.ImportExportService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;

/**
 * Tests « browserless » de {@link ImportExportView} : garde d'accès réservée aux
 * bibliothécaires et affichage des sections import / export.
 */
@DisplayName("ImportExportView - tests Karibu")
class ImportExportViewTest extends AbstractViewTest {

    @MockitoBean private ImportExportService importExportService;
    // Services d'AccueilView (cible de la redirection en cas d'accès refusé).
    @MockitoBean private DocumentService documentService;
    @MockitoBean private EmpruntsService empruntsService;

    private ImportExportView vue() {
        return _get(ImportExportView.class);
    }

    private static Utilisateur avecRole(String libelle) {
        Utilisateur u = new Utilisateur();
        u.setRole(new Role(1, libelle));
        return u;
    }

    @Test
    @DisplayName("non connecté : redirection vers la connexion")
    void nonConnecteRedirige() {
        UI.getCurrent().navigate("import-export");
        _assertOne(LoginView.class);
        _assertNone(ImportExportView.class);
    }

    @Test
    @DisplayName("emprunteur : accès refusé + redirection vers l'accueil")
    void emprunteurRefuse() {
        connecter(avecRole("EMPRUNTEUR"));

        UI.getCurrent().navigate("import-export");

        _assertOne(AccueilView.class);
        _assertNone(ImportExportView.class);
        expectNotifications("Accès réservé aux bibliothécaires.");
    }

    @Test
    @DisplayName("bibliothécaire : sections import et export affichées")
    void bibliothecaireVoitVue() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("import-export");

        _get(vue(), H2.class, spec -> spec.withText("Import / Export"));
        // Les liens d'export sont des boutons habillés.
        _get(vue(), Button.class, spec -> spec.withText("Documents (CSV)"));
        _get(vue(), Button.class, spec -> spec.withText("Auteurs (Excel)"));
    }
}
