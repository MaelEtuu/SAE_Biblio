package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.dto.ImportReport;
import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.entity.Livre;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EditeurRepository;
import com.usmb.but3.td4biblio.repository.FormatRepository;
import com.usmb.but3.td4biblio.service.ImportExportService;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ImportExportService — tests unitaires")
class ImportExportServiceTest {

    @Mock private DocumentRepository documentRepository;
    @Mock private AuteurRepository   auteurRepository;
    @Mock private FormatRepository   formatRepository;
    @Mock private EditeurRepository  editeurRepository;

    @InjectMocks
    private ImportExportService service;

    private static final String EN_TETE =
            "titre;auteurNom;auteurPrenom;editeurNom;codeISBN;nbPages;format;codeEmplacement;estEmpruntable";

    private static InputStream csv(String... lignes) {
        return new ByteArrayInputStream(String.join("\n", lignes).getBytes(StandardCharsets.UTF_8));
    }

    // =====================================================================
    // IMPORT — succès
    // =====================================================================

    @Nested
    @DisplayName("Import CSV — succès")
    class ImportSucces {

        @Test
        @DisplayName("ligne valide : crée auteur, format, éditeur et enregistre le livre")
        void ligneValide_creationComplete() {
            when(auteurRepository.findByNomAndPrenom("Hugo", "Victor")).thenReturn(List.of());
            when(auteurRepository.save(any(Auteur.class))).thenAnswer(inv -> inv.getArgument(0));
            when(formatRepository.findByLargeur("Livre")).thenReturn(Optional.empty());
            when(formatRepository.save(any(Format.class))).thenAnswer(inv -> inv.getArgument(0));
            when(editeurRepository.findByNomSociete("Gallimard")).thenReturn(Optional.empty());
            when(editeurRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    "Les Misérables;Hugo;Victor;Gallimard;12345;500;Livre;A1;oui"));

            assertThat(rapport.getSucces()).isEqualTo(1);
            assertThat(rapport.getEchecs()).isZero();
            assertThat(rapport.getTotalLignes()).isEqualTo(1);
            assertThat(rapport.hasErreurs()).isFalse();
            verify(documentRepository).save(any(Livre.class));
        }

        @Test
        @DisplayName("auteur déjà existant : réutilisé, pas recréé")
        void auteurExistant_reutilise() {
            Auteur hugo = new Auteur();
            hugo.setIdAuteur(1);
            hugo.setNom("Hugo");
            hugo.setPrenom("Victor");
            when(auteurRepository.findByNomAndPrenom("Hugo", "Victor")).thenReturn(List.of(hugo));

            // Champs optionnels vides (éditeur, isbn, nbPages, format, emplacement)
            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    "Les Misérables;Hugo;Victor;;;;;;oui"));

            assertThat(rapport.getSucces()).isEqualTo(1);
            verify(auteurRepository, never()).save(any());
            verify(documentRepository).save(any(Livre.class));
        }
    }

    // =====================================================================
    // IMPORT — erreurs
    // =====================================================================

    @Nested
    @DisplayName("Import CSV — erreurs")
    class ImportErreurs {

        @Test
        @DisplayName("fichier vide")
        void fichierVide() {
            ImportReport rapport = service.importerDocumentsCsv(
                    new ByteArrayInputStream(new byte[0]));

            assertThat(rapport.hasErreurs()).isTrue();
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("vide");
            verify(documentRepository, never()).save(any());
        }

        @Test
        @DisplayName("en-tête invalide")
        void enTeteInvalide() {
            ImportReport rapport = service.importerDocumentsCsv(csv(
                    "mauvais;entete", "Les Misérables;Hugo"));

            assertThat(rapport.hasErreurs()).isTrue();
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("En-tête invalide");
            verify(documentRepository, never()).save(any());
        }

        @Test
        @DisplayName("nombre de colonnes insuffisant")
        void colonnesInsuffisantes() {
            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE, "Titre;Hugo"));

            assertThat(rapport.getEchecs()).isEqualTo(1);
            assertThat(rapport.getSucces()).isZero();
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("colonnes insuffisant");
        }

        @Test
        @DisplayName("titre manquant (champ obligatoire)")
        void titreManquant() {
            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    ";Hugo;Victor;;;;;;oui"));

            assertThat(rapport.getEchecs()).isEqualTo(1);
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("titre");
            verify(documentRepository, never()).save(any());
        }

        @Test
        @DisplayName("nbPages non numérique")
        void nbPagesInvalide() {
            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    "Titre;Hugo;Victor;;;abc;;;oui"));

            assertThat(rapport.getEchecs()).isEqualTo(1);
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("nbPages");
        }

        @Test
        @DisplayName("estEmpruntable hors oui/non")
        void empruntableInvalide() {
            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    "Titre;Hugo;Victor;;;;;;peut-être"));

            assertThat(rapport.getEchecs()).isEqualTo(1);
            assertThat(rapport.getErreurs().get(0).getMessage()).contains("estEmpruntable");
        }

        @Test
        @DisplayName("lignes mixtes : une valide, une en erreur")
        void lignesMixtes() {
            when(auteurRepository.findByNomAndPrenom("Hugo", "Victor"))
                    .thenReturn(List.of(auteur()));

            ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                    "Les Misérables;Hugo;Victor;;;;;;oui", // valide
                    ";Hugo;Victor;;;;;;oui"));            // titre manquant

            assertThat(rapport.getSucces()).isEqualTo(1);
            assertThat(rapport.getEchecs()).isEqualTo(1);
            assertThat(rapport.getTotalLignes()).isEqualTo(2);
        }
    }

    // =====================================================================
    // EXPORT CSV
    // =====================================================================

    @Nested
    @DisplayName("Export CSV")
    class ExportCsv {

        @Test
        @DisplayName("export documents : en-tête + données présentes")
        void exportDocuments() {
            when(documentRepository.findAll()).thenReturn(List.of(document()));

            String contenu = new String(service.exporterDocumentsCsv(), StandardCharsets.UTF_8);

            assertThat(contenu).contains("titre");
            assertThat(contenu).contains("Les Misérables");
            assertThat(contenu).contains("Hugo Victor");
        }

        @Test
        @DisplayName("export auteurs : données présentes")
        void exportAuteurs() {
            when(auteurRepository.findAll()).thenReturn(List.of(auteur()));

            String contenu = new String(service.exporterAuteursCsv(), StandardCharsets.UTF_8);

            assertThat(contenu).contains("nom");
            assertThat(contenu).contains("Hugo");
        }
    }

    // =====================================================================
    // EXPORT EXCEL
    // =====================================================================

    @Nested
    @DisplayName("Export Excel")
    class ExportExcel {

        @Test
        @DisplayName("export documents : classeur lisible avec feuille et données")
        void exportDocumentsExcel() throws Exception {
            when(documentRepository.findAll()).thenReturn(List.of(document()));

            byte[] data = service.exporterDocumentsExcel();

            try (XSSFWorkbook wb = new XSSFWorkbook(new ByteArrayInputStream(data))) {
                Sheet sheet = wb.getSheet("Documents");
                assertThat(sheet).isNotNull();
                assertThat(sheet.getRow(0).getCell(0).getStringCellValue()).isEqualTo("ID");
                assertThat(sheet.getRow(1).getCell(1).getStringCellValue()).isEqualTo("Les Misérables");
            }
        }

        @Test
        @DisplayName("export auteurs : feuille « Auteurs » présente")
        void exportAuteursExcel() throws Exception {
            when(auteurRepository.findAll()).thenReturn(List.of(auteur()));

            byte[] data = service.exporterAuteursExcel();

            try (XSSFWorkbook wb = new XSSFWorkbook(new ByteArrayInputStream(data))) {
                Sheet sheet = wb.getSheet("Auteurs");
                assertThat(sheet).isNotNull();
                assertThat(sheet.getRow(1).getCell(1).getStringCellValue()).isEqualTo("Hugo");
            }
        }
    }

    // =====================================================================
    // Fabriques
    // =====================================================================

    private static Auteur auteur() {
        Auteur a = new Auteur();
        a.setIdAuteur(1);
        a.setNom("Hugo");
        a.setPrenom("Victor");
        a.setNationalite("Française");
        return a;
    }

    private static Document document() {
        Document d = new Document();
        d.setIdDocument(1);
        d.setTitre("Les Misérables");
        d.setAuteur(auteur());
        d.setFormat(new Format(1, "21 cm", "Livre", "300 g"));
        d.setCodeEmplacement("A1");
        d.setEstEmpruntable(true);
        d.setDateAcquisition(LocalDateTime.of(2024, 1, 15, 0, 0));
        return d;
    }
}