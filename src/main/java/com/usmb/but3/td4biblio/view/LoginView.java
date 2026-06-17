package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.VaadinSession;
import com.usmb.but3.td4biblio.util.MotDePasseUtil;

/**
 * Page de connexion : authentifie un utilisateur par e-mail + mot de passe.
 * <p>
 * Après succès, l'utilisateur est stocké dans la {@link VaadinSession} sous la
 * clé {@code "utilisateur"}, puis redirigé vers l'accueil.
 * </p>
 *
 * <b>TODO sécurité :</b> comparer le mot de passe via BCrypt (ou l'algorithme
 * de hachage choisi) plutôt qu'en clair.
 */
@Route(value = "login")
@PageTitle("Connexion — BiblioVaadin")
// Pas de @Menu : la page de login ne doit pas apparaître dans la barre de navigation
public class LoginView extends VerticalLayout {

    private final UtilisateurRepository utilisateurRepository;

    private final TextField     mailField = new TextField();
    private final PasswordField mdpField  = new PasswordField();

    public LoginView(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;

        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        addClassName("login-page");
        getElement().getStyle().set("min-height", "100vh");

        add(buildCard());
    }

    // ── Carte centrale ──────────────────────────────────────────────────────
    private Div buildCard() {
        // Logotype
        var nameItalic = new Span("Biblio");
        var nameBold   = new Span("Vaadin");
        nameBold.getElement().getStyle()
                .set("font-style", "normal")
                .set("font-weight", "500");
        var logo = new Span(nameItalic, nameBold);
        logo.addClassName("login-logo");
        logo.addClassName("serif");

        var kicker = new Paragraph("Réseau des bibliothèques · Espace membre");
        kicker.addClassName("login-kicker");

        // Titre
        var title = new H2("Connexion");
        title.addClassName("login-title");
        title.addClassName("lserif");

        // Champ e-mail
        mailField.setLabel("Adresse e-mail");
        mailField.setPlaceholder("vous@exemple.fr");
        mailField.setWidthFull();
        mailField.addClassName("login-field");

        // Champ mot de passe
        mdpField.setLabel("Mot de passe");
        mdpField.setPlaceholder("••••••••");
        mdpField.setWidthFull();
        mdpField.addClassName("login-field");

        // Lien mot de passe oublié
        var forgotLink = new Anchor("#", "Mot de passe oublié ?");
        forgotLink.addClassName("login-forgot");

        // Bouton connexion
        var loginBtn = new Button("Se connecter");
        loginBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        loginBtn.addClassName("login-btn");
        loginBtn.setWidthFull();
        loginBtn.addClickListener(e -> handleLogin());

        // Séparateur
        var divider = new Div();
        divider.addClassName("login-divider");
        var divLabel = new Span("ou");
        divLabel.addClassName("login-divider-label");
        var dividerWrap = new Div(divider, divLabel);
        dividerWrap.addClassName("login-divider-wrap");

        // Lien inscription / retour accueil
        var homeLink = new RouterLink("← Retour à l'accueil", AccueilView.class);
        homeLink.addClassName("login-home-link");

        // Note abonné
        var note = new Paragraph(
                "Votre mot de passe initial est votre date de naissance (JJMMAAAA). "
                        + "Changez-le lors de votre première connexion.");
        note.addClassName("login-note");

        // Assemblage
        var form = new VerticalLayout(
                logo, kicker, title,
                mailField, mdpField, forgotLink,
                loginBtn,
                dividerWrap,
                homeLink,
                note
        );
        form.setPadding(false);
        form.setSpacing(false);
        form.addClassName("login-card");

        var card = new Div(form);
        card.addClassName("login-card-wrap");
        return card;
    }

    // ── Logique d'authentification ──────────────────────────────────────────
    private void handleLogin() {
        String mail = mailField.getValue().trim();
        String mdp  = mdpField.getValue();

        if (mail.isEmpty() || mdp.isEmpty()) {
            showError("Veuillez renseigner votre e-mail et votre mot de passe.");
            return;
        }

        // Recherche par e-mail
        utilisateurRepository.findByMail(mail).ifPresentOrElse(
                utilisateur -> {
                    if (checkPassword(mdp, utilisateur.getMdp())) {
                        // Stocker l'utilisateur en session
                        VaadinSession.getCurrent().setAttribute(
                                Utilisateur.class, utilisateur);
                        // Rediriger vers l'accueil
                        getUI().ifPresent(ui -> ui.navigate(""));
                    } else {
                        showError("E-mail ou mot de passe incorrect.");
                        mdpField.clear();
                    }
                },
                () -> {
                    showError("E-mail ou mot de passe incorrect.");
                    mdpField.clear();
                }
        );
    }

    /**
     * Vérifie le mot de passe.
     * <b>TODO :</b> remplacer la comparaison en clair par BCrypt ou l'algorithme
     * réellement utilisé en base.
     */
    private boolean checkPassword(String raw, String stored) {
        if (stored == null) return false;
        return MotDePasseUtil.hacher(raw).equals(stored);
    }

    private void showError(String message) {
        Notification.show(message, 3000, Notification.Position.BOTTOM_CENTER)
                .addThemeVariants(NotificationVariant.LUMO_ERROR);
    }
}