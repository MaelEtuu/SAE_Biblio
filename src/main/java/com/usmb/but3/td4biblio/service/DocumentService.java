package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Logique métier des documents : recherche multi-critère, nouvelles acquisitions,
 * disponibilité. (Corrigé : utilise {@code nom} d'auteur, plus {@code nomSociete}.)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService {

    private final DocumentRepository documentRepository;

    // --- CRUD ---

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Integer id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Document introuvable : " + id));
    }

    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    public void deleteDocumentById(Integer id) {
        documentRepository.deleteById(id);
    }

    // --- Recherche ---

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

    // --- Nouvelles acquisitions ---

    public List<Document> getNouvellesAcquisitions(int limit) {
        return documentRepository.findTop5ByEstEmpruntableTrueOrderByDateAcquisitionDesc();
    }

    // --- Disponibilité ---

    public List<Document> getDocumentsDisponibles() {
        return documentRepository.findDisponibles(LocalDate.now());
    }

    /** Vrai si le document est disponible (empruntable, ni emprunté, ni réservé). */
    public boolean isDisponible(Integer idDocument) {
        return getDocumentsDisponibles().stream()
                .anyMatch(d -> d.getIdDocument().equals(idDocument));
    }
}