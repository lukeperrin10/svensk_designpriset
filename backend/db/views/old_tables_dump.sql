-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: designpriset
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `old_winner_entries`
--

-- DROP TABLE IF EXISTS `old_winner_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `old_winner_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `entry_name` varchar(100) DEFAULT NULL,
  `category` varchar(55) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `designer` varchar(500) DEFAULT NULL,
  `illustrator` varchar(500) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `leader` varchar(500) DEFAULT NULL,
  `customer` varchar(500) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `format` varchar(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `webpage` varchar(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `is_winner_gold` tinyint(1) NOT NULL,
  `is_winner_silver` tinyint(1) NOT NULL,
  `is_nominated` tinyint(1) NOT NULL,
  `motivation` varchar(1000) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `year` varchar(10) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29781 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `old_winner_profiles`
--

-- DROP TABLE IF EXISTS `old_winner_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `old_winner_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `secret` varchar(255) DEFAULT NULL,
  `contact` varchar(500) DEFAULT NULL,
  `company` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `city` varchar(55) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mail` varchar(55) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `invoice_paid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=102541 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-15 12:44:52
