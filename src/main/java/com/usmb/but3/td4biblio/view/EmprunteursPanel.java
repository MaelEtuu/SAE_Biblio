package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.UtilisateurService;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.ModalityMode;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

/** Panneau de gestion des emprunteurs (côté bibliothécaire) : liste, recherches,
 *  modification/suppression et consultation de l'historique des emprunts. */
public class EmprunteursPanel extends VerticalLayout {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("d MMM yyyy", Locale.FRENCH);

    private final UtilisateurService utilisateurService;
    private final EmpruntsService    empruntsService;

    private final ComboBox<String>  typeRecherche = new ComboBox<>();
    private final TextField         terme         = new TextField();
    private final Grid<Utilisateur> grid          = new Grid<>(Utilisateur.class, false);

    // ── Éditeur ──
    private final Dialog     editeur       = new Dialog();
    private final TextField  prenom        = new TextField("Prénom");
    private final TextField  nom           = new TextField("Nom");
    private final EmailField mail          = new EmailField("E-mail");
    private final TextField  adresse       = new TextField("Adresse");
    private final TextField  ville         = new TextField("Ville");
    private final TextField  codePostal    = new TextField("Code postal");
    private final DatePicker dateNaissance = new DatePicker("Date de naissance");
    private final DatePicker dateFinAbo    = new DatePicker("Fin d'abonnement");
    private Utilisateur courant;

    public EmprunteursPanel(UtilisateurService utilisateurService,
                            EmpruntsService empruntsService) {
        this.utilisateurService = utilisateurService;
        this.empruntsService    = empruntsService;

        setPadding(false);
        setSpacing(false);
        setWidthFull();

        add(buildToolbar(), grid);
        configurerGrid();
        configurerEditeur();
        grid.setItems(utilisateurService.getTousEmprunteurs());
    }

    // ── Barre de recherche ──
    private HorizontalLayout buildToolbar() {
        typeRecherche.setItems("Tous", "Par nom", "Par n° de carte",
                "Abonnement expiré", "Emprunt en cours");
        typeRecherche.setValue("Tous");
        typeRecherche.setWidth("210px");
        typeRecherche.addValueChangeListener(e -> {
            boolean champ = "Par nom".equals(e.getValue())
                    || "Par n° de carte".equals(e.getValue());
            terme.setVisible(champ);
            if (!champ) rechercher();
        });

        terme.setPlaceholder("Nom ou numéro de carte…");
        terme.setVisible(false);
        terme.getElement().getStyle().set("flex", "1");
        terme.addKeyPressListener(Key.ENTER, e -> rechercher());

        var btn = new Button("Rechercher", VaadinIcon.SEARCH.create(), e -> rechercher());
        btn.addClassName("biblio-btn-primary");
        btn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var nouveau = new Button("Nouvel emprunteur", VaadinIcon.PLUS.create(),
                e -> UI.getCurrent().navigate("creer-compte"));
        nouveau.addClassName("btn-ghost");

        var bar = new HorizontalLayout(typeRecherche, terme, btn, nouveau);
        bar.setWidthFull();
        bar.setAlignItems(Alignment.END);
        bar.getElement().getStyle().set("margin-bottom", "16px").set("flex-wrap", "wrap");
        return bar;
    }

    private void rechercher() {
        String type = typeRecherche.getValue();
        List<Utilisateur> resultats = switch (type == null ? "Tous" : type) {
            case "Par nom" -> utilisateurService.rechercherParNom(terme.getValue());
            case "Par n° de carte" -> {
                try {
                    Utilisateur u = utilisateurService.rechercherParCarte(
                            Long.parseLong(terme.getValue().trim()));
                    yield u != null ? List.of(u) : List.of();
                } catch (NumberFormatException ex) {
                    erreur("Numéro de carte invalide.");
                    yield List.of();
                }
            }
            case "Abonnement expiré" -> utilisateurService.rechercherAbonnementExpire();
            case "Emprunt en cours"  -> empruntsService.getEmprunteursAvecEmpruntEnCours();
            default                  -> utilisateurService.getTousEmprunteurs();
        };
        grid.setItems(resultats);
    }

    // ── Grille ──
    private void configurerGrid() {
        grid.addColumn(u -> (nz(u.getPrenom()) + " " + nz(u.getNom())).trim())
                .setHeader("Nom").setAutoWidth(true).setFlexGrow(1);
        grid.addColumn(Utilisateur::getMail).setHeader("E-mail").setAutoWidth(true);
        grid.addColumn(Utilisateur::getNumeroCarte).setHeader("N° carte").setAutoWidth(true);
        grid.addColumn(u -> u.getDateFinAbonnement() != null
                        ? u.getDateFinAbonnement().format(FMT) : "—")
                .setHeader("Fin abonnement").setAutoWidth(true);
        grid.addColumn(u -> {
            boolean expire = u.getDateFinAbonnement() != null
                    && u.getDateFinAbonnement().isBefore(LocalDate.now());
            return expire ? "Expiré" : "Valide";
        }).setHeader("Statut").setWidth("100px").setFlexGrow(0);
        grid.addComponentColumn(this::buildActions).setHeader("").setAutoWidth(true).setFlexGrow(0);

        grid.setHeight("440px");
    }

    private HorizontalLayout buildActions(Utilisateur u) {
        var modifier = new Button("Modifier", VaadinIcon.EDIT.create(), e -> ouvrirEditeur(u));
        modifier.addClassName("btn-mini");
        var histo = new Button("Historique", VaadinIcon.CLOCK.create(), e -> ouvrirHistorique(u));
        histo.addClassName("btn-mini");
        histo.addClassName("btn-ghost");
        var h = new HorizontalLayout(modifier, histo);
        h.getElement().getStyle().set("gap", "6px");
        return h;
    }

    // ── Éditeur (Dialog) ──
    private void configurerEditeur() {
        mail.setClearButtonVisible(true);
        dateNaissance.setLocale(Locale.FRANCE);
        dateFinAbo.setLocale(Locale.FRANCE);

        var form = new FormLayout(prenom, nom, mail, adresse, ville, codePostal,
                dateNaissance, dateFinAbo);
        form.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("480px", 2));
        form.setColspan(mail, 2);
        form.setColspan(adresse, 2);

        var titre = new H2("Emprunteur");
        titre.addClassName("biblio-section-title");
        titre.getElement().getStyle().set("margin-bottom", "18px");

        var enregistrer = new Button("Enregistrer", e -> enregistrer());
        enregistrer.addClassName("biblio-btn-primary");
        enregistrer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var annuler = new Button("Annuler", e -> editeur.close());
        annuler.addClassName("btn-ghost");

        var supprimer = new Button("Supprimer", VaadinIcon.TRASH.create(), e -> supprimer());
        supprimer.addThemeVariants(ButtonVariant.LUMO_ERROR);

        var gauche = new HorizontalLayout(enregistrer, annuler);
        gauche.getElement().getStyle().set("gap", "10px");
        var actions = new HorizontalLayout(gauche, supprimer);
        actions.setWidthFull();
        actions.setJustifyContentMode(JustifyContentMode.BETWEEN);
        actions.getElement().getStyle().set("margin-top", "22px");

        var contenu = new VerticalLayout(titre, form, actions);
        contenu.setPadding(true);
        contenu.setSpacing(false);
        contenu.getElement().getStyle().set("min-width", "520px");

        editeur.add(contenu);
        editeur.setModality(ModalityMode.VISUAL);
    }

    private void ouvrirEditeur(Utilisateur u) {
        courant = u;
        prenom.setValue(nz(u.getPrenom()));
        nom.setValue(nz(u.getNom()));
        mail.setValue(nz(u.getMail()));
        adresse.setValue(nz(u.getAdresse()));
        ville.setValue(nz(u.getVille()));
        codePostal.setValue(nz(u.getCodePostal()));
        dateNaissance.setValue(u.getDateNaissance());
        dateFinAbo.setValue(u.getDateFinAbonnement());
        editeur.open();
    }

    private void enregistrer() {
        if (courant == null) return;
        if (nom.isEmpty())  { erreur("Le nom est obligatoire.");    return; }
        if (mail.isEmpty()) { erreur("L'e-mail est obligatoire.");  return; }
        courant.setPrenom(prenom.getValue());
        courant.setNom(nom.getValue());
        courant.setMail(mail.getValue());
        courant.setAdresse(adresse.getValue());
        courant.setVille(ville.getValue());
        courant.setCodePostal(codePostal.getValue());
        courant.setDateNaissance(dateNaissance.getValue());
        courant.setDateFinAbonnement(dateFinAbo.getValue());
        try {
            utilisateurService.modifier(courant);
            succes("Emprunteur mis à jour.");
            editeur.close();
            rechercher();
        } catch (Exception ex) {
            erreur("Échec : " + ex.getMessage());
        }
    }

    private void supprimer() {
        if (courant == null) return;
        try {
            utilisateurService.supprimer(courant.getIdUtilisateur());
            succes("Emprunteur supprimé.");
            editeur.close();
            rechercher();
        } catch (Exception ex) {
            erreur("Suppression impossible : emprunts ou réservations encore liés.");
        }
    }

    // ── Historique des emprunts ──
    private void ouvrirHistorique(Utilisateur u) {
        var dialog = new Dialog();
        dialog.setModality(ModalityMode.VISUAL);

        var titre = new H3("Historique — " + nz(u.getPrenom()) + " " + nz(u.getNom()));
        titre.getElement().getStyle().set("margin", "0 0 14px");

        Grid<Emprunts> g = new Grid<>(Emprunts.class, false);
        g.addColumn(e -> e.getDocument() != null ? e.getDocument().getTitre() : "—")
                .setHeader("Document").setAutoWidth(true).setFlexGrow(1);
        g.addColumn(e -> e.getDateDebut() != null ? e.getDateDebut().format(FMT) : "—")
                .setHeader("Emprunté le").setAutoWidth(true);
        g.addColumn(e -> e.getDateFin() != null ? e.getDateFin().format(FMT) : "—")
                .setHeader("À rendre").setAutoWidth(true);
        g.addColumn(e -> e.getDateRetour() != null ? e.getDateRetour().format(FMT) : "En cours")
                .setHeader("Rendu").setAutoWidth(true);
        g.setItems(empruntsService.getAllEmprunts(u));
        g.setHeight("360px");

        var fermer = new Button("Fermer", e -> dialog.close());
        fermer.addClassName("biblio-btn-primary");
        fermer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        fermer.getElement().getStyle().set("margin-top", "14px");

        var contenu = new VerticalLayout(titre, g, fermer);
        contenu.setPadding(true);
        contenu.getElement().getStyle().set("min-width", "600px");
        dialog.add(contenu);
        dialog.open();
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