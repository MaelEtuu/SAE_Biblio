package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.ReservationService;
import com.usmb.but3.td4biblio.util.MotDePasseUtil;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.server.VaadinSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

/**
 * Tests « browserless » de {@link LoginView} avec Karibu-Testing.
 *
 * <p>Le {@link UtilisateurRepository} est remplacé par un mock ({@code @MockitoBean})
 * afin de contrôler le résultat de la recherche par e-mail sans toucher la base.</p>
 */
@DisplayName("LoginView - tests Karibu")
class LoginViewTest extends AbstractViewTest {

    @MockitoBean
    private UtilisateurRepository utilisateurRepository;

    // Services injectés dans AccueilView (cible de la redirection après connexion).
    // Mockés pour ne pas toucher la base lors de la navigation vers l'accueil.
    @MockitoBean private DocumentService    documentService;
    @MockitoBean private ReservationService reservationService;
    @MockitoBean private EmpruntsService    empruntsService;

    @BeforeEach
    void ouvrirLogin() {
        UI.getCurrent().navigate("login");
    }

    // La recherche est scopée à la LoginView : la barre de navigation (MainLayout)
    // expose elle aussi un champ et un bouton « Se connecter » lorsqu'aucun
    // utilisateur n'est connecté.
    private LoginView vue() {
        return _get(LoginView.class);
    }

    private TextField mailField() {
        return _get(vue(), TextField.class, spec -> spec.withLabel("Adresse e-mail"));
    }

    private PasswordField mdpField() {
        return _get(vue(), PasswordField.class);
    }

    private Button boutonConnexion() {
        return _get(vue(), Button.class, spec -> spec.withText("Se connecter"));
    }

    @Test
    @DisplayName("champs vides => notification d'erreur, aucune connexion")
    void champsVides() {
        _click(boutonConnexion());

        expectNotifications("Veuillez renseigner votre e-mail et votre mot de passe.");
        assertThat(VaadinSession.getCurrent().getAttribute(Utilisateur.class)).isNull();
    }

    @Test
    @DisplayName("e-mail inconnu => message générique + mot de passe vidé")
    void emailInconnu() {
        when(utilisateurRepository.findByMail(anyString())).thenReturn(Optional.empty());

        _setValue(mailField(), "inconnu@test.fr");
        PasswordField mdp = mdpField();
        _setValue(mdp, "peu importe");
        _click(boutonConnexion());

        expectNotifications("E-mail ou mot de passe incorrect.");
        assertThat(mdp.getValue()).isEmpty();
        assertThat(VaadinSession.getCurrent().getAttribute(Utilisateur.class)).isNull();
    }

    @Test
    @DisplayName("mauvais mot de passe => message générique, aucune connexion")
    void mauvaisMotDePasse() {
        Utilisateur u = new Utilisateur();
        u.setMail("alice@test.fr");
        u.setMdp(MotDePasseUtil.hacher("leBon"));
        when(utilisateurRepository.findByMail("alice@test.fr")).thenReturn(Optional.of(u));

        _setValue(mailField(), "alice@test.fr");
        _setValue(mdpField(), "leMauvais");
        _click(boutonConnexion());

        expectNotifications("E-mail ou mot de passe incorrect.");
        assertThat(VaadinSession.getCurrent().getAttribute(Utilisateur.class)).isNull();
    }

    @Test
    @DisplayName("bon mot de passe => utilisateur en session + redirection vers l'accueil")
    void connexionReussie() {
        Utilisateur u = new Utilisateur();
        u.setMail("alice@test.fr");
        u.setMdp(MotDePasseUtil.hacher("leBon"));
        when(utilisateurRepository.findByMail("alice@test.fr")).thenReturn(Optional.of(u));

        _setValue(mailField(), "alice@test.fr");
        _setValue(mdpField(), "leBon");
        _click(boutonConnexion());

        assertThat(VaadinSession.getCurrent().getAttribute(Utilisateur.class)).isSameAs(u);
        // On a quitté la page de connexion : l'accueil est désormais affiché.
        _assertOne(AccueilView.class);
    }
}
