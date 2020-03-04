-- MySQL dump 10.13  Distrib 5.1.73, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: despri_new
-- ------------------------------------------------------
-- Server version	5.1.66-0+squeeze1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `description`, `created`, `shorttag`) VALUES (9,'Redaktionellt - Dagstidning - print','','2014-09-05 12:06:06','1A'),(51,'Årets Designer','','2018-04-23 06:23:22','8D'),(11,'Redaktionellt - Bok - print','','2014-09-05 12:06:09','1B'),(13,'Redaktionellt - Magasin - print','','2014-09-05 12:06:12','1C'),(15,'Redaktionellt - Kundtidning - print','','2014-09-05 12:06:16','1D'),(16,'Information - print','','2014-04-28 10:49:03','2Aa'),(17,'Information - Årsredovisning - print','','2014-04-28 10:49:55','2Ba'),(28,'Bildkommunikation  - Rörlig bild/film','','2017-04-25 17:21:10','6B'),(19,'Information - Årsredovisning - digital','','2014-04-28 10:52:36','2Bb'),(20,'Identitet - Förpackning','','2014-04-28 10:53:49','3B'),(21,'Identitet - Grafisk identitet','','2014-04-28 10:54:20','3A'),(22,'Identitet - Produktdesign','','2014-04-28 10:54:49','3C'),(23,'Reklam - print','','2014-04-28 10:57:25','4A'),(24,'Reklam - digital','','2014-04-28 10:57:18','4B'),(25,'Digitalt - Smarttelefon','','2017-04-25 17:16:21','5A'),(26,'Digitalt - Läsplatta ',NULL,'2017-04-25 17:16:28','5B'),(29,'Årets Våghals','','2015-05-07 15:11:01','8C'),(30,'Juryns Pris','','2015-05-07 15:10:40','8B'),(32,'Event - Display, monter, event','','2017-04-25 17:20:45','7A'),(33,'Identitet - digital','','2014-04-28 10:55:10','3D'),(35,'Redaktionellt - Personal/medlemstidning - print','','2014-09-05 12:06:43','1E'),(37,'Information - digital','','2014-04-28 10:48:46','2Ab'),(38,'Redaktionell - digital','Samlingskategori för redaktionella & digitala kategorier','2015-05-07 15:07:50','1F'),(50,'Digitalt - E-handel','','2017-05-03 17:49:42','5E'),(41,'Event - Visual Merchandising','Visual Merchandising','2017-04-25 17:20:52','7B'),(42,'Identitet - Grafisk identitet Hantverk (typsnitt, logotype, grafik - enstaka)',NULL,'2017-06-09 13:44:47','3Ab'),(43,'Bildkommunikation  - Illustration och infographic',NULL,'2017-04-25 17:21:07','6Ab'),(44,'Bildkommunikation  - Foto',NULL,'2017-04-25 17:21:03','6Aa'),(49,'Digitalt - Speldesign/Gaming','','2017-04-25 17:17:08','5D'),(48,'Digitalt - Internet of things/Wearables','','2017-04-25 17:16:54','5C');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-19 14:15:41
