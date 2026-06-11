package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
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

        tabs.addSelectedChangeListener(e -> {
            if (navigating) return;
            Tab selected = e.getSelectedTab();
            if (selected != null && selected.getId().isPresent()) {
                String path = selected.getId().get().replace("tab-", "");
                getUI().ifPresent(ui -> ui.navigate(path));
            }
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
            tab.setId("tab-" + entry.path());
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

        // Clic sur le compte = déconnexion (simple, on peut affiner ensuite)
        account.getElement().getStyle().set("cursor", "pointer");
        account.addClickListener(e -> {
            SessionUtils.logout();
            getUI().ifPresent(ui -> ui.getPage().reload());
        });

        accountZone.add(account);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        navigating = true;

        // Reconstruit les onglets et la zone compte à chaque navigation
        // (le rôle / l'état de connexion peuvent avoir changé entre-temps)
        buildTabs();
        refreshAccountZone();

        String currentPath = event.getLocation().getPath();
        tabs.getChildren()
                .filter(c -> c instanceof Tab)
                .map(c -> (Tab) c)
                .filter(tab -> tab.getId()
                        .map(id -> id.replace("tab-", "").equals(currentPath))
                        .orElse(false))
                .findFirst()
                .ifPresent(tabs::setSelectedTab);
        navigating = false;
    }
}