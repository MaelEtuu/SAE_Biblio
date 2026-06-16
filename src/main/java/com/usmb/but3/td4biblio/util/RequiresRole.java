package com.usmb.but3.td4biblio.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Déclare le ou les rôles autorisés à accéder à une vue Vaadin.
 *
 * <p>Utilisation :</p>
 * <pre>{@code
 * @RequiresRole("BIBLIOTHECAIRE")
 * public class DocumentManageView extends VerticalLayout { ... }
 *
 * @RequiresRole({"BIBLIOTHECAIRE", "EMPRUNTEUR"})
 * public class MonEspaceView extends VerticalLayout { ... }
 *
 * @RequiresRole(RequiresRole.AUTHENTICATED)
 * public class CatalogueView extends VerticalLayout { ... }
 * }</pre>
 *
 * <p>La valeur spéciale {@link #AUTHENTICATED} signifie « tout utilisateur connecté,
 * quel que soit son rôle ».</p>
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRole {

    /** Valeur spéciale : connexion requise, rôle quelconque. */
    String AUTHENTICATED = "__AUTHENTICATED__";

    /** Rôle(s) autorisé(s). Utiliser {@link #AUTHENTICATED} pour « connecté seulement ». */
    String[] value();
}