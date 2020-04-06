-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 06 avr. 2020 à 14:35
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `eplage`
--

-- --------------------------------------------------------

--
-- Structure de la table `tbl_businesses`
--

CREATE TABLE `tbl_businesses` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `COUNTRY` varchar(50) NOT NULL,
  `COUNTY` varchar(40) NOT NULL,
  `CITY` varchar(50) NOT NULL,
  `ADRESS` varchar(100) NOT NULL,
  `ZIPCODE` int(10) NOT NULL,
  `PHONE` varchar(20) NOT NULL,
  `MAIL` varchar(100) NOT NULL,
  `FLEACHID` int(11) NOT NULL,
  `LONG` float NOT NULL,
  `LAT` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_businesses`
--

INSERT INTO `tbl_businesses` (`ID`, `NAME`, `COUNTRY`, `COUNTY`, `CITY`, `ADRESS`, `ZIPCODE`, `PHONE`, `MAIL`, `FLEACHID`, `LONG`, `LAT`) VALUES
(1, 'La Grand Plage', 'France', 'Herault', 'Carnon', '12 avenue de l\'étang', 34280, '04 XX XX XX XX', 'plage2@email.com', 1, 43.5441, 3.98158),
(2, 'Azur plage', 'France', 'Herault', 'Palavas', '30 rue de la mer', 34250, '04 XX XX XX XX', 'plage1@email.fr', 2, 43.5289, 3.93667),
(3, 'La Petite Plage', 'France', 'Var', 'Toulon', '425 rue des galés', 83000, '04 XX XX XX XX ', 'LAPP@email.com', 3, 43.0626, 5.56585);

-- --------------------------------------------------------

--
-- Structure de la table `tbl_pictures`
--

CREATE TABLE `tbl_pictures` (
  `BID` int(11) NOT NULL,
  `src` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_pictures`
--

INSERT INTO `tbl_pictures` (`BID`, `src`) VALUES
(1, 'plage1.jpg\r\n'),
(1, 'plage4.jpg\r\n'),
(2, 'plage2.jpg'),
(3, 'plage3.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_services`
--

INSERT INTO `tbl_services` (`ID`, `name`) VALUES
(1, 'Accés Handicapé'),
(2, 'SERV2'),
(3, 'SERV3'),
(4, 'SERV4'),
(5, 'SERV5'),
(6, 'SERV6'),
(7, 'SERV7'),
(8, 'SERV8'),
(9, 'SERV9'),
(10, 'SERV10'),
(11, 'SERV11'),
(12, 'SERV12'),
(13, 'SERV13'),
(14, 'SERV14'),
(15, 'SERV15'),
(16, 'SERV16'),
(17, 'SERV17'),
(18, 'SERV18'),
(19, 'SERV19'),
(20, 'SERV20');

-- --------------------------------------------------------

--
-- Structure de la table `tbl_service_buisnesse`
--

CREATE TABLE `tbl_service_buisnesse` (
  `BID` int(11) NOT NULL,
  `SID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_service_buisnesse`
--

INSERT INTO `tbl_service_buisnesse` (`BID`, `SID`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `tbl_pictures`
--
ALTER TABLE `tbl_pictures`
  ADD PRIMARY KEY (`BID`,`src`),
  ADD KEY `PalgePicture` (`BID`);

--
-- Index pour la table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `tbl_service_buisnesse`
--
ALTER TABLE `tbl_service_buisnesse`
  ADD PRIMARY KEY (`BID`,`SID`),
  ADD KEY `idPlage` (`BID`),
  ADD KEY `idService` (`SID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `tbl_pictures`
--
ALTER TABLE `tbl_pictures`
  ADD CONSTRAINT `PalgePicture` FOREIGN KEY (`BID`) REFERENCES `tbl_businesses` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tbl_service_buisnesse`
--
ALTER TABLE `tbl_service_buisnesse`
  ADD CONSTRAINT `idPlage` FOREIGN KEY (`BID`) REFERENCES `tbl_businesses` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idService` FOREIGN KEY (`SID`) REFERENCES `tbl_services` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
