DROP TABLE IF EXISTS livre CASCADE;
DROP TABLE IF EXISTS auteur CASCADE;
DROP SEQUENCE IF EXISTS auteur_id_seq;
DROP SEQUENCE IF EXISTS livre_id_seq;

-- ============================================================
-- V1__init_schema.sql
-- Migration Flyway initiale — Système de gestion bibliothèque
-- ============================================================

-- ⚠️  IMPORTANT : avant d'appliquer cette migration, supprimer
-- ou migrer les tables/séquences déjà créées par tes scripts
-- existants. Voir section "Nettoyage" en bas de fichier.
-- ============================================================


-- ------------------------------------------------------------
-- Tables de référence (aucune dépendance externe)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS type_auteur (
                                           idTypeAuteur  SERIAL       PRIMARY KEY,
                                           libelleTypeAuteur VARCHAR(40)
    );

CREATE TABLE IF NOT EXISTS format (
                                      idFormat  SERIAL       PRIMARY KEY,
                                      longueur  VARCHAR(50),
    largeur   VARCHAR(50),
    poids     VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS editeur (
                                       idEditeur      SERIAL        PRIMARY KEY,
                                       nomSociete     VARCHAR(50),
    lienSite       VARCHAR(1000),
    lienWikipedia  VARCHAR(1000),
    adresse        VARCHAR(100),
    ville          VARCHAR(100),
    pays           VARCHAR(50),
    codePostal     INTEGER
    );

CREATE TABLE IF NOT EXISTS role (
                                    idRole       SERIAL      PRIMARY KEY,
                                    libelleRole  VARCHAR(30)
    );

CREATE TABLE IF NOT EXISTS raison_pas_emprunt (
                                                  idRaison      SERIAL      PRIMARY KEY,
                                                  libelleRaison VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS regle (
                                     idRegle       SERIAL       PRIMARY KEY,
                                     valeurRegle   VARCHAR(40),
    typeRegle     VARCHAR(100),
    intituleRegle VARCHAR(100)
    );


-- ------------------------------------------------------------
-- Auteur
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS auteur (
                                      idAuteur      SERIAL       PRIMARY KEY,
                                      idTypeAuteur  INTEGER      REFERENCES type_auteur(idTypeAuteur),
    nomSociete    VARCHAR(50),
    prenom        VARCHAR(50),
    nationalite   VARCHAR(50),
    dateNaissance DATE,
    dateDeces     DATE,
    paysNaissance  VARCHAR(50),
    villeNaissance VARCHAR(100),
    lienWikipedia  VARCHAR(1000)
    );


-- ------------------------------------------------------------
-- Bibliothèque
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS bibliotheque (
                                            idBibliotheque  SERIAL       PRIMARY KEY,
                                            nom             VARCHAR(50),
    adresse         VARCHAR(100),
    heureOuverture  TIME,
    heureFermeture  TIME,
    ville           VARCHAR(100),
    pays            VARCHAR(50),
    codePostal      INTEGER
    );


-- ------------------------------------------------------------
-- Utilisateur
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS utilisateur (
                                           idUtilisateur      SERIAL        PRIMARY KEY,
                                           idRole             INTEGER       REFERENCES role(idRole),
    dateFinAbonnement  DATE,
    numeroCarte        INTEGER,
    nombrePret         INTEGER,
    prenom             VARCHAR(50),
    mail               VARCHAR(50),
    mdp                VARCHAR(200),
    dateNaissance      DATE
    );


-- ------------------------------------------------------------
-- Document (table parent, héritage JOINED)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS document (
                                        idDocument      SERIAL         PRIMARY KEY,
                                        idFormat        INTEGER        REFERENCES format(idFormat),
    idAuteur        INTEGER        REFERENCES auteur(idAuteur),
    titre           VARCHAR(100),
    dateAcquisition TIMESTAMP,
    description     VARCHAR(50),
    datePublication TIMESTAMP,
    codeEmplacement VARCHAR(10),
    estEmpruntable  BOOLEAN,
    gif             VARCHAR(2000)
    );


-- ------------------------------------------------------------
-- Livre (sous-type de Document)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS livre (
                                     idDocument  INTEGER      PRIMARY KEY
                                     REFERENCES document(idDocument),
    codeISBN    VARCHAR(15),
    nbPages     INTEGER,
    idEditeur   INTEGER      REFERENCES editeur(idEditeur)
    );


-- ------------------------------------------------------------
-- CDDVD (sous-type de Document, pas de colonnes propres)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cddvd (
                                     idDocument  INTEGER  PRIMARY KEY
                                     REFERENCES document(idDocument)
    );


-- ------------------------------------------------------------
-- Tables d'association (clés composites)
-- ------------------------------------------------------------

-- Document ↔ Bibliothèque
CREATE TABLE IF NOT EXISTS appartient (
                                          idBibliotheque  INTEGER  REFERENCES bibliotheque(idBibliotheque),
    idDocument      INTEGER  REFERENCES document(idDocument),
    PRIMARY KEY (idBibliotheque, idDocument)
    );

-- Emprunt (Document ↔ Utilisateur)
CREATE TABLE IF NOT EXISTS emprunts (
                                        idDocument    INTEGER  REFERENCES document(idDocument),
    idUtilisateur INTEGER  REFERENCES utilisateur(idUtilisateur),
    dateDebut     DATE,
    dateFin       DATE,
    estProlonge   BOOLEAN,
    notes         VARCHAR(200),
    dateRetour    DATE,
    PRIMARY KEY (idDocument, idUtilisateur)
    );

-- Réservation (Document ↔ Utilisateur)
CREATE TABLE IF NOT EXISTS reservation (
                                           idDocument    INTEGER  REFERENCES document(idDocument),
    idUtilisateur INTEGER  REFERENCES utilisateur(idUtilisateur),
    dateDebut     DATE,
    dateFin       DATE,
    PRIMARY KEY (idDocument, idUtilisateur)
    );

-- A1 : raisons de non-emprunt (Document ↔ RaisonPasEmprunt)
CREATE TABLE IF NOT EXISTS a1 (
                                  idDocument  INTEGER  REFERENCES document(idDocument),
    idRaison    INTEGER  REFERENCES raison_pas_emprunt(idRaison),
    PRIMARY KEY (idDocument, idRaison)
    );


-- ============================================================
-- NETTOYAGE DES SCRIPTS EXISTANTS (à exécuter AVANT V1)
-- ============================================================
-- Tes scripts précédents ont créé des tables et séquences
-- incompatibles. Si tu pars d'une base vide, ignore cette
-- section. Sinon, exécute ce bloc en DEHORS de Flyway :
--
-- DROP TABLE IF EXISTS livre CASCADE;
-- DROP TABLE IF EXISTS auteur CASCADE;
-- DROP SEQUENCE IF EXISTS auteur_id_seq;
-- DROP SEQUENCE IF EXISTS livre_id_seq;
--
-- Pourquoi :
--  • L'ancienne table "livre" a une PK nommée "id" au lieu de
--    "idDocument" et une colonne "auteur" varchar (supprimée
--    ensuite) — le schéma JPA attend "idDocument".
--  • L'ancienne table "auteur" a "id" au lieu de "idAuteur"
--    et manque les colonnes nomSociete, paysNaissance, etc.
--  • Les séquences manuelles (auteur_id_seq, livre_id_seq)
--    sont remplacées par SERIAL (= séquence auto-gérée).
--  • La FK fk_livre_auteur pointait sur auteur(id) ; elle
--    n'existe plus, livre référence désormais document(idDocument).
-- ============================================================