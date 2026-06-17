package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.UtilisateurService;
import com.usmb.but3.td4biblio.util.RequiresRole;
import com.usmb.but3.td4biblio.util.RouteGuard;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.util.Locale;

/**
 * Page de création de compte (section 1 du cahier des charges).
 * Permet de créer un nouvel emprunteur ; le numéro de carte (10 chiffres),
 * le mot de passe initial (date de naissance) et l'échéance d'abonnement
 * (1 an) sont générés automatiquement par {@link UtilisateurService}.
 *
 * <p>TODO sécurité : réserver cette page au rôle Administrateur une fois la
 * couche d'authentification en place (ex. via {@code BeforeEnterObserver} ou
 * Spring Security). Pour l'instant elle est accessible afin d'être démontrable.</p>
 */
@Route(value = "creer-compte")
@PageTitle("Créer un compte — BiblioVaadin")
@RequiresRole("BIBLIOTHECAIRE")
public class CreerCompteView extends VerticalLayout implements BeforeEnterObserver {

    private final UtilisateurService utilisateurService;

    // Champs du formulaire
    private final TextField  prenom        = new TextField("Prénom");
    private final TextField  nom           = new TextField("Nom");
    private final EmailField mail          = new EmailField("E-mail");
    private final TextField  adresse       = new TextField("Adresse");
    private final TextField  ville         = new TextField("Ville");
    private final TextField  codePostal    = new TextField("Code postal");
    private final DatePicker dateNaissance = new DatePicker("Date de naissance");
    private final DatePicker dateDebutAbo  = new DatePicker("Début d'abonnement");
    private final DatePicker dateFinAbo    = new DatePicker("Fin d'abonnement");

    private final Binder<Utilisateur> binder = new Binder<>(Utilisateur.class);

    public CreerCompteView(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        add(buildHeader(), buildForm());

        configurerBinder();
        initValeursParDefaut();
    }

    // ── En-tête ─────────────────────────────────────────────────────────────
    private Div buildHeader() {
        var eyebrow = new Paragraph("Administration · Emprunteurs");
        eyebrow.addClassName("biblio-eyebrow");

        var titre = new H2("Créer un compte emprunteur");
        titre.addClassName("biblio-section-title");

        var sous = new Paragraph(
                "L'abonnement est valable un an. Un numéro de carte unique à 10 chiffres "
                        + "et un mot de passe initial (la date de naissance, format JJMMAAAA) "
                        + "sont générés automatiquement.");
        sous.addClassName("biblio-subtitle");

        var entete = new Div(eyebrow, titre, sous);
        entete.getElement().getStyle().set("margin-bottom", "28px");
        return entete;
    }

    // ── Formulaire ──────────────────────────────────────────────────────────
    private Div buildForm() {
        mail.setClearButtonVisible(true);
        adresse.setClearButtonVisible(true);

        // Échéance recalculée automatiquement quand le début change (modifiable ensuite)
        dateDebutAbo.addValueChangeListener(e -> {
            if (e.getValue() != null) {
                dateFinAbo.setValue(e.getValue().plusYears(1));
            }
        });

        var form = new FormLayout(
                prenom, nom, mail, adresse, ville, codePostal,
                dateNaissance, dateDebutAbo, dateFinAbo);
        form.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0",    1),
                new FormLayout.ResponsiveStep("520px", 2));
        // L'adresse et l'e-mail occupent toute la largeur
        form.setColspan(mail, 2);
        form.setColspan(adresse, 2);

        var enregistrer = new Button("Créer le compte", e -> enregistrer());
        enregistrer.addClassName("biblio-btn-primary");
        enregistrer.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var reinitialiser = new Button("Réinitialiser", e -> initValeursParDefaut());
        reinitialiser.addClassName("btn-ghost");

        var actions = new HorizontalLayout(enregistrer, reinitialiser);
        actions.getElement().getStyle().set("margin-top", "24px").set("gap", "12px");

        var carte = new Div(form, actions);
        carte.getElement().getStyle()
                .set("background", "var(--card)")
                .set("border", "1px solid var(--line)")
                .set("border-radius", "14px")
                .set("padding", "28px")
                .set("max-width", "760px")
                .set("box-shadow", "0 24px 50px -30px rgba(0,0,0,.8)");
        return carte;
    }

    // ── Validation (Binder) ───────────────────────────────────────────────────
    private void configurerBinder() {
        binder.forField(prenom)
                .asRequired("Le prénom est obligatoire")
                .bind(Utilisateur::getPrenom, Utilisateur::setPrenom);

        binder.forField(nom)
                .asRequired("Le nom est obligatoire")
                .bind(Utilisateur::getNom, Utilisateur::setNom);

        binder.forField(mail)
                .asRequired("L'e-mail est obligatoire")
                .withValidator(new EmailValidator("Adresse e-mail invalide"))
                .bind(Utilisateur::getMail, Utilisateur::setMail);

        binder.forField(adresse)
                .asRequired("L'adresse est obligatoire")
                .bind(Utilisateur::getAdresse, Utilisateur::setAdresse);

        binder.forField(ville)
                .bind(Utilisateur::getVille, Utilisateur::setVille);

        binder.forField(codePostal)
                .bind(Utilisateur::getCodePostal, Utilisateur::setCodePostal);

        binder.forField(dateNaissance)
                .asRequired("La date de naissance est obligatoire")
                .withValidator(d -> d == null || d.isBefore(LocalDate.now()),
                        "La date de naissance doit être dans le passé")
                .bind(Utilisateur::getDateNaissance, Utilisateur::setDateNaissance);

        binder.forField(dateFinAbo)
                .asRequired("La date de fin d'abonnement est obligatoire")
                .bind(Utilisateur::getDateFinAbonnement, Utilisateur::setDateFinAbonnement);
    }

    // ── Valeurs par défaut / réinitialisation ─────────────────────────────────
    private void initValeursParDefaut() {
        // Affichage des dates au format français
        dateNaissance.setLocale(Locale.FRANCE);
        dateDebutAbo.setLocale(Locale.FRANCE);
        dateFinAbo.setLocale(Locale.FRANCE);

        binder.readBean(new Utilisateur()); // vide les champs liés
        prenom.clear();
        nom.clear();
        mail.clear();
        adresse.clear();
        ville.clear();
        codePostal.clear();
        dateNaissance.clear();

        dateDebutAbo.setValue(LocalDate.now());
        dateFinAbo.setValue(LocalDate.now().plusYears(1));
    }

    // ── Enregistrement ─────────────────────────────────────────────────────────
    private void enregistrer() {
        Utilisateur u = new Utilisateur();
        try {
            binder.writeBean(u);
        } catch (ValidationException e) {
            notifierErreur("Veuillez corriger les champs en erreur.");
            return;
        }
        try {
            Utilisateur cree = utilisateurService.creerEmprunteur(u, dateDebutAbo.getValue());
            Notification.show(
                            "Compte créé — carte n° " + cree.getNumeroCarte()
                                    + " · mot de passe initial : date de naissance (JJMMAAAA)",
                            4500, Notification.Position.MIDDLE)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            initValeursParDefaut();
        } catch (RuntimeException ex) {
            notifierErreur(ex.getMessage());
        }
    }

    private void notifierErreur(String message) {
        Notification.show(message, 3000, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_ERROR);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        RouteGuard.check(event, CreerCompteView.class);
    }
}