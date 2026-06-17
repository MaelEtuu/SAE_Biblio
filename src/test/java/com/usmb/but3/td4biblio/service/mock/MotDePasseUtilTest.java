package com.usmb.but3.td4biblio.service.mock;

import com.usmb.but3.td4biblio.util.MotDePasseUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests unitaires de {@link MotDePasseUtil} : hachage SHA-256 encodé en Base64
 * et mot de passe initial dérivé de la date de naissance (format {@code ddMMyyyy}).
 */
@DisplayName("MotDePasseUtil — tests unitaires")
class MotDePasseUtilTest {

    @Nested
    @DisplayName("hacher")
    class Hacher {

        @Test
        @DisplayName("produit une valeur SHA-256 / Base64 connue")
        void valeurConnue() {
            // SHA-256("test") encodé en Base64
            assertThat(MotDePasseUtil.hacher("test"))
                    .isEqualTo("n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=");
        }

        @Test
        @DisplayName("est déterministe : même entrée → même empreinte")
        void deterministe() {
            assertThat(MotDePasseUtil.hacher("motdepasse"))
                    .isEqualTo(MotDePasseUtil.hacher("motdepasse"));
        }

        @Test
        @DisplayName("deux entrées différentes → deux empreintes différentes")
        void entreesDifferentes() {
            assertThat(MotDePasseUtil.hacher("abc"))
                    .isNotEqualTo(MotDePasseUtil.hacher("abd"));
        }

        @Test
        @DisplayName("empreinte de longueur 44 (SHA-256 sur 32 octets en Base64)")
        void longueurBase64() {
            assertThat(MotDePasseUtil.hacher("n'importe quoi")).hasSize(44);
        }

        @Test
        @DisplayName("ne renvoie jamais le mot de passe en clair")
        void pasDeClair() {
            assertThat(MotDePasseUtil.hacher("secret")).doesNotContain("secret");
        }
    }

    @Nested
    @DisplayName("motDePasseInitial")
    class MotDePasseInitial {

        @Test
        @DisplayName("hache la date de naissance au format ddMMyyyy")
        void formateEtHache() {
            // 21/04/1998 → "21041998" → SHA-256 / Base64
            assertThat(MotDePasseUtil.motDePasseInitial(LocalDate.of(1998, 4, 21)))
                    .isEqualTo("R0HOrnzqGPdMVnLn1WN+vC8LjGkFtMYVf3WhN9Ve/1U=");
        }

        @Test
        @DisplayName("équivaut à hacher la chaîne ddMMyyyy correspondante")
        void coherentAvecHacher() {
            LocalDate naissance = LocalDate.of(2000, 1, 1);
            assertThat(MotDePasseUtil.motDePasseInitial(naissance))
                    .isEqualTo(MotDePasseUtil.hacher("01012000"));
        }

        @Test
        @DisplayName("complète les jours/mois sur deux chiffres (zéros à gauche)")
        void zerosAGauche() {
            // 5 mars 2001 → "05032001", PAS "532001"
            assertThat(MotDePasseUtil.motDePasseInitial(LocalDate.of(2001, 3, 5)))
                    .isEqualTo(MotDePasseUtil.hacher("05032001"));
        }
    }
}
