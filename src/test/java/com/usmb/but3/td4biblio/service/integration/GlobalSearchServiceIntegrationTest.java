package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Role;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import com.usmb.but3.td4biblio.repository.RoleRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import com.usmb.but3.td4biblio.service.GlobalSearchService;
import com.usmb.but3.td4biblio.service.GlobalSearchService.CountSummary;
import com.usmb.but3.td4biblio.util.GlobalSearchResult;
import com.usmb.but3.td4biblio.util.GlobalSearchResult.EntityType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests d'intégration (NON mockés) de {@link GlobalSearchService} sur H2 :
 * recherche multi-entités réelle (documents, emprunteurs, emprunts, réservations),
 * calcul des statuts et confidentialité des données emprunteur.
 */
@DataJpaTest
@Import(GlobalSearchService.class)
@DisplayName("GlobalSearchService — tests d'intégration (H2, sans mock)")
class GlobalSearchServiceIntegrationTest {

    @Autowired private GlobalSearchService searchService;
    @Autowired private RoleRepository roleRepository;
    @Autowired private AuteurRepository auteurRepository;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private EmpruntsRepository empruntsRepository;
    @Autowired private ReservationRepository reservationRepository;

    private Document miserables;
    private Utilisateur camille;

    @BeforeEach
    void setUp() {
        Role emprunteurRole = new Role();
        emprunteurRole.setLibelleRole("EMPRUNTEUR");
        emprunteurRole = roleRepository.saveAndFlush(emprunteurRole);

        Auteur hugo = new Auteur();
        hugo.setNom("Hugo");
        hugo.setPrenom("Victor");
        hugo = auteurRepository.saveAndFlush(hugo);

        Document d = new Document();
        d.setTitre("Les Misérables");
        d.setAuteur(hugo);
        d.setCodeEmplacement("A1");
        d.setEstEmpruntable(true);
        miserables = documentRepository.saveAndFlush(d);

        Utilisateur u = new Utilisateur();
        u.setNom("Dupont");
        u.setPrenom("Camille");
        u.setMail("camille@test.fr");
        u.setNumeroCarte(1234567890L);
        u.setRole(emprunteurRole);
        u.setDateFinAbonnement(LocalDate.now().plusMonths(6));
        camille = utilisateurRepository.saveAndFlush(u);
    }

    @Test
    @DisplayName("search documents : trouve par titre, statut « Disponible »")
    void searchDocuments() {
        List<GlobalSearchResult> res = searchService.search("misér", EntityType.DOCUMENT, true);

        assertThat(res).hasSize(1);
        assertThat(res.get(0).champ1()).isEqualTo("Les Misérables");
        assertThat(res.get(0).statut()).isEqualTo("Disponible");
    }

    @Test
    @DisplayName("search emprunteurs : visible pour le bibliothécaire, masqué sinon")
    void searchEmprunteurs() {
        assertThat(searchService.search("dupont", EntityType.EMPRUNTEUR, true))
                .extracting(GlobalSearchResult::champ1)
                .containsExactly("Camille Dupont");

        assertThat(searchService.search("dupont", EntityType.EMPRUNTEUR, false)).isEmpty();
    }

    @Test
    @DisplayName("search emprunts : statut « En cours » et nom emprunteur selon le rôle")
    void searchEmprunts() {
        empruntsRepository.saveAndFlush(new Emprunts(
                miserables, camille, LocalDate.now(), LocalDate.now().plusDays(35),
                false, null, null));

        GlobalSearchResult biblio = searchService.search("", EntityType.EMPRUNT, true).get(0);
        assertThat(biblio.statut()).isEqualTo("En cours");
        assertThat(biblio.champ2()).isEqualTo("Camille Dupont");

        GlobalSearchResult emprunteur = searchService.search("", EntityType.EMPRUNT, false).get(0);
        assertThat(emprunteur.champ2()).isEqualTo("—"); // nom masqué
    }

    @Test
    @DisplayName("search réservations : statut « Active »")
    void searchReservations() {
        reservationRepository.saveAndFlush(new Reservation(
                miserables, camille, LocalDate.now(), LocalDate.now().plusDays(14)));

        List<GlobalSearchResult> res = searchService.search("", EntityType.RESERVATION, true);

        assertThat(res).hasSize(1);
        assertThat(res.get(0).statut()).isEqualTo("Active");
    }

    @Test
    @DisplayName("countByType : compte chaque catégorie (emprunteurs masqués hors biblio)")
    void countByType() {
        CountSummary biblio = searchService.countByType("", true);
        assertThat(biblio.documents()).isEqualTo(1);
        assertThat(biblio.emprunteurs()).isEqualTo(1);

        CountSummary nonBiblio = searchService.countByType("", false);
        assertThat(nonBiblio.documents()).isEqualTo(1);
        assertThat(nonBiblio.emprunteurs()).isZero();
    }
}
