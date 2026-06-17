package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.dto.ImportReport;
import com.usmb.but3.td4biblio.service.ImportExportService;
import com.usmb.but3.td4biblio.util.SessionUtils;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.flow.server.streams.DownloadResponse;
import com.vaadin.flow.server.streams.UploadHandler;

import java.io.ByteArrayInputStream;

/**
 * Import CSV des documents et export CSV/Excel (documents, auteurs).
 * Réservée aux bibliothécaires : {@link #beforeEnter} redirige vers l'accueil
 * tout visiteur non connecté ou n'ayant pas le rôle BIBLIOTHECAIRE.
 */
@Route(value = "import-export")
@PageTitle("Import / Export — BiblioVaadin")
@Menu(title = "Import / Export", order = 3, icon = "vaadin:exchange")
public class ImportExportView extends VerticalLayout implements BeforeEnterObserver {

    private final ImportExportService importExportService;

    private final Div rapportDiv = new Div();

    public ImportExportView(ImportExportService importExportService) {
        this.importExportService = importExportService;

        setPadding(false);
        setSpacing(false);
        addClassName("biblio-page");

        add(buildHeader(), buildImportSection(), buildExportSection(), rapportDiv);
    }

    // ── Garde d'accès : bibliothécaire uniquement ────────────────────────────
    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        if (!SessionUtils.isLoggedIn()) {
            event.forwardTo("login");
            return;
        }
        if (!SessionUtils.hasRole("BIBLIOTHECAIRE")) {
            Notification.show("Accès réservé aux bibliothécaires.", 3000,
                            Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
            event.forwardTo("");
        }
    }

    // ── En-tête ───────────────────────────────────────────────────────────
    private Div buildHeader() {
        var eyebrow = new Paragraph("Administration · Catalogue");
        eyebrow.addClassName("biblio-eyebrow");

        var titre = new H2("Import / Export");
        titre.addClassName("biblio-section-title");

        var sous = new Paragraph(
                "Importez des documents en masse depuis un fichier CSV, ou exportez "
                        + "le catalogue et les auteurs au format CSV ou Excel.");
        sous.addClassName("biblio-subtitle");

        var entete = new Div(eyebrow, titre, sous);
        entete.getElement().getStyle().set("margin-bottom", "28px");
        return entete;
    }

    // ── Section Import ────────────────────────────────────────────────────
    private Div buildImportSection() {
        var titre = new H3("Import CSV des documents");
        titre.getElement().getStyle().set("margin", "0 0 6px");

        var formatInfo = new Paragraph(
                "En-tête attendu (séparateur « ; ») : "
                        + "titre;auteurNom;auteurPrenom;editeurNom;codeISBN;nbPages;format;codeEmplacement;estEmpruntable");
        formatInfo.getElement().getStyle()
                .set("font-size", "12.5px").set("color", "var(--ink-soft)")
                .set("margin", "0 0 16px");

        // Tableau d'1 élément pour pouvoir référencer l'Upload depuis la lambda
        // du handler, déclarée avant que l'instance finale ne soit assignée.
        Upload[] uploadRef = new Upload[1];

        UploadHandler uploadHandler = UploadHandler.inMemory((metadata, data) -> {
            UI ui = UI.getCurrent();
            ImportReport rapport;
            try {
                rapport = importExportService.importerDocumentsCsv(new ByteArrayInputStream(data));
            } catch (Exception ex) {
                ui.access(() -> {
                    Notification.show("Erreur lors de l'import : " + ex.getMessage(),
                                    3500, Notification.Position.BOTTOM_CENTER)
                            .addThemeVariants(NotificationVariant.LUMO_ERROR);
                    uploadRef[0].clearFileList();
                });
                return;
            }
            ui.access(() -> {
                afficherRapport(rapport);
                uploadRef[0].clearFileList();
            });
        });

        Upload upload = new Upload();
        uploadRef[0] = upload;
        upload.setUploadHandler(uploadHandler);
        upload.setAcceptedFileTypes(".csv", "text/csv");
        upload.setMaxFiles(1);
        upload.setDropAllowed(true);

        upload.addFileRejectedListener(event ->
                Notification.show("Fichier rejeté : " + event.getErrorMessage(),
                                3000, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR));

        var carte = new Div(titre, formatInfo, upload);
        carte.getElement().getStyle()
                .set("background", "var(--card)")
                .set("border", "1px solid var(--line)")
                .set("border-radius", "14px")
                .set("padding", "28px")
                .set("margin-bottom", "32px");
        return carte;
    }

    // ── Section Export ───────────────────────────────────────────────────
    private Div buildExportSection() {
        var titre = new H3("Export du catalogue");
        titre.getElement().getStyle().set("margin", "0 0 16px");

        var lienDocCsv = creerLienTelechargement("Documents (CSV)", "documents.csv",
                importExportService::exporterDocumentsCsv, true);
        var lienDocXlsx = creerLienTelechargement("Documents (Excel)", "documents.xlsx",
                importExportService::exporterDocumentsExcel, false);
        var lienAuteurCsv = creerLienTelechargement("Auteurs (CSV)", "auteurs.csv",
                importExportService::exporterAuteursCsv, true);
        var lienAuteurXlsx = creerLienTelechargement("Auteurs (Excel)", "auteurs.xlsx",
                importExportService::exporterAuteursExcel, false);

        var ligne = new HorizontalLayout(lienDocCsv, lienDocXlsx, lienAuteurCsv, lienAuteurXlsx);
        ligne.getElement().getStyle().set("flex-wrap", "wrap").set("gap", "12px");

        var carte = new Div(titre, ligne);
        carte.getElement().getStyle()
                .set("background", "var(--card)")
                .set("border", "1px solid var(--line)")
                .set("border-radius", "14px")
                .set("padding", "28px");
        return carte;
    }

    /** Construit un lien de téléchargement (Anchor) habillé comme un bouton. */
    private com.vaadin.flow.component.html.Anchor creerLienTelechargement(
            String libelle, String nomFichier,
            java.util.function.Supplier<byte[]> generateur, boolean primaire) {

        var bouton = new Button(libelle);
        bouton.addClassName(primaire ? "biblio-btn-primary" : "btn-ghost");
        if (primaire) bouton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        DownloadHandler downloadHandler = DownloadHandler.fromInputStream(event -> {
            byte[] data = generateur.get();
            String contentType = nomFichier.endsWith(".csv") ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return new DownloadResponse(
                    new ByteArrayInputStream(data), nomFichier, contentType, data.length);
        });

        var anchor = new com.vaadin.flow.component.html.Anchor(downloadHandler, "");
        anchor.getStyle().set("text-decoration", "none");
        anchor.add(bouton);
        return anchor;
    }

    // ── Rapport d'import ──────────────────────────────────────────────────
    private void afficherRapport(ImportReport rapport) {
        rapportDiv.removeAll();

        var titre = new H3("Rapport d'import");
        titre.getElement().getStyle().set("margin", "32px 0 12px");

        var resume = new Span(rapport.getSucces() + " ligne(s) importée(s) avec succès sur "
                + rapport.getTotalLignes() + " — " + rapport.getEchecs() + " erreur(s).");
        resume.getElement().getStyle().set("display", "block").set("margin-bottom", "16px");

        rapportDiv.add(titre, resume);

        if (rapport.hasErreurs()) {
            Grid<ImportReport.LigneErreur> grid = new Grid<>();
            grid.addClassName("biblio-import-errors-grid");
            grid.setItems(rapport.getErreurs());
            grid.addColumn(ImportReport.LigneErreur::getNumeroLigne)
                    .setHeader("Ligne").setWidth("70px").setFlexGrow(0);
            grid.addColumn(ImportReport.LigneErreur::getContenu)
                    .setHeader("Contenu").setFlexGrow(1);
            grid.addColumn(ImportReport.LigneErreur::getMessage)
                    .setHeader("Erreur").setFlexGrow(2);
            grid.setAllRowsVisible(true);
            rapportDiv.add(grid);
        }

        if (rapport.getSucces() > 0) {
            Notification.show(rapport.getSucces() + " document(s) importé(s).", 3000,
                            Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        }
        if (rapport.getEchecs() > 0) {
            Notification.show(rapport.getEchecs() + " ligne(s) en erreur — voir le rapport ci-dessous.",
                            3500, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_ERROR);
        }
    }
}