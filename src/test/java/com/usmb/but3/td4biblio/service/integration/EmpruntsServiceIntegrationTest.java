package com.usmb.but3.td4biblio.service.integration;

import com.usmb.but3.td4biblio.service.*;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Tests d'intégration (NON mockés) de {@link EmpruntsService} sur H2.
 * Vérifie les règles de prêt bout en bout (prêt, double prêt, prolongation, retour),
 * avec les valeurs de règles par défaut (durée 35 j, quota 10).
 */
@DataJpaTest
@Import({EmpruntsService.class, DocumentService.class, ReservationService.class, RegleService.class})
@DisplayName("EmpruntsService — tests d'intégration (H2, sans mock)")
class EmpruntsServiceIntegrationTest {

    @Autowired private EmpruntsService empruntsService;
    @Autowired private DocumentService documentService;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;

    private Utilisateur emprunteur;
    private Document    document;

    @BeforeEach
    void setUp() {
        Utilisateur u = new Utilisateur();
        u.setNom("Dupont");
        u.setMail("camille@test.fr");
        u.setDateFinAbonnement(LocalDate.now().plusMonths(6));
        emprunteur = utilisateurRepository.saveAndFlush(u);

        Document d = new Document();
        d.setTitre("Les Misérables");
        d.setEstEmpruntable(true);
        document = documentRepository.saveAndFlush(d);
    }

    @Test
    @DisplayName("creerPret : prêt créé sur 35 jours, document rendu indisponible")
    void creerPret_succes() {
        Emprunts e = empruntsService.creerPret(document.getIdDocument(), emprunteur);

        assertThat(e.getDateDebut()).isEqualTo(LocalDate.now());
        assertThat(e.getDateFin()).isEqualTo(LocalDate.now().plusDays(35));
        assertThat(e.getEstProlonge()).isFalse();
        assertThat(documentService.isDisponible(document.getIdDocument())).isFalse();
    }

    @Test
    @DisplayName("creerPret : un document déjà emprunté ne peut pas être prêté de nouveau")
    void creerPret_dejaEmprunte() {
        empruntsService.creerPret(document.getIdDocument(), emprunteur);

        Utilisateur autre = new Utilisateur();
        autre.setNom("Durand");
        autre.setMail("thomas@test.fr");
        autre.setDateFinAbonnement(LocalDate.now().plusMonths(6));
        autre = utilisateurRepository.saveAndFlush(autre);

        Utilisateur finalAutre = autre;
        assertThatThrownBy(() -> empruntsService.creerPret(document.getIdDocument(), finalAutre))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("déjà emprunté");
    }

    @Test
    @DisplayName("creerPret : abonnement échu => refus")
    void creerPret_abonnementEchu() {
        emprunteur.setDateFinAbonnement(LocalDate.now().minusDays(1));
        utilisateurRepository.saveAndFlush(emprunteur);

        assertThatThrownBy(() -> empruntsService.creerPret(document.getIdDocument(), emprunteur))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("abonnement");
    }

    @Test
    @DisplayName("prolonger : autorisé une seule fois pour un emprunteur")
    void prolonger_uneSeuleFois() {
        empruntsService.creerPret(document.getIdDocument(), emprunteur);

        Emprunts prolonge = empruntsService.prolonger(document.getIdDocument(), emprunteur);
        assertThat(prolonge.getEstProlonge()).isTrue();
        assertThat(prolonge.getDateFin()).isEqualTo(LocalDate.now().plusDays(70)); // 35 + 35

        assertThatThrownBy(() -> empruntsService.prolonger(document.getIdDocument(), emprunteur))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("déjà été prolongé");
    }

    @Test
    @DisplayName("retourner : enregistre la date de retour et rend le document de nouveau disponible")
    void retourner_rendDisponible() {
        empruntsService.creerPret(document.getIdDocument(), emprunteur);
        assertThat(documentService.isDisponible(document.getIdDocument())).isFalse();

        Emprunts retour = empruntsService.retourner(document.getIdDocument(), emprunteur);

        assertThat(retour.getDateRetour()).isEqualTo(LocalDate.now());
        assertThat(documentService.isDisponible(document.getIdDocument())).isTrue();
    }
}
