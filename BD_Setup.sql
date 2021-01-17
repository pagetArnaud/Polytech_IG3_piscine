-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysql-1607nono.alwaysdata.net
-- Generation Time: Jan 16, 2021 at 06:05 PM
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
CREATE DEFINER=`1607nono`@`%` PROCEDURE `insert_creneau` (IN `datecreneau` DATE, IN `heuredebut` TIME, IN `duree` TIME, IN `heurefin` TIME, IN `evenement` INT(11), IN `salle` VARCHAR(8))  MODIFIES SQL DATA
    COMMENT 'ajouter des creneau de heuredebut de duree interval jusqua hefin'
BEGIN
	DECLARE heure time;
    SELECT heuredebut INTO heure;
	WHILE (heure<heurefin) DO
	INSERT INTO `Creneau` (`date`, `heureDebut`, `salle`, `event`) 		VALUES (datecreneau, heure, salle,evenement);
	SELECT ADDTIME(heure, duree) INTO heure;
   	END WHILE;
END$$

CREATE DEFINER=`1607nono`@`%` PROCEDURE `resa_creneau_Admin` (IN `idgroup` INT, IN `idcreneau` INT)  NO SQL
BEGIN
    DECLARE exist INT;

    SELECT COUNT(*) INTO exist
    FROM Creneau
    WHERE groupe=idgroup;

    if exist=1 THEN
    UPDATE Creneau SET groupe=NULL WHERE groupe=idgroup;
    END IF;
    UPDATE Creneau SET groupe=idgroup WHERE num=idcreneau;

END$$

--
-- Functions
--
CREATE DEFINER=`1607nono`@`%` FUNCTION `resa_creneau` (`idgroup` INT, `idcreneau` INT) RETURNS INT(11) NO SQL
BEGIN
    DECLARE exist INT;
    DECLARE esPossible INT;

    SELECT COUNT(*) INTO exist
    FROM Creneau
    WHERE groupe=idgroup;

    SELECT COUNT(*) INTO esPossible FROM Creneau c JOIN Evenement e on e.id=c.event WHERE c.num=idcreneau and e.dateLimiteResa>=now();
    if esPossible=1 THEN
        if exist=1 THEN
        UPDATE Creneau SET groupe=NULL WHERE groupe=idgroup;
        END IF;
        UPDATE Creneau SET groupe=idgroup WHERE num=idcreneau;
	END IF;
    RETURN esPossible-1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Composer`
--

CREATE TABLE `Composer` (
  `etudiant` varchar(20) NOT NULL,
  `groupe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Composer`
--

INSERT INTO `Composer` (`etudiant`, `groupe`) VALUES
('000000000A', 1),
('000000000B', 1),
('06555500', 9),
('06555555', 6),
('12341234', 3),
('12345009', 5),
('12345441', 8),
('1234567890M', 1),
('12345699', 10),
('12347856', 11),
('21801679', 3),
('E176488Y', 14);

-- --------------------------------------------------------

--
-- Table structure for table `Creneau`
--

CREATE TABLE `Creneau` (
  `num` int(11) NOT NULL,
  `date` date NOT NULL,
  `heureDebut` time NOT NULL,
  `salle` varchar(8) NOT NULL,
  `groupe` int(11) DEFAULT NULL,
  `event` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Creneau`
--

INSERT INTO `Creneau` (`num`, `date`, `heureDebut`, `salle`, `groupe`, `event`) VALUES
(6, '2020-11-27', '08:00:00', 'IG5', 2, 5),
(7, '2020-11-27', '08:10:00', 'IG5', NULL, 5),
(8, '2020-11-27', '08:20:00', 'IG5', NULL, 5),
(9, '2020-11-27', '08:30:00', 'IG5', NULL, 5),
(10, '2020-11-27', '08:40:00', 'IG5', NULL, 5),
(11, '2020-11-27', '08:50:00', 'IG5', NULL, 5),
(13, '2021-01-21', '05:16:00', 'D29', NULL, 5),
(14, '2021-01-20', '08:00:00', '124', NULL, 6),
(15, '2021-01-20', '08:30:00', '124', NULL, 6),
(17, '2021-01-20', '09:30:00', '124', 9, 6),
(18, '2021-01-20', '10:00:00', '124', NULL, 6),
(19, '2021-01-20', '10:30:00', '124', NULL, 6),
(20, '2021-01-20', '11:00:00', '124', NULL, 6),
(21, '2021-01-20', '11:30:00', '124', NULL, 6),
(24, '2021-01-28', '03:00:00', '99', NULL, 7),
(25, '2021-01-28', '04:00:00', '99', 8, 7),
(26, '2021-01-15', '08:00:00', '777', NULL, 8),
(27, '2021-01-15', '09:30:00', '777', NULL, 8),
(28, '2021-01-15', '11:00:00', '777', 6, 8),
(33, '2021-01-15', '10:00:00', 'td4', NULL, 6),
(34, '2021-01-15', '14:06:00', 'td4', NULL, 6),
(35, '2021-01-15', '18:12:00', 'td4', NULL, 6),
(36, '2021-01-22', '09:30:00', 'td4', NULL, 7),
(37, '2021-01-22', '10:00:00', 'td4', NULL, 7),
(38, '2021-01-22', '10:30:00', 'td4', NULL, 7),
(39, '2021-01-22', '11:00:00', 'td4', 10, 7),
(40, '2021-01-22', '11:30:00', 'td4', 1, 7),
(41, '2021-01-22', '12:00:00', 'td4', NULL, 7),
(42, '2021-01-22', '12:30:00', 'td4', NULL, 7),
(43, '2021-01-22', '13:00:00', 'td4', NULL, 7),
(44, '2021-01-22', '13:30:00', 'td4', NULL, 7),
(45, '2021-01-22', '14:00:00', 'td4', NULL, 7),
(46, '2021-01-22', '14:30:00', 'td4', NULL, 7),
(47, '2021-01-22', '15:00:00', 'td4', NULL, 7),
(48, '2021-01-22', '15:30:00', 'td4', NULL, 7),
(49, '2021-01-22', '16:00:00', 'td4', NULL, 7),
(50, '2021-01-22', '16:30:00', 'td4', NULL, 7),
(51, '2021-01-22', '17:00:00', 'td4', NULL, 7),
(52, '2021-01-22', '17:30:00', 'td4', NULL, 7),
(53, '2021-01-22', '18:00:00', 'td4', NULL, 7),
(54, '2021-01-22', '18:30:00', 'td4', NULL, 7),
(61, '2021-01-14', '10:00:00', 'SC102', NULL, 6),
(62, '2021-01-14', '10:30:00', 'SC102', NULL, 6),
(63, '2021-01-14', '10:00:00', 'SC102', NULL, 5),
(64, '2021-01-14', '10:30:00', 'SC102', NULL, 5),
(66, '2021-01-14', '10:00:00', 'SC102', 5, 7),
(67, '2021-01-14', '10:30:00', 'SC102', NULL, 7),
(68, '2021-01-14', '10:00:00', 'SC102', NULL, 5),
(69, '2021-01-19', '11:00:00', 'TD4', 11, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Enseignant`
--

CREATE TABLE `Enseignant` (
  `id` int(10) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Enseignant`
--

INSERT INTO `Enseignant` (`id`, `nom`, `prenom`) VALUES
(1, 'PALLEJA', 'Nathalie'),
(2, 'BELLAHSENE', 'Zohra'),
(3, 'COLETTA', 'Remi'),
(4, 'Fiorio', 'christophe'),
(5, 'Villaret', 'anne-laure');

-- --------------------------------------------------------

--
-- Table structure for table `Etudiant`
--

CREATE TABLE `Etudiant` (
  `num` varchar(20) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `mail` varchar(70) NOT NULL,
  `mdp` text NOT NULL,
  `promo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Etudiant`
--

INSERT INTO `Etudiant` (`num`, `nom`, `prenom`, `mail`, `mdp`, `promo`) VALUES
('	000009000M', 'toto', 'testjwt', 'toto.test@mail.com', '$2a$10$Jkgpi/R4GgMxwV.9XoySw.jwnIGGDGCXt23zEvylgUvYOOFnA5jXO', 'IG3'),
('000000000A', 'Windsor', 'Elizabeth', 'elizabeth.windsor@etu.umontpellier.fr', '123', 'IG3'),
('000000000B', 'PARADIS', 'Adam', 'adam.paradis@etu.umontpellier.fr', '1234', 'IG4'),
('000000000C', 'PARADIS', 'Eve', 'eve.paradis@etu.umontpellier.fr', '1234', 'IG4'),
('01233355', 'sdgsdgsg', 'sdgsdg', 'thomas.scholivet@eeetu.fr', '$2a$10$6dXvYD9weEDQsZkIfKcKve6vHwEwzlwBpEy8gUjLDJJGX8D8qrIwi', 'IG3'),
('06555500', 'Lovelace', 'Ada', 'adaloveladceddd@gmail.com', '$2a$10$kfKgf6coj6lNvhBvm8ss4Oi/T8DfiVOulX9VkTcw/uriWt2sP.Cdy', 'IG3'),
('06555511', 'qsfqsf', 'aza', 'adalovelaceee@gmail.com', '$2a$10$qohA/4IlVnRkYo4WK00rLOT5N60Zf5086TI35P4vK/9k7A6GUnpK6', 'IG3'),
('06555545', 'Lovelace', 'Ada', 'adalovelaceddd@gmail.com', '$2a$10$2nYO0cavTY1hsTxxLRKMeuHlPAW4jrxwJI35yhAh.15rZ.U5bH0sG', 'IG3'),
('06555555', 'Lovelace', 'Ada', 'adalovelace@gmail.com', '$2a$10$ojH5HhT97iDfvoEqAucKkOn/du.zSLQS9qZ8mjv9ikY3GPVVdjRKq', 'IG3'),
('1110027622N', 'paul', 'jean', 'nono@mail.com', '123456', 'IG3'),
('12131415', 'test', 'test', 'test@test.fr', '$2a$10$WekDo7rqcl9SImUh26FupuT.3f7AC4Q8KOQv.G0GY9GEkfXhk2ECm', 'IG3'),
('12312312', 'bonnet', 'vincent', 'vincentbonnet235@gmail.com', '$2a$10$CSeeB60zbPlpXppEZmppbeZnTdREf.LWQLv6TUfC6mwRe3Z9NFrea', 'IG3'),
('12341234', 'Vendran', 'Julien Loïc', 'julienvendran8@gmail.com', '$2a$10$TPI5circUNQrvJLJ8EQvkuFAVBfsu0X.1OruZLBlwZfFrSMRUsX9S', 'IG5'),
('12345009', 'PAGET', 'Arnaud', 'arnaud.paget@etu.umontpellier.fr', '$2a$10$8CX16XgBPeWGdyk2XqApn.0RCisuI24j8Yf6NU7AlgTFmfjUsFDF2', 'IG3'),
('12345441', 'Scholivet', 'Thomas', 'thomas.scholivet@et.fr', '$2a$10$9KIOD/YX69WuHV4et/bDFulNg6GTrzGg7lAol7b6Ryibkr7Ov8oWO', 'IG3'),
('12345600', 'Scholivet', 'Thomas', 'thomas.scholivet@etu.fr', '$2a$10$fwsaYvYlavNNTYvgMaCy/uZlI8N/RwsUzhoWBfgM5WKPrx8MHEE/G', 'IG3'),
('12345676', 'pppp', 'ppp', 'p@p.fr', '$2a$10$YM.doEu.WFxeOdVZwwe0Je/9OBo39P75dmHSq26CFdJsrr3GOV2/S', 'IG3'),
('12345677', 'Fldkd', 'DROP TABLE USERS', 'eieke@etu.umontpellier.fr', '$2a$10$5FzDwAyi/M.G0iZxNUdEGeunbSg7iXtkMxpSQHP39pmAiAmyGGMl2', 'IG3'),
('12345678', 'bouaklayene', 'sofia', 'sofiabouaklayene@gmail.com', '$2a$10$4SWTNQV8OWP.ZHXSPVOvEemEtEHV6vkjYvwsJLLbfHqbL83rp5u0C', 'IG3'),
('1234567890M', 'nom', 'nom', 'mail.mail@mail.com', '$2a$10$/qBD1edBFxbfGbFAMCz.A./xeO.EPtMR90D3oZUFrweAK7.6gIyya', 'IG3'),
('12345679', 'test', 'test', 'testtest@hotmail.fr', '$2a$10$4y9VvYtBkScBw4dKw50GteA8Vw4O09DVumT5ZvZVI/A4.Lnz9ieny', 'IG3'),
('12345687', 'test', 'test', 'thomas.schoeeeeelivet@etu.fr', '$2a$10$TGVU3M3LBQKxQE/1ctjrMO9O5vQWDl1LZ2K8Eve4nKgo1cQfALbjG', 'IG3'),
('12345699', 'test', 'test', 'test1233@gmail.com', '$2a$10$xNOfGem8I.HM8.J6s2CWuO0reXO7GO3m9f7dPMCdavbDSdfoVX9Wi', 'IG3'),
('12347856', 'scholivet', 'thomas', 'thomas@etu.fr', '$2a$10$hPPtAkvXEOYLAzAgZqopj.RpwEWrh0bTer5Fj41rPSw5fAjJV4GqO', 'IG3'),
('15478546', 'admin', 'admin', 'admin@admin.fr', '$2a$10$UuWL2maPS2kjMhsVAmxdI.MZ6T6YDFjaHZ4zRaBw04C2qpqtcTfIa', 'IG3'),
('1826789u', 'Pratlong', 'Florine', 'florinecoucou@umontpellier.fr', '$2a$10$OtKGcMkYpbPqXPSH6ZIiMOwHq6b4fXuLcwBeVrxbdhKhDXg1puOHS', 'IG4'),
('21801679', 'Bofi', 'Nicolas', 'nicolas@etu.umontpellier.fr', '$2a$10$os44UsZtxgGxO3za2/EtUu3xQdaDJ//XoO7UkNn.InvCOwpqxpsxG', 'IG3'),
('56454645', 'flkqslks', 'thomas', 'thomas.scholivet@etu.fr', '$2a$10$9aWk5gyy6eroB85hFEP7mey8KwIJ1gj3P0wWVxur8lPEqmftb623a', 'IG3'),
('63554554', 'sdgsdg', 'jklmsdmljsqd', 'thomas@hotmail.fr', '$2a$10$vWtyUNh.99tplrfY78eCYuEFR5J29SSf2yr7951Y3/LMP7VylYIFC', 'IG3'),
('E176488Y', 'hihi', 'Lilian', 'x@etu.umontpellier.fr', '$2a$10$652L4xDdlJzmFPn0XSpOauPxr0YC9M4jTHWPJmZpwcl9C4w8feRtW', 'IG4'),
('p1811421', 'godel', 'thomas', 'thomasgodel@gmail.com', '$2a$10$RDi0cyx2bYxZIQvDyzOoPOqFo5lO33dPtvoM4iRx.2.3sV4m3d8l6', 'IG3');

-- --------------------------------------------------------

--
-- Table structure for table `Evenement`
--

CREATE TABLE `Evenement` (
  `id` int(10) NOT NULL,
  `nom` varchar(300) NOT NULL,
  `dateDebut` date NOT NULL,
  `dureeEvent` int(10) NOT NULL,
  `dateLimiteResa` date NOT NULL,
  `dureeCreneau` time NOT NULL,
  `nbJury` int(1) NOT NULL,
  `promo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Evenement`
--

INSERT INTO `Evenement` (`id`, `nom`, `dateDebut`, `dureeEvent`, `dateLimiteResa`, `dureeCreneau`, `nbJury`, `promo`) VALUES
(5, 'Stage', '2021-01-01', 3, '2021-01-02', '00:00:01', 2, 'IG3'),
(6, 'projet', '2021-01-20', 3, '2021-01-21', '00:04:00', 2, 'IG4'),
(7, 'projet', '2021-01-25', 4, '2021-01-27', '00:45:00', 4, 'IG3'),
(8, 'stage', '2021-01-18', 6, '2021-01-16', '01:30:00', 2, 'MAT3'),
(9, 'stage', '2021-01-15', 1, '2021-01-30', '01:30:00', 1, 'IG3'),
(10, 'stage', '2021-01-10', 1, '2021-01-22', '00:30:00', 1, 'IG3'),
(11, 'stage', '2021-01-16', 7, '2021-01-31', '00:30:00', 1, 'IG3'),
(12, 'stage', '2021-01-22', 7, '2021-01-28', '00:45:00', 1, 'IG3'),
(13, 'stage', '2021-01-14', 13, '2021-01-30', '13:45:00', 3, 'IG3'),
(14, 'stage', '2021-01-14', 5, '2021-01-16', '00:20:00', 2, 'IG3'),
(15, 'projet', '2021-01-22', 5, '2021-01-19', '00:00:00', 3, 'IG3');

-- --------------------------------------------------------

--
-- Table structure for table `Groupe`
--

CREATE TABLE `Groupe` (
  `id` int(11) NOT NULL,
  `nomTuteurEntreprise` varchar(10) DEFAULT NULL,
  `prenomTuteurEntreprise` varchar(10) DEFAULT NULL,
  `nomEntreprise` varchar(20) DEFAULT NULL,
  `TuteurEnseignant` int(11) DEFAULT NULL,
  `nomGrp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Groupe`
--

INSERT INTO `Groupe` (`id`, `nomTuteurEntreprise`, `prenomTuteurEntreprise`, `nomEntreprise`, `TuteurEnseignant`, `nomGrp`) VALUES
(1, 'DUPUIS', 'Patrick', 'EDF', 1, NULL),
(2, NULL, NULL, NULL, NULL, NULL),
(3, 'Jean', 'Dujardin', 'Mobalpa', NULL, '0'),
(5, 'Martin', 'Anne', 'Findus', NULL, 'Piscine-2021'),
(6, 'Christophe', 'Fiorio', 'Microsoft', NULL, 'Piscine'),
(8, 'aaa', 'aaa', 'aaa', NULL, 'piscine'),
(9, 'Lovelace', 'Ada', 'Microsoft', NULL, 'piscine'),
(10, 'aa', 'aa', 'a', NULL, 'aa'),
(11, 'azfazfa', 'fafaf', 'afafaf', NULL, 'illjjjj'),
(14, '<h1>d<h1>', '<h1>d<h1>', '<h1>d<h1>', NULL, '<h1>fromage<h1>');

-- --------------------------------------------------------

--
-- Table structure for table `Participe`
--

CREATE TABLE `Participe` (
  `enseignant` int(11) NOT NULL,
  `groupe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Participe`
--

INSERT INTO `Participe` (`enseignant`, `groupe`) VALUES
(1, 1);

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

INSERT INTO `Promo` (`id`) VALUES
('IG3'),
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
  ADD PRIMARY KEY (`etudiant`,`groupe`),
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
  ADD PRIMARY KEY (`enseignant`,`groupe`),
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
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `Enseignant`
--
ALTER TABLE `Enseignant`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Evenement`
--
ALTER TABLE `Evenement`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Groupe`
--
ALTER TABLE `Groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
