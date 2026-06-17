package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.service.RegleService;
import com.vaadin.flow.component.ModalityMode;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

/**
 * Panneau de modification des règles paramétrables (paramètres métier),
 * embarqué dans {@link GestionView}. On ne peut que modifier la VALEUR des
 * règles déjà présentes : pas d'ajout ni de suppression, et la clé technique
 * (type) reste figée pour ne pas casser la logique d'emprunt/réservation.
 */
public class ReglesPanel extends VerticalLayout {

    private final RegleService regleService;

    private final Grid<Regle> grid = new Grid<>(Regle.class, false);

    // ── Éditeur ──
    private final Dialog    editeur  = new Dialog();
    private final TextField intitule = new TextField("Intitulé");
    private final TextField type     = new TextField("Type (clé technique)");
    private final TextField valeur   = new TextField("Valeur");
    private Regle courant;

    public ReglesPanel(RegleService regleService) {
        this.regleService = regleService;

        setPadding(false);
        setSpacing(false);
        setWidthFull();

        add(buildInfo(), grid);
        configurerGrid();
        configurerEditeur();
        rafraichir();
    }

    // ── Note explicative ──
    private Paragraph buildInfo() {
        var info = new Paragraph(
                "Sélectionnez un paramètre pour modifier sa valeur (nombre max de prêts, durée de "
                        + "prêt, délai de réservation…). Une valeur peut être un nombre seul (ex. 10) "
                        + "ou un texte contenant un nombre (ex. « 5 semaines ») : le premier entier est utilisé.");
        info.getElement().getStyle()
                .set("font-size", "12.5px").set("color", "var(--ink-soft)")
                .set("margin", "0 0 16px");
        return info;
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

    // ── Éditeur (Dialog) — seule la valeur est modifiable ──
    private void configurerEditeur() {
        intitule.setReadOnly(true);
        type.setReadOnly(true);

        var form = new FormLayout(intitule, type, valeur);
        form.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("480px", 2));
        form.setColspan(intitule, 2);

        var titreDialog = new H2("Modifier le paramètre");
        titreDialog.addClassName("biblio-section-title");
        titreDialog.getElement().getStyle().set("margin-bottom", "18px");

        var enregistrer = new Button("Enregistrer", e -> enregistrer());
        enregistrer.addClassName("biblio-btn-primary");
        enregistrer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var annuler = new Button("Annuler", e -> editeur.close());
        annuler.addClassName("btn-ghost");

        var actions = new HorizontalLayout(enregistrer, annuler);
        actions.getElement().getStyle().set("gap", "10px").set("margin-top", "22px");

        var contenu = new VerticalLayout(titreDialog, form, actions);
        contenu.setPadding(true);
        contenu.setSpacing(false);
        contenu.getElement().getStyle().set("min-width", "480px");

        editeur.add(contenu);
        editeur.setModality(ModalityMode.VISUAL);
    }

    private void ouvrirEditeur(Regle r) {
        courant = r;
        intitule.setValue(nz(r.getIntituleRegle()));
        type.setValue(nz(r.getTypeRegle()));
        valeur.setValue(nz(r.getValeurRegle()));
        editeur.open();
    }

    private void enregistrer() {
        if (courant == null) return;
        if (valeur.isEmpty()) { erreur("La valeur est obligatoire."); return; }

        courant.setValeurRegle(valeur.getValue().trim());
        try {
            regleService.saveRegle(courant);
            succes("Paramètre mis à jour.");
            editeur.close();
            rafraichir();
        } catch (Exception ex) {
            erreur("Échec de l'enregistrement : " + ex.getMessage());
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