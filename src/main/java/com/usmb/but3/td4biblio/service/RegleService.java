package com.usmb.but3.td4biblio.service;

import com.usmb.but3.td4biblio.entity.Regle;
import com.usmb.but3.td4biblio.repository.RegleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Gestion des règles paramétrables de la bibliothèque, modifiables par un bibliothécaire :
 * <ul>
 *   <li>nombre maximum de documents empruntables (valeur initiale : 10) ;</li>
 *   <li>durée maximum de prêt (valeur initiale : 5 semaines = 35 jours) ;</li>
 *   <li>délai maximum de réservation (valeur initiale : 2 semaines = 14 jours).</li>
 * </ul>
 * CRUD hérité de {@link AbstractCrudService} ; la lecture typée et la mise à jour
 * par type de règle restent spécifiques.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RegleService extends AbstractCrudService<Regle, Integer> {

    private final RegleRepository regleRepository;

    @Override
    protected JpaRepository<Regle, Integer> getRepository() {
        return regleRepository;
    }

    // --- Clés de type de règle ---
    public static final String TYPE_MAX_PRETS          = "NB_PRET";
    public static final String TYPE_DUREE_PRET         = "DUREE_PRET";
    public static final String TYPE_DELAI_RESERVATION  = "DELAI_RESERVATION";

    // --- Valeurs par défaut (cf. cahier des charges) ---
    public static final int DEFAULT_MAX_PRETS                 = 10;
    public static final int DEFAULT_DUREE_PRET_JOURS          = 35; // 5 semaines
    public static final int DEFAULT_DELAI_RESERVATION_JOURS   = 14; // 2 semaines

    private static final Pattern PREMIER_ENTIER = Pattern.compile("\\d+");

    // =====================================================================
    // Alias de compatibilité
    // =====================================================================

    public List<Regle> getAllRegles() {
        return getAll();
    }

    public Regle getRegleById(Integer id) {
        return findById(id).orElse(null);
    }

    public Regle saveRegle(Regle regle) {
        log.debug("Sauvegarde règle type={} valeur={}", regle.getTypeRegle(), regle.getValeurRegle());
        return save(regle);
    }

    public void deleteRegleById(Integer id) {
        deleteById(id);
    }

    /** Première règle correspondant au type donné, ou {@code null}. */
    public Regle getRegleByType(String typeRegle) {
        return regleRepository.findByTypeRegle(typeRegle).stream().findFirst().orElse(null);
    }

    // =====================================================================
    // Lecture typée (avec valeur par défaut)
    // =====================================================================

    /** Nombre maximum de documents empruntables simultanément. */
    public int getMaxPrets() {
        return getValeurEntiere(TYPE_MAX_PRETS, DEFAULT_MAX_PRETS);
    }

    /** Durée maximum d'un prêt, en jours. */
    public int getDureePretJours() {
        return getValeurEntiere(TYPE_DUREE_PRET, DEFAULT_DUREE_PRET_JOURS);
    }

    /** Délai maximum de maintien d'une réservation, en jours. */
    public int getDelaiReservationJours() {
        return getValeurEntiere(TYPE_DELAI_RESERVATION, DEFAULT_DELAI_RESERVATION_JOURS);
    }

    // =====================================================================
    // Mise à jour d'une valeur (bibliothécaire)
    // =====================================================================

    /**
     * Met à jour (ou crée) la valeur d'une règle identifiée par son type.
     *
     * @return la règle persistée.
     */
    public Regle updateValeur(String typeRegle, String valeur, String intitule) {
        Regle regle = getRegleByType(typeRegle);
        if (regle == null) {
            regle = new Regle();
            regle.setTypeRegle(typeRegle);
            regle.setIntituleRegle(intitule);
        }
        regle.setValeurRegle(valeur);
        log.info("Règle '{}' mise à jour : {}", typeRegle, valeur);
        return save(regle);
    }

    // =====================================================================
    // Utilitaire interne
    // =====================================================================

    /** Extrait le premier entier de la valeur texte (ex. "5 semaines" -> 5 ; "10" -> 10). */
    private int getValeurEntiere(String typeRegle, int defaut) {
        Regle regle = getRegleByType(typeRegle);
        if (regle == null || regle.getValeurRegle() == null) {
            return defaut;
        }
        Matcher m = PREMIER_ENTIER.matcher(regle.getValeurRegle());
        if (m.find()) {
            try {
                return Integer.parseInt(m.group());
            } catch (NumberFormatException e) {
                log.warn("Valeur de règle non numérique pour {} : {}", typeRegle, regle.getValeurRegle());
            }
        }
        return defaut;
    }
}