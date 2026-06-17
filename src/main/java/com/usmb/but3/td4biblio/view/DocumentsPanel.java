package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.*;
import com.usmb.but3.td4biblio.service.AuteurService;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.vaadin.flow.component.ModalityMode;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import org.springframework.util.StringUtils;

import java.time.Duration;

/**
 * Panneau de gestion documentaire (côté bibliothécaire), embarqué dans
 * {@link GestionView}. Reprend la logique de l'ancienne DocumentManageView,
 * sans annotation de route ni garde d'accès (gérées par GestionView).
 */
public class DocumentsPanel extends VerticalLayout {

    private final DocumentService documentService;
    private final AuteurService   auteurService;

    private final Grid<Document> grid   = new Grid<>(Document.class, false);
    private final TextField      filter = new TextField();

    // ── Champs de l'éditeur ──
    private final TextField                  titre           = new TextField("Titre");
    private final ComboBox<Auteur>           auteurBox       = new ComboBox<>("Auteur");
    private final ComboBox<Format>           formatBox       = new ComboBox<>("Type / format");
    private final TextField                  description     = new TextField("Description");
    private final TextField                  codeEmplacement = new TextField("Code emplacement");
    private final DatePicker                 datePublication = new DatePicker("Date de publication");
    private final DatePicker                 dateAcquisition = new DatePicker("Date d'acquisition");
    private final TextField                  media           = new TextField("Visuel (URL image / GIF)");
    private final Checkbox                   empruntable     = new Checkbox("Empruntable");
    private final ComboBox<RaisonPasEmprunt> motifBox        = new ComboBox<>("Motif de non-emprunt");
    // Spécifique Livre
    private final TextField                  isbn            = new TextField("ISBN");
    private final IntegerField               nbPages         = new IntegerField("Nombre de pages");
    private final ComboBox<Editeur>          editeurBox      = new ComboBox<>("Éditeur");
    // Spécifique CD/DVD
    private final IntegerField               duree           = new IntegerField("Durée (minutes)");

    private final Dialog editeur   = new Dialog();
    private final Button deleteBtn = new Button("Supprimer", VaadinIcon.TRASH.create());
    private Document courant;

    public DocumentsPanel(DocumentService documentService, AuteurService auteurService) {
        this.documentService = documentService;
        this.auteurService   = auteurService;

        setPadding(false);
        setSpacing(false);
        setWidthFull();

        add(buildToolbar(), grid);   // pas de buildHeader() : GestionView a déjà son titre
        configurerGrid();
        configurerEditeur();
        listDocuments(null);
    }

    // ── Barre filtre + ajout ─────────────────────────────────────────────────
    private HorizontalLayout buildToolbar() {
        filter.setPlaceholder("Filtrer par titre…");
        filter.setClearButtonVisible(true);
        filter.setValueChangeMode(ValueChangeMode.LAZY);
        filter.getElement().getStyle().set("flex", "1");
        filter.addValueChangeListener(e -> listDocuments(e.getValue()));

        var ajouter = new Button("Ajouter un document", VaadinIcon.PLUS.create());
        ajouter.addClassName("biblio-btn-primary");
        ajouter.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        ajouter.addClickListener(e -> ouvrirEditeur(null));

        var bar = new HorizontalLayout(filter, ajouter);
        bar.setWidthFull();
        bar.setAlignItems(Alignment.CENTER);
        bar.getElement().getStyle().set("margin-bottom", "16px");
        return bar;
    }

    // ── Grille ────────────────────────────────────────────────────────────────
    private void configurerGrid() {
        grid.addColumn(Document::getTitre)
                .setHeader("Titre").setFlexGrow(1).setAutoWidth(true);
        grid.addColumn(d -> d.getAuteur() != null
                        ? (d.getAuteur().getNom() + " " + nz(d.getAuteur().getPrenom())).trim() : "—")
                .setHeader("Auteur").setAutoWidth(true);
        grid.addColumn(d -> d.getFormat() != null ? nz(d.getFormat().getLargeur()) : "—")
                .setHeader("Type").setWidth("90px").setFlexGrow(0);
        grid.addColumn(d -> nz(d.getCodeEmplacement()))
                .setHeader("Emplacement").setWidth("120px").setFlexGrow(0);
        grid.addColumn(d -> Boolean.TRUE.equals(d.getEstEmpruntable()) ? "Oui" : "Non")
                .setHeader("Empruntable").setWidth("110px").setFlexGrow(0);

        grid.setHeight("440px");
        grid.asSingleSelect().addValueChangeListener(e -> {
            if (e.getValue() != null) ouvrirEditeur(e.getValue());
        });
    }

    private void listDocuments(String filtre) {
        grid.deselectAll();
        if (StringUtils.hasText(filtre)) {
            grid.setItems(documentService.getByTitreContainingIgnoreCase(filtre));
        } else {
            grid.setItems(documentService.getAllDocuments());
        }
    }

    // ── Éditeur (Dialog) ─────────────────────────────────────────────────────
    private void configurerEditeur() {
        auteurBox.setItems(auteurService.getAllAuteurs());
        auteurBox.setItemLabelGenerator(Auteur::getDesc);
        auteurBox.setClearButtonVisible(true);

        formatBox.setItems(documentService.getFormats());
        formatBox.setItemLabelGenerator(f -> nz(f.getLargeur()));
        formatBox.addValueChangeListener(e -> toggleTypeFields());

        editeurBox.setItems(documentService.getEditeurs());
        editeurBox.setItemLabelGenerator(ed -> nz(ed.getNomSociete()));
        editeurBox.setClearButtonVisible(true);

        motifBox.setItems(documentService.getRaisons());
        motifBox.setItemLabelGenerator(r -> nz(r.getLibelleRaison()));
        motifBox.setClearButtonVisible(true);

        empruntable.addValueChangeListener(e -> toggleMotif());

        codeEmplacement.setMaxLength(10);
        isbn.setMaxLength(15);
        datePublication.setLocale(java.util.Locale.FRANCE);
        dateAcquisition.setLocale(java.util.Locale.FRANCE);

        var form = new FormLayout(
                titre, auteurBox, formatBox, description,
                codeEmplacement, media, datePublication, dateAcquisition,
                empruntable, motifBox,
                isbn, nbPages, editeurBox, duree);
        form.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0",     1),
                new FormLayout.ResponsiveStep("480px", 2));
        form.setColspan(titre, 2);
        form.setColspan(media, 2);
        form.setColspan(description, 2);

        var titreDialog = new H2("Document");
        titreDialog.addClassName("biblio-section-title");
        titreDialog.getElement().getStyle().set("margin-bottom", "18px");

        var enregistrer = new Button("Enregistrer", e -> enregistrer());
        enregistrer.addClassName("biblio-btn-primary");
        enregistrer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var annuler = new Button("Annuler", e -> editeur.close());
        annuler.addClassName("btn-ghost");

        deleteBtn.addThemeVariants(ButtonVariant.LUMO_ERROR);
        deleteBtn.addClickListener(e -> supprimer());

        var actionsGauche = new HorizontalLayout(enregistrer, annuler);
        actionsGauche.getElement().getStyle().set("gap", "10px");
        var actions = new HorizontalLayout(actionsGauche, deleteBtn);
        actions.setWidthFull();
        actions.setJustifyContentMode(JustifyContentMode.BETWEEN);
        actions.getElement().getStyle().set("margin-top", "22px");

        var contenu = new VerticalLayout(titreDialog, form, actions);
        contenu.setPadding(true);
        contenu.setSpacing(false);
        contenu.getElement().getStyle().set("min-width", "560px");

        editeur.add(contenu);
        editeur.setModality(ModalityMode.VISUAL);
    }

    private void ouvrirEditeur(Document d) {
        courant = d;
        boolean creation = (d == null);

        titre.clear(); auteurBox.clear(); formatBox.clear(); description.clear();
        codeEmplacement.clear(); media.clear(); datePublication.clear();
        dateAcquisition.clear(); empruntable.setValue(true); motifBox.clear();
        isbn.clear(); nbPages.clear(); editeurBox.clear(); duree.clear();

        if (!creation) {
            titre.setValue(nz(d.getTitre()));
            auteurBox.setValue(d.getAuteur());
            formatBox.setValue(d.getFormat());
            description.setValue(nz(d.getDescription()));
            codeEmplacement.setValue(nz(d.getCodeEmplacement()));
            media.setValue(nz(d.getGif()));
            datePublication.setValue(
                    d.getDatePublication() != null ? d.getDatePublication().toLocalDate() : null);
            dateAcquisition.setValue(
                    d.getDateAcquisition() != null ? d.getDateAcquisition().toLocalDate() : null);
            empruntable.setValue(Boolean.TRUE.equals(d.getEstEmpruntable()));
            if (d instanceof Livre l) {
                isbn.setValue(nz(l.getCodeISBN()));
                nbPages.setValue(l.getNbPages());
                editeurBox.setValue(l.getEditeur());
            } else if (d instanceof CDDVD c && c.getDuree() != null) {
                duree.setValue((int) c.getDuree().toMinutes());
            }
            motifBox.setValue(documentService.getMotifDuDocument(d.getIdDocument()));
        }

        toggleTypeFields();
        toggleMotif();
        deleteBtn.setVisible(!creation);
        editeur.open();
    }

    // ── Affichage conditionnel des champs ─────────────────────────────────────
    private void toggleTypeFields() {
        Format f    = formatBox.getValue();
        boolean livre = estLivre(f);
        boolean cd    = estCdDvd(f);
        isbn.setVisible(livre);
        nbPages.setVisible(livre);
        editeurBox.setVisible(livre);
        duree.setVisible(cd);
    }

    private void toggleMotif() {
        motifBox.setVisible(!Boolean.TRUE.equals(empruntable.getValue()));
    }

    // ── Enregistrement ────────────────────────────────────────────────────────
    private void enregistrer() {
        if (titre.isEmpty())         { erreur("Le titre est obligatoire."); return; }
        Format fmt = formatBox.getValue();
        if (fmt == null)             { erreur("Le type / format est obligatoire."); return; }

        Document doc;
        if (courant != null) {
            doc = courant;
        } else {
            doc = estLivre(fmt) ? new Livre() : (estCdDvd(fmt) ? new CDDVD() : new Document());
        }

        doc.setTitre(titre.getValue());
        doc.setAuteur(auteurBox.getValue());
        doc.setFormat(fmt);
        doc.setDescription(description.getValue());
        doc.setCodeEmplacement(codeEmplacement.getValue());
        doc.setGif(media.getValue());
        doc.setDatePublication(
                datePublication.getValue() != null ? datePublication.getValue().atStartOfDay() : null);
        doc.setDateAcquisition(
                dateAcquisition.getValue() != null ? dateAcquisition.getValue().atStartOfDay() : null);
        doc.setEstEmpruntable(empruntable.getValue());

        if (doc instanceof Livre livre) {
            livre.setCodeISBN(isbn.getValue());
            livre.setNbPages(nbPages.getValue());
            livre.setEditeur(editeurBox.getValue());
        } else if (doc instanceof CDDVD cd) {
            cd.setDuree(duree.getValue() != null ? Duration.ofMinutes(duree.getValue()) : null);
        }

        RaisonPasEmprunt motif = Boolean.TRUE.equals(empruntable.getValue())
                ? null : motifBox.getValue();

        try {
            documentService.enregistrerDocument(doc, motif);
            succes(courant == null ? "Document créé." : "Document mis à jour.");
            editeur.close();
            listDocuments(filter.getValue());
        } catch (Exception ex) {
            erreur("Échec de l'enregistrement : " + ex.getMessage());
        }
    }

    private void supprimer() {
        if (courant == null) return;
        try {
            documentService.supprimerDocument(courant.getIdDocument());
            succes("Document supprimé.");
            editeur.close();
            listDocuments(filter.getValue());
        } catch (Exception ex) {
            erreur("Suppression impossible : le document est référencé (emprunts, réservations…).");
        }
    }

    // ── Utilitaires ──────────────────────────────────────────────────────────
    private boolean estLivre(Format f) {
        return f != null && f.getLargeur() != null && f.getLargeur().equalsIgnoreCase("Livre");
    }

    private boolean estCdDvd(Format f) {
        if (f == null || f.getLargeur() == null) return false;
        String l = f.getLargeur().toLowerCase();
        return l.equals("cd") || l.equals("dvd");
    }

    private String nz(String s) { return s != null ? s : ""; }

    private void succes(String msg) {
        Notification.show(msg, 2500, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    private void erreur(String msg) {
        Notification.show(msg, 3000, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_ERROR);
    }
}