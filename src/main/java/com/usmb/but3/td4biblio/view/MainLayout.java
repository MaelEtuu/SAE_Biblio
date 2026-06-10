package com.usmb.but3.td4biblio.view;

import com.vaadin.flow.component.applayout.AppLayout;
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
        List<MenuEntry> entries = MenuConfiguration.getMenuEntries();
        entries.forEach(entry -> {
            var tab = new Tab(entry.title());
            tab.setId("tab-" + entry.path());
            tabs.add(tab);
        });

        tabs.setClassName("biblio-tabs");

        tabs.addSelectedChangeListener(e -> {
            if (navigating) return;
            Tab selected = e.getSelectedTab();
            if (selected != null && selected.getId().isPresent()) {
                String path = selected.getId().get().replace("tab-", "");
                getUI().ifPresent(ui -> ui.navigate(path));
            }
        });

        // ── Avatar / compte ──
        var avatar = new Span("C");
        avatar.setClassName("biblio-avatar");

        var whoName = new Span("Camille Dupont");
        whoName.setClassName("biblio-who-n");
        var whoSub = new Span("Abonnée · expire 21 juin");
        whoSub.setClassName("biblio-who-s");
        var who = new Div(whoName, whoSub);
        who.setClassName("biblio-who");

        var account = new Div(who, avatar);
        account.setClassName("biblio-account");

        // ── Barre complète ──
        var bar = new HorizontalLayout(brand, tabs, account);
        bar.setClassName("biblio-topbar");
        bar.setAlignItems(FlexComponent.Alignment.CENTER);
        bar.setWidthFull();
        bar.setFlexGrow(1, tabs);
        return bar;
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        navigating = true;
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