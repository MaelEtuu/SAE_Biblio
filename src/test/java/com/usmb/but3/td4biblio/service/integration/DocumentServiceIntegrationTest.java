package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Tests d'intégration (NON mockés) de {@link DocumentService} sur H2 :
 * CRUD, recherche multi-critère, nouvelles acquisitions et disponibilité.
 */
@DataJpaTest
@Import(DocumentService.class)
@DisplayName("DocumentService — tests d'intégration (H2, sans mock)")
class DocumentServiceIntegrationTest {

    @Autowired private DocumentService documentService;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private AuteurRepository auteurRepository;
    @Autowired private TestEntityManager em;

    private Auteur hugo;
    private Format livre;
    private Document miserables;

    @BeforeEach
    void setUp() {
        hugo = auteurRepository.saveAndFlush(auteur("Hugo", "Victor"));

        livre = new Format();
        livre.setLargeur("Livre");
        livre = em.persistFlushFind(livre);

        miserables = documentRepository.saveAndFlush(
                doc("Les Misérables", hugo, livre, true, LocalDateTime.of(2024, 1, 15, 0, 0)));
    }

    @Test
    @DisplayName("getAllDocuments / getDocumentById (présent + absent)")
    void crud() {
        assertThat(documentService.getAllDocuments()).hasSize(1);
        assertThat(documentService.getDocumentById(miserables.getIdDocument()))
                .isEqualTo(miserables);

        assertThatThrownBy(() -> documentService.getDocumentById(9999))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Document introuvable");
    }

    @Test
    @DisplayName("deleteDocumentById supprime la ligne")
    void delete() {
        documentService.deleteDocumentById(miserables.getIdDocument());
        assertThat(documentService.getAllDocuments()).isEmpty();
    }

    @Test
    @DisplayName("search par titre / auteur / type")
    void search() {
        assertThat(documentService.search("Misér", "titre", "contient"))
                .containsExactly(miserables);
        assertThat(documentService.search("Hugo", "auteur", "contient"))
                .containsExactly(miserables);
        assertThat(documentService.search("Livre", "type", "contient"))
                .containsExactly(miserables);
    }

    @Test
    @DisplayName("getDerniersDocuments : empruntables triés par date d'acquisition décroissante")
    void getDerniersDocuments() {
        Document recent = documentRepository.saveAndFlush(
                doc("Germinal", hugo, livre, true, LocalDateTime.of(2024, 6, 1, 0, 0)));
        documentRepository.saveAndFlush(
                doc("Indispo", hugo, livre, false, LocalDateTime.of(2024, 7, 1, 0, 0)));

        assertThat(documentService.getDerniersDocuments(10))
                .extracting(Document::getTitre)
                .containsExactly("Germinal", "Les Misérables"); // récent d'abord, non-empruntable exclu
    }

    @Test
    @DisplayName("isDisponible : vrai pour un document libre")
    void isDisponible() {
        assertThat(documentService.isDisponible(miserables.getIdDocument())).isTrue();
        assertThat(documentService.getDocumentsDisponibles()).containsExactly(miserables);
    }

    // ── Fabriques ───────────────────────────────────────────────────────────
    private static Auteur auteur(String nom, String prenom) {
        Auteur a = new Auteur();
        a.setNom(nom);
        a.setPrenom(prenom);
        return a;
    }

    private static Document doc(String titre, Auteur auteur, Format format,
                                boolean empruntable, LocalDateTime acquisition) {
        Document d = new Document();
        d.setTitre(titre);
        d.setAuteur(auteur);
        d.setFormat(format);
        d.setEstEmpruntable(empruntable);
        d.setDateAcquisition(acquisition);
        return d;
    }
}
