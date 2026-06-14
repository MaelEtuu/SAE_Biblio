package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.ModalityMode;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Route(value = "")
@PageTitle("Accueil — BiblioVaadin")
@Menu(title = "Accueil", order = 0, icon = "vaadin:home")
public class AccueilView extends VerticalLayout {

    private final DocumentService    documentService;
    private final ReservationService reservationService;

    private Utilisateur utilisateurCourant = SessionUtils.getUtilisateur();

    private final TextField        searchField   = new TextField();
    private final ComboBox<String> critereBox    = new ComboBox<>();
    private final ComboBox<String> matchBox      = new ComboBox<>();
    private final Div              nouvellesGrid = new Div();
    private final Div              eventsList    = new Div();

    public AccueilView(DocumentService documentService,
                       ReservationService reservationService) {
        this.documentService    = documentService;
        this.reservationService = reservationService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        add(buildHero(), buildNouvellesSection());

        loadNouvellesAcquisitions();
        loadEvenements();
        checkAbonnement();
    }

    // ── Hero ──────────────────────────────────────────────────────────────────
    private Div buildHero() {
        var hero = new Div();
        hero.addClassName("biblio-hero");

        var eyebrow = new Paragraph("Catalogue · 4 sites");
        eyebrow.addClassName("biblio-eyebrow");
        eyebrow.getElement().getStyle().set("margin-bottom", "10px");

        var titleEl = new H1();
        titleEl.addClassName("biblio-hero-title");
        titleEl.getElement().setProperty("innerHTML",
                "Trouvez, réservez,<br><em>empruntez.</em>");

        var subtitle = new Paragraph(
                "Parcourez tout le réseau et réservez un document disponible en un geste. "
                        + "Votre réservation est tenue pendant deux semaines.");
        subtitle.addClassName("biblio-subtitle");

        hero.add(eyebrow, titleEl, subtitle, buildSearchBar());
        return hero;
    }

    // ── Barre de recherche ────────────────────────────────────────────────────
    private HorizontalLayout buildSearchBar() {
        searchField.setPlaceholder("Titre, auteur, mot-clé…");
        searchField.getElement().getStyle().set("flex", "1 1 240px");
        searchField.addKeyPressListener(Key.ENTER, e -> runSearch());

        critereBox.setItems("titre", "auteur", "type", "bibliothèque");
        critereBox.setValue("titre");
        critereBox.setWidth("155px");

        matchBox.setItems("contient", "égal à", "débute par");
        matchBox.setValue("contient");
        matchBox.setWidth("145px");

        var btn = new Button("Rechercher");
        btn.addClassName("biblio-btn-primary");
        btn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        btn.addClickListener(e -> runSearch());

        var bar = new HorizontalLayout(searchField, critereBox, matchBox, btn);
        bar.addClassName("biblio-searchbox");
        bar.setAlignItems(Alignment.CENTER);
        bar.setWidthFull();
        return bar;
    }

    private void runSearch() {
        String terme   = searchField.getValue();
        String critere = critereBox.getValue();
        String match   = matchBox.getValue();
        getUI().ifPresent(ui ->
                ui.navigate("catalogue?terme=" + terme
                        + "&critere=" + critere
                        + "&match="   + match));
    }

    // ── Nouvelles acquisitions ────────────────────────────────────────────────
    private VerticalLayout buildNouvellesSection() {
        var section = new VerticalLayout();
        section.setPadding(false);
        section.setSpacing(false);
        section.getElement().getStyle().set("margin-top", "56px");

        var titleH2 = new H2("Nouvelles acquisitions");
        titleH2.addClassName("biblio-section-title");
        var meta = new Span("Cette semaine");
        meta.addClassName("biblio-section-meta");

        var head = new HorizontalLayout(titleH2, meta);
        head.addClassName("biblio-section-head");
        head.setAlignItems(Alignment.BASELINE);
        head.setWidthFull();

        nouvellesGrid.addClassName("biblio-grid");
        section.add(head, nouvellesGrid);
        return section;
    }

    private void loadNouvellesAcquisitions() {
        nouvellesGrid.removeAll();
        documentService.getDerniersDocuments(10)
                .forEach(doc -> nouvellesGrid.add(buildDocCard(doc)));
    }

    // ── Événements ────────────────────────────────────────────────────────────
    private void loadEvenements() {
        eventsList.removeAll();
        String[][] events = {
                {"12", "Juin", "Rencontre avec Delphine de Vigan", "Annecy Centre", "18 h 30 – 20 h"},
                {"15", "Juin", "Exposition : l'estampe japonaise",  "Seynod",       "Toute la journée"},
                {"19", "Juin", "Atelier reliure & restauration",    "Cran-Gevrier", "14 h – 16 h 30"},
        };
        for (String[] ev : events) {
            eventsList.add(buildEventRow(ev[0], ev[1], ev[2], ev[3], ev[4]));
        }
    }

    private Div buildEventRow(String day, String month, String titre, String lieu, String horaire) {
        var daySpan   = new Span(day);
        daySpan.addClassName("biblio-date-day");
        var monthSpan = new Span(month);
        monthSpan.addClassName("biblio-date-month");
        var chip = new Div(daySpan, monthSpan);
        chip.addClassName("biblio-date-chip");

        var titreSpan  = new Span(titre);
        titreSpan.addClassName("biblio-event-title");
        var lieuSpan   = new Span(lieu);
        lieuSpan.addClassName("biblio-event-lib");
        var infoDiv = new Div(titreSpan, lieuSpan);
        infoDiv.getElement().getStyle().set("display", "flex").set("flex-direction", "column").set("gap", "3px");

        var whenSpan = new Span(horaire);
        whenSpan.addClassName("biblio-event-when");

        var row = new Div(chip, infoDiv, whenSpan);
        row.addClassName("biblio-event");
        return row;
    }

    // ── Carte document ────────────────────────────────────────────────────────
    private Div buildDocCard(Document doc) {
        var card = new Div();
        card.addClassName("biblio-doc");

        var tagSpan    = new Span(doc.getFormat() != null ? doc.getFormat().getLargeur() : "");
        tagSpan.addClassName("biblio-cover-tag");
        var titleSpan  = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titleSpan.addClassName("biblio-cover-title");
        var authSpan   = new Span(doc.getAuteur() != null
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
            loadNouvellesAcquisitions();
        } catch (IllegalStateException ex) {
            Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    // ── Notification abonnement via Dialog (pas Notification, pour éviter la bordure Shadow DOM) ──
    private void checkAbonnement() {
        if (utilisateurCourant == null) return;
        LocalDate fin = utilisateurCourant.getDateFinAbonnement();
        if (fin == null) return;
        long joursRestants = ChronoUnit.DAYS.between(LocalDate.now(), fin);
        if (joursRestants > 14) return;
        showAbonnementDialog(fin, joursRestants);
    }

    private void showAbonnementDialog(LocalDate fin, long joursRestants) {
        var dialog = new Dialog();
        dialog.setModality(ModalityMode.VISUAL);
        dialog.setDraggable(false);
        dialog.setResizable(false);
        dialog.setCloseOnOutsideClick(false);
        // Supprime les paddings/header natifs de la Dialog Vaadin
        dialog.getElement().getStyle()
                .set("padding", "0")
                .set("border-radius", "16px")
                .set("overflow", "hidden");

        // Icône
        var icon = new Span("⚠");
        icon.getElement().getStyle()
                .set("width", "40px").set("height", "40px")
                .set("border-radius", "50%")
                .set("background", "rgba(216,162,74,.14)")
                .set("border", "1px solid rgba(216,162,74,.28)")
                .set("color", "var(--amber)")
                .set("display", "grid").set("place-items", "center")
                .set("font-size", "18px").set("margin-bottom", "18px")
                .set("flex-shrink", "0");

        var title = new H3(joursRestants <= 0
                ? "Votre abonnement a expiré"
                : "Votre abonnement arrive à échéance");
        title.getElement().getStyle()
                .set("font-family", "Newsreader")
                .set("font-family", "serif")
                .set("font-weight", "500")
                .set("font-size", "21px")
                .set("color", "var(--ink)")
                .set("margin", "0 0 10px");

        String msgText = joursRestants <= 0
                ? "Votre abonnement a expiré le " + fin + ". Passez en bibliothèque ou contactez un bibliothécaire pour le renouveler."
                : joursRestants == 1
                  ? "Votre abonnement expire demain (" + fin + "). Renouvelez-le rapidement."
                  : "Votre abonnement expire le " + fin + " (dans " + joursRestants + " jours). Passez en bibliothèque ou contactez un bibliothécaire.";

        var msg = new Paragraph(msgText);
        msg.getElement().getStyle()
                .set("font-size", "13.5px").set("color", "var(--ink-soft)")
                .set("line-height", "1.6").set("margin", "0");

        var later = new Button("Plus tard", e -> dialog.close());
        later.addClassName("btn-ghost");
        later.addClassName("btn-mini");

        var close = new Button("J'ai compris", e -> dialog.close());
        close.addClassName("biblio-btn-primary");
        close.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var actions = new HorizontalLayout(later, close);
        actions.getElement().getStyle().set("margin-top", "24px").set("gap", "10px");

        var content = new Div(icon, title, msg, actions);
        content.addClassName("biblio-notif-modal");

        dialog.add(content);
        dialog.open();
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