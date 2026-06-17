package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.util.RequiresRole;
import com.usmb.but3.td4biblio.util.RouteGuard;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.router.BeforeEnterEvent;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires de {@link RouteGuard}.
 * <p>
 * {@code RouteGuard} lit l'utilisateur courant via {@link SessionUtils#getUtilisateur()}
 * (statique, mockée avec {@link MockedStatic}) et déclenche des redirections sur un
 * {@link BeforeEnterEvent} mocké. La règle d'accès est lue par réflexion sur
 * l'annotation {@link RequiresRole} des vues de test ci-dessous.
 * </p>
 */
@DisplayName("RouteGuard — tests unitaires")
class RouteGuardTest {

    private MockedStatic<SessionUtils> sessionUtilsStatic;
    private BeforeEnterEvent event;

    @BeforeEach
    void setUp() {
        sessionUtilsStatic = mockStatic(SessionUtils.class);
        event = mock(BeforeEnterEvent.class);
    }

    @AfterEach
    void tearDown() {
        sessionUtilsStatic.close();
    }

    // ── Vues de test ──────────────────────────────────────────────────────
    static class VuePublique {}

    @RequiresRole(RequiresRole.AUTHENTICATED)
    static class VueConnectee {}

    @RequiresRole("BIBLIOTHECAIRE")
    static class VueBibliothecaire {}

    @RequiresRole({"BIBLIOTHECAIRE", "EMPRUNTEUR"})
    static class VueMultiRoles {}

    private void connecte(String role) {
        Utilisateur u = new Utilisateur();
        u.setNom("Dupont");
        if (role != null) u.setRole(new Role(1, role));
        sessionUtilsStatic.when(SessionUtils::getUtilisateur).thenReturn(u);
    }

    private void nonConnecte() {
        sessionUtilsStatic.when(SessionUtils::getUtilisateur).thenReturn(null);
    }

    // ── Accès libre ───────────────────────────────────────────────────────

    @Nested
    @DisplayName("Vue sans annotation")
    class SansAnnotation {

        @Test
        @DisplayName("accès libre : aucune redirection")
        void accesLibre() {
            boolean ok = RouteGuard.check(event, VuePublique.class);

            assertThat(ok).isTrue();
            verify(event, never()).forwardTo(anyString());
        }
    }

    // ── Connexion requise ─────────────────────────────────────────────────

    @Nested
    @DisplayName("@RequiresRole(AUTHENTICATED)")
    class Authentifie {

        @Test
        @DisplayName("non connecté : redirection vers login")
        void nonConnecteRedirige() {
            nonConnecte();

            boolean ok = RouteGuard.check(event, VueConnectee.class);

            assertThat(ok).isFalse();
            verify(event).forwardTo(RouteGuard.LOGIN_ROUTE);
        }

        @Test
        @DisplayName("connecté (rôle quelconque) : accès autorisé")
        void connecteAutorise() {
            connecte("EMPRUNTEUR");

            assertThat(RouteGuard.check(event, VueConnectee.class)).isTrue();
            verify(event, never()).forwardTo(anyString());
        }
    }

    // ── Rôle spécifique ───────────────────────────────────────────────────

    @Nested
    @DisplayName("@RequiresRole(\"BIBLIOTHECAIRE\")")
    class RoleSpecifique {

        @Test
        @DisplayName("non connecté : redirection vers login")
        void nonConnecteRedirige() {
            nonConnecte();

            assertThat(RouteGuard.check(event, VueBibliothecaire.class)).isFalse();
            verify(event).forwardTo(RouteGuard.LOGIN_ROUTE);
        }

        @Test
        @DisplayName("bon rôle : accès autorisé")
        void bonRole() {
            connecte("BIBLIOTHECAIRE");

            assertThat(RouteGuard.check(event, VueBibliothecaire.class)).isTrue();
            verify(event, never()).forwardTo(anyString());
        }

        @Test
        @DisplayName("rôle insensible à la casse")
        void roleInsensibleCasse() {
            connecte("bibliothecaire");

            assertThat(RouteGuard.check(event, VueBibliothecaire.class)).isTrue();
        }

        @Test
        @DisplayName("mauvais rôle : redirection accueil + message d'accès refusé")
        void mauvaisRole() {
            connecte("EMPRUNTEUR");

            boolean ok = RouteGuard.check(event, VueBibliothecaire.class);

            assertThat(ok).isFalse();
            verify(event).forwardTo(RouteGuard.HOME_ROUTE);
            sessionUtilsStatic.verify(() -> SessionUtils.setAccessDeniedMessage(anyString()));
        }

        @Test
        @DisplayName("utilisateur sans rôle : accès refusé")
        void sansRole() {
            connecte(null);

            assertThat(RouteGuard.check(event, VueBibliothecaire.class)).isFalse();
            verify(event).forwardTo(RouteGuard.HOME_ROUTE);
        }
    }

    // ── Plusieurs rôles autorisés ─────────────────────────────────────────

    @Nested
    @DisplayName("@RequiresRole({\"BIBLIOTHECAIRE\", \"EMPRUNTEUR\"})")
    class PlusieursRoles {

        @Test
        @DisplayName("l'un des rôles suffit")
        void unRoleSuffit() {
            connecte("EMPRUNTEUR");

            assertThat(RouteGuard.check(event, VueMultiRoles.class)).isTrue();
            verify(event, never()).forwardTo(anyString());
        }
    }

    // ── Surcharge check(event) ────────────────────────────────────────────

    @Nested
    @DisplayName("Surcharge check(event)")
    class Surcharge {

        @Test
        @DisplayName("lit la cible de navigation depuis l'événement")
        void litCibleDepuisEvenement() {
            doReturn(VuePublique.class).when(event).getNavigationTarget();

            assertThat(RouteGuard.check(event)).isTrue();
            verify(event, never()).forwardTo(anyString());
        }
    }
}
