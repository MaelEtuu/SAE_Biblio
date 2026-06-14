package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

/**
 * Espace emprunteur unifié : tableau de bord + emprunts en cours + réservations actives.
 * Fusionne les anciennes vues {@link EmpruntsView} et {@link ReservationsView}.
 */
@Route(value = "mon-espace")
@PageTitle("Mon espace — BiblioVaadin")
@Menu(title = "Mon espace", order = 2, icon = "vaadin:user")
public class MonEspaceView extends VerticalLayout {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("d MMM yyyy", Locale.FRENCH);

    private final EmpruntsService    empruntsService;
    private final ReservationService reservationService;
    private final DocumentService    documentService;

    private Utilisateur utilisateurCourant = SessionUtils.getUtilisateur();

    // Conteneurs rechargés dynamiquement
    private final Div statsRow      = new Div();
    private final Div empruntsDiv   = new Div();
    private final Div reservesDiv   = new Div();
    private final Div catalogueDiv  = new Div();

    public MonEspaceView(EmpruntsService empruntsService,
                         ReservationService reservationService,
                         DocumentService documentService) {
        this.empruntsService    = empruntsService;
        this.reservationService = reservationService;
        this.documentService    = documentService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        if (utilisateurCourant == null) {
            add(buildNotConnected());
            return;
        }

        add(
                buildHeader(),
                statsRow,
                buildSection("Mes emprunts en cours",        "Prolongation possible une fois", empruntsDiv),
                buildSection("Mes réservations",              "Tenues 2 semaines",              reservesDiv),
                buildSection("Documents disponibles",         "Réservez en un clic",            catalogueDiv)
        );

        reload();
    }

    // ── Header personnalisé ───────────────────────────────────────────────────
    private Div buildHeader() {
        String prenom = utilisateurCourant.getPrenom() != null ? utilisateurCourant.getPrenom() : "";
        String nom    = utilisateurCourant.getNom()    != null ? utilisateurCourant.getNom()    : "";

        var eyebrow = new Paragraph("Espace personnel");
        eyebrow.addClassName("biblio-eyebrow");

        var titre = new H1("Bonjour, " + prenom + " " + nom + ".");
        titre.addClassName("biblio-hero-title");

        LocalDate finAbo = utilisateurCourant.getDateFinAbonnement();
        String aboText = finAbo != null
                ? "Abonnement valide jusqu'au " + finAbo.format(FMT)
                : "Abonnement · statut inconnu";

        var sous = new Paragraph(aboText);
        sous.addClassName("biblio-subtitle");

        var header = new Div(eyebrow, titre, sous);
        header.addClassName("biblio-hero");
        return header;
    }

    // ── Bloc de stats ─────────────────────────────────────────────────────────
    private void buildStatsRow() {
        statsRow.removeAll();
        statsRow.addClassName("espace-stats-row");

        long nbEmprunts   = empruntsService.getNombreEmpruntsEnCours(utilisateurCourant);
        long nbReservations = reservationService.getReservationsActives(utilisateurCourant).size();

        statsRow.add(
                buildStatCard("" + nbEmprunts,    "emprunt" + (nbEmprunts > 1 ? "s" : "") + " en cours", "var(--amber)"),
                buildStatCard("" + nbReservations, "réservation" + (nbReservations > 1 ? "s" : "") + " active" + (nbReservations > 1 ? "s" : ""), "var(--ok)"),
                buildStatCard("14 j",             "durée max de réservation",     "var(--muted)")
        );
    }

    private Div buildStatCard(String value, String label, String color) {
        var val = new Span(value);
        val.getElement().getStyle()
                .set("font-family", "Newsreader, serif")
                .set("font-size", "32px")
                .set("font-weight", "300")
                .set("color", color)
                .set("display", "block")
                .set("line-height", "1");

        var lbl = new Span(label);
        lbl.getElement().getStyle()
                .set("font-size", "11.5px")
                .set("color", "var(--ink-soft)")
                .set("text-transform", "uppercase")
                .set("letter-spacing", ".1em")
                .set("font-weight", "600")
                .set("margin-top", "6px")
                .set("display", "block");

        var card = new Div(val, lbl);
        card.addClassName("espace-stat-card");
        return card;
    }

    // ── Section générique ─────────────────────────────────────────────────────
    private VerticalLayout buildSection(String title, String meta, Div content) {
        var titleEl = new H2(title);
        titleEl.addClassName("biblio-section-title");

        var metaEl = new Span(meta);
        metaEl.addClassName("biblio-section-meta");

        var head = new HorizontalLayout(titleEl, metaEl);
        head.addClassName("biblio-section-head");
        head.setAlignItems(Alignment.BASELINE);
        head.setWidthFull();

        var section = new VerticalLayout(head, content);
        section.setPadding(false);
        section.setSpacing(false);
        section.getElement().getStyle().set("margin-top", "48px");
        return section;
    }

    // ── Rechargement global ───────────────────────────────────────────────────
    private void reload() {
        buildStatsRow();
        loadEmprunts();
        loadReservations();
        loadCatalogue();
    }

    // ── Emprunts ──────────────────────────────────────────────────────────────
    private void loadEmprunts() {
        empruntsDiv.removeAll();
        empruntsDiv.removeClassName("biblio-rows");

        List<Emprunts> emprunts = empruntsService.getEmpruntsEnCours(utilisateurCourant);
        if (emprunts.isEmpty()) {
            empruntsDiv.add(buildEmpty("Aucun emprunt en cours.", "Parcourez le catalogue pour réserver un document."));
            return;
        }

        empruntsDiv.addClassName("biblio-rows");
        emprunts.forEach(e -> empruntsDiv.add(buildEmpruntRow(e)));
    }

    private Div buildEmpruntRow(Emprunts emprunt) {
        var doc = emprunt.getDocument();

        var miniCover = buildMiniCover(doc);

        var titreSpan  = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titreSpan.addClassName("biblio-lrow-title");
        var auteurSpan = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNom() + " " + doc.getAuteur().getPrenom() : "");
        auteurSpan.addClassName("biblio-lrow-sub");

        // Badge format
        var fmtBadge = new Span(doc.getFormat() != null ? doc.getFormat().getLargeur() : "");
        fmtBadge.addClassNames("badge", "badge-indispo");
        fmtBadge.getElement().getStyle().set("margin-top", "5px").set("display", "inline-block");

        var infoDiv = new Div(titreSpan, auteurSpan, fmtBadge);
        infoDiv.getElement().getStyle()
                .set("flex", "1").set("min-width", "0")
                .set("display", "flex").set("flex-direction", "column").set("gap", "2px");

        // Dates
        var dateDebut = buildDataCol("Emprunté le",
                emprunt.getDateDebut() != null ? emprunt.getDateDebut().format(FMT) : "—", false);

        // Mise en évidence si retour bientôt (<= 3 jours)
        boolean urgent = emprunt.getDateFin() != null
                && !emprunt.getDateFin().isAfter(LocalDate.now().plusDays(3));
        var dateFin = buildDataCol("À rendre le",
                emprunt.getDateFin() != null ? emprunt.getDateFin().format(FMT) : "—", urgent);

        // Bouton prolonger
        boolean dejaProlonge = Boolean.TRUE.equals(emprunt.getEstProlonge());
        var prolongerBtn = new Button(dejaProlonge ? "Prolongé ✓" : "Prolonger");
        prolongerBtn.addClassName("btn-mini");
        if (dejaProlonge) prolongerBtn.addClassName("btn-ghost");
        prolongerBtn.setEnabled(!dejaProlonge);
        prolongerBtn.addClickListener(e -> {
            try {
                empruntsService.prolonger(doc.getIdDocument(), utilisateurCourant);
                Notification.show("Prêt prolongé — nouvelle date enregistrée.",
                                2600, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                reload();
            } catch (IllegalStateException ex) {
                Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });

        var row = new Div(miniCover, infoDiv, dateDebut, dateFin, prolongerBtn);
        row.addClassName("biblio-lrow");
        return row;
    }

    // ── Réservations ──────────────────────────────────────────────────────────
    private void loadReservations() {
        reservesDiv.removeAll();
        reservesDiv.removeClassName("biblio-rows");

        List<Reservation> reservations = reservationService.getReservationsActives(utilisateurCourant);
        if (reservations.isEmpty()) {
            reservesDiv.add(buildEmpty("Aucune réservation active.", "Réservez un document disponible ci-dessous."));
            return;
        }

        reservesDiv.addClassName("biblio-rows");
        reservations.forEach(r -> reservesDiv.add(buildReservationRow(r)));
    }

    private Div buildReservationRow(Reservation r) {
        var doc = r.getDocument();

        var miniCover = buildMiniCover(doc);

        var titreSpan  = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titreSpan.addClassName("biblio-lrow-title");
        var auteurSpan = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNom() + " " + doc.getAuteur().getPrenom() : "");
        auteurSpan.addClassName("biblio-lrow-sub");

        // Statut de la réservation
        boolean expiree = r.getDateFin() != null && r.getDateFin().isBefore(LocalDate.now());
        var statusBadge = new Span(expiree ? "Expirée" : "Active");
        statusBadge.addClassNames("badge", expiree ? "badge-indispo" : "badge-dispo");
        statusBadge.getElement().getStyle().set("margin-top", "5px").set("display", "inline-block");

        var infoDiv = new Div(titreSpan, auteurSpan, statusBadge);
        infoDiv.getElement().getStyle()
                .set("flex", "1").set("min-width", "0")
                .set("display", "flex").set("flex-direction", "column").set("gap", "2px");

        var dateDebut = buildDataCol("Réservé le",
                r.getDateDebut() != null ? r.getDateDebut().format(FMT) : "—", false);

        boolean expire = r.getDateFin() != null
                && !r.getDateFin().isAfter(LocalDate.now().plusDays(3));
        var dateFin = buildDataCol("Expire le",
                r.getDateFin() != null ? r.getDateFin().format(FMT) : "—", expire);

        // Bouton Emprunter — convertit la réservation en emprunt (annule la résa automatiquement)
        var emprunterBtn = new Button("Emprunter");
        emprunterBtn.addClassName("btn-mini");
        emprunterBtn.setEnabled(!expiree);
        emprunterBtn.addClickListener(e -> {
            try {
                empruntsService.creerPret(doc.getIdDocument(), utilisateurCourant);
                Notification.show("« " + doc.getTitre() + " » emprunté — bonne lecture !",
                                2800, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                reload();
            } catch (IllegalStateException ex) {
                Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });

        var annulerBtn = new Button("Annuler");
        annulerBtn.addClassName("btn-ghost");
        annulerBtn.addClassName("btn-mini");
        annulerBtn.addClickListener(e -> {
            reservationService.annuler(doc.getIdDocument(), utilisateurCourant);
            Notification.show("Réservation annulée.", 2000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_CONTRAST);
            reload();
        });

        // Groupe les deux boutons verticalement à droite
        var btns = new Div(emprunterBtn, annulerBtn);
        btns.getElement().getStyle()
                .set("display", "flex").set("flex-direction", "column")
                .set("gap", "6px").set("align-items", "flex-end").set("flex-shrink", "0");

        var row = new Div(miniCover, infoDiv, dateDebut, dateFin, btns);
        row.addClassName("biblio-lrow");
        return row;
    }

    // ── Catalogue des documents disponibles ───────────────────────────────────
    private void loadCatalogue() {
        catalogueDiv.removeAll();

        List<Document> dispo = documentService.getDerniersDocuments(10);
        if (dispo.isEmpty()) {
            catalogueDiv.add(buildEmpty("Aucun document disponible.", "Revenez bientôt."));
            return;
        }

        catalogueDiv.addClassName("biblio-grid");
        dispo.forEach(doc -> catalogueDiv.add(buildDocCard(doc)));
    }

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
        bottomDiv.getElement().getStyle()
                .set("display", "flex").set("flex-direction", "column").set("gap", "3px");

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

        boolean disponible = Boolean.TRUE.equals(doc.getEstEmpruntable())
                && documentService.isDisponible(doc.getIdDocument());

        var badge = new Span(disponible ? "Disponible" : "Indisponible");
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
        try {
            reservationService.reserver(doc.getIdDocument(), utilisateurCourant);
            Notification.show("« " + doc.getTitre() + " » réservé — disponible 14 jours.",
                            2800, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            reload();
        } catch (IllegalStateException ex) {
            Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }

    // ── Utilitaires ───────────────────────────────────────────────────────────
    private Div buildMiniCover(Document doc) {
        var miniCover = new Div();
        miniCover.addClassName("biblio-mini-cover");
        miniCover.getElement().getStyle().set("background", resolveColor(doc));
        return miniCover;
    }

    private Div buildDataCol(String label, String value, boolean warn) {
        var lbl = new Span(label);
        lbl.addClassName("biblio-data-lbl");
        var val = new Span(value);
        val.addClassName("biblio-data-val");
        if (warn) val.addClassName("warn");
        var col = new Div(lbl, val);
        col.addClassName("biblio-data-col");
        return col;
    }

    private Div buildEmpty(String titre, String message) {
        var titleEl = new Span(titre);
        titleEl.addClassName("biblio-empty-title");
        titleEl.addClassName("serif");
        var msg = new Paragraph(message);
        var div = new Div(titleEl, msg);
        div.addClassName("biblio-empty");
        return div;
    }

    private Div buildNotConnected() {
        var titleEl = new H1("Connectez-vous");
        titleEl.addClassName("biblio-hero-title");

        var sub = new Paragraph("Votre espace personnel est accessible après connexion.");
        sub.addClassName("biblio-subtitle");

        var loginBtn = new Button("Se connecter");
        loginBtn.addClassName("biblio-btn-primary");
        loginBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        loginBtn.addClickListener(e -> getUI().ifPresent(ui -> ui.navigate("login")));
        loginBtn.getElement().getStyle().set("margin-top", "24px");

        var div = new Div(titleEl, sub, loginBtn);
        div.addClassName("biblio-hero");
        return div;
    }

    private String resolveColor(Document doc) {
        if (doc == null || doc.getFormat() == null) return "#2e3a52";
        return switch (doc.getFormat().getLargeur().toUpperCase()) {
            case "CD"  -> "#5e2e22";
            case "DVD" -> "#46243a";
            default    -> "#2e3a52";
        };
    }
}