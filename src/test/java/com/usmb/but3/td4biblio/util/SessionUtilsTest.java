package com.usmb.but3.td4biblio.util;

import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.vaadin.flow.server.VaadinSession;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires de {@link SessionUtils}.
 * <p>
 * {@code SessionUtils} s'appuie uniquement sur la méthode statique
 * {@link VaadinSession#getCurrent()}. On la mocke avec {@link MockedStatic}
 * pour simuler tantôt l'absence de session, tantôt une session active, sans
 * démarrer de serveur Vaadin.
 * </p>
 */
@DisplayName("SessionUtils — tests unitaires")
class SessionUtilsTest {

    private MockedStatic<VaadinSession> vaadinSessionStatic;
    private VaadinSession session;

    @BeforeEach
    void setUp() {
        vaadinSessionStatic = mockStatic(VaadinSession.class);
        session = mock(VaadinSession.class);
    }

    @AfterEach
    void tearDown() {
        vaadinSessionStatic.close();
    }

    /** Simule une session Vaadin active. */
    private void sessionActive() {
        vaadinSessionStatic.when(VaadinSession::getCurrent).thenReturn(session);
    }

    /** Simule l'absence de session Vaadin. */
    private void sessionAbsente() {
        vaadinSessionStatic.when(VaadinSession::getCurrent).thenReturn(null);
    }

    private Utilisateur utilisateurAvecRole(String libelleRole) {
        Utilisateur u = new Utilisateur();
        u.setNom("Dupont");
        if (libelleRole != null) {
            u.setRole(new Role(1, libelleRole));
        }
        return u;
    }

    // ------------------------------------------------------------------
    // Lecture de l'utilisateur courant
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("getUtilisateur")
    class GetUtilisateur {

        @Test
        @DisplayName("retourne null si aucune session active")
        void aucuneSession() {
            sessionAbsente();

            assertThat(SessionUtils.getUtilisateur()).isNull();
        }

        @Test
        @DisplayName("retourne l'utilisateur stocké dans la session")
        void sessionAvecUtilisateur() {
            sessionActive();
            Utilisateur u = utilisateurAvecRole("EMPRUNTEUR");
            when(session.getAttribute(Utilisateur.class)).thenReturn(u);

            assertThat(SessionUtils.getUtilisateur()).isSameAs(u);
        }
    }

    // ------------------------------------------------------------------
    // Écriture
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("setUtilisateur")
    class SetUtilisateur {

        @Test
        @DisplayName("enregistre l'utilisateur dans la session active")
        void sessionActive_enregistre() {
            sessionActive();
            Utilisateur u = utilisateurAvecRole("EMPRUNTEUR");

            SessionUtils.setUtilisateur(u);

            verify(session).setAttribute(Utilisateur.class, u);
        }

        @Test
        @DisplayName("ne lève pas d'exception si aucune session active")
        void aucuneSession_neFaitRien() {
            sessionAbsente();

            SessionUtils.setUtilisateur(utilisateurAvecRole("EMPRUNTEUR"));

            verify(session, never()).setAttribute(eq(Utilisateur.class), any());
        }
    }

    // ------------------------------------------------------------------
    // Déconnexion
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("logout")
    class Logout {

        @Test
        @DisplayName("efface l'utilisateur de la session")
        void effaceUtilisateur() {
            sessionActive();

            SessionUtils.logout();

            verify(session).setAttribute(Utilisateur.class, null);
        }

        @Test
        @DisplayName("ne lève pas d'exception si aucune session active")
        void aucuneSession_neFaitRien() {
            sessionAbsente();

            SessionUtils.logout();

            verify(session, never()).setAttribute(eq(Utilisateur.class), any());
        }
    }

    // ------------------------------------------------------------------
    // isLoggedIn
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("isLoggedIn")
    class IsLoggedIn {

        @Test
        @DisplayName("vrai si un utilisateur est présent en session")
        void vrai() {
            sessionActive();
            when(session.getAttribute(Utilisateur.class))
                    .thenReturn(utilisateurAvecRole("EMPRUNTEUR"));

            assertThat(SessionUtils.isLoggedIn()).isTrue();
        }

        @Test
        @DisplayName("faux si aucun utilisateur en session")
        void faux() {
            sessionActive();
            when(session.getAttribute(Utilisateur.class)).thenReturn(null);

            assertThat(SessionUtils.isLoggedIn()).isFalse();
        }

        @Test
        @DisplayName("faux si aucune session active")
        void fauxSansSession() {
            sessionAbsente();

            assertThat(SessionUtils.isLoggedIn()).isFalse();
        }
    }

    // ------------------------------------------------------------------
    // hasRole
    // ------------------------------------------------------------------

    @Nested
    @DisplayName("hasRole")
    class HasRole {

        @Test
        @DisplayName("vrai quand le rôle correspond (insensible à la casse)")
        void roleCorrespond() {
            sessionActive();
            when(session.getAttribute(Utilisateur.class))
                    .thenReturn(utilisateurAvecRole("BIBLIOTHECAIRE"));

            assertThat(SessionUtils.hasRole("BIBLIOTHECAIRE")).isTrue();
            assertThat(SessionUtils.hasRole("bibliothecaire")).isTrue();
        }

        @Test
        @DisplayName("faux quand le rôle est différent")
        void roleDifferent() {
            sessionActive();
            when(session.getAttribute(Utilisateur.class))
                    .thenReturn(utilisateurAvecRole("EMPRUNTEUR"));

            assertThat(SessionUtils.hasRole("BIBLIOTHECAIRE")).isFalse();
        }

        @Test
        @DisplayName("faux quand l'utilisateur n'a aucun rôle")
        void roleNull() {
            sessionActive();
            when(session.getAttribute(Utilisateur.class))
                    .thenReturn(utilisateurAvecRole(null));

            assertThat(SessionUtils.hasRole("EMPRUNTEUR")).isFalse();
        }

        @Test
        @DisplayName("faux quand aucun utilisateur n'est connecté")
        void nonConnecte() {
            sessionAbsente();

            assertThat(SessionUtils.hasRole("EMPRUNTEUR")).isFalse();
        }
    }
}
