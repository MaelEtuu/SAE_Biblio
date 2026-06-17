package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.service.GlobalSearchService;
import com.usmb.but3.td4biblio.service.GlobalSearchService.CountSummary;
import com.usmb.but3.td4biblio.util.GlobalSearchResult;
import com.usmb.but3.td4biblio.util.GlobalSearchResult.EntityType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("GlobalSearchService — tests unitaires")
class GlobalSearchServiceTest {

    @Mock private DocumentRepository    documentRepository;
    @Mock private UtilisateurRepository utilisateurRepository;
    @Mock private EmpruntsRepository    empruntsRepository;
    @Mock private ReservationRepository reservationRepository;

    @InjectMocks
    private GlobalSearchService searchService;

    private Auteur hugo;
    private Format livre;
    private Document miserables;
    private Document notreDame;
    private Utilisateur camille;

    @BeforeEach
    void setUp() {
        hugo = new Auteur(1, null, "Hugo", "Victor", "Française",
                LocalDate.of(1802, 2, 26), LocalDate.of(1885, 5, 22), null, null, null);

        livre = new Format(1, "21 cm", "Livre", "300 g");

        miserables = new Document();
        miserables.setIdDocument(1);
        miserables.setTitre("Les Misérables");
        miserables.setAuteur(hugo);
        miserables.setFormat(livre);
        miserables.setEstEmpruntable(true);
        miserables.setCodeEmplacement("A1");

        notreDame = new Document();
        notreDame.setIdDocument(2);
        notreDame.setTitre("Notre-Dame de Paris");
        notreDame.setAuteur(hugo);
        notreDame.setFormat(livre);
        notreDame.setEstEmpruntable(true);
        notreDame.setCodeEmplacement("A2");

        camille = new Utilisateur();
        camille.setIdUtilisateur(1);
        camille.setNom("Dupont");
        camille.setPrenom("Camille");
        camille.setMail("camille@test.fr");
        camille.setNumeroCarte(1234567890L);
        camille.setDateFinAbonnement(LocalDate.now().plusMonths(6));
    }

    // =====================================================================
    // Documents
    // =====================================================================

    @Nested
    @DisplayName("Recherche de documents")
    class Documents {

        @Test
        @DisplayName("filtre par titre (insensible à la casse)")
        void parTitre() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(1)).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(1), any()))
                    .thenReturn(List.of());

            List<GlobalSearchResult> res = searchService.search("misér", EntityType.DOCUMENT, true);

            assertThat(res).hasSize(1);
            assertThat(res.get(0).type()).isEqualTo(EntityType.DOCUMENT);
            assertThat(res.get(0).champ1()).isEqualTo("Les Misérables");
            assertThat(res.get(0).statut()).isEqualTo("Disponible");
        }

        @Test
        @DisplayName("terme vide retourne tous les documents")
        void termeVide() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(any())).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(any(), any()))
                    .thenReturn(List.of());

            assertThat(searchService.search("", EntityType.DOCUMENT, true)).hasSize(2);
        }

        @Test
        @DisplayName("statut « Non empruntable »")
        void statutNonEmpruntable() {
            miserables.setEstEmpruntable(false);
            when(documentRepository.findAll()).thenReturn(List.of(miserables));

            List<GlobalSearchResult> res = searchService.search("", EntityType.DOCUMENT, true);

            assertThat(res.get(0).statut()).isEqualTo("Non empruntable");
        }

        @Test
        @DisplayName("statut « Emprunté »")
        void statutEmprunte() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(1)).thenReturn(true);

            assertThat(searchService.search("", EntityType.DOCUMENT, true).get(0).statut())
                    .isEqualTo("Emprunté");
        }

        @Test
        @DisplayName("statut « Réservé »")
        void statutReserve() {
            Reservation r = new Reservation(miserables, camille,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(documentRepository.findAll()).thenReturn(List.of(miserables));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(1)).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(1), any()))
                    .thenReturn(List.of(r));

            assertThat(searchService.search("", EntityType.DOCUMENT, true).get(0).statut())
                    .isEqualTo("Réservé");
        }
    }

    // =====================================================================
    // Emprunteurs
    // =====================================================================

    @Nested
    @DisplayName("Recherche d'emprunteurs")
    class Emprunteurs {

        @Test
        @DisplayName("bibliothécaire : voit les emprunteurs")
        void biblioVoitEmprunteurs() {
            when(utilisateurRepository.findByRole_LibelleRole("EMPRUNTEUR"))
                    .thenReturn(List.of(camille));

            List<GlobalSearchResult> res = searchService.search("dupont", EntityType.EMPRUNTEUR, true);

            assertThat(res).hasSize(1);
            assertThat(res.get(0).type()).isEqualTo(EntityType.EMPRUNTEUR);
            assertThat(res.get(0).champ1()).isEqualTo("Camille Dupont");
            assertThat(res.get(0).statut()).isEqualTo("Valide");
        }

        @Test
        @DisplayName("non-bibliothécaire : aucun emprunteur retourné (confidentialité)")
        void nonBiblioNeVoitRien() {
            assertThat(searchService.search("dupont", EntityType.EMPRUNTEUR, false)).isEmpty();
        }

        @Test
        @DisplayName("statut « Expiré » quand l'abonnement est échu")
        void statutExpire() {
            camille.setDateFinAbonnement(LocalDate.now().minusDays(1));
            when(utilisateurRepository.findByRole_LibelleRole("EMPRUNTEUR"))
                    .thenReturn(List.of(camille));

            assertThat(searchService.search("", EntityType.EMPRUNTEUR, true).get(0).statut())
                    .isEqualTo("Expiré");
        }
    }

    // =====================================================================
    // Emprunts
    // =====================================================================

    @Nested
    @DisplayName("Recherche d'emprunts")
    class EmpruntsRecherche {

        @Test
        @DisplayName("statut « En cours » et nom de l'emprunteur visible pour le bibliothécaire")
        void enCoursBiblio() {
            Emprunts e = new Emprunts(miserables, camille,
                    LocalDate.now(), LocalDate.now().plusDays(35), false, null, null);
            when(empruntsRepository.findAll()).thenReturn(List.of(e));

            List<GlobalSearchResult> res = searchService.search("", EntityType.EMPRUNT, true);

            assertThat(res).hasSize(1);
            assertThat(res.get(0).statut()).isEqualTo("En cours");
            assertThat(res.get(0).champ2()).isEqualTo("Camille Dupont"); // emprunteur
        }

        @Test
        @DisplayName("nom de l'emprunteur masqué pour un non-bibliothécaire")
        void emprunteurMasque() {
            Emprunts e = new Emprunts(miserables, camille,
                    LocalDate.now(), LocalDate.now().plusDays(35), false, null, null);
            when(empruntsRepository.findAll()).thenReturn(List.of(e));

            List<GlobalSearchResult> res = searchService.search("", EntityType.EMPRUNT, false);

            assertThat(res.get(0).champ2()).isEqualTo("—");
        }

        @Test
        @DisplayName("statut « En retard » quand la date de fin est dépassée")
        void enRetard() {
            Emprunts e = new Emprunts(miserables, camille,
                    LocalDate.now().minusDays(40), LocalDate.now().minusDays(1), false, null, null);
            when(empruntsRepository.findAll()).thenReturn(List.of(e));

            assertThat(searchService.search("", EntityType.EMPRUNT, true).get(0).statut())
                    .isEqualTo("En retard");
        }

        @Test
        @DisplayName("statut « Rendu » quand la date de retour est renseignée")
        void rendu() {
            Emprunts e = new Emprunts(miserables, camille,
                    LocalDate.now().minusDays(10), LocalDate.now().plusDays(25), false, null,
                    LocalDate.now());
            when(empruntsRepository.findAll()).thenReturn(List.of(e));

            assertThat(searchService.search("", EntityType.EMPRUNT, true).get(0).statut())
                    .isEqualTo("Rendu");
        }
    }

    // =====================================================================
    // Réservations
    // =====================================================================

    @Nested
    @DisplayName("Recherche de réservations")
    class Reservations {

        @Test
        @DisplayName("statut « Active »")
        void active() {
            Reservation r = new Reservation(miserables, camille,
                    LocalDate.now(), LocalDate.now().plusDays(14));
            when(reservationRepository.findAll()).thenReturn(List.of(r));

            List<GlobalSearchResult> res = searchService.search("", EntityType.RESERVATION, true);

            assertThat(res).hasSize(1);
            assertThat(res.get(0).statut()).isEqualTo("Active");
        }

        @Test
        @DisplayName("statut « Expirée » quand la date de fin est dépassée")
        void expiree() {
            Reservation r = new Reservation(miserables, camille,
                    LocalDate.now().minusDays(30), LocalDate.now().minusDays(1));
            when(reservationRepository.findAll()).thenReturn(List.of(r));

            assertThat(searchService.search("", EntityType.RESERVATION, true).get(0).statut())
                    .isEqualTo("Expirée");
        }
    }

    // =====================================================================
    // Comptage, pagination, tri
    // =====================================================================

    @Nested
    @DisplayName("Comptage / pagination / tri")
    class ComptagePaginationTri {

        @Test
        @DisplayName("countByType : 0 partout quand les sources sont vides (biblio)")
        void countByTypeVide() {
            when(documentRepository.findAll()).thenReturn(List.of());
            when(utilisateurRepository.findByRole_LibelleRole("EMPRUNTEUR")).thenReturn(List.of());
            when(empruntsRepository.findAll()).thenReturn(List.of());
            when(reservationRepository.findAll()).thenReturn(List.of());

            CountSummary cs = searchService.countByType("", true);

            assertThat(cs.total()).isZero();
            assertThat(cs.documents()).isZero();
            assertThat(cs.emprunteurs()).isZero();
        }

        @Test
        @DisplayName("countByType : les emprunteurs ne sont pas comptés pour un non-bibliothécaire")
        void countByTypeNonBiblio() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(1)).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(1), any()))
                    .thenReturn(List.of());
            when(empruntsRepository.findAll()).thenReturn(List.of());
            when(reservationRepository.findAll()).thenReturn(List.of());

            CountSummary cs = searchService.countByType("", false);

            assertThat(cs.documents()).isEqualTo(1);
            assertThat(cs.emprunteurs()).isZero();
        }

        @Test
        @DisplayName("count : nombre total de résultats pour un type donné")
        void count() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(any())).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(any(), any()))
                    .thenReturn(List.of());

            assertThat(searchService.count("", EntityType.DOCUMENT, true)).isEqualTo(2);
        }

        @Test
        @DisplayName("searchPaged : trie par champ1 ascendant et découpe la page")
        void searchPaged() {
            Document germinal = new Document();
            germinal.setIdDocument(3);
            germinal.setTitre("Germinal");
            germinal.setFormat(livre);
            germinal.setEstEmpruntable(true);

            when(documentRepository.findAll()).thenReturn(List.of(miserables, notreDame, germinal));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(any())).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(any(), any()))
                    .thenReturn(List.of());

            List<GlobalSearchResult> page = searchService.searchPaged(
                    "", EntityType.DOCUMENT, "champ1", true, 0, 2, true);

            // tri asc : Germinal, Les Misérables, Notre-Dame → page de 2 = les deux premiers
            assertThat(page).extracting(GlobalSearchResult::champ1)
                    .containsExactly("Germinal", "Les Misérables");
        }

        @Test
        @DisplayName("searchPaged : offset au-delà de la taille retourne une page vide")
        void searchPaged_offsetTropGrand() {
            when(documentRepository.findAll()).thenReturn(List.of(miserables));
            when(empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(1)).thenReturn(false);
            when(reservationRepository.findByDocument_IdDocumentAndDateFinGreaterThanEqual(eq(1), any()))
                    .thenReturn(List.of());

            assertThat(searchService.searchPaged("", EntityType.DOCUMENT, "champ1", true, 50, 10, true))
                    .isEmpty();
        }
    }
}
