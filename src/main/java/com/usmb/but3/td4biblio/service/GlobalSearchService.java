package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.util.GlobalSearchResult;
import com.usmb.but3.td4biblio.util.GlobalSearchResult.EntityType;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Emprunts;
import com.usmb.but3.td4biblio.entity.Reservation;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EmpruntsRepository;
import com.usmb.but3.td4biblio.repository.ReservationRepository;
import com.usmb.but3.td4biblio.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.function.Predicate;

/**
 * Recherche globale multi-entités (documents, emprunteurs, emprunts, réservations).
 *
 * <p>La méthode principale {@link #search(String, EntityType)} retourne une liste
 * homogène de {@link GlobalSearchResult}, ce qui permet à la vue de trier et
 * paginer côté serveur (ou de déléguer à {@link #searchPaged}) selon les besoins.</p>
 *
 * <p>Le terme de recherche est comparé en minuscules, insensiblement à la casse,
 * à plusieurs champs de chaque entité. Une chaîne vide retourne tous les enregistrements
 * de chaque catégorie sélectionnée.</p>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GlobalSearchService {

    private static final DateTimeFormatter FMT =
            DateTimeFormatter.ofPattern("d MMM yyyy", Locale.FRENCH);

    private final DocumentRepository    documentRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EmpruntsRepository    empruntsRepository;
    private final ReservationRepository reservationRepository;

    // =========================================================================
    // API principale
    // =========================================================================

    /**
     * Recherche sur toutes les entités (ou une seule selon {@code entityType}).
     *
     * @param terme      texte recherché (vide = tout)
     * @param entityType type ciblé, ou {@code null} pour tout chercher
     * @return liste non triée des résultats
     */
    /**
     * @param isBibliothecaire vrai si l'appelant a le rôle BIBLIOTHECAIRE.
     *                         Seuls les bibliothécaires voient les résultats
     *                         de type EMPRUNTEUR (nom, prénom, e-mail, n° carte).
     */
    public List<GlobalSearchResult> search(String terme, EntityType entityType,
                                           boolean isBibliothecaire) {
        String t = terme == null ? "" : terme.trim().toLowerCase(Locale.FRENCH);
        List<GlobalSearchResult> results = new ArrayList<>();

        if (entityType == null || entityType == EntityType.DOCUMENT) {
            results.addAll(searchDocuments(t));
        }
        // Données personnelles : bibliothécaires uniquement
        if (isBibliothecaire && (entityType == null || entityType == EntityType.EMPRUNTEUR)) {
            results.addAll(searchEmprunteurs(t));
        }
        if (entityType == null || entityType == EntityType.EMPRUNT) {
            // Dans les emprunts, on masque le nom de l'emprunteur aux non-bibliothécaires
            results.addAll(searchEmprunts(t, isBibliothecaire));
        }
        if (entityType == null || entityType == EntityType.RESERVATION) {
            // Idem pour les réservations
            results.addAll(searchReservations(t, isBibliothecaire));
        }

        log.debug("Recherche '{}' ({}, biblio={}) → {} résultat(s)",
                terme, entityType, isBibliothecaire, results.size());
        return results;
    }

    /**
     * Version paginée et triable, utilisée directement par la vue Vaadin.
     *
     * @param terme       texte recherché
     * @param entityType  filtre de type, ou {@code null}
     * @param sortField   nom du champ de tri ({@code "champ1"}, {@code "statut"}…)
     * @param ascending   sens du tri
     * @param offset      index du premier élément (0-based)
     * @param limit       taille de la page
     * @return sous-liste triée et découpée
     */
    public List<GlobalSearchResult> searchPaged(
            String terme, EntityType entityType,
            String sortField, boolean ascending,
            int offset, int limit,
            boolean isBibliothecaire) {

        List<GlobalSearchResult> all = search(terme, entityType, isBibliothecaire);
        sort(all, sortField, ascending);
        int end = Math.min(offset + limit, all.size());
        return offset >= all.size() ? List.of() : all.subList(offset, end);
    }

    /** Compte total pour la pagination. */
    public int count(String terme, EntityType entityType, boolean isBibliothecaire) {
        return search(terme, entityType, isBibliothecaire).size();
    }

    /** Compte par type pour les badges des onglets. */
    public CountSummary countByType(String terme, boolean isBibliothecaire) {
        String t = terme == null ? "" : terme.trim().toLowerCase(Locale.FRENCH);
        return new CountSummary(
                searchDocuments(t).size(),
                isBibliothecaire ? searchEmprunteurs(t).size() : 0,
                searchEmprunts(t, isBibliothecaire).size(),
                searchReservations(t, isBibliothecaire).size()
        );
    }

    public record CountSummary(int documents, int emprunteurs, int emprunts, int reservations) {
        public int total() { return documents + emprunteurs + emprunts + reservations; }
    }

    // =========================================================================
    // Recherche par entité
    // =========================================================================

    private List<GlobalSearchResult> searchDocuments(String t) {
        Predicate<Document> match = d ->
                contains(d.getTitre(), t)
                        || (d.getAuteur() != null && (
                        contains(d.getAuteur().getNom(), t)
                                || contains(d.getAuteur().getPrenom(), t)))
                        || (d.getFormat() != null && contains(d.getFormat().getLargeur(), t))
                        || contains(d.getCodeEmplacement(), t)
                        || contains(d.getDescription(), t);

        return documentRepository.findAll().stream()
                .filter(d -> t.isEmpty() || match.test(d))
                .map(this::toDocResult)
                .toList();
    }

    private List<GlobalSearchResult> searchEmprunteurs(String t) {
        Predicate<Utilisateur> match = u ->
                contains(u.getNom(), t)
                        || contains(u.getPrenom(), t)
                        || contains(u.getMail(), t)
                        || (u.getNumeroCarte() != null && String.valueOf(u.getNumeroCarte()).contains(t))
                        || contains(u.getVille(), t)
                        || contains(u.getAdresse(), t);

        // On cherche uniquement les emprunteurs (pas les bibliothécaires)
        return utilisateurRepository.findByRole_LibelleRole("EMPRUNTEUR").stream()
                .filter(u -> t.isEmpty() || match.test(u))
                .map(this::toEmprunteurResult)
                .toList();
    }

    private List<GlobalSearchResult> searchEmprunts(String t, boolean isBibliothecaire) {
        Predicate<Emprunts> match = e ->
                (e.getDocument() != null && contains(e.getDocument().getTitre(), t))
                        || (isBibliothecaire && e.getUtilisateur() != null && (
                        contains(e.getUtilisateur().getNom(), t)
                                || contains(e.getUtilisateur().getPrenom(), t)))
                        || (e.getDateDebut() != null && e.getDateDebut().format(FMT).toLowerCase(Locale.FRENCH).contains(t))
                        || (e.getDateFin() != null && e.getDateFin().format(FMT).toLowerCase(Locale.FRENCH).contains(t));

        return empruntsRepository.findAll().stream()
                .filter(e -> t.isEmpty() || match.test(e))
                .map(e -> toEmpruntResult(e, isBibliothecaire))
                .toList();
    }

    private List<GlobalSearchResult> searchReservations(String t, boolean isBibliothecaire) {
        Predicate<Reservation> match = r ->
                (r.getDocument() != null && contains(r.getDocument().getTitre(), t))
                        || (isBibliothecaire && r.getUtilisateur() != null && (
                        contains(r.getUtilisateur().getNom(), t)
                                || contains(r.getUtilisateur().getPrenom(), t)))
                        || (r.getDateDebut() != null && r.getDateDebut().format(FMT).toLowerCase(Locale.FRENCH).contains(t))
                        || (r.getDateFin() != null && r.getDateFin().format(FMT).toLowerCase(Locale.FRENCH).contains(t));

        return reservationRepository.findAll().stream()
                .filter(r -> t.isEmpty() || match.test(r))
                .map(r -> toReservationResult(r, isBibliothecaire))
                .toList();
    }

    // =========================================================================
    // Mappeurs entité → DTO
    // =========================================================================

    private GlobalSearchResult toDocResult(Document d) {
        String auteur = d.getAuteur() != null
                ? (nz(d.getAuteur().getNom()) + " " + nz(d.getAuteur().getPrenom())).trim()
                : "—";
        String format = d.getFormat() != null ? nz(d.getFormat().getLargeur()) : "—";
        String statut;
        if (!Boolean.TRUE.equals(d.getEstEmpruntable())) {
            statut = "Non empruntable";
        } else {
            boolean emprunte = empruntsRepository.existsByDocument_IdDocumentAndDateRetourIsNull(d.getIdDocument());
            boolean reserve  = !reservationRepository
                    .findByDocument_IdDocumentAndDateFinGreaterThanEqual(d.getIdDocument(), LocalDate.now())
                    .isEmpty();
            statut = emprunte ? "Emprunté" : reserve ? "Réservé" : "Disponible";
        }

        return new GlobalSearchResult(
                EntityType.DOCUMENT,
                d.getIdDocument(),
                nz(d.getTitre()),
                auteur,
                format,
                nz(d.getCodeEmplacement()),
                d.getDateAcquisition() != null ? d.getDateAcquisition().toLocalDate().format(FMT) : "—",
                null,
                statut
        );
    }

    private GlobalSearchResult toEmprunteurResult(Utilisateur u) {
        boolean expire = u.getDateFinAbonnement() != null
                && u.getDateFinAbonnement().isBefore(LocalDate.now());
        String statut = expire ? "Expiré" : "Valide";
        String finAbo = u.getDateFinAbonnement() != null ? u.getDateFinAbonnement().format(FMT) : "—";
        String carte  = u.getNumeroCarte() != null ? String.valueOf(u.getNumeroCarte()) : "—";

        return new GlobalSearchResult(
                EntityType.EMPRUNTEUR,
                u.getIdUtilisateur(),
                (nz(u.getPrenom()) + " " + nz(u.getNom())).trim(),
                nz(u.getMail()),
                carte,
                finAbo,
                nz(u.getVille()),
                null,
                statut
        );
    }

    private GlobalSearchResult toEmpruntResult(Emprunts e, boolean isBibliothecaire) {
        String docTitre = e.getDocument() != null ? nz(e.getDocument().getTitre()) : "—";
        // Nom de l'emprunteur masqué pour les non-bibliothécaires (confidentialité)
        String emprunteur = isBibliothecaire && e.getUtilisateur() != null
                ? (nz(e.getUtilisateur().getPrenom()) + " " + nz(e.getUtilisateur().getNom())).trim()
                : "—";
        String debut   = e.getDateDebut() != null ? e.getDateDebut().format(FMT) : "—";
        String fin     = e.getDateFin()   != null ? e.getDateFin().format(FMT)   : "—";
        String retour  = e.getDateRetour() != null ? e.getDateRetour().format(FMT) : null;

        String statut;
        if (e.getDateRetour() != null) {
            statut = "Rendu";
        } else if (e.getDateFin() != null && e.getDateFin().isBefore(LocalDate.now())) {
            statut = "En retard";
        } else {
            statut = "En cours";
        }

        return new GlobalSearchResult(
                EntityType.EMPRUNT,
                e.getDocument() != null ? e.getDocument().getIdDocument() : null,
                docTitre,
                emprunteur,
                debut,
                fin,
                retour != null ? retour : "—",
                null,
                statut
        );
    }

    private GlobalSearchResult toReservationResult(Reservation r, boolean isBibliothecaire) {
        String docTitre = r.getDocument() != null ? nz(r.getDocument().getTitre()) : "—";
        // Nom de l'emprunteur masqué pour les non-bibliothécaires (confidentialité)
        String emprunteur = isBibliothecaire && r.getUtilisateur() != null
                ? (nz(r.getUtilisateur().getPrenom()) + " " + nz(r.getUtilisateur().getNom())).trim()
                : "—";
        String debut = r.getDateDebut() != null ? r.getDateDebut().format(FMT) : "—";
        String fin   = r.getDateFin()   != null ? r.getDateFin().format(FMT)   : "—";

        boolean expiree = r.getDateFin() != null && r.getDateFin().isBefore(LocalDate.now());
        String statut = expiree ? "Expirée" : "Active";

        return new GlobalSearchResult(
                EntityType.RESERVATION,
                r.getDocument() != null ? r.getDocument().getIdDocument() : null,
                docTitre,
                emprunteur,
                debut,
                fin,
                null,
                null,
                statut
        );
    }

    // =========================================================================
    // Tri
    // =========================================================================

    private void sort(List<GlobalSearchResult> list, String field, boolean ascending) {
        if (field == null) return;
        Comparator<GlobalSearchResult> cmp = switch (field) {
            case "champ1"  -> Comparator.comparing(GlobalSearchResult::champ1, STR_CMP);
            case "champ2"  -> Comparator.comparing(r -> nvl(r.champ2()), STR_CMP);
            case "champ3"  -> Comparator.comparing(r -> nvl(r.champ3()), STR_CMP);
            case "champ4"  -> Comparator.comparing(r -> nvl(r.champ4()), STR_CMP);
            case "champ5"  -> Comparator.comparing(r -> nvl(r.champ5()), STR_CMP);
            case "champ6"  -> Comparator.comparing(r -> nvl(r.champ6()), STR_CMP);
            case "statut"  -> Comparator.comparing(r -> nvl(r.statut()), STR_CMP);
            case "type"    -> Comparator.comparing(r -> r.type().getLibelle(), STR_CMP);
            default        -> Comparator.comparing(GlobalSearchResult::champ1, STR_CMP);
        };
        if (!ascending) cmp = cmp.reversed();
        list.sort(cmp);
    }

    private static final Comparator<String> STR_CMP =
            Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER);

    // =========================================================================
    // Utilitaires
    // =========================================================================

    private boolean contains(String value, String term) {
        if (value == null || term.isEmpty()) return term.isEmpty();
        return value.toLowerCase(Locale.FRENCH).contains(term);
    }

    private String nz(String s) { return s != null ? s : ""; }
    private String nvl(String s) { return s != null ? s : ""; }
}