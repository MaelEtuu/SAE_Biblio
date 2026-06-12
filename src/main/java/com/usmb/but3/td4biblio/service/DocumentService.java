package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

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
}