package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.dto.ImportReport;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Livre;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EditeurRepository;
import com.usmb.but3.td4biblio.repository.FormatRepository;
import com.usmb.but3.td4biblio.service.ImportExportService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests d'intégration (NON mockés) de {@link ImportExportService} sur H2 :
 * l'import CSV crée réellement les auteurs/formats/éditeurs manquants et persiste
 * les livres, puis l'export relit la base.
 */
@DataJpaTest
@Import(ImportExportService.class)
@DisplayName("ImportExportService — tests d'intégration (H2, sans mock)")
class ImportExportServiceIntegrationTest {

    @Autowired private ImportExportService service;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private AuteurRepository auteurRepository;
    @Autowired private FormatRepository formatRepository;
    @Autowired private EditeurRepository editeurRepository;

    private static final String EN_TETE =
            "titre;auteurNom;auteurPrenom;editeurNom;codeISBN;nbPages;format;codeEmplacement;estEmpruntable";

    private static InputStream csv(String... lignes) {
        return new ByteArrayInputStream(String.join("\n", lignes).getBytes(StandardCharsets.UTF_8));
    }

    @Test
    @DisplayName("import : persiste un livre et crée les entités liées manquantes")
    void import_persisteLivreEtDependances() {
        ImportReport rapport = service.importerDocumentsCsv(csv(EN_TETE,
                "Les Misérables;Hugo;Victor;Gallimard;978-2070409228;1500;Livre;A1;oui"));

        assertThat(rapport.getSucces()).isEqualTo(1);
        assertThat(rapport.getEchecs()).isZero();

        List<Document> documents = documentRepository.findAll();
        assertThat(documents).hasSize(1);
        assertThat(documents.get(0)).isInstanceOf(Livre.class);

        Livre livre = (Livre) documents.get(0);
        assertThat(livre.getTitre()).isEqualTo("Les Misérables");
        assertThat(livre.getNbPages()).isEqualTo(1500);
        assertThat(livre.getEstEmpruntable()).isTrue();
        assertThat(livre.getAuteur().getNom()).isEqualTo("Hugo");
        assertThat(livre.getEditeur().getNomSociete()).isEqualTo("Gallimard");

        assertThat(auteurRepository.findByNomAndPrenom("Hugo", "Victor")).hasSize(1);
        assertThat(formatRepository.findByLargeur("Livre")).isPresent();
        assertThat(editeurRepository.findByNomSociete("Gallimard")).isPresent();
    }

    @Test
    @DisplayName("import : l'auteur n'est pas dupliqué entre deux lignes")
    void import_auteurNonDuplique() {
        service.importerDocumentsCsv(csv(EN_TETE,
                "Les Misérables;Hugo;Victor;;;;Livre;A1;oui",
                "Notre-Dame de Paris;Hugo;Victor;;;;Livre;A2;oui"));

        assertThat(documentRepository.findAll()).hasSize(2);
        assertThat(auteurRepository.findByNomAndPrenom("Hugo", "Victor")).hasSize(1);
    }

    @Test
    @DisplayName("export CSV : restitue les documents enregistrés")
    void exportCsv() {
        service.importerDocumentsCsv(csv(EN_TETE,
                "Les Misérables;Hugo;Victor;;;;Livre;A1;oui"));

        String contenu = new String(service.exporterDocumentsCsv(), StandardCharsets.UTF_8);

        assertThat(contenu).contains("Les Misérables");
        assertThat(contenu).contains("Hugo Victor");
    }
}
