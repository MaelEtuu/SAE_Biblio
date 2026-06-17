package com.usmb.but3.td4biblio.service;

import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import com.usmb.but3.td4biblio.dto.ImportReport;
import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Document;
import com.usmb.but3.td4biblio.entity.Editeur;
import com.usmb.but3.td4biblio.entity.Format;
import com.usmb.but3.td4biblio.entity.Livre;
import com.usmb.but3.td4biblio.repository.AuteurRepository;
import com.usmb.but3.td4biblio.repository.DocumentRepository;
import com.usmb.but3.td4biblio.repository.EditeurRepository;
import com.usmb.but3.td4biblio.repository.FormatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Import CSV des documents (avec rapport d'erreurs ligne par ligne) et export
 * CSV/Excel des documents et des auteurs. Réservé aux bibliothécaires (la
 * vérification de rôle est faite côté vue, cf. {@code ImportExportView}).
 *
 * Format CSV attendu pour l'import (en-tête obligatoire, séparateur ';') :
 * titre;auteurNom;auteurPrenom;editeurNom;codeISBN;nbPages;format;codeEmplacement;estEmpruntable
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImportExportService {

    private static final String[] EN_TETE_ATTENDU = {
            "titre", "auteurNom", "auteurPrenom", "editeurNom",
            "codeISBN", "nbPages", "format", "codeEmplacement", "estEmpruntable"
    };

    private final DocumentRepository documentRepository;
    private final AuteurRepository auteurRepository;
    private final FormatRepository formatRepository;
    private final EditeurRepository editeurRepository;

    // =====================================================================
    // IMPORT CSV
    // =====================================================================

    /**
     * Importe des documents (livres) depuis un flux CSV.
     * Chaque ligne en erreur est consignée dans le rapport ; les lignes valides
     * sont enregistrées immédiatement (pas de rollback global volontaire, afin
     * que le bibliothécaire récupère le maximum de documents importés).
     */
    public ImportReport importerDocumentsCsv(InputStream inputStream) {
        ImportReport rapport = new ImportReport();

        try (CSVReader reader = new CSVReaderBuilder(
                new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .withCSVParser(new CSVParserBuilder().withSeparator(';').build())
                .build()) {

            List<String[]> lignes = reader.readAll();
            if (lignes.isEmpty()) {
                rapport.ajouterErreur(0, "", "Fichier CSV vide.");
                return rapport;
            }

            String[] enTete = lignes.get(0);
            if (!validerEnTete(enTete)) {
                rapport.ajouterErreur(1, String.join(";", enTete),
                        "En-tête invalide. Attendu : " + String.join(";", EN_TETE_ATTENDU));
                return rapport;
            }

            for (int i = 1; i < lignes.size(); i++) {
                int numeroLigne = i + 1; // 1-indexé + en-tête
                String[] champs = lignes.get(i);
                String contenuLigne = String.join(";", champs);

                if (champs.length < EN_TETE_ATTENDU.length) {
                    rapport.ajouterErreur(numeroLigne, contenuLigne,
                            "Nombre de colonnes insuffisant (attendu " + EN_TETE_ATTENDU.length
                                    + ", obtenu " + champs.length + ").");
                    rapport.setTotalLignes(rapport.getTotalLignes() + 1);
                    continue;
                }

                try {
                    importerLigne(champs);
                    rapport.incrementerSucces();
                } catch (Exception e) {
                    rapport.ajouterErreur(numeroLigne, contenuLigne, e.getMessage());
                    log.warn("Erreur import ligne {} : {}", numeroLigne, e.getMessage());
                }
                rapport.setTotalLignes(rapport.getTotalLignes() + 1);
            }

        } catch (IOException e) {
            rapport.ajouterErreur(0, "", "Lecture du fichier impossible : " + e.getMessage());
        } catch (com.opencsv.exceptions.CsvException e) {
            rapport.ajouterErreur(0, "", "Format CSV invalide : " + e.getMessage());
        }

        return rapport;
    }

    private boolean validerEnTete(String[] enTete) {
        if (enTete.length != EN_TETE_ATTENDU.length) return false;
        for (int i = 0; i < enTete.length; i++) {
            if (!enTete[i].trim().equalsIgnoreCase(EN_TETE_ATTENDU[i])) return false;
        }
        return true;
    }

    private void importerLigne(String[] champs) {
        String titre = req(champs[0], "titre");
        String auteurNom = req(champs[1], "auteurNom");
        String auteurPrenom = champs[2].trim();
        String editeurNom = champs[3].trim();
        String codeISBN = champs[4].trim();

        Integer nbPages = null;
        if (!champs[5].trim().isEmpty()) {
            try {
                nbPages = Integer.parseInt(champs[5].trim());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("nbPages doit être un entier (valeur : '" + champs[5] + "').");
            }
        }

        String formatLibelle = champs[6].trim();
        String codeEmplacement = champs[7].trim();

        boolean estEmpruntable;
        String empruntableBrut = champs[8].trim();
        if (empruntableBrut.equalsIgnoreCase("oui") || empruntableBrut.equalsIgnoreCase("true") || empruntableBrut.equals("1")) {
            estEmpruntable = true;
        } else if (empruntableBrut.equalsIgnoreCase("non") || empruntableBrut.equalsIgnoreCase("false") || empruntableBrut.equals("0")) {
            estEmpruntable = false;
        } else {
            throw new IllegalArgumentException("estEmpruntable doit valoir oui/non (valeur : '" + empruntableBrut + "').");
        }

        // Auteur : recherche ou création
        Auteur auteur = auteurRepository.findByNomAndPrenom(auteurNom, auteurPrenom)
                .stream().findFirst()
                .orElseGet(() -> {
                    Auteur a = new Auteur();
                    a.setNom(auteurNom);
                    a.setPrenom(auteurPrenom);
                    return auteurRepository.save(a);
                });

        // Format : recherche ou création
        Format format = null;
        if (!formatLibelle.isEmpty()) {
            format = formatRepository.findByLargeur(formatLibelle)
                    .orElseGet(() -> {
                        Format f = new Format();
                        f.setLargeur(formatLibelle);
                        return formatRepository.save(f);
                    });
        }

        // Editeur : recherche ou création
        Editeur editeur = null;
        if (!editeurNom.isEmpty()) {
            editeur = editeurRepository.findByNomSociete(editeurNom)
                    .orElseGet(() -> {
                        Editeur e = new Editeur();
                        e.setNomSociete(editeurNom);
                        return editeurRepository.save(e);
                    });
        }

        Livre livre = new Livre();
        livre.setTitre(titre);
        livre.setAuteur(auteur);
        livre.setFormat(format);
        livre.setEditeur(editeur);
        livre.setCodeISBN(codeISBN.isEmpty() ? null : codeISBN);
        livre.setNbPages(nbPages);
        livre.setCodeEmplacement(codeEmplacement.isEmpty() ? null : codeEmplacement);
        livre.setEstEmpruntable(estEmpruntable);
        livre.setDateAcquisition(LocalDateTime.now());

        documentRepository.save(livre);
    }

    private String req(String valeur, String nomChamp) {
        if (valeur == null || valeur.trim().isEmpty()) {
            throw new IllegalArgumentException("Le champ '" + nomChamp + "' est obligatoire.");
        }
        return valeur.trim();
    }

    // =====================================================================
    // EXPORT CSV
    // =====================================================================

    public byte[] exporterDocumentsCsv() {
        List<Document> documents = documentRepository.findAll();
        return ecrireCsv(
                new String[]{"id", "titre", "auteur", "format", "codeEmplacement", "empruntable", "dateAcquisition"},
                documents,
                d -> new String[]{
                        String.valueOf(d.getIdDocument()),
                        nvl(d.getTitre()),
                        d.getAuteur() != null ? nvl(d.getAuteur().getNom()) + " " + nvl(d.getAuteur().getPrenom()) : "",
                        d.getFormat() != null ? nvl(d.getFormat().getLargeur()) : "",
                        nvl(d.getCodeEmplacement()),
                        Boolean.TRUE.equals(d.getEstEmpruntable()) ? "oui" : "non",
                        d.getDateAcquisition() != null
                                ? d.getDateAcquisition().format(DateTimeFormatter.ISO_LOCAL_DATE) : ""
                });
    }

    public byte[] exporterAuteursCsv() {
        List<Auteur> auteurs = auteurRepository.findAll();
        return ecrireCsv(
                new String[]{"id", "nom", "prenom", "nationalite", "dateNaissance", "dateDeces"},
                auteurs,
                a -> new String[]{
                        String.valueOf(a.getIdAuteur()),
                        nvl(a.getNom()),
                        nvl(a.getPrenom()),
                        nvl(a.getNationalite()),
                        a.getDateNaissance() != null ? a.getDateNaissance().toString() : "",
                        a.getDateDeces() != null ? a.getDateDeces().toString() : ""
                });
    }

    private <T> byte[] ecrireCsv(String[] enTete, List<T> items, java.util.function.Function<T, String[]> mapper) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (CSVWriter writer = new CSVWriter(
                new java.io.OutputStreamWriter(baos, StandardCharsets.UTF_8),
                ';',
                CSVWriter.DEFAULT_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                CSVWriter.DEFAULT_LINE_END)) {
            writer.writeNext(enTete);
            for (T item : items) {
                writer.writeNext(mapper.apply(item));
            }
        } catch (IOException e) {
            throw new IllegalStateException("Erreur génération CSV : " + e.getMessage(), e);
        }
        return baos.toByteArray();
    }

    // =====================================================================
    // EXPORT EXCEL
    // =====================================================================

    public byte[] exporterDocumentsExcel() {
        List<Document> documents = documentRepository.findAll();
        return ecrireExcel("Documents",
                new String[]{"ID", "Titre", "Auteur", "Format", "Emplacement", "Empruntable", "Date acquisition"},
                documents,
                d -> new Object[]{
                        d.getIdDocument(),
                        nvl(d.getTitre()),
                        d.getAuteur() != null ? nvl(d.getAuteur().getNom()) + " " + nvl(d.getAuteur().getPrenom()) : "",
                        d.getFormat() != null ? nvl(d.getFormat().getLargeur()) : "",
                        nvl(d.getCodeEmplacement()),
                        Boolean.TRUE.equals(d.getEstEmpruntable()) ? "Oui" : "Non",
                        d.getDateAcquisition() != null
                                ? d.getDateAcquisition().format(DateTimeFormatter.ISO_LOCAL_DATE) : ""
                });
    }

    public byte[] exporterAuteursExcel() {
        List<Auteur> auteurs = auteurRepository.findAll();
        return ecrireExcel("Auteurs",
                new String[]{"ID", "Nom", "Prénom", "Nationalité", "Date naissance", "Date décès"},
                auteurs,
                a -> new Object[]{
                        a.getIdAuteur(),
                        nvl(a.getNom()),
                        nvl(a.getPrenom()),
                        nvl(a.getNationalite()),
                        a.getDateNaissance() != null ? a.getDateNaissance().toString() : "",
                        a.getDateDeces() != null ? a.getDateDeces().toString() : ""
                });
    }

    private <T> byte[] ecrireExcel(String nomFeuille, String[] enTete, List<T> items,
                                   java.util.function.Function<T, Object[]> mapper) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet(nomFeuille);

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < enTete.length; i++) {
                headerRow.createCell(i).setCellValue(enTete[i]);
            }

            int rowIdx = 1;
            for (T item : items) {
                Row row = sheet.createRow(rowIdx++);
                Object[] valeurs = mapper.apply(item);
                for (int c = 0; c < valeurs.length; c++) {
                    Cell cell = row.createCell(c);
                    Object v = valeurs[c];
                    if (v instanceof Number n) {
                        cell.setCellValue(n.doubleValue());
                    } else {
                        cell.setCellValue(v != null ? v.toString() : "");
                    }
                }
            }

            for (int i = 0; i < enTete.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new IllegalStateException("Erreur génération Excel : " + e.getMessage(), e);
        }
    }

    private String nvl(String s) {
        return s != null ? s : "";
    }
}