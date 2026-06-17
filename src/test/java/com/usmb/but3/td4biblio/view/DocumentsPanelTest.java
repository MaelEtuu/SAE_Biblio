package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.service.AuteurService;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link DocumentsPanel} (panneau embarqué dans GestionView).
 *
 * <p>Le panneau n'étant pas routable, il est instancié directement avec des services
 * mockés puis attaché à l'UI fournie par Karibu.</p>
 */
@DisplayName("DocumentsPanel - tests Karibu")
class DocumentsPanelTest extends AbstractViewTest {

    private DocumentService documentService;
    private AuteurService   auteurService;
    private DocumentsPanel  panel;

    @BeforeEach
    void creerPanel() {
        documentService = mock(DocumentService.class);
        auteurService   = mock(AuteurService.class);
        when(documentService.getAllDocuments()).thenReturn(List.of(new Document()));

        panel = new DocumentsPanel(documentService, auteurService);
        UI.getCurrent().add(panel);
    }

    @Test
    @DisplayName("au chargement : liste les documents et propose l'ajout")
    void chargementInitial() {
        _get(panel, Button.class, spec -> spec.withText("Ajouter un document"));
        verify(documentService).getAllDocuments();
    }

    @Test
    @DisplayName("enregistrement sans titre : message d'erreur, aucun appel au service")
    void titreObligatoire() {
        _click(_get(panel, Button.class, spec -> spec.withText("Ajouter un document")));
        _click(_get(Button.class, spec -> spec.withText("Enregistrer")));

        expectNotifications("Le titre est obligatoire.");
        verify(documentService, never()).enregistrerDocument(any(), any());
    }
}
