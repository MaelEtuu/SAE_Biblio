package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.EmpruntsService;
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

@Route(value = "emprunts")
@PageTitle("Mes emprunts — BiblioVaadin")
@Menu(title = "Mes emprunts", order = 3, icon = "vaadin:archives")
public class EmpruntsView extends VerticalLayout {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.FRENCH);

    private final EmpruntsService empruntsService;

    // TODO : remplacer par la session utilisateur réelle
    private Utilisateur utilisateurCourant;

    private final Div rowsDiv = new Div();

    public EmpruntsView(EmpruntsService empruntsService) {
        this.empruntsService = empruntsService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        var titleH2 = new H2("Mes emprunts");
        titleH2.addClassName("biblio-section-title");
        var meta = new Span("Prolongation possible une fois");
        meta.addClassName("biblio-section-meta");

        var head = new HorizontalLayout(titleH2, meta);
        head.addClassName("biblio-section-head");
        head.setAlignItems(Alignment.BASELINE);
        head.setWidthFull();

        add(head, rowsDiv);
        loadEmprunts();
    }

    private void loadEmprunts() {
        rowsDiv.removeAll();
        rowsDiv.removeClassName("biblio-rows");

        if (utilisateurCourant == null) {
            rowsDiv.add(buildEmpty("Connectez-vous pour voir vos emprunts."));
            return;
        }

        List<Emprunts> emprunts = empruntsService.getEmpruntsEnCours(utilisateurCourant);

        if (emprunts.isEmpty()) {
            rowsDiv.add(buildEmpty("Aucun emprunt en cours."));
            return;
        }

        rowsDiv.addClassName("biblio-rows");
        emprunts.forEach(e -> rowsDiv.add(buildEmpruntRow(e)));
    }

    private Div buildEmpruntRow(Emprunts emprunt) {
        var doc = emprunt.getDocument();

        // Mini-couverture
        var miniCover = new Div();
        miniCover.addClassName("biblio-mini-cover");
        miniCover.getElement().getStyle().set("background", resolveColor(doc));

        // Infos
        var titreSpan = new Span(doc.getTitre() != null ? doc.getTitre() : "");
        titreSpan.addClassName("biblio-lrow-title");
        var auteurSpan = new Span(doc.getAuteur() != null
                ? doc.getAuteur().getNomSociete() + " " + doc.getAuteur().getPrenom() : "");
        auteurSpan.addClassName("biblio-lrow-sub");

        var infoDiv = new Div(titreSpan, auteurSpan);
        infoDiv.getElement().getStyle()
                .set("flex", "1").set("min-width", "0")
                .set("display", "flex").set("flex-direction", "column").set("gap", "2px");

        // Date de retour
        var dateFinDiv = buildDataCol("À rendre",
                emprunt.getDateFin() != null ? emprunt.getDateFin().format(FMT) : "—", false);

        // Bouton prolonger
        boolean dejaProlonge = Boolean.TRUE.equals(emprunt.getEstProlonge());
        var prolongerBtn = new Button(dejaProlonge ? "Prolongé ✓" : "Prolonger");
        prolongerBtn.addClassName("btn-mini");
        if (dejaProlonge) prolongerBtn.addClassName("btn-ghost");
        prolongerBtn.setEnabled(!dejaProlonge);
        prolongerBtn.addClickListener(e -> {
            try {
                empruntsService.prolonger(doc.getIdDocument(), utilisateurCourant);
                Notification.show("Prêt prolongé de 3 semaines (une seule fois).",
                                2600, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                loadEmprunts();
            } catch (IllegalStateException ex) {
                Notification.show(ex.getMessage(), 2500, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });

        var row = new Div(miniCover, infoDiv, dateFinDiv, prolongerBtn);
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
        var title = new Span("Aucun emprunt");
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