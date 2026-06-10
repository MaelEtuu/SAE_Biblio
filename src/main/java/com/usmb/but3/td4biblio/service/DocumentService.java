package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

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
        return documentRepository.findByAuteur_NomSocieteContainingIgnoreCase(nom);
    }

    public List<Document> getByFormatLibelleContainingIgnoreCase(String libelleFormat) {
        return documentRepository.findByFormat_LargeurContainingIgnoreCase(libelleFormat);
    }

    /**
     * Recherche multi-critère reproduisant la logique du prototype HTML :
     * critere = "titre" | "auteur" | "type" | "bibliothèque"
     * match   = "contient" | "égal à" | "débute par"
     */
    public List<Document> search(String terme, String critere, String match) {
        if (terme == null || terme.isBlank()) {
            return getAllDocuments();
        }
        // Pour "égal à" et "débute par" on filtre en mémoire sur la liste contient
        // (suffisant pour un prototype ; à optimiser via Specification si besoin)
        List<Document> base = switch (critere == null ? "titre" : critere) {
            case "auteur"       -> getByAuteurNomContainingIgnoreCase(terme);
            case "type"         -> getByFormatLibelleContainingIgnoreCase(terme);
            // "bibliothèque" → pas de champ direct sur Document ; filtre sur codeEmplacement
            case "bibliothèque" -> documentRepository.findAll().stream()
                    .filter(d -> d.getCodeEmplacement() != null
                            && d.getCodeEmplacement().toLowerCase()
                            .contains(terme.toLowerCase()))
                    .toList();
            default             -> getByTitreContainingIgnoreCase(terme);
        };

        if (match == null || match.equals("contient")) return base;

        String t = terme.toLowerCase();
        return base.stream().filter(d -> {
            String val = switch (critere == null ? "titre" : critere) {
                case "auteur" -> d.getAuteur() != null ? d.getAuteur().getNomSociete().toLowerCase() : "";
                default       -> d.getTitre() != null  ? d.getTitre().toLowerCase()           : "";
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

    public boolean isDisponible(Integer idDocument) {
        return getDocumentsDisponibles().stream()
                .anyMatch(d -> d.getIdDocument().equals(idDocument));
    }
}