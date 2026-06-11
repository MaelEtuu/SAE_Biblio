package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.*;

import java.util.List;
import java.util.Map;

@Route(value = "catalogue")
@PageTitle("Catalogue — BiblioVaadin")
@Menu(title = "Catalogue", order = 1, icon = "vaadin:book")
public class CatalogueView extends VerticalLayout implements HasUrlParameter<String> {

    private final DocumentService    documentService;
    private final ReservationService reservationService;

    private Utilisateur utilisateurCourant = SessionUtils.getUtilisateur();

    private final TextField        searchField = new TextField();
    private final ComboBox<String> critereBox  = new ComboBox<>();
    private final ComboBox<String> matchBox    = new ComboBox<>();
    private final Span             countSpan   = new Span();
    private final Div              catGrid     = new Div();

    public CatalogueView(DocumentService documentService,
                         ReservationService reservationService) {
        this.documentService    = documentService;
        this.reservationService = reservationService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        add(buildSearchBar(), buildCatalogueSection());
        listDocuments(documentService.getAllDocuments());
    }

    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter String parameter) {
        Map<String, List<String>> params = event.getLocation()
                .getQueryParameters().getParameters();

        String terme   = params.getOrDefault("terme",   List.of("")).get(0);
        String critere = params.getOrDefault("critere", List.of("titre")).get(0);
        String match   = params.getOrDefault("match",   List.of("contient")).get(0);

        if (!terme.isBlank()) {
            searchField.setValue(terme);
            critereBox.setValue(critere);
            matchBox.setValue(match);
            listDocuments(documentService.search(terme, critere, match));
        }
    }

    // ── Barre de recherche ────────────────────────────────────────────────────
    private HorizontalLayout buildSearchBar() {
        searchField.setPlaceholder("Rechercher dans le catalogue…");
        searchField.getElement().getStyle().set("flex", "1 1 240px");
        searchField.addKeyPressListener(Key.ENTER, e -> filterCatalogue());

        critereBox.setItems("titre", "auteur", "type", "bibliothèque");
        critereBox.setValue("titre");
        critereBox.setWidth("155px");

        matchBox.setItems("contient", "égal à", "débute par");
        matchBox.setValue("contient");
        matchBox.setWidth("145px");

        var btn = new Button("Filtrer");
        btn.addClassName("biblio-btn-primary");
        btn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        btn.addClickListener(e -> filterCatalogue());

        var bar = new HorizontalLayout(searchField, critereBox, matchBox, btn);
        bar.addClassName("biblio-searchbox");
        bar.setAlignItems(Alignment.CENTER);
        bar.setWidthFull();
        return bar;
    }

    private void filterCatalogue() {
        listDocuments(documentService.search(
                searchField.getValue(),
                critereBox.getValue(),
                matchBox.getValue()));
    }

    // ── Section catalogue ─────────────────────────────────────────────────────
    private VerticalLayout buildCatalogueSection() {
        var section = new VerticalLayout();
        section.setPadding(false);
        section.setSpacing(false);

        var titleH2 = new H2("Catalogue");
        titleH2.addClassName("biblio-section-title");
        countSpan.addClassName("biblio-section-meta");

        var head = new HorizontalLayout(titleH2, countSpan);
        head.addClassName("biblio-section-head");
        head.setAlignItems(Alignment.BASELINE);
        head.setWidthFull();

        catGrid.addClassName("biblio-grid");
        section.add(head, catGrid);
        return section;
    }

    private void listDocuments(List<Document> docs) {
        catGrid.removeAll();
        int count = docs.size();
        countSpan.setText(count + " document" + (count > 1 ? "s" : ""));

        if (docs.isEmpty()) {
            var emptyTitle = new Span("Aucun résultat");
            emptyTitle.addClassName("biblio-empty-title");
            emptyTitle.addClassName("serif");
            var emptyMsg = new Paragraph("Affinez votre recherche ou changez de critère.");
            var empty = new Div(emptyTitle, emptyMsg);
            empty.addClassName("biblio-empty");
            empty.getElement().getStyle().set("grid-column", "1/-1");
            catGrid.add(empty);
        } else {
            docs.forEach(doc -> catGrid.add(buildDocCard(doc)));
        }
    }

    // ── Carte document ────────────────────────────────────────────────────────
    private Div buildDocCard(Document doc) {
        var card = new Div();
        card.addClassName("biblio-doc");

        var tagSpan   = new Span(doc.getFormat() != null ? doc.getFormat().getLargeur() : "");
        tagSpan.addClassName("biblio-cover-tag");
        var titleSpan = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titleSpan.addClassName("biblio-cover-title");
        var authSpan  = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNom() + " " + doc.getAuteur().getPrenom() : "");
        authSpan.addClassName("biblio-cover-author");

        var bottomDiv = new Div(titleSpan, authSpan);
        bottomDiv.getElement().getStyle().set("display","flex").set("flex-direction","column").set("gap","3px");

        var cover = new Div(tagSpan, bottomDiv);
        cover.addClassName("biblio-cover");
        cover.getElement().getStyle().set("background", resolveColor(doc));

        var docTitle  = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        docTitle.addClassName("biblio-doc-title");
        var docAuthor = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNom() + " " + doc.getAuteur().getPrenom() : "");
        docAuthor.addClassName("biblio-doc-author");
        var docLib    = new Span(doc.getCodeEmplacement() != null ? doc.getCodeEmplacement() : "");
        docLib.addClassName("biblio-doc-lib");

        boolean disponible = Boolean.TRUE.equals(doc.getEstEmpruntable());
        var badge = new Span(disponible ? "Disponible" : "Non empruntable");
        badge.addClassNames("badge", disponible ? "badge-dispo" : "badge-indispo");

        var reserverBtn = new Button("Réserver");
        reserverBtn.addClassName("btn-mini");
        reserverBtn.setEnabled(disponible);
        reserverBtn.addClickListener(e -> handleReserver(doc));

        var row = new Div(badge, reserverBtn);
        row.addClassName("biblio-doc-row");

        card.add(cover, docTitle, docAuthor, docLib, row);
        return card;
    }

    private void handleReserver(Document doc) {
        if (utilisateurCourant == null) {
            Notification.show("Connectez-vous pour réserver.", 2500,
                    Notification.Position.BOTTOM_CENTER);
            return;
        }
        try {
            reservationService.reserver(doc.getIdDocument(), utilisateurCourant);
            Notification.show("« " + doc.getTitre() + " » réservé — disponible 14 jours",
                            2600, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            filterCatalogue();
        } catch (IllegalStateException ex) {
            Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    private String resolveColor(Document doc) {
        if (doc.getFormat() == null) return "#2e3a52";
        return switch (doc.getFormat().getLargeur().toUpperCase()) {
            case "CD"  -> "#5e2e22";
            case "DVD" -> "#46243a";
            default    -> "#2e3a52";
        };
    }
}