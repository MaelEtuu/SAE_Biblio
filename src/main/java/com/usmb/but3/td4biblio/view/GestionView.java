package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.service.AuteurService;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.UtilisateurService;
import com.usmb.but3.td4biblio.util.RequiresRole;
import com.usmb.but3.td4biblio.util.RouteGuard;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route("gestion")
@PageTitle("Gestion — BiblioVaadin")
@Menu(title = "Gestion", order = 5, icon = "vaadin:cog")
@RequiresRole("BIBLIOTHECAIRE")
public class GestionView extends VerticalLayout implements BeforeEnterObserver {

    private final DocumentService    documentService;
    private final AuteurService      auteurService;
    private final UtilisateurService utilisateurService;
    private final EmpruntsService    empruntsService;

    private final Tabs tabs    = new Tabs();
    private final Div  content = new Div();
    private Tab docsTab;
    private Tab empTab;

    public GestionView(DocumentService documentService,
                       AuteurService auteurService,
                       UtilisateurService utilisateurService,
                       EmpruntsService empruntsService) {
        this.documentService    = documentService;
        this.auteurService      = auteurService;
        this.utilisateurService = utilisateurService;
        this.empruntsService    = empruntsService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        tabs.addSelectedChangeListener(e -> afficher(e.getSelectedTab()));
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        if (!RouteGuard.check(event, GestionView.class)) return;

        removeAll();

        var eyebrow = new Paragraph("Administration · Bibliothécaire");
        eyebrow.addClassName("biblio-eyebrow");
        var titre = new H2("Gestion");
        titre.addClassName("biblio-section-title");
        var header = new Div(eyebrow, titre);
        header.getElement().getStyle().set("margin-bottom", "22px");

        docsTab = new Tab("Documents");
        empTab  = new Tab("Emprunteurs");
        tabs.removeAll();
        tabs.add(docsTab, empTab);
        tabs.getElement().getStyle().set("margin-bottom", "20px");

        content.setWidthFull();
        add(header, tabs, content);

        tabs.setSelectedTab(docsTab);
        afficher(docsTab); // onglet par défaut (pas d'événement si déjà sélectionné)
    }

    private void afficher(Tab tab) {
        if (tab == null) return;
        content.removeAll();
        if (tab == empTab) {
            content.add(new EmprunteursPanel(utilisateurService, empruntsService));
        } else {
            content.add(new DocumentsPanel(documentService, auteurService));
        }
    }
}