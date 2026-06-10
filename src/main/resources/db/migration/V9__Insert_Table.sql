SET search_path to biblio;

INSERT INTO type_auteur (libelleTypeAuteur) VALUES
                                                ('Écrivain'),
                                                ('Scientifique');

INSERT INTO format (longueur, largeur, poids) VALUES
                                                  ('21 cm', '14 cm', '300 g'),
                                                  ('30 cm', '21 cm', '800 g');

INSERT INTO editeur (nomSociete, lienSite, lienWikipedia, adresse, ville, pays, codePostal) VALUES
                                                                                                ('Gallimard', 'https://www.gallimard.fr', 'https://fr.wikipedia.org/wiki/Gallimard', '5 rue Sébastien Bottin', 'Paris', 'France', 75007),
                                                                                                ('Hachette', 'https://www.hachette.fr', 'https://fr.wikipedia.org/wiki/Hachette', '58 rue Jean Bleuzen', 'Vanves', 'France', 92170);

INSERT INTO role (libelleRole) VALUES
                                   ('ADMIN'),
                                   ('USER');

INSERT INTO raison_pas_emprunt (libelleRaison) VALUES
                                                   ('Déjà emprunté'),
                                                   ('Réservé'),
                                                   ('Document endommagé');

INSERT INTO regle (valeurRegle, typeRegle, intituleRegle) VALUES
                                                              ('14 jours', 'DURÉE_PRET', 'Durée maximale de prêt'),
                                                              ('3', 'NB_PRET', 'Nombre max de prêts simultanés');

INSERT INTO auteur (idTypeAuteur, nomSociete, prenom, nationalite, dateNaissance, dateDeces, paysNaissance, villeNaissance, lienWikipedia)
VALUES
    (1, NULL, 'Victor', 'Française', '1802-02-26', '1885-05-22', 'France', 'Besançon', 'https://fr.wikipedia.org/wiki/Victor_Hugo'),
    (2, NULL, 'Albert', 'Allemande', '1879-03-14', '1955-04-18', 'Allemagne', 'Ulm', 'https://fr.wikipedia.org/wiki/Albert_Einstein');

INSERT INTO bibliotheque (nom, adresse, heureOuverture, heureFermeture, ville, pays, codePostal)
VALUES
    ('Bibliothèque Centrale', '10 rue de la République', '08:00', '18:00', 'Lyon', 'France', 69000),
    ('Médiathèque Part-Dieu', '30 boulevard Vivier Merle', '09:00', '19:00', 'Lyon', 'France', 69003);

INSERT INTO utilisateur (idRole, dateFinAbonnement, numeroCarte, nombrePret, prenom, mail, mdp, dateNaissance)
VALUES
    (1, '2026-12-31', 1001, 0, 'Admin', 'admin@mail.com', 'hashpwd1', '1990-01-01'),
    (2, '2026-06-30', 1002, 2, 'Jean', 'jean@mail.com', 'hashpwd2', '1995-06-15');

INSERT INTO document (idFormat, idAuteur, titre, dateAcquisition, description, datePublication, codeEmplacement, estEmpruntable, gif)
VALUES
    (1, 1, 'Les Misérables', NOW(), 'Roman classique', '1862-01-01', 'A1', TRUE, NULL),
    (2, 2, 'Relativité', NOW(), 'Science fondamentale', '1905-01-01', 'B2', TRUE, NULL);

INSERT INTO livre (idDocument, codeISBN, nbPages, idEditeur)
VALUES
    (1, '9781234567890', 1200, 1);

INSERT INTO cddvd (idDocument)
VALUES
    (2);

INSERT INTO appartient (idBibliotheque, idDocument)
VALUES
    (1, 1),
    (1, 2),
    (2, 1);

INSERT INTO emprunts (idDocument, idUtilisateur, dateDebut, dateFin, estProlonge, notes, dateRetour)
VALUES
    (1, 2, '2026-06-01', '2026-06-15', FALSE, 'OK', NULL);

INSERT INTO reservation (idDocument, idUtilisateur, dateDebut, dateFin)
VALUES
    (2, 2, '2026-06-20', '2026-06-25');

INSERT INTO a1 (idDocument, idRaison)
VALUES
    (2, 1);
