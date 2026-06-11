package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Route(value = "reservations")
@PageTitle("Mes réservations — BiblioVaadin")
@Menu(title = "Mes réservations", order = 2, icon = "vaadin:bookmark")
public class ReservationsView extends VerticalLayout {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.FRENCH);

    private final ReservationService reservationService;

    private Utilisateur utilisateurCourant = SessionUtils.getUtilisateur();

    private final Div rowsDiv = new Div();

    public ReservationsView(ReservationService reservationService) {
        this.reservationService = reservationService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        var titleH2 = new H2("Mes réservations");
        titleH2.addClassName("biblio-section-title");
        var meta = new Span("Tenues 2 semaines · annulées automatiquement après échéance");
        meta.addClassName("biblio-section-meta");

        var head = new HorizontalLayout(titleH2, meta);
        head.addClassName("biblio-section-head");
        head.setAlignItems(Alignment.BASELINE);
        head.setWidthFull();

        add(head, rowsDiv);
        loadReservations();
    }

    private void loadReservations() {
        rowsDiv.removeAll();
        rowsDiv.removeClassName("biblio-rows");

        if (utilisateurCourant == null) {
            rowsDiv.add(buildEmpty("Connectez-vous pour voir vos réservations."));
            return;
        }

        List<Reservation> reservations =
                reservationService.getReservationsActives(utilisateurCourant);

        if (reservations.isEmpty()) {
            rowsDiv.add(buildEmpty(
                    "Aucune réservation active. Réservez un document disponible depuis le catalogue."));
            return;
        }

        rowsDiv.addClassName("biblio-rows");
        reservations.forEach(r -> rowsDiv.add(buildReservationRow(r)));
    }

    private Div buildReservationRow(Reservation r) {
        var doc = r.getDocument();

        // Mini-couverture
        var miniCover = new Div();
        miniCover.addClassName("biblio-mini-cover");
        miniCover.getElement().getStyle().set("background", resolveColor(doc));

        // Infos titre / auteur
        var titreSpan = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titreSpan.addClassName("biblio-lrow-title");
        var auteurSpan = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNom() + " " + doc.getAuteur().getPrenom() : "");
        auteurSpan.addClassName("biblio-lrow-sub");

        var infoDiv = new Div(titreSpan, auteurSpan);
        infoDiv.getElement().getStyle()
                .set("flex", "1").set("min-width", "0")
                .set("display", "flex").set("flex-direction", "column").set("gap", "2px");

        // Date de réservation
        var dateDebutDiv = buildDataCol("Réservé le",
                r.getDateDebut() != null ? r.getDateDebut().format(FMT) : "—", false);

        // Date d'expiration
        var dateFinDiv = buildDataCol("Expire le",
                r.getDateFin() != null ? r.getDateFin().format(FMT) : "—", true);

        // Bouton annuler
        var annulerBtn = new Button("Annuler");
        annulerBtn.addClassName("btn-ghost");
        annulerBtn.addClassName("btn-mini");
        annulerBtn.addClickListener(e -> {
            reservationService.annuler(doc.getIdDocument(), utilisateurCourant);
            Notification.show("Réservation annulée.", 2000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_CONTRAST);
            loadReservations();
        });

        var row = new Div(miniCover, infoDiv, dateDebutDiv, dateFinDiv, annulerBtn);
        row.addClassName("biblio-lrow");
        return row;
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

    private Div buildEmpty(String message) {
        var title = new Span("Aucune réservation");
        title.addClassName("biblio-empty-title");
        title.addClassName("serif");
        var msg = new Paragraph(message);
        var div = new Div(title, msg);
        div.addClassName("biblio-empty");
        return div;
    }

    private String resolveColor(com.usmb.but3.td4biblio.entity.Document doc) {
        if (doc == null || doc.getFormat() == null) return "#2e3a52";
        return switch (doc.getFormat().getLargeur().toUpperCase()) {
            case "CD"  -> "#5e2e22";
            case "DVD" -> "#46243a";
            default    -> "#2e3a52";
        };
    }
}