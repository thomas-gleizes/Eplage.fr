-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 30 mars 2020 à 15:54
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP :  7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `eplage`
--

-- --------------------------------------------------------

--
-- Structure de la table `tbl_picture`
--

CREATE TABLE `tbl_picture` (
  `ID` int(11) NOT NULL,
  `ID_Plage` int(11) NOT NULL,
  `src` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_picture`
--

INSERT INTO `tbl_picture` (`ID`, `ID_Plage`, `src`) VALUES
(1, 2, './img/plage/palge1.jpg'),
(2, 1, './img/plage/plage2.jpg'),
(3, 1, './img/plage/plage3.jpg\r\n');

-- --------------------------------------------------------

--
-- Structure de la table `tbl_plage`
--

CREATE TABLE `tbl_plage` (
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
  `LONGITUDE` float NOT NULL,
  `LATTITUDE` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_plage`
--

INSERT INTO `tbl_plage` (`ID`, `NAME`, `COUNTRY`, `COUNTY`, `CITY`, `ADRESS`, `ZIPCODE`, `PHONE`, `MAIL`, `FLEACHID`, `LONGITUDE`, `LATTITUDE`) VALUES
(1, 'Plage 1', 'France', 'Herault', 'Carnon', '12 avenue de l\'étang', 34280, '04 XX XX XX XX', 'plage2@email.com', 1, 43.5441, 3.98158),
(2, 'Plage 2', 'France', 'Herault', 'Palavas', '30 rue de la mer', 34250, '04 XX XX XX XX', 'plage1@email.fr', 0, 43.5289, 3.93667);

-- --------------------------------------------------------

--
-- Structure de la table `tbl_service`
--

CREATE TABLE `tbl_service` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_service`
--

INSERT INTO `tbl_service` (`ID`, `name`) VALUES
(1, 'Accés Handicapé');

-- --------------------------------------------------------

--
-- Structure de la table `tbl_service_plage`
--

CREATE TABLE `tbl_service_plage` (
  `id_Service` int(11) NOT NULL,
  `id_Plage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tbl_service_plage`
--

INSERT INTO `tbl_service_plage` (`id_Service`, `id_Plage`) VALUES
(1, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tbl_picture`
--
ALTER TABLE `tbl_picture`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PalgePicture` (`ID_Plage`);

--
-- Index pour la table `tbl_plage`
--
ALTER TABLE `tbl_plage`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `tbl_service`
--
ALTER TABLE `tbl_service`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `tbl_service_plage`
--
ALTER TABLE `tbl_service_plage`
  ADD KEY `idPlage` (`id_Plage`),
  ADD KEY `idService` (`id_Service`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tbl_picture`
--
ALTER TABLE `tbl_picture`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `tbl_plage`
--
ALTER TABLE `tbl_plage`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tbl_service`
--
ALTER TABLE `tbl_service`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `tbl_picture`
--
ALTER TABLE `tbl_picture`
  ADD CONSTRAINT `PalgePicture` FOREIGN KEY (`ID_Plage`) REFERENCES `tbl_plage` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tbl_service_plage`
--
ALTER TABLE `tbl_service_plage`
  ADD CONSTRAINT `idPlage` FOREIGN KEY (`id_Plage`) REFERENCES `tbl_plage` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idService` FOREIGN KEY (`id_Service`) REFERENCES `tbl_service` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
