package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.util.GlobalSearchResult;
import com.usmb.but3.td4biblio.util.GlobalSearchResult.EntityType;
import com.usmb.but3.td4biblio.service.GlobalSearchService;
import com.usmb.but3.td4biblio.service.GlobalSearchService.CountSummary;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridSortOrder;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.router.*;

import java.util.List;
import java.util.Map;

/**
 * Vue de recherche globale multi-entités : documents, emprunteurs, emprunts, réservations.
 *
 * <p>Fonctionnalités :</p>
 * <ul>
 *   <li>Recherche textuelle insensible à la casse sur plusieurs champs par entité ;</li>
 *   <li>Filtrage par type d'entité (onglets + combo) ;</li>
 *   <li>Tri dynamique sur toutes les colonnes via {@link Grid} ;</li>
 *   <li>Pagination serveur (DataProvider lazy) ;</li>
 *   <li>Badges de comptage par onglet ;</li>
 *   <li>Paramètres URL ({@code q}, {@code type}) pour les deep-links ;</li>
 *   <li>Accès rapide : clic sur une ligne → navigation vers la vue métier correspondante.</li>
 * </ul>
 *
 * <p>Les colonnes affichées s'adaptent à l'onglet sélectionné.</p>
 */
@Route(value = "recherche")
@PageTitle("Recherche — BiblioVaadin")
@Menu(title = "Recherche", order = 1, icon = "vaadin:search")
public class RechercheView extends VerticalLayout implements HasUrlParameter<String> {

    private static final int DEFAULT_PAGE_SIZE = 10;

    private final GlobalSearchService searchService;

    // ── Champs UI ──
    private final TextField           searchField  = new TextField();
    private final ComboBox<Integer>   pageSizeBox  = new ComboBox<>();
    private final Span                resultLabel  = new Span();

    // ── Onglets ──
    private final Tab tabAll    = new Tab("Tout");
    private final Tab tabDocs   = new Tab();
    private final Tab tabEmp    = new Tab();
    private final Tab tabPrets  = new Tab();
    private final Tab tabRes    = new Tab();
    private final Tabs tabs     = new Tabs(tabAll, tabDocs, tabEmp, tabPrets, tabRes);

    // ── Grille ──
    private final Grid<GlobalSearchResult> grid = new Grid<>();

    // ── Colonnes (références pour le tri) ──
    private Grid.Column<GlobalSearchResult> colType;
    private Grid.Column<GlobalSearchResult> col1;
    private Grid.Column<GlobalSearchResult> col2;
    private Grid.Column<GlobalSearchResult> col3;
    private Grid.Column<GlobalSearchResult> col4;
    private Grid.Column<GlobalSearchResult> col5;
    private Grid.Column<GlobalSearchResult> colStatut;

    // ── État ──
    private EntityType entityFilter = null; // null = tout
    private String     currentQuery    = "";
    private boolean    isBibliothecaire = false; // initialisé dans le constructeur

    public RechercheView(GlobalSearchService searchService) {
        this.searchService = searchService;
        this.isBibliothecaire = SessionUtils.hasRole("BIBLIOTHECAIRE");

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        buildTabs();
        buildGrid();

        add(
                buildHeader(),
                buildSearchBar(),
                buildStatsRow(),
                tabs,
                buildGridToolbar(),
                grid
        );

        // Chargement initial (tout, vide)
        refreshAll();
    }

    // ── Paramètres URL ────────────────────────────────────────────────────────
    @Override
    public void setParameter(BeforeEvent event, @OptionalParameter String ignored) {
        Map<String, List<String>> params = event.getLocation()
                .getQueryParameters().getParameters();

        String q    = params.getOrDefault("q",    List.of("")).get(0);
        String type = params.getOrDefault("type", List.of("")).get(0);

        if (!q.isBlank()) {
            searchField.setValue(q);
            currentQuery = q.trim();
        }
        if (!type.isBlank()) {
            try {
                EntityType requested = EntityType.valueOf(type.toUpperCase());
                // Blocage : un emprunteur ne peut pas forcer l'accès aux données personnelles via l'URL
                if (requested == EntityType.EMPRUNTEUR && !isBibliothecaire) {
                    Notification.show("Accès réservé aux bibliothécaires.", 3000,
                                    Notification.Position.BOTTOM_CENTER)
                            .addThemeVariants(NotificationVariant.LUMO_ERROR);
                } else {
                    entityFilter = requested;
                    syncTabFromFilter();
                }
            } catch (IllegalArgumentException ignored2) { /* type inconnu, on ignore */ }
        }
        refreshAll();
    }

    // ── En-tête ───────────────────────────────────────────────────────────────
    private Div buildHeader() {
        var eyebrow = new Paragraph("Catalogue · Réseau des bibliothèques");
        eyebrow.addClassName("biblio-eyebrow");

        var titre = new H1("Recherche globale");
        titre.addClassName("biblio-hero-title");

        var sous = new Paragraph(
                "Cherchez simultanément dans les documents, les emprunteurs, "
                        + "les emprunts et les réservations. Cliquez sur une ligne pour accéder à la fiche.");
        sous.addClassName("biblio-subtitle");

        var header = new Div(eyebrow, titre, sous);
        header.addClassName("biblio-hero");
        return header;
    }

    // ── Barre de recherche ────────────────────────────────────────────────────
    private HorizontalLayout buildSearchBar() {
        searchField.setPlaceholder("Titre, auteur, nom, n° de carte, date…");
        searchField.setClearButtonVisible(true);
        searchField.getElement().getStyle().set("flex", "1 1 240px");
        searchField.addKeyPressListener(Key.ENTER, e -> runSearch());

        var searchBtn = new Button("Rechercher", VaadinIcon.SEARCH.create());
        searchBtn.addClassName("biblio-btn-primary");
        searchBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        searchBtn.addClickListener(e -> runSearch());

        var resetBtn = new Button("Réinitialiser", VaadinIcon.CLOSE_SMALL.create());
        resetBtn.addClassName("btn-ghost");
        resetBtn.addClassName("btn-mini");
        resetBtn.addClickListener(e -> {
            searchField.clear();
            currentQuery = "";
            entityFilter = null;
            tabs.setSelectedTab(tabAll);
            refreshAll();
            updateUrl();
        });

        var bar = new HorizontalLayout(searchField, searchBtn, resetBtn);
        bar.addClassName("biblio-searchbox");
        bar.setAlignItems(FlexComponent.Alignment.CENTER);
        bar.setWidthFull();
        return bar;
    }

    // ── Bloc de stats ─────────────────────────────────────────────────────────
    private final Span statDocs  = new Span("—");
    private final Span statEmp   = new Span("—");
    private final Span statPrets = new Span("—");
    private final Span statRes   = new Span("—");

    private Div buildStatsRow() {
        var row = new Div(
                buildStat(statDocs,  "documents"),
                buildStat(statEmp,   "emprunteurs"),
                buildStat(statPrets, "emprunts"),
                buildStat(statRes,   "réservations")
        );
        row.addClassName("espace-stats-row");
        return row;
    }

    private Div buildStat(Span valueSpan, String label) {
        styleStatValue(valueSpan);
        var lbl = new Span(label);
        styleStatLabel(lbl);
        var card = new Div(valueSpan, lbl);
        card.addClassName("espace-stat-card");
        return card;
    }

    private void styleStatValue(Span s) {
        s.getElement().getStyle()
                .set("font-family", "Newsreader, serif")
                .set("font-size", "32px")
                .set("font-weight", "300")
                .set("color", "var(--amber)")
                .set("display", "block")
                .set("line-height", "1");
    }

    private void styleStatLabel(Span s) {
        s.getElement().getStyle()
                .set("font-size", "11.5px")
                .set("color", "var(--ink-soft)")
                .set("text-transform", "uppercase")
                .set("letter-spacing", ".1em")
                .set("font-weight", "600")
                .set("margin-top", "6px")
                .set("display", "block");
    }

    // ── Onglets ───────────────────────────────────────────────────────────────
    private void buildTabs() {
        tabAll.getElement().setProperty("innerHTML", "Tout");
        // L'onglet Emprunteurs est réservé aux bibliothécaires (données personnelles)
        tabEmp.setVisible(isBibliothecaire);
        refreshTabLabels(new CountSummary(0, 0, 0, 0));

        tabs.addSelectedChangeListener(e -> {
            Tab t = e.getSelectedTab();
            if      (t == tabDocs)  entityFilter = EntityType.DOCUMENT;
            else if (t == tabEmp && isBibliothecaire) entityFilter = EntityType.EMPRUNTEUR;
            else if (t == tabPrets) entityFilter = EntityType.EMPRUNT;
            else if (t == tabRes)   entityFilter = EntityType.RESERVATION;
            else                    entityFilter = null;
            adjustColumns();
            refreshGrid();
            updateUrl();
        });
    }

    private void refreshTabLabels(CountSummary cs) {
        tabDocs .getElement().setProperty("innerHTML",
                "Documents <span class=\"badge\">"    + cs.documents()    + "</span>");
        if (isBibliothecaire) {
            tabEmp.getElement().setProperty("innerHTML",
                    "Emprunteurs <span class=\"badge\">" + cs.emprunteurs() + "</span>");
        }
        tabPrets.getElement().setProperty("innerHTML",
                "Emprunts <span class=\"badge\">"     + cs.emprunts()     + "</span>");
        tabRes  .getElement().setProperty("innerHTML",
                "Réservations <span class=\"badge\">" + cs.reservations() + "</span>");

        statDocs .setText(String.valueOf(cs.documents()));
        statEmp  .setText(String.valueOf(cs.emprunteurs()));
        statPrets.setText(String.valueOf(cs.emprunts()));
        statRes  .setText(String.valueOf(cs.reservations()));
    }

    private void syncTabFromFilter() {
        if      (entityFilter == EntityType.DOCUMENT)    tabs.setSelectedTab(tabDocs);
        else if (entityFilter == EntityType.EMPRUNTEUR)  tabs.setSelectedTab(tabEmp);
        else if (entityFilter == EntityType.EMPRUNT)     tabs.setSelectedTab(tabPrets);
        else if (entityFilter == EntityType.RESERVATION) tabs.setSelectedTab(tabRes);
        else                                              tabs.setSelectedTab(tabAll);
    }

    // ── Grille + DataProvider lazy ────────────────────────────────────────────
    private void buildGrid() {
        // Colonne type
        colType = grid.addColumn(r -> r.type().getLibelle())
                .setHeader("Type")
                .setSortProperty("type")
                .setWidth("120px").setFlexGrow(0);

        // Colonnes génériques (labels adaptés selon l'onglet)
        col1 = grid.addColumn(GlobalSearchResult::champ1)
                .setHeader("Titre / Nom")
                .setSortProperty("champ1")
                .setFlexGrow(2).setAutoWidth(true);

        col2 = grid.addColumn(r -> r.champ2() != null ? r.champ2() : "—")
                .setHeader("Auteur / E-mail")
                .setSortProperty("champ2")
                .setAutoWidth(true).setFlexGrow(1);

        col3 = grid.addColumn(r -> r.champ3() != null ? r.champ3() : "—")
                .setHeader("Type / N° carte")
                .setSortProperty("champ3")
                .setWidth("130px").setFlexGrow(0);

        col4 = grid.addColumn(r -> r.champ4() != null ? r.champ4() : "—")
                .setHeader("Emplacement / Emprunteur")
                .setSortProperty("champ4")
                .setAutoWidth(true).setFlexGrow(1);

        col5 = grid.addColumn(r -> r.champ5() != null ? r.champ5() : "—")
                .setHeader("Date")
                .setSortProperty("champ5")
                .setWidth("130px").setFlexGrow(0);

        // Colonne statut avec rendu badge
        colStatut = grid.addComponentColumn(r -> {
                    var badge = new Span(r.statut() != null ? r.statut() : "—");
                    badge.addClassNames("badge", resolveBadgeClass(r.statut()));
                    return badge;
                })
                .setHeader("Statut")
                .setSortProperty("statut")
                .setWidth("130px").setFlexGrow(0);

        grid.addClassName("vaadin-grid");
        grid.setPageSize(DEFAULT_PAGE_SIZE);
        grid.setMultiSort(false);

        // Clic sur une ligne → navigation
        grid.addItemClickListener(e -> navigateTo(e.getItem()));

        // Tri côté serveur via DataProvider lazy
        DataProvider<GlobalSearchResult, Void> dp = DataProvider.fromCallbacks(
                query -> {
                    String sortField = "champ1";
                    boolean asc = true;
                    if (!query.getSortOrders().isEmpty()) {
                        var so = query.getSortOrders().get(0);
                        sortField = so.getSorted();
                        asc = so.getDirection() == SortDirection.ASCENDING;
                    }
                    return searchService.searchPaged(
                            currentQuery, entityFilter,
                            sortField, asc,
                            query.getOffset(), query.getLimit(),
                            isBibliothecaire
                    ).stream();
                },
                query -> searchService.count(currentQuery, entityFilter, isBibliothecaire)
        );
        grid.setDataProvider(dp);
    }

    /** Masque / affiche les colonnes selon le type d'entité sélectionné. */
    private void adjustColumns() {
        if (entityFilter == null) {
            // Mode tout : on affiche toutes les colonnes
            colType.setVisible(true);
            col1.setHeader("Titre / Nom");
            col2.setHeader("Auteur / E-mail").setVisible(true); // nom emprunteur visible seulement biblio côté service
            col3.setHeader("Type / N° carte").setVisible(true);
            col4.setHeader("Emplacement / Ville").setVisible(true);
            col5.setHeader("Date").setVisible(true);
        } else switch (entityFilter) {
            case DOCUMENT -> {
                colType.setVisible(false);
                col1.setHeader("Titre");
                col2.setHeader("Auteur").setVisible(true);
                col3.setHeader("Format").setVisible(true);
                col4.setHeader("Emplacement").setVisible(true);
                col5.setHeader("Acquisition").setVisible(true);
            }
            case EMPRUNTEUR -> {
                colType.setVisible(false);
                col1.setHeader("Prénom Nom");
                col2.setHeader("E-mail").setVisible(true);
                col3.setHeader("N° carte").setVisible(true);
                col4.setHeader("Fin abonnement").setVisible(true);
                col5.setHeader("Ville").setVisible(true);
            }
            case EMPRUNT -> {
                colType.setVisible(false);
                col1.setHeader("Document");
                // Colonne emprunteur masquée pour les non-bibliothécaires
                col2.setHeader("Emprunteur").setVisible(isBibliothecaire);
                col3.setHeader("Emprunté le").setVisible(true);
                col4.setHeader("À rendre").setVisible(true);
                col5.setHeader("Rendu le").setVisible(true);
            }
            case RESERVATION -> {
                colType.setVisible(false);
                col1.setHeader("Document");
                // Colonne emprunteur masquée pour les non-bibliothécaires
                col2.setHeader("Emprunteur").setVisible(isBibliothecaire);
                col3.setHeader("Réservé le").setVisible(true);
                col4.setHeader("Expire le").setVisible(true);
                col5.setVisible(false);
            }
        }
    }

    // ── Barre de contrôle (résultat + taille de page) ──────────────────────
    private HorizontalLayout buildGridToolbar() {
        resultLabel.addClassName("biblio-section-meta");

        pageSizeBox.setItems(5, 10, 20, 50);
        pageSizeBox.setValue(DEFAULT_PAGE_SIZE);
        pageSizeBox.setWidth("90px");
        pageSizeBox.addValueChangeListener(e -> {
            if (e.getValue() != null) {
                grid.setPageSize(e.getValue());
                refreshGrid();
            }
        });

        var label = new Span("Résultats par page :");
        label.getElement().getStyle().set("font-size", "12px").set("color", "var(--muted)");

        var bar = new HorizontalLayout(resultLabel, label, pageSizeBox);
        bar.setWidthFull();
        bar.setAlignItems(FlexComponent.Alignment.CENTER);
        bar.setJustifyContentMode(FlexComponent.JustifyContentMode.BETWEEN);
        bar.getElement().getStyle().set("margin", "8px 0");
        return bar;
    }

    // ── Actions ───────────────────────────────────────────────────────────────
    private void runSearch() {
        currentQuery = searchField.getValue().trim();
        refreshAll();
        updateUrl();
    }

    /** Rafraîchit stats + onglets + grille. */
    private void refreshAll() {
        CountSummary cs = searchService.countByType(currentQuery, isBibliothecaire);
        refreshTabLabels(cs);

        int total = entityFilter == null ? cs.total()
                : switch (entityFilter) {
            case DOCUMENT    -> cs.documents();
            case EMPRUNTEUR  -> cs.emprunteurs();
            case EMPRUNT     -> cs.emprunts();
            case RESERVATION -> cs.reservations();
        };
        resultLabel.setText(total + " résultat" + (total > 1 ? "s" : ""));

        adjustColumns();
        refreshGrid();
    }

    private void refreshGrid() {
        grid.getDataProvider().refreshAll();
    }

    /** Navigue vers la vue métier correspondante selon le type de résultat. */
    private void navigateTo(GlobalSearchResult r) {
        if (r == null || r.id() == null) return;
        switch (r.type()) {
            case DOCUMENT    -> getUI().ifPresent(ui -> ui.navigate("catalogue"));
            case EMPRUNTEUR  -> {
                if (SessionUtils.hasRole("BIBLIOTHECAIRE")) {
                    getUI().ifPresent(ui -> ui.navigate("gestion"));
                } else {
                    Notification.show("Accès réservé aux bibliothécaires.", 2000,
                            Notification.Position.BOTTOM_CENTER);
                }
            }
            case EMPRUNT, RESERVATION ->
                    getUI().ifPresent(ui -> ui.navigate("mon-espace"));
        }
    }

    /** Met à jour l'URL pour permettre le deep-link. */
    private void updateUrl() {
        StringBuilder url = new StringBuilder("recherche");
        boolean hasParam = false;
        if (!currentQuery.isEmpty()) {
            url.append("?q=").append(currentQuery);
            hasParam = true;
        }
        if (entityFilter != null) {
            url.append(hasParam ? "&" : "?").append("type=").append(entityFilter.name());
        }
        UI.getCurrent().getPage().getHistory().replaceState(null, url.toString());
    }

    // ── Utilitaires ───────────────────────────────────────────────────────────
    private String resolveBadgeClass(String statut) {
        if (statut == null) return "badge-indispo";
        return switch (statut) {
            case "Disponible", "Valide", "Active" -> "badge-dispo";
            case "Emprunté", "Réservé", "En cours" -> "badge-emprunte";
            case "En retard", "Expirée", "Expiré" -> "badge-indispo";
            default -> "badge-indispo";
        };
    }
}