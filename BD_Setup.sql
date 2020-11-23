-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysql-1607nono.alwaysdata.net
-- Generation Time: Nov 21, 2020 at 04:48 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `Composer`
--

CREATE TABLE `Composer` (
  `etudiant` varchar(20) NOT NULL,
  `groupe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Enseignant`
--

CREATE TABLE `Enseignant` (
  `id` int(10) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Etudiant`
--

CREATE TABLE `Etudiant` (
  `num` varchar(20) NOT NULL,
  `nom` varchar(10) NOT NULL,
  `prenom` varchar(10) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `mdp` text NOT NULL,
  `promo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Evenement`
--

CREATE TABLE `Evenement` (
  `id` int(10) NOT NULL,
  `nom` varchar(300) NOT NULL,
  `dateDebut` date NOT NULL,
  `dureeEnvent` int(10) NOT NULL,
  `dateLimiteResa` date NOT NULL,
  `dureeCreneau` float NOT NULL,
  `nbJury` int(1) NOT NULL,
  `promo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Groupe`
--

CREATE TABLE `Groupe` (
  `id` int(11) NOT NULL,
  `nomTuteurEntreprise` varchar(10) DEFAULT NULL,
  `prenomTuteurEntreprise` varchar(10) DEFAULT NULL,
  `nomEntreprise` varchar(20) DEFAULT NULL,
  `TuteurEnseignant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Participe`
--

CREATE TABLE `Participe` (
  `enseignant` int(11) NOT NULL,
  `groupe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Promo`
--

CREATE TABLE `Promo` (
  `id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`num`);

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
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Enseignant`
--
ALTER TABLE `Enseignant`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Evenement`
--
ALTER TABLE `Evenement`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Groupe`
--
ALTER TABLE `Groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
