-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysql-1607nono.alwaysdata.net
-- Generation Time: Dec 27, 2020 at 05:44 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `1607nono_piscine`
--

DELIMITER $$
--
-- Procedures
--
CREATE
    DEFINER = `1607nono`@`%` PROCEDURE `insert_creneau`(IN `datecreneau` DATE, IN `heuredebut` TIME, IN `duree` TIME,
                                                        IN `heurefin` TIME, IN `evenement` INT(11),
                                                        IN `salle` VARCHAR(8)) MODIFIES SQL DATA
    COMMENT 'ajouter des creneau de heuredebut de duree interval jusqua hefin'
BEGIN
    DECLARE heure time;
    SELECT heuredebut INTO heure;
    WHILE (heure < heurefin)
        DO
            INSERT INTO `Creneau` (`date`, `heureDebut`, `salle`, `event`)
            VALUES (datecreneau, heure, salle, evenement);
            SELECT ADDTIME(heure, duree) INTO heure;
        END WHILE;
END$$

CREATE
    DEFINER = `1607nono`@`%` PROCEDURE `resa_creneau`(IN `idgroup` INT, IN `idcreneau` INT) NO SQL
BEGIN
    DECLARE exist INT;

    SELECT COUNT(*)
    INTO exist
    FROM Creneau
    WHERE groupe = idgroup;

    if exist = 1 THEN
        UPDATE Creneau SET groupe=NULL WHERE groupe = idgroup;
    END IF;
    UPDATE Creneau SET groupe=idgroup WHERE num = idcreneau;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Composer`
--

CREATE TABLE `Composer` (
                            `etudiant` varchar(20) NOT NULL,
                            `groupe`   int(11)     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Composer`
--

INSERT INTO `Composer` (`etudiant`, `groupe`)
VALUES ('000000000A', 1),
       ('000000000B', 1),
       ('1234567890M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Creneau`
--

CREATE TABLE `Creneau` (
                           `num`        int(11)    NOT NULL,
                           `date`       date       NOT NULL,
                           `heureDebut` time       NOT NULL,
                           `salle`      varchar(8) NOT NULL,
                           `groupe`     int(11) DEFAULT NULL,
                           `event`      int(10)    NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Creneau`
--

INSERT INTO `Creneau` (`num`, `date`, `heureDebut`, `salle`, `groupe`, `event`)
VALUES (6, '2020-11-27', '08:00:00', 'IG5', NULL, 5),
       (7, '2020-11-27', '08:10:00', 'IG5', 1, 5),
       (8, '2020-11-27', '08:20:00', 'IG5', 2, 5),
       (9, '2020-11-27', '08:30:00', 'IG5', NULL, 5),
       (10, '2020-11-27', '08:40:00', 'IG5', NULL, 5),
       (11, '2020-11-27', '08:50:00', 'IG5', NULL, 5),
       (13, '2021-01-21', '05:16:00', 'D29', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Enseignant`
--

CREATE TABLE `Enseignant` (
                              `id`     int(10)     NOT NULL,
                              `nom`    varchar(20) NOT NULL,
                              `prenom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Enseignant`
--

INSERT INTO `Enseignant` (`id`, `nom`, `prenom`)
VALUES (1, 'PALLEJA', 'Nathalie'),
       (2, 'BELLAHSENE', 'Zohra'),
       (3, 'COLETTA', 'Remi');

-- --------------------------------------------------------

--
-- Table structure for table `Etudiant`
--

CREATE TABLE `Etudiant` (
                            `num`    varchar(20) NOT NULL,
                            `nom`    varchar(20) NOT NULL,
                            `prenom` varchar(20) NOT NULL,
                            `mail`   varchar(70) NOT NULL,
                            `mdp`    text        NOT NULL,
                            `promo`  varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Etudiant`
--

INSERT INTO `Etudiant` (`num`, `nom`, `prenom`, `mail`, `mdp`, `promo`)
VALUES ('	000009000M', 'toto', 'testjwt', 'toto.test@mail.com',
        '$2a$10$Jkgpi/R4GgMxwV.9XoySw.jwnIGGDGCXt23zEvylgUvYOOFnA5jXO', 'IG3'),
       ('000000000A', 'Windsor', 'Elizabeth', 'elizabeth.windsor@etu.umontpellier.fr', '123', 'IG3'),
       ('000000000B', 'PARADIS', 'Adam', 'adam.paradis@etu.umontpellier.fr', '1234', 'IG4'),
       ('000000000C', 'PARADIS', 'Eve', 'eve.paradis@etu.umontpellier.fr', '1234', 'IG4'),
       ('1110027622N', 'paul', 'jean', 'nono@mail.com', '123456', 'IG3'),
       ('1234567890M', 'nom', 'nom', 'mail.mail@mail.com',
        '$2a$10$/qBD1edBFxbfGbFAMCz.A./xeO.EPtMR90D3oZUFrweAK7.6gIyya', 'IG3');

-- --------------------------------------------------------

--
-- Table structure for table `Evenement`
--

CREATE TABLE `Evenement` (
                             `id`             int(10)      NOT NULL,
                             `nom`            varchar(300) NOT NULL,
                             `dateDebut`      date         NOT NULL,
                             `dureeEvent`     int(10)      NOT NULL,
                             `dateLimiteResa` date         NOT NULL,
                             `dureeCreneau`   time         NOT NULL,
                             `nbJury`         int(1)       NOT NULL,
                             `promo`          varchar(20)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Evenement`
--

INSERT INTO `Evenement` (`id`, `nom`, `dateDebut`, `dureeEvent`, `dateLimiteResa`, `dureeCreneau`, `nbJury`, `promo`)
VALUES (5, 'Stage', '2021-01-01', 3, '2021-01-02', '00:00:01', 2, 'IG3');

-- --------------------------------------------------------

--
-- Table structure for table `Groupe`
--

CREATE TABLE `Groupe` (
                          `id`                     int(11) NOT NULL,
                          `nomTuteurEntreprise`    varchar(10) DEFAULT NULL,
                          `prenomTuteurEntreprise` varchar(10) DEFAULT NULL,
                          `nomEntreprise`          varchar(20) DEFAULT NULL,
                          `TuteurEnseignant`       int(11)     DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Groupe`
--

INSERT INTO `Groupe` (`id`, `nomTuteurEntreprise`, `prenomTuteurEntreprise`, `nomEntreprise`, `TuteurEnseignant`)
VALUES (1, 'DUPUIS', 'Patrick', 'EDF', 1),
       (2, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Participe`
--

CREATE TABLE `Participe` (
                             `enseignant` int(11) NOT NULL,
                             `groupe`     int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Participe`
--

INSERT INTO `Participe` (`enseignant`, `groupe`)
VALUES (1, 1),
       (3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Promo`
--

CREATE TABLE `Promo` (
    `id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Promo`
--

INSERT INTO `Promo` (`id`)
VALUES ('IG3'),
       ('IG4'),
       ('IG5'),
       ('MAT3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Composer`
--
ALTER TABLE `Composer`
    ADD PRIMARY KEY (`etudiant`, `groupe`),
    ADD KEY `composer_forrein_groupe` (`groupe`);

--
-- Indexes for table `Creneau`
--
ALTER TABLE `Creneau`
    ADD PRIMARY KEY (`num`),
    ADD KEY `creneau_forrein_event` (`event`),
    ADD KEY `creneau_forrein_groupe` (`groupe`);

--
-- Indexes for table `Enseignant`
--
ALTER TABLE `Enseignant`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Etudiant`
--
ALTER TABLE `Etudiant`
    ADD PRIMARY KEY (`num`),
    ADD KEY `Etudiant_forein_promo` (`promo`);

--
-- Indexes for table `Evenement`
--
ALTER TABLE `Evenement`
    ADD PRIMARY KEY (`id`),
    ADD KEY `id` (`id`),
    ADD KEY `forrein_promo` (`promo`);

--
-- Indexes for table `Groupe`
--
ALTER TABLE `Groupe`
    ADD PRIMARY KEY (`id`),
    ADD KEY `groupe_forrein_enseignant` (`TuteurEnseignant`);

--
-- Indexes for table `Participe`
--
ALTER TABLE `Participe`
    ADD PRIMARY KEY (`enseignant`, `groupe`),
    ADD KEY `participe_forrein_groupe` (`groupe`);

--
-- Indexes for table `Promo`
--
ALTER TABLE `Promo`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Creneau`
--
ALTER TABLE `Creneau`
    MODIFY `num` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 14;

--
-- AUTO_INCREMENT for table `Enseignant`
--
ALTER TABLE `Enseignant`
    MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Evenement`
--
ALTER TABLE `Evenement`
    MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 6;

--
-- AUTO_INCREMENT for table `Groupe`
--
ALTER TABLE `Groupe`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Composer`
--
ALTER TABLE `Composer`
    ADD CONSTRAINT `composer_forrein_etudiant` FOREIGN KEY (`etudiant`) REFERENCES `Etudiant` (`num`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `composer_forrein_groupe` FOREIGN KEY (`groupe`) REFERENCES `Groupe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Creneau`
--
ALTER TABLE `Creneau`
    ADD CONSTRAINT `creneau_forrein_event` FOREIGN KEY (`event`) REFERENCES `Evenement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `creneau_forrein_groupe` FOREIGN KEY (`groupe`) REFERENCES `Groupe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Etudiant`
--
ALTER TABLE `Etudiant`
    ADD CONSTRAINT `Etudiant_forein_promo` FOREIGN KEY (`promo`) REFERENCES `Promo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Groupe`
--
ALTER TABLE `Groupe`
    ADD CONSTRAINT `groupe_forrein_enseignant` FOREIGN KEY (`TuteurEnseignant`) REFERENCES `Enseignant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Participe`
--
ALTER TABLE `Participe`
    ADD CONSTRAINT `participe_forrein_enseignant` FOREIGN KEY (`enseignant`) REFERENCES `Enseignant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `participe_forrein_groupe` FOREIGN KEY (`groupe`) REFERENCES `Groupe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
