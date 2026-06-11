package com.usmb.but3.td4biblio.util;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.vaadin.flow.server.VaadinSession;

/**
 * Utilitaire d'accès à la session Vaadin.
 * <p>
 * Permet de centraliser la lecture/écriture de l'utilisateur courant
 * depuis n'importe quelle vue, en remplacement des {@code TODO} disséminés
 * dans AccueilView, CatalogueView, EmpruntsView et ReservationsView.
 * </p>
 *
 * <h3>Utilisation dans une vue</h3>
 * <pre>{@code
 * // Lire l'utilisateur connecté
 * Utilisateur courant = SessionUtils.getUtilisateur();
 * if (courant == null) { /* non connecté *\/ }
 *
 * // Écrire (fait automatiquement par LoginView après succès)
 * SessionUtils.setUtilisateur(utilisateur);
 *
 * // Déconnecter
 * SessionUtils.logout();
 * getUI().ifPresent(ui -> ui.navigate("login"));
 * }</pre>
 */
public final class SessionUtils {

    private SessionUtils() {}

    /** Clé utilisée pour stocker l'utilisateur dans la session. */
    private static final Class<Utilisateur> KEY = Utilisateur.class;

    /** Retourne l'utilisateur connecté, ou {@code null} si aucune session active. */
    public static Utilisateur getUtilisateur() {
        VaadinSession session = VaadinSession.getCurrent();
        return session != null ? session.getAttribute(KEY) : null;
    }

    /** Enregistre l'utilisateur dans la session courante. */
    public static void setUtilisateur(Utilisateur utilisateur) {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute(KEY, utilisateur);
        }
    }

    /** Efface l'utilisateur de la session (déconnexion). */
    public static void logout() {
        VaadinSession session = VaadinSession.getCurrent();
        if (session != null) {
            session.setAttribute(KEY, null);
        }
    }

    /** Vrai si un utilisateur est connecté. */
    public static boolean isLoggedIn() {
        return getUtilisateur() != null;
    }

    /**
     * Vrai si l'utilisateur connecté a le rôle donné.
     *
     * @param libelleRole ex. "BIBLIOTHECAIRE" ou "EMPRUNTEUR"
     */
    public static boolean hasRole(String libelleRole) {
        Utilisateur u = getUtilisateur();
        return u != null
                && u.getRole() != null
                && libelleRole.equalsIgnoreCase(u.getRole().getLibelleRole());
    }
}