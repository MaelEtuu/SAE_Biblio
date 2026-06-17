package com.usmb.but3.td4biblio.util;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.vaadin.flow.server.VaadinSession;

/**
 * Utilitaire d'accès à la session Vaadin.
 *
 * <p>Centralise la lecture/écriture de l'utilisateur courant depuis n'importe
 * quelle vue, et transporte un éventuel message « accès refusé » entre deux
 * navigations (utilisé par {@link com.usmb.but3.td4biblio.security.RouteGuard}).</p>
 */
public final class SessionUtils {

    private SessionUtils() {}

    /** Clé de stockage de l'utilisateur connecté. */
    private static final Class<Utilisateur> USER_KEY = Utilisateur.class;

    /** Clé de stockage du message d'accès refusé (String). */
    private static final String ACCESS_DENIED_KEY = "accessDeniedMessage";

    // =========================================================================
    // Utilisateur connecté
    // =========================================================================

    /** Retourne l'utilisateur connecté, ou {@code null} si aucune session active. */
    public static Utilisateur getUtilisateur() {
        VaadinSession session = VaadinSession.getCurrent();
        return session != null ? session.getAttribute(USER_KEY) : null;
    }

    /** Enregistre l'utilisateur dans la session courante. */
    public static void setUtilisateur(Utilisateur utilisateur) {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute(USER_KEY, utilisateur);
        }
    }

    /** Efface l'utilisateur de la session (déconnexion). */
    public static void logout() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute(USER_KEY, null);
            session.setAttribute(ACCESS_DENIED_KEY, null);
        }
    }

    /** Vrai si un utilisateur est connecté. */
    public static boolean isLoggedIn() {
        return getUtilisateur() != null;
    }

    /**
     * Vrai si l'utilisateur connecté possède le rôle donné (insensible à la casse).
     *
     * @param libelleRole ex. "BIBLIOTHECAIRE" ou "EMPRUNTEUR"
     */
    public static boolean hasRole(String libelleRole) {
        Utilisateur u = getUtilisateur();
        return u != null
                && u.getRole() != null
                && libelleRole.equalsIgnoreCase(u.getRole().getLibelleRole());
    }

    // =========================================================================
    // Message d'accès refusé (flash message entre navigations)
    // =========================================================================

    /**
     * Stocke un message « accès refusé » à afficher lors de la prochaine navigation.
     * Écrasé à chaque appel ; consommé une seule fois par {@link #popAccessDeniedMessage()}.
     */
    public static void setAccessDeniedMessage(String message) {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute(ACCESS_DENIED_KEY, message);
        }
    }

    /**
     * Consomme et retourne le message « accès refusé », ou {@code null} s'il n'y en a pas.
     * Supprime le message de la session après lecture (flash message).
     */
    public static String popAccessDeniedMessage() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session == null) return null;
        String msg = (String) session.getAttribute(ACCESS_DENIED_KEY);
        session.setAttribute(ACCESS_DENIED_KEY, null);
        return msg;
    }

    /** Vrai si la popup d'abonnement a déjà été affichée dans cette session. */
    public static boolean isAbonnementPopupAffichee() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session == null) return false;
        Boolean flag = (Boolean) session.getAttribute("abonnementPopupAffichee");
        return Boolean.TRUE.equals(flag);
    }

    /** Marque la popup d'abonnement comme déjà affichée. */
    public static void marquerAbonnementPopupAffichee() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute("abonnementPopupAffichee", true);
        }
    }

    /** Vrai si la popup de retard a déjà été affichée dans cette session. */
    public static boolean isRetardPopupAffichee() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session == null) return false;
        return Boolean.TRUE.equals(session.getAttribute("retardPopupAffichee"));
    }

    /** Marque la popup de retard comme déjà affichée. */
    public static void marquerRetardPopupAffichee() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute("retardPopupAffichee", true);
        }
    }
}