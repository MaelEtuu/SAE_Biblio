package com.usmb.but3.td4biblio.util;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.router.BeforeEnterEvent;

import java.util.Arrays;

/**
 * Utilitaire centralisé de protection des routes Vaadin.
 *
 * <p>À appeler depuis le {@code beforeEnter} de chaque vue protégée :</p>
 * <pre>{@code
 * @Override
 * public void beforeEnter(BeforeEnterEvent event) {
 *     RouteGuard.check(event, this.getClass());
 * }
 * }</pre>
 *
 * <p>Règles appliquées :</p>
 * <ol>
 *   <li>Si la vue porte {@link RequiresRole}, l'utilisateur doit être connecté →
 *       sinon redirection vers {@code /login}.</li>
 *   <li>Si des rôles précis sont listés (pas {@link RequiresRole#AUTHENTICATED}),
 *       l'utilisateur doit en posséder un → sinon redirection vers {@code /}
 *       avec une notification d'erreur.</li>
 *   <li>Si la vue ne porte pas {@link RequiresRole}, l'accès est libre (pas de
 *       contrôle).</li>
 * </ol>
 */
public final class RouteGuard {

    private RouteGuard() {}

    /** Route de connexion vers laquelle les non-connectés sont redirigés. */
    public static final String LOGIN_ROUTE  = "login";

    /** Route d'accueil vers laquelle les accès non autorisés sont redirigés. */
    public static final String HOME_ROUTE   = "";

    /**
     * Vérifie les droits d'accès à la vue {@code viewClass} et redirige si nécessaire.
     *
     * @param event     l'événement de navigation Vaadin
     * @param viewClass la classe de la vue (pour lire {@link RequiresRole})
     * @return {@code true} si la navigation peut continuer, {@code false} si une
     *         redirection a été émise
     */
    public static boolean check(BeforeEnterEvent event, Class<?> viewClass) {
        RequiresRole annotation = viewClass.getAnnotation(RequiresRole.class);

        // Pas d'annotation → accès libre
        if (annotation == null) {
            return true;
        }

        // Vérification : connexion obligatoire
        Utilisateur courant = SessionUtils.getUtilisateur();
        if (courant == null) {
            event.forwardTo(LOGIN_ROUTE);
            return false;
        }

        // Valeur spéciale AUTHENTICATED : connexion seule suffit
        String[] roles = annotation.value();
        if (roles.length == 1 && RequiresRole.AUTHENTICATED.equals(roles[0])) {
            return true;
        }

        // Vérification du rôle de l'utilisateur
        String roleUtilisateur = courant.getRole() != null
                ? courant.getRole().getLibelleRole() : null;

        boolean autorise = roleUtilisateur != null
                && Arrays.stream(roles)
                .anyMatch(r -> r.equalsIgnoreCase(roleUtilisateur));

        if (!autorise) {
            // Notification + redirection vers l'accueil
            event.forwardTo(HOME_ROUTE);
            // On passe le message via la session pour l'afficher côté accueil si souhaité
            SessionUtils.setAccessDeniedMessage(
                    "Accès réservé aux rôles : " + String.join(", ", roles) + ".");
            return false;
        }

        return true;
    }

    /**
     * Surcharge pratique : lit la classe cible depuis l'événement lui-même.
     * Utile quand la vue est déjà connue de l'événement.
     */
    public static boolean check(BeforeEnterEvent event) {
        return check(event, event.getNavigationTarget());
    }
}