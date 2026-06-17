package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.service.RegleService;
import com.vaadin.flow.component.ModalityMode;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

/**
 * Panneau de gestion des règles paramétrables (paramètres métier de la
 * bibliothèque), embarqué dans {@link GestionView}. Réservé aux bibliothécaires.
 *
 * <p>Les types {@code NB_PRET}, {@code DUREE_PRET} et {@code DELAI_RESERVATION}
 * pilotent la logique d'emprunt/réservation : leur clé technique n'est pas
 * modifiable une fois la règle créée, seule la valeur l'est.</p>
 */
public class ReglesPanel extends VerticalLayout {

    private final RegleService regleService;

    private final Grid<Regle> grid = new Grid<>(Regle.class, false);

    // ── Éditeur ──
    private final Dialog    editeur   = new Dialog();
    private final TextField intitule  = new TextField("Intitulé");
    private final TextField type      = new TextField("Type (clé technique)");
    private final TextField valeur    = new TextField("Valeur");
    private final Button    deleteBtn = new Button("Supprimer", VaadinIcon.TRASH.create());
    private Regle courant;

    public ReglesPanel(RegleService regleService) {
        this.regleService = regleService;

        setPadding(false);
        setSpacing(false);
        setWidthFull();

        add(buildInfo(), buildToolbar(), grid);
        configurerGrid();
        configurerEditeur();
        rafraichir();
    }

    // ── Note explicative ──
    private Paragraph buildInfo() {
        var info = new Paragraph(
                "Modifiez la valeur des paramètres métier (nombre max de prêts, durée de prêt, "
                        + "délai de réservation…). Une valeur peut être un nombre seul (ex. 10) ou "
                        + "un texte contenant un nombre (ex. « 5 semaines ») : le premier entier est utilisé.");
        info.getElement().getStyle()
                .set("font-size", "12.5px").set("color", "var(--ink-soft)")
                .set("margin", "0 0 16px");
        return info;
    }

    // ── Barre d'ajout ──
    private HorizontalLayout buildToolbar() {
        var ajouter = new Button("Ajouter une règle", VaadinIcon.PLUS.create(),
                e -> ouvrirEditeur(null));
        ajouter.addClassName("biblio-btn-primary");
        ajouter.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var bar = new HorizontalLayout(ajouter);
        bar.setWidthFull();
        bar.getElement().getStyle().set("margin-bottom", "16px");
        return bar;
    }

    // ── Grille ──
    private void configurerGrid() {
        grid.addColumn(r -> nz(r.getIntituleRegle()))
                .setHeader("Intitulé").setAutoWidth(true).setFlexGrow(1);
        grid.addColumn(r -> nz(r.getTypeRegle()))
                .setHeader("Type").setAutoWidth(true);
        grid.addColumn(r -> nz(r.getValeurRegle()))
                .setHeader("Valeur").setWidth("120px").setFlexGrow(0);

        grid.setHeight("440px");
        grid.asSingleSelect().addValueChangeListener(e -> {
            if (e.getValue() != null) ouvrirEditeur(e.getValue());
        });
    }

    private void rafraichir() {
        grid.deselectAll();
        grid.setItems(regleService.getAllRegles());
    }

    // ── Éditeur (Dialog) ──
    private void configurerEditeur() {
        var form = new FormLayout(intitule, type, valeur);
        form.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("480px", 2));
        form.setColspan(intitule, 2);

        var titreDialog = new H2("Règle");
        titreDialog.addClassName("biblio-section-title");
        titreDialog.getElement().getStyle().set("margin-bottom", "18px");

        var enregistrer = new Button("Enregistrer", e -> enregistrer());
        enregistrer.addClassName("biblio-btn-primary");
        enregistrer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var annuler = new Button("Annuler", e -> editeur.close());
        annuler.addClassName("btn-ghost");

        deleteBtn.addThemeVariants(ButtonVariant.LUMO_ERROR);
        deleteBtn.addClickListener(e -> supprimer());

        var gauche = new HorizontalLayout(enregistrer, annuler);
        gauche.getElement().getStyle().set("gap", "10px");
        var actions = new HorizontalLayout(gauche, deleteBtn);
        actions.setWidthFull();
        actions.setJustifyContentMode(JustifyContentMode.BETWEEN);
        actions.getElement().getStyle().set("margin-top", "22px");

        var contenu = new VerticalLayout(titreDialog, form, actions);
        contenu.setPadding(true);
        contenu.setSpacing(false);
        contenu.getElement().getStyle().set("min-width", "480px");

        editeur.add(contenu);
        editeur.setModality(ModalityMode.VISUAL);
    }

    private void ouvrirEditeur(Regle r) {
        courant = r;
        boolean creation = (r == null);

        intitule.clear();
        type.clear();
        valeur.clear();

        if (!creation) {
            intitule.setValue(nz(r.getIntituleRegle()));
            type.setValue(nz(r.getTypeRegle()));
            valeur.setValue(nz(r.getValeurRegle()));
        }

        // La clé technique ne se modifie pas sur une règle existante
        type.setEnabled(creation);
        deleteBtn.setVisible(!creation);
        editeur.open();
    }

    private void enregistrer() {
        if (intitule.isEmpty()) { erreur("L'intitulé est obligatoire.");            return; }
        if (type.isEmpty())     { erreur("Le type (clé technique) est obligatoire."); return; }
        if (valeur.isEmpty())   { erreur("La valeur est obligatoire.");              return; }

        Regle r = (courant != null) ? courant : new Regle();
        r.setIntituleRegle(intitule.getValue());
        r.setTypeRegle(type.getValue().trim());
        r.setValeurRegle(valeur.getValue().trim());

        try {
            regleService.saveRegle(r);
            succes(courant == null ? "Règle créée." : "Règle mise à jour.");
            editeur.close();
            rafraichir();
        } catch (Exception ex) {
            erreur("Échec de l'enregistrement : " + ex.getMessage());
        }
    }

    private void supprimer() {
        if (courant == null) return;
        try {
            regleService.deleteRegleById(courant.getIdRegle());
            succes("Règle supprimée.");
            editeur.close();
            rafraichir();
        } catch (Exception ex) {
            erreur("Suppression impossible : " + ex.getMessage());
        }
    }

    // ── Utilitaires ──
    private String nz(String s) { return s != null ? s : ""; }

    private void succes(String m) {
        Notification.show(m, 2500, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    private void erreur(String m) {
        Notification.show(m, 3000, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_ERROR);
    }
}