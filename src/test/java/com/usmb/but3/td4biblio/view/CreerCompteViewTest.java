package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.service.DocumentService;
import com.usmb.but3.td4biblio.service.EmpruntsService;
import com.usmb.but3.td4biblio.service.UtilisateurService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;

import static com.github.mvysny.kaributesting.v10.LocatorJ.*;
import static com.github.mvysny.kaributesting.v10.NotificationsKt.expectNotifications;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Tests « browserless » de {@link CreerCompteView} : garde d'accès (réservée au rôle
 * BIBLIOTHECAIRE), validation du formulaire et création déléguée au service.
 */
@DisplayName("CreerCompteView - tests Karibu")
class CreerCompteViewTest extends AbstractViewTest {

    @MockitoBean private UtilisateurService utilisateurService;
    // Services d'AccueilView (cible de la redirection en cas d'accès refusé).
    @MockitoBean private DocumentService documentService;
    @MockitoBean private EmpruntsService empruntsService;

    private CreerCompteView vue() {
        return _get(CreerCompteView.class);
    }

    private static Utilisateur avecRole(String libelle) {
        Utilisateur u = new Utilisateur();
        u.setRole(new Role(1, libelle));
        return u;
    }

    @Test
    @DisplayName("non connecté : redirection vers la connexion")
    void nonConnecteRedirige() {
        UI.getCurrent().navigate("creer-compte");
        _assertOne(LoginView.class);
        _assertNone(CreerCompteView.class);
    }

    @Test
    @DisplayName("connecté en emprunteur : accès refusé, redirection vers l'accueil")
    void mauvaisRoleRedirige() {
        connecter(avecRole("EMPRUNTEUR"));

        UI.getCurrent().navigate("creer-compte");

        _assertOne(AccueilView.class);
        _assertNone(CreerCompteView.class);
        expectNotifications("Accès réservé aux rôles : BIBLIOTHECAIRE.");
    }

    @Test
    @DisplayName("bibliothécaire : le formulaire est affiché")
    void bibliothecaireVoitFormulaire() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("creer-compte");

        _get(vue(), H2.class, spec -> spec.withText("Créer un compte emprunteur"));
    }

    @Test
    @DisplayName("formulaire vide : message d'erreur de validation, aucune création")
    void validationEchoue() {
        connecter(avecRole("BIBLIOTHECAIRE"));

        UI.getCurrent().navigate("creer-compte");
        _click(_get(vue(), Button.class, spec -> spec.withText("Créer le compte")));

        expectNotifications("Veuillez corriger les champs en erreur.");
        verify(utilisateurService, never()).creerEmprunteur(any(), any());
    }

    @Test
    @DisplayName("formulaire valide : création déléguée au service")
    void creationReussie() {
        connecter(avecRole("BIBLIOTHECAIRE"));
        Utilisateur cree = new Utilisateur();
        cree.setNumeroCarte(1_234_567_890L);
        when(utilisateurService.creerEmprunteur(any(), any())).thenReturn(cree);

        UI.getCurrent().navigate("creer-compte");
        CreerCompteView vue = vue();
        _setValue(_get(vue, TextField.class, spec -> spec.withLabel("Prénom")), "Camille");
        _setValue(_get(vue, TextField.class, spec -> spec.withLabel("Nom")), "Dupont");
        _setValue(_get(vue, EmailField.class, spec -> spec.withLabel("E-mail")), "camille@test.fr");
        _setValue(_get(vue, TextField.class, spec -> spec.withLabel("Adresse")), "1 rue des Lilas");
        _setValue(_get(vue, DatePicker.class, spec -> spec.withLabel("Date de naissance")),
                LocalDate.of(1998, 4, 21));

        _click(_get(vue, Button.class, spec -> spec.withText("Créer le compte")));

        verify(utilisateurService).creerEmprunteur(any(), any());
    }
}
