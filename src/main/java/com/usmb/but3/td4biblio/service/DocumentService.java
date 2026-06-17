package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.usmb.but3.td4biblio.entity.A1;
import com.usmb.but3.td4biblio.entity.Editeur;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.entity.RaisonPasEmprunt;
import com.usmb.but3.td4biblio.repository.A1Repository;
import com.usmb.but3.td4biblio.repository.EditeurRepository;
import com.usmb.but3.td4biblio.repository.FormatRepository;
import com.usmb.but3.td4biblio.repository.RaisonPasEmpruntRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des documents : CRUD hérité de {@link AbstractCrudService},
 * complété par la recherche multi-critère, les nouvelles acquisitions et la disponibilité.
 * (Corrigé : utilise {@code nom} d'auteur, plus {@code nomSociete}.)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService extends AbstractCrudService<Document, Integer> {

    private final DocumentRepository documentRepository;
    private final FormatRepository           formatRepository;
    private final EditeurRepository          editeurRepository;
    private final RaisonPasEmpruntRepository raisonRepository;
    private final A1Repository               a1Repository;

    @Override
    protected JpaRepository<Document, Integer> getRepository() {
        return documentRepository;
    }

    // =====================================================================
    // Alias de compatibilité
    // =====================================================================

    public List<Document> getAllDocuments() {
        return getAll();
    }

    // =====================================================================
    // Listes de référence (formulaire de gestion documentaire)
    // =====================================================================
    public java.util.List<Format> getFormats()             { return formatRepository.findAll(); }
    public java.util.List<Editeur> getEditeurs()           { return editeurRepository.findAll(); }
    public java.util.List<RaisonPasEmprunt> getRaisons()   { return raisonRepository.findAll(); }

    /** Document par id ; lève une exception si introuvable (comportement d'origine). */
    public Document getDocumentById(Integer id) {
        return findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Document introuvable : " + id));
    }

    public Document saveDocument(Document document) {
        return save(document);
    }

    public void deleteDocumentById(Integer id) {
        deleteById(id);
    }

    // =====================================================================
    // Recherche
    // =====================================================================

    public List<Document> getByTitreContainingIgnoreCase(String titre) {
        return documentRepository.findByTitreContainingIgnoreCase(titre);
    }

    public List<Document> getByAuteurNomContainingIgnoreCase(String nom) {
        return documentRepository.findByAuteur_NomContainingIgnoreCase(nom);
    }

    public List<Document> getByFormatLibelleContainingIgnoreCase(String libelleFormat) {
        return documentRepository.findByFormat_LargeurContainingIgnoreCase(libelleFormat);
    }

    /**
     * Recherche multi-critère (reprend la logique du prototype HTML) :
     * <ul>
     *   <li>critère : "titre" | "auteur" | "type" | "bibliothèque" ;</li>
     *   <li>match : "contient" | "égal à" | "débute par".</li>
     * </ul>
     */
    public List<Document> search(String terme, String critere, String match) {
        if (terme == null || terme.isBlank()) {
            return getAllDocuments();
        }
        List<Document> base = switch (critere == null ? "titre" : critere) {
            case "auteur"       -> getByAuteurNomContainingIgnoreCase(terme);
            case "type"         -> getByFormatLibelleContainingIgnoreCase(terme);
            case "bibliothèque" -> documentRepository.findAll().stream()
                    .filter(d -> d.getCodeEmplacement() != null
                            && d.getCodeEmplacement().toLowerCase().contains(terme.toLowerCase()))
                    .toList();
            default             -> getByTitreContainingIgnoreCase(terme);
        };

        if (match == null || match.equals("contient")) {
            return base;
        }

        String t = terme.toLowerCase();
        return base.stream().filter(d -> {
            String val = switch (critere == null ? "titre" : critere) {
                case "auteur" -> d.getAuteur() != null && d.getAuteur().getNom() != null
                        ? d.getAuteur().getNom().toLowerCase() : "";
                default       -> d.getTitre() != null ? d.getTitre().toLowerCase() : "";
            };
            return match.equals("égal à") ? val.equals(t) : val.startsWith(t);
        }).toList();
    }

    // =====================================================================
    // Nouvelles acquisitions
    // =====================================================================

    public List<Document> getDerniersDocuments(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return documentRepository
                .findByEstEmpruntableTrueOrderByDateAcquisitionDesc(pageable);
    }

    // =====================================================================
    // Disponibilité
    // =====================================================================

    public List<Document> getDocumentsDisponibles() {
        return documentRepository.findDisponibles(LocalDate.now());
    }

    /** Vrai si le document est disponible (empruntable, ni emprunté, ni réservé). */
    public boolean isDisponible(Integer idDocument) {
        return getDocumentsDisponibles().stream()
                .anyMatch(d -> d.getIdDocument().equals(idDocument));
    }

    public RaisonPasEmprunt getMotifDuDocument(Integer idDocument) {
        if (idDocument == null) return null;
        return a1Repository.findByDocument_IdDocument(idDocument).stream()
                .findFirst().map(A1::getRaison).orElse(null);
    }

    /** Crée ou met à jour un document en synchronisant son motif de non-emprunt (table a1). */
    @Transactional
    public Document enregistrerDocument(Document doc, RaisonPasEmprunt motif) {
        Document saved = documentRepository.save(doc);
        a1Repository.deleteByDocument_IdDocument(saved.getIdDocument());
        if (!Boolean.TRUE.equals(saved.getEstEmpruntable()) && motif != null) {
            a1Repository.save(new A1(saved, motif));
        }
        return saved;
    }

    /** Supprime un document et ses motifs de non-emprunt associés. */
    @Transactional
    public void supprimerDocument(Integer id) {
        a1Repository.deleteByDocument_IdDocument(id);
        documentRepository.deleteById(id);
    }
}