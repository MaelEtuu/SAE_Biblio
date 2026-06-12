package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("DocumentService — tests unitaires")
class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @InjectMocks
    private DocumentService documentService;

    private Auteur hugo;
    private Document miserables;
    private Document notreDame;

    @BeforeEach
    void setUp() {
        hugo = new Auteur(1, null, "Hugo", "Victor", "Française",
                LocalDate.of(1802, 2, 26), LocalDate.of(1885, 5, 22),
                null, null, null);

        Format format = new Format(1, "21 cm", "Livre", "300 g");

        miserables = new Document();
        miserables.setIdDocument(1);
        miserables.setTitre("Les Misérables");
        miserables.setAuteur(hugo);
        miserables.setFormat(format);
        miserables.setEstEmpruntable(true);
        miserables.setCodeEmplacement("A1");

        notreDame = new Document();
        notreDame.setIdDocument(2);
        notreDame.setTitre("Notre-Dame de Paris");
        notreDame.setAuteur(hugo);
        notreDame.setFormat(format);
        notreDame.setEstEmpruntable(true);
        notreDame.setCodeEmplacement("A2");
    }

    @Nested
    @DisplayName("CRUD")
    class Crud {

        @Test
        @DisplayName("getAllDocuments délègue au repository")
        void getAllDocuments() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.getAllDocuments()).hasSize(2);
        }

        @Test
        @DisplayName("getDocumentById renvoie le document s'il existe")
        void getDocumentById_existe() {
            when(documentRepository.findById(1)).thenReturn(Optional.of(miserables));

            assertThat(documentService.getDocumentById(1)).isEqualTo(miserables);
        }

        @Test
        @DisplayName("getDocumentById lève IllegalArgumentException si introuvable")
        void getDocumentById_inexistant() {
            when(documentRepository.findById(99)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> documentService.getDocumentById(99))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Document introuvable");
        }

        @Test
        @DisplayName("saveDocument délègue au repository")
        void saveDocument() {
            when(documentRepository.save(miserables)).thenReturn(miserables);

            assertThat(documentService.saveDocument(miserables)).isEqualTo(miserables);
        }

        @Test
        @DisplayName("deleteDocumentById délègue au repository")
        void deleteDocumentById() {
            documentService.deleteDocumentById(1);

            verify(documentRepository).deleteById(1);
        }
    }

    @Nested
    @DisplayName("Recherche multi-critère")
    class RechercheMultiCritere {

        @Test
        @DisplayName("Terme blank retourne tous les documents")
        void termeBlank_retourneTout() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.search("", "titre", "contient")).hasSize(2);
            assertThat(documentService.search(null, "titre", "contient")).hasSize(2);
            assertThat(documentService.search("   ", "titre", "contient")).hasSize(2);
        }

        @Test
        @DisplayName("Recherche par titre, mode contient")
        void parTitre_contient() {
            when(documentRepository.findByTitreContainingIgnoreCase("Misér"))
                    .thenReturn(List.of(miserables));

            assertThat(documentService.search("Misér", "titre", "contient"))
                    .containsExactly(miserables);
        }

        @Test
        @DisplayName("Recherche par auteur, mode contient")
        void parAuteur_contient() {
            when(documentRepository.findByAuteur_NomContainingIgnoreCase("Hugo"))
                    .thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.search("Hugo", "auteur", "contient"))
                    .containsExactly(miserables, notreDame);
        }

        @Test
        @DisplayName("Recherche par type (format) mode contient")
        void parType_contient() {
            when(documentRepository.findByFormat_LargeurContainingIgnoreCase("Livre"))
                    .thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.search("Livre", "type", "contient")).hasSize(2);
        }

        @Test
        @DisplayName("Recherche par bibliothèque filtre sur codeEmplacement")
        void parBibliotheque_filtreSurCodeEmplacement() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.search("A1", "bibliothèque", "contient"))
                    .containsExactly(miserables);
        }

        @Test
        @DisplayName("Mode 'égal à' filtre stricte sur le titre")
        void titre_egalA() {
            when(documentRepository.findByTitreContainingIgnoreCase("les misérables"))
                    .thenReturn(List.of(miserables));

            assertThat(documentService.search("les misérables", "titre", "égal à"))
                    .containsExactly(miserables);

            // Égal à mais titre différent → liste vide
            when(documentRepository.findByTitreContainingIgnoreCase("misérables"))
                    .thenReturn(List.of(miserables));
            assertThat(documentService.search("misérables", "titre", "égal à"))
                    .isEmpty();
        }

        @Test
        @DisplayName("Mode 'débute par' sur le titre")
        void titre_debuteParr() {
            when(documentRepository.findByTitreContainingIgnoreCase("Les"))
                    .thenReturn(List.of(miserables));

            assertThat(documentService.search("Les", "titre", "débute par"))
                    .containsExactly(miserables);
        }

        @Test
        @DisplayName("Mode 'débute par' sur l'auteur")
        void auteur_debuteParr() {
            when(documentRepository.findByAuteur_NomContainingIgnoreCase("Hug"))
                    .thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.search("Hug", "auteur", "débute par"))
                    .hasSize(2);
        }

        @Test
        @DisplayName("Critère null → recherche par titre par défaut")
        void critereNull_titreParDefaut() {
            when(documentRepository.findByTitreContainingIgnoreCase("Mis"))
                    .thenReturn(List.of(miserables));

            assertThat(documentService.search("Mis", null, "contient"))
                    .containsExactly(miserables);
        }
    }

    @Nested
    @DisplayName("Acquisitions et disponibilité")
    class AcquisitionsEtDisponibilite {

        @Test
        @DisplayName("getNouvellesAcquisitions délègue au repository (top 5)")
        void getNouvellesAcquisitions() {
            when(documentRepository.findByEstEmpruntableTrueOrderByDateAcquisitionDesc(Pageable.ofSize(10)))
                    .thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.getDerniersDocuments(10)).hasSize(2);
        }

        @Test
        @DisplayName("getDocumentsDisponibles utilise la date du jour")
        void getDocumentsDisponibles() {
            when(documentRepository.findDisponibles(any(LocalDate.class)))
                    .thenReturn(List.of(miserables));

            assertThat(documentService.getDocumentsDisponibles()).containsExactly(miserables);
            verify(documentRepository).findDisponibles(LocalDate.now());
        }

        @Test
        @DisplayName("isDisponible vrai quand le document est dans les disponibles")
        void isDisponible_vrai() {
            when(documentRepository.findDisponibles(any(LocalDate.class)))
                    .thenReturn(List.of(miserables, notreDame));

            assertThat(documentService.isDisponible(1)).isTrue();
        }

        @Test
        @DisplayName("isDisponible faux quand le document n'est pas dans les disponibles")
        void isDisponible_faux() {
            when(documentRepository.findDisponibles(any(LocalDate.class)))
                    .thenReturn(List.of(notreDame));

            assertThat(documentService.isDisponible(1)).isFalse();
        }

        @Test
        @DisplayName("isDisponible faux quand aucun document disponible")
        void isDisponible_aucun() {
            when(documentRepository.findDisponibles(any(LocalDate.class)))
                    .thenReturn(Collections.emptyList());

            assertThat(documentService.isDisponible(1)).isFalse();
        }
    }
}
