package com.usmb.but3.td4biblio.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

/**
 * Hachage des mots de passe (SHA-256 puis encodage Base64), conforme au jeu de
 * données existant. Le mot de passe initial d'un emprunteur est sa date de
 * naissance au format {@code ddMMyyyy} (ex. 21/04/1998 -> "21041998").
 *
 * <p>⚠ Si une classe {@code MotDePasseUtil} existe déjà dans ton projet, ne
 * recopie pas ce fichier : assure-toi simplement que sa méthode de hachage
 * produit bien {@code Base64(SHA-256(clair))}.</p>
 */
public final class MotDePasseUtil {

    private static final DateTimeFormatter FORMAT_MDP = DateTimeFormatter.ofPattern("ddMMyyyy");

    private MotDePasseUtil() {
        // classe utilitaire : pas d'instanciation
    }

    /** Hache une chaîne en clair en SHA-256, encodée en Base64. */
    public static String hacher(String clair) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] empreinte = md.digest(clair.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(empreinte);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Algorithme SHA-256 indisponible", e);
        }
    }

    /** Mot de passe initial d'un emprunteur = sa date de naissance (ddMMyyyy) hachée. */
    public static String motDePasseInitial(LocalDate dateNaissance) {
        return hacher(dateNaissance.format(FORMAT_MDP));
    }
}