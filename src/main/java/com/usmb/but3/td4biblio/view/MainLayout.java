package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Layout;
import com.vaadin.flow.server.menu.MenuConfiguration;
import com.vaadin.flow.server.menu.MenuEntry;

import java.util.List;

@Layout
public final class MainLayout extends AppLayout implements BeforeEnterObserver {

    private final Tabs tabs = new Tabs();
    private boolean navigating = false;

    private final Div accountZone = new Div();

    MainLayout() {
        setPrimarySection(Section.NAVBAR);
        addToNavbar(createTopBar());
    }

    private HorizontalLayout createTopBar() {
        // ── Brand ──
        var kicker = new Span("Réseau des bibliothèques");
        kicker.setClassName("kicker");

        var nameItalic = new Span("Biblio");
        var nameBold = new Span("Vaadin");
        nameBold.getElement().getStyle()
                .set("font-style", "normal")
                .set("font-weight", "500");
        var name = new Span(nameItalic, nameBold);
        name.setClassName("name serif");

        var brand = new Div(kicker, name);
        brand.setClassName("biblio-brand-top");

        // ── Tabs ──
        buildTabs();
        tabs.setClassName("biblio-tabs");

        // La navigation est déclenchée par clic direct sur le Tab,
        // pas via le SelectedChangeListener (qui se réenclenchait en boucle).
        // On attache le listener de navigation ici, après buildTabs().
        tabs.addSelectedChangeListener(e -> {
            if (navigating) return;
            Tab selected = e.getSelectedTab();
            if (selected == null) return;
            selected.getId().ifPresent(id -> {
                String path = id.replace("tab-", "");
                getUI().ifPresent(ui -> ui.navigate(path));
            });
        });

        // ── Zone compte (dynamique) ──
        accountZone.setClassName("biblio-account-zone");
        refreshAccountZone();

        // ── Barre complète ──
        var bar = new HorizontalLayout(brand, tabs, accountZone);
        bar.setClassName("biblio-topbar");
        bar.setAlignItems(FlexComponent.Alignment.CENTER);
        bar.setWidthFull();
        bar.setFlexGrow(1, tabs);
        return bar;
    }

    // ── Construction des onglets selon le rôle ───────────────────────────────
    private void buildTabs() {
        tabs.removeAll();

        List<MenuEntry> entries = MenuConfiguration.getMenuEntries();
        entries.forEach(entry -> {
            var tab = new Tab(entry.title());
            // Normalise le path : supprime le slash initial si présent
            String path = entry.path() != null ? entry.path().replaceFirst("^/", "") : "";
            tab.setId("tab-" + path);
            tabs.add(tab);
        });

        // Onglet supplémentaire pour les bibliothécaires : gestion des emprunteurs
        if (SessionUtils.hasRole("BIBLIOTHECAIRE")) {
            var tabEmprunteur = new Tab("Emprunteur");
            tabEmprunteur.setId("tab-creer-compte");
            tabs.add(tabEmprunteur);
        }
    }

    // ── Zone compte : connecté ou non ────────────────────────────────────────
    private void refreshAccountZone() {
        accountZone.removeAll();

        Utilisateur courant = SessionUtils.getUtilisateur();

        if (courant == null) {
            var loginBtn = new Button("Se connecter");
            loginBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            loginBtn.addClassName("biblio-btn-primary");
            loginBtn.addClickListener(e -> getUI().ifPresent(ui -> ui.navigate("login")));
            accountZone.add(loginBtn);
            return;
        }

        String prenom = courant.getPrenom() != null ? courant.getPrenom() : "";
        String nom    = courant.getNom()    != null ? courant.getNom()    : "";
        String initiale = !prenom.isEmpty() ? prenom.substring(0, 1).toUpperCase()
                : (!nom.isEmpty() ? nom.substring(0, 1).toUpperCase() : "?");

        var avatar = new Span(initiale);
        avatar.setClassName("biblio-avatar");

        var whoName = new Span((prenom + " " + nom).trim());
        whoName.setClassName("biblio-who-n");

        String sousTitre;
        if (courant.getRole() != null && "BIBLIOTHECAIRE".equalsIgnoreCase(courant.getRole().getLibelleRole())) {
            sousTitre = "Bibliothécaire";
        } else if (courant.getDateFinAbonnement() != null) {
            sousTitre = "Abonné·e · expire " + courant.getDateFinAbonnement();
        } else {
            sousTitre = "Emprunteur";
        }

        var whoSub = new Span(sousTitre);
        whoSub.setClassName("biblio-who-s");

        var who = new Div(whoName, whoSub);
        who.setClassName("biblio-who");

        var account = new Div(who, avatar);
        account.setClassName("biblio-account");

        var logoutBtn = new Button("Déconnexion", VaadinIcon.SIGN_OUT.create());
        logoutBtn.addClassName("btn-ghost");
        logoutBtn.addClassName("btn-mini");
        logoutBtn.addClickListener(e -> {
            SessionUtils.logout();
            getUI().ifPresent(ui -> ui.navigate("login"));
        });

        var zone = new HorizontalLayout(account, logoutBtn);
        zone.setAlignItems(FlexComponent.Alignment.CENTER);
        zone.getElement().getStyle().set("gap", "14px");
        accountZone.add(zone);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        // Empêche le listener de tabs de re-déclencher une navigation
        navigating = true;

        // Reconstruit les onglets et la zone compte à chaque navigation
        buildTabs();
        refreshAccountZone();

        // Sélectionne l'onglet correspondant à la route courante
        String currentPath = event.getLocation().getPath();
        // Normalise : "" (racine) → on cherche un tab avec id "tab-"
        // "mon-espace" → on cherche "tab-mon-espace"
        tabs.getChildren()
                .filter(c -> c instanceof Tab)
                .map(c -> (Tab) c)
                .filter(tab -> tab.getId()
                        .map(id -> {
                            String tabPath = id.replace("tab-", "");
                            // Cas racine : chemin vide ET tabPath vide
                            if (currentPath.isEmpty() && tabPath.isEmpty()) return true;
                            // Correspondance exacte ou préfixe (pour les sous-routes éventuelles)
                            return !tabPath.isEmpty() && currentPath.equals(tabPath);
                        })
                        .orElse(false))
                .findFirst()
                .ifPresent(tabs::setSelectedTab);

        navigating = false;
    }
}