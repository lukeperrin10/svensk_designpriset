-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: designpriset
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add Category',1,'add_category'),(2,'Can change Category',1,'change_category'),(3,'Can delete Category',1,'delete_category'),(4,'Can view Category',1,'view_category'),(5,'Can add ContentPhase',2,'add_contentphase'),(6,'Can change ContentPhase',2,'change_contentphase'),(7,'Can delete ContentPhase',2,'delete_contentphase'),(8,'Can view ContentPhase',2,'view_contentphase'),(9,'Can add Content template',3,'add_contenttemplate'),(10,'Can change Content template',3,'change_contenttemplate'),(11,'Can delete Content template',3,'delete_contenttemplate'),(12,'Can view Content template',3,'view_contenttemplate'),(13,'Can add Entry',4,'add_entry'),(14,'Can change Entry',4,'change_entry'),(15,'Can delete Entry',4,'delete_entry'),(16,'Can view Entry',4,'view_entry'),(17,'Can add Mail',5,'add_mail'),(18,'Can change Mail',5,'change_mail'),(19,'Can delete Mail',5,'delete_mail'),(20,'Can view Mail',5,'view_mail'),(21,'Can add MailVar',6,'add_mailvar'),(22,'Can change MailVar',6,'change_mailvar'),(23,'Can delete MailVar',6,'delete_mailvar'),(24,'Can view MailVar',6,'view_mailvar'),(25,'Can add Phase',7,'add_phase'),(26,'Can change Phase',7,'change_phase'),(27,'Can delete Phase',7,'delete_phase'),(28,'Can view Phase',7,'view_phase'),(29,'Can add Poll',8,'add_poll'),(30,'Can change Poll',8,'change_poll'),(31,'Can delete Poll',8,'delete_poll'),(32,'Can view Poll',8,'view_poll'),(33,'Can add Profile',9,'add_profile'),(34,'Can change Profile',9,'change_profile'),(35,'Can delete Profile',9,'delete_profile'),(36,'Can view Profile',9,'view_profile'),(37,'Can add Config',10,'add_yearconfig'),(38,'Can change Config',10,'change_yearconfig'),(39,'Can delete Config',10,'delete_yearconfig'),(40,'Can view Config',10,'view_yearconfig'),(41,'Can add Vote',11,'add_vote'),(42,'Can change Vote',11,'change_vote'),(43,'Can delete Vote',11,'delete_vote'),(44,'Can view Vote',11,'view_vote'),(45,'Can add Entry image',12,'add_entryimage'),(46,'Can change Entry image',12,'change_entryimage'),(47,'Can delete Entry image',12,'delete_entryimage'),(48,'Can view Entry image',12,'view_entryimage'),(49,'Can add Content',13,'add_content'),(50,'Can change Content',13,'change_content'),(51,'Can delete Content',13,'delete_content'),(52,'Can view Content',13,'view_content'),(53,'Can add log entry',14,'add_logentry'),(54,'Can change log entry',14,'change_logentry'),(55,'Can delete log entry',14,'delete_logentry'),(56,'Can view log entry',14,'view_logentry'),(57,'Can add permission',15,'add_permission'),(58,'Can change permission',15,'change_permission'),(59,'Can delete permission',15,'delete_permission'),(60,'Can view permission',15,'view_permission'),(61,'Can add group',16,'add_group'),(62,'Can change group',16,'change_group'),(63,'Can delete group',16,'delete_group'),(64,'Can view group',16,'view_group'),(65,'Can add user',17,'add_user'),(66,'Can change user',17,'change_user'),(67,'Can delete user',17,'delete_user'),(68,'Can view user',17,'view_user'),(69,'Can add content type',18,'add_contenttype'),(70,'Can change content type',18,'change_contenttype'),(71,'Can delete content type',18,'delete_contenttype'),(72,'Can view content type',18,'view_contenttype'),(73,'Can add session',19,'add_session'),(74,'Can change session',19,'change_session'),(75,'Can delete session',19,'delete_session'),(76,'Can view session',19,'view_session'),(77,'Can add attachment',20,'add_attachment'),(78,'Can change attachment',20,'change_attachment'),(79,'Can delete attachment',20,'delete_attachment'),(80,'Can view attachment',20,'view_attachment');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$2io3sdC7L62K$Sq5eb2jbcgDhPFWkU1SsdgDEHoaPk38FNAPq0UnqQrY=','2020-09-01 09:37:00.842395',1,'johan','','','johan@wopii.com',1,1,'2020-09-01 09:36:57.062867');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `shorttag` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `type` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shorttag` (`shorttag`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (9,'2014-09-05 12:06:06.000000','2020-03-24 07:40:20.182000','Redaktionellt - Dagstidning - print','','1A',1,'print',NULL),(11,'2014-09-05 12:06:09.000000','2020-03-04 00:00:00.000000','Redaktionellt - Bok - print','','1B',1,'print',NULL),(13,'2014-09-05 12:06:12.000000','2020-09-01 13:33:29.738591','Redaktionellt - Magasin - print','','1C',1,'print',2),(15,'2014-09-05 12:06:16.000000','2020-03-24 07:40:12.305000','Redaktionellt - Kundtidning - print','','1D',1,'print',NULL),(16,'2014-04-28 10:49:03.000000','2020-03-04 00:00:00.000000','Information - print','','2Aa',1,'print',NULL),(17,'2014-04-28 10:49:55.000000','2020-03-24 07:40:02.459000','Information - Årsredovisning - print','','2Ba',1,'print',NULL),(19,'2014-04-28 10:52:36.000000','2020-03-04 00:00:00.000000','Information - Årsredovisning - digital','','2Bb',1,'digital',NULL),(20,'2014-04-28 10:53:49.000000','2020-03-04 00:00:00.000000','Identitet - Förpackning','','3B',1,'print',NULL),(21,'2014-04-28 10:54:20.000000','2020-03-04 00:00:00.000000','Identitet - Grafisk identitet','','3A',1,'digital',NULL),(22,'2014-04-28 10:54:49.000000','2020-03-04 00:00:00.000000','Identitet - Produktdesign','','3C',1,'digital',NULL),(23,'2014-04-28 10:57:25.000000','2020-03-24 07:39:45.084000','Reklam - print','','4A',1,'print',NULL),(24,'2014-04-28 10:57:18.000000','2020-03-04 00:00:00.000000','Reklam - digital','','4B',1,'digital',NULL),(25,'2017-04-25 17:16:21.000000','2020-09-01 13:24:05.320289','Digitalt - Smarttelefon','','5A',1,'digital',3),(26,'2017-04-25 17:16:28.000000','2020-03-04 00:00:00.000000','Digitalt - Läsplatta ',NULL,'5B',1,'digital',NULL),(28,'2017-04-25 17:21:10.000000','2020-03-04 00:00:00.000000','Bildkommunikation  - Rörlig bild/film','','6B',1,'digital',NULL),(29,'2015-05-07 15:11:01.000000','2020-03-04 00:00:00.000000','Årets Våghals','','8C',0,'digital',NULL),(30,'2015-05-07 15:10:40.000000','2020-03-04 00:00:00.000000','Juryns Pris','','8B',0,'digital',NULL),(32,'2017-04-25 17:20:45.000000','2020-03-04 00:00:00.000000','Event - Display, monter, event','','7A',1,'digital',NULL),(33,'2014-04-28 10:55:10.000000','2020-03-04 00:00:00.000000','Identitet - digital','','3D',1,'digital',NULL),(35,'2014-09-05 12:06:43.000000','2020-03-04 00:00:00.000000','Redaktionellt - Personal/medlemstidning - print','','1E',1,'print',NULL),(37,'2014-04-28 10:48:46.000000','2020-03-04 00:00:00.000000','Information - digital','','2Ab',1,'digital',NULL),(38,'2015-05-07 15:07:50.000000','2020-09-01 13:23:59.202789','Redaktionell - digital','Samlingskategori för redaktionella & digitala kategorier','1F',1,'digital',2),(41,'2017-04-25 17:20:52.000000','2020-03-04 00:00:00.000000','Event - Visual Merchandising','Visual Merchandising','7B',1,'digital',NULL),(42,'2017-06-09 13:44:47.000000','2020-03-04 00:00:00.000000','Identitet - Grafisk identitet Hantverk (typsnitt, logotype, grafik - enstaka)',NULL,'3Ab',1,'digital',NULL),(43,'2017-04-25 17:21:07.000000','2020-03-04 00:00:00.000000','Bildkommunikation  - Illustration och infographic',NULL,'6Ab',1,'digital',NULL),(44,'2017-04-25 17:21:03.000000','2020-03-04 00:00:00.000000','Bildkommunikation  - Foto',NULL,'6Aa',1,'digital',NULL),(48,'2017-04-25 17:16:54.000000','2020-03-04 00:00:00.000000','Digitalt - Internet of things/Wearables','','5C',1,'digital',NULL),(49,'2017-04-25 17:17:08.000000','2020-03-04 00:00:00.000000','Digitalt - Speldesign/Gaming','','5D',1,'digital',NULL),(50,'2017-05-03 17:49:42.000000','2020-09-01 13:23:52.699992','Digitalt - E-handel','','5E',1,'digital',1),(51,'2018-04-23 06:23:22.000000','2020-03-04 00:00:00.000000','Årets Designer','','8D',0,'digital',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `image` varchar(100) DEFAULT NULL,
  `order` int DEFAULT NULL,
  `template_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_template_id_5b525cd7_fk_content_template_id` (`template_id`),
  CONSTRAINT `content_template_id_5b525cd7_fk_content_template_id` FOREIGN KEY (`template_id`) REFERENCES `content_template` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'2020-03-04 13:24:00.853000','2020-03-20 12:04:09.763000','Kontaktinformation (footer)','<div>\r\n<a href=\"mailto:info@designpriset.se\" target=\"_blank\">info@designpriset.se</a>\r\n<br>\r\n<a href=\"https://www.facebook.com/designpriset\" target=\"_blank\">Facebook</a>\r\n<a href=\"https://vimeo.com/user84798704\" target=\"_blank\">Vimeo</a>\r\n<a href=\"https://www.instagram.com/designpriset\" target=\"_blank\">Instagram</a>\r\n</div>\r\n\r\n\r\n<div><p>Svenska Designpriset<br>Södra vägen 24<br>412 54 Göteborg<br><br><br>Tel 031-711 25 40<br>Fax 031-711 25 45<br>Sthlm 08-411 24 20<br>Malmö 040-611 37 70<br></p></div>','',NULL,5),(2,'2020-03-04 13:25:55.259000','2020-03-04 13:30:24.376000','Om Designpriset','<p style=\"margin-bottom: 20px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; color: rgb(149, 149, 149);\"><span style=\"background-color: rgb(255, 255, 255);\">Svenska Designpriset är en tävling i design&nbsp;som är öppen för alla som arbetar med grafisk design, formgivning och inom liknande&nbsp;kreativa områden.&nbsp;För att alla ska ha möjlighet att delta har vi delat in tävlingen i Redaktionell, Information, Identitet, Reklam, Digital,&nbsp;Bild och Event med vardera underkategorier. Sammanlagt blir det tjugosju olika tävlingskategorier samt Juryns pris, Årets Våghals och Svensk Design Hedersgalleri.&nbsp;Tävlingen arrangeras av&nbsp;<a title=\"Batteri Kommunikation\" href=\"http://www.batteri.se/\" target=\"_blank\" style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; color: rgb(198, 162, 48);\">Batteri Kommunikation AB</a>.&nbsp;</span></p><p style=\"margin-bottom: 20px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; color: rgb(149, 149, 149);\"><span style=\"background-color: rgb(255, 255, 255);\">Vinnarna av Svenska Designpriset får Guldmedaljen och diplomet Svenska Designpriset Guld under prisutdelningen. De vinnande bidragen publiceras på www.designpriset.se samt visas på vår vinnarutställning i Stockholm, Göteborg och Malmö. Vi delar också ut Silverdiplom av Svenska Designpriset till respektive kategori.</span></p><p style=\"margin-bottom: 20px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; color: rgb(149, 149, 149);\"><span style=\"background-color: rgb(255, 255, 255);\">Vinnarna får möjlighet att använda Svenska Designprisets symbol i sin marknadsföring.</span></p>','content_images/welcome_OefuvoW.jpg',2,1),(3,'2020-03-04 13:30:14.575000','2020-03-04 13:30:14.575000','Juryn','<ul style=\"margin-right: 0px; margin-bottom: 20px; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; list-style: none; color: rgb(149, 149, 149);\"><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; vertical-align: top;\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; vertical-align: top;\">Tobias Ahlin</span></span></span>&nbsp;-&nbsp;Designchef Minecraft</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; vertical-align: top;\">Dick Ander</span></span>&nbsp;- Art director - Ordförande</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">Bo Bergström</span>&nbsp;- Creative director</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">Josefin Karlsson</span>&nbsp;-&nbsp;UX Designer Google</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">Anna Lundqvist</span>&nbsp;- Art Director &amp; UX Designer</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">John Mellkvist</span>&nbsp;-&nbsp;Head of Future and Strategy</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">Barbro Rydén</span>&nbsp;- Grafisk formgivare</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: ITCFranklinGothicStd-Med; vertical-align: top; color: rgb(198, 162, 48);\">Andrea Rosengren</span>&nbsp;-&nbsp;Designchef H&amp;M</span></li></ul>','content_images/juryn172.jpg',1,1),(4,'2020-03-04 13:55:36.794000','2020-03-04 13:55:36.795000','Shop','<p style=\"margin-bottom: 20px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; color: rgb(149, 149, 149);\"><span style=\"background-color: rgb(255, 255, 255);\">Svenska Designprisets Affisch 2019 50x70&nbsp;&nbsp;250 SEK<br>Svenska Designprisets Affisch 2017 50x70 250 SEK •&nbsp;Svenska Designprisets Affisch 2015 50x70 250 SEK<br>Pin - 15 mm - Guldfärgad&nbsp;50 SEK<br>Svenska Designprisets t-shirt&nbsp;- Guldrelief&nbsp;350&nbsp;SEK<br>Extra Diplom&nbsp;Ramat: 500 SEK<br>Extra medalj i Etui: 1000 SEK<br>Ramad Vinnarbild på arbetsgrupp Guld eller Silver Foto: Lars Lanhed - 500 SEK.</span></p><p style=\"margin-bottom: 20px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; color: rgb(149, 149, 149);\"><span style=\"background-color: rgb(255, 255, 255);\">Priserna är exkl. moms och frakt.&nbsp;<a href=\"mailto:info@designpriset.se\" style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; color: rgb(198, 162, 48);\">Beställ&gt;&gt;</a></span></p>','content_images/SDPshop1.jpg',3,1),(5,'2020-03-04 13:56:35.288000','2020-03-04 13:56:35.288000','Press','<ul style=\"margin-right: 0px; margin-bottom: 20px; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: ITCFranklinGothicStd-Book, helvetica, arial, sans-serif; vertical-align: top; list-style: none; color: rgb(149, 149, 149);\"><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\">Mediakontakt:&nbsp;<a href=\"mailto:info@designpriset.se\" style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; color: rgb(198, 162, 48);\">info@designpriset.se</a></span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\">Logotype och bilder:&nbsp;<a href=\"mailto:info@designpriset.se\" style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; color: rgb(198, 162, 48);\">info@designpriset.se</a></span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\">Presskontakt: Juryns ordförande Dick Ander, 031-711 25 40</span></li><li style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top;\"><span style=\"background-color: rgb(255, 255, 255);\">Projektledare:&nbsp;<a href=\"mailto:info@batteri.se\" style=\"margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: top; color: rgb(198, 162, 48);\">info@batteri.se</a></span></li></ul>','content_images/crew2014dansband.jpg',4,1),(6,'2020-03-19 08:46:19.283000','2020-03-19 11:40:17.766000','Registreringsinformation','<div><h2>1</h2><p>Fyll i kontaktuppgifter och info om bidrag. Du kan skicka in ett eller många bidrag vid samma anmälan</p></div>\r\n<div><h2>2</h2><p>Granska och skicka in.</p></div>\r\n<div><h2>3</h2><p>(Printat) material skickas in senast 12 juni. Material skickas per post i tre exemplar. Mindre material monteras på pannå. Om trycksaken inte är färdigtryckt skicka in PDF och komplettera senare.</p></div>\r\n<div><h2>4</h2><p>Bekräftelsemejl skickas. Du får ett mejl men länk till din anmälan. Du kan ändra dina uppgifter och bilder tom 15 juni.</p></div>\r\n<div><h2>5</h2><p>Betala 3 995 kr + moms per bidrag. Faktura med 10 dagars betalning skickas vid anmälan.</p></div>','',NULL,4),(7,'2020-03-23 14:28:40.293000','2020-03-23 15:13:52.128000','Film från prisutdelningen 2019','<div>\r\n<h2>Film från pris- utdelningen 2019</h2>\r\n<p>Svenska Designpriset är en tävling i design som är öppen för alla som arbetar med grafisk.</p><p></p></div>\r\n<div><div style=\"padding:56.25% 0 0 0;position:relative;\"><iframe src=\"https://player.vimeo.com/video/367283136\" style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"\"></iframe></div><script src=\"https://player.vimeo.com/api/player.js\"></script></div>','',NULL,2);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_phase`
--

DROP TABLE IF EXISTS `content_phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_phase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_phase`
--

LOCK TABLES `content_phase` WRITE;
/*!40000 ALTER TABLE `content_phase` DISABLE KEYS */;
INSERT INTO `content_phase` VALUES (1,'phase_one'),(2,'phase_two'),(3,'phase_three'),(4,'phase_four'),(5,'phase_five');
/*!40000 ALTER TABLE `content_phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_phases`
--

DROP TABLE IF EXISTS `content_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_phases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `contentphase_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_phases_content_id_contentphase_id_14713a70_uniq` (`content_id`,`contentphase_id`),
  KEY `content_phases_contentphase_id_0a49ff49_fk_content_phase_id` (`contentphase_id`),
  CONSTRAINT `content_phases_content_id_edbec724_fk_content_id` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`),
  CONSTRAINT `content_phases_contentphase_id_0a49ff49_fk_content_phase_id` FOREIGN KEY (`contentphase_id`) REFERENCES `content_phase` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_phases`
--

LOCK TABLES `content_phases` WRITE;
/*!40000 ALTER TABLE `content_phases` DISABLE KEYS */;
INSERT INTO `content_phases` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,1),(7,2,2),(8,2,3),(9,2,4),(10,2,5),(11,3,1),(12,3,2),(13,3,3),(14,3,4),(15,3,5),(16,4,1),(17,4,2),(18,4,3),(19,4,4),(20,4,5),(21,5,1),(22,5,2),(23,5,3),(24,5,4),(25,5,5),(26,6,1),(27,6,2),(28,6,3),(29,6,4),(30,6,5),(31,7,1),(32,7,2),(33,7,3),(34,7,4),(35,7,5);
/*!40000 ALTER TABLE `content_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_template`
--

DROP TABLE IF EXISTS `content_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_template`
--

LOCK TABLES `content_template` WRITE;
/*!40000 ALTER TABLE `content_template` DISABLE KEYS */;
INSERT INTO `content_template` VALUES (1,'standard','Sidor som visas i menyn'),(2,'start_content','Information och innehåll som ska visas överst på startsidan'),(3,'start_calendar','Information om årets olika datum'),(4,'register_info','Den information som ska visas överst på anmälningssidan'),(5,'footer_right_content','Den information som ska visas längst ner till höger i footern');
/*!40000 ALTER TABLE `content_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-09-01 09:37:50.619801','2','Ett bidrag',1,'[{\"added\": {}}]',4,1),(2,'2020-09-01 09:38:14.926554','2','Ett bidrag',2,'[{\"changed\": {\"fields\": [\"Winner Gold\"]}}]',4,1),(3,'2020-09-01 13:15:48.741476','1','dw',1,'[{\"added\": {}}]',8,1),(4,'2020-09-01 13:17:46.253652','3','dwdw',1,'[{\"added\": {}}]',4,1),(5,'2020-09-01 13:18:26.228837','4','fe',1,'[{\"added\": {}}]',4,1),(6,'2020-09-01 13:23:52.701054','50','Digitalt - E-handel',2,'[{\"changed\": {\"fields\": [\"Order\"]}}]',1,1),(7,'2020-09-01 13:23:59.204904','38','Redaktionell - digital',2,'[{\"changed\": {\"fields\": [\"Order\"]}}]',1,1),(8,'2020-09-01 13:24:05.321429','25','Digitalt - Smarttelefon',2,'[{\"changed\": {\"fields\": [\"Order\"]}}]',1,1),(9,'2020-09-01 13:33:29.740081','13','Redaktionellt - Magasin - print',2,'[{\"changed\": {\"fields\": [\"Order\"]}}]',1,1),(10,'2020-09-03 09:36:26.552120','5','Tjoooo',1,'[{\"added\": {}}]',4,1),(11,'2020-09-03 09:39:35.633893','6','feafeage',1,'[{\"added\": {}}]',4,1),(12,'2020-09-03 09:46:25.330570','6','feafeage',2,'[{\"changed\": {\"fields\": [\"Winner Gold\"]}}]',4,1),(13,'2020-09-03 09:46:36.106726','5','Tjoooo',2,'[{\"changed\": {\"fields\": [\"Winner Gold\"]}}]',4,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (14,'admin','logentry'),(16,'auth','group'),(15,'auth','permission'),(17,'auth','user'),(18,'contenttypes','contenttype'),(1,'despri_admin','category'),(13,'despri_admin','content'),(2,'despri_admin','contentphase'),(3,'despri_admin','contenttemplate'),(4,'despri_admin','entry'),(12,'despri_admin','entryimage'),(5,'despri_admin','mail'),(6,'despri_admin','mailvar'),(7,'despri_admin','phase'),(8,'despri_admin','poll'),(9,'despri_admin','profile'),(11,'despri_admin','vote'),(10,'despri_admin','yearconfig'),(20,'django_summernote','attachment'),(19,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-09-01 09:33:54.918693'),(2,'auth','0001_initial','2020-09-01 09:33:55.100103'),(3,'admin','0001_initial','2020-09-01 09:33:55.578912'),(4,'admin','0002_logentry_remove_auto_add','2020-09-01 09:33:55.722077'),(5,'admin','0003_logentry_add_action_flag_choices','2020-09-01 09:33:55.733469'),(6,'contenttypes','0002_remove_content_type_name','2020-09-01 09:33:55.838636'),(7,'auth','0002_alter_permission_name_max_length','2020-09-01 09:33:55.901280'),(8,'auth','0003_alter_user_email_max_length','2020-09-01 09:33:55.928052'),(9,'auth','0004_alter_user_username_opts','2020-09-01 09:33:55.940146'),(10,'auth','0005_alter_user_last_login_null','2020-09-01 09:33:56.000652'),(11,'auth','0006_require_contenttypes_0002','2020-09-01 09:33:56.006959'),(12,'auth','0007_alter_validators_add_error_messages','2020-09-01 09:33:56.019689'),(13,'auth','0008_alter_user_username_max_length','2020-09-01 09:33:56.095294'),(14,'auth','0009_alter_user_last_name_max_length','2020-09-01 09:33:56.167828'),(15,'auth','0010_alter_group_name_max_length','2020-09-01 09:33:56.193972'),(16,'auth','0011_update_proxy_permissions','2020-09-01 09:33:56.205113'),(17,'despri_admin','0001_initial','2020-09-01 09:33:56.719209'),(18,'despri_admin','0002_category_type','2020-09-01 09:33:57.285032'),(19,'despri_admin','0003_entry_video_url','2020-09-01 09:33:57.325252'),(20,'despri_admin','0004_entry_description','2020-09-01 09:33:57.367527'),(21,'despri_admin','0005_auto_20200330_0718','2020-09-01 09:33:57.377281'),(22,'despri_admin','0006_category_order','2020-09-01 09:33:57.417499'),(23,'django_summernote','0001_initial','2020-09-01 09:33:57.453787'),(24,'django_summernote','0002_update-help_text','2020-09-01 09:33:57.462250'),(25,'sessions','0001_initial','2020-09-01 09:33:57.495239');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('yuz0e0ywykt6hm0xkdals8aubdfzveor','NDI4NmQ4NDU4NTdkOGMxZDMzNzZiOTExMmJkYmJjNTc3OGM5ZDAwYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkZGI0N2FhNmUzNzJiN2VlYzA4ZGEyMTYzZTI0NjEzZDY0ODNlYmJlIn0=','2020-09-15 09:37:00.846510');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_summernote_attachment`
--

DROP TABLE IF EXISTS `django_summernote_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_summernote_attachment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `file` varchar(100) NOT NULL,
  `uploaded` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_summernote_attachment`
--

LOCK TABLES `django_summernote_attachment` WRITE;
/*!40000 ALTER TABLE `django_summernote_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_summernote_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `entry_name` varchar(127) NOT NULL,
  `source` varchar(100) DEFAULT NULL,
  `designer` varchar(511) NOT NULL,
  `illustrator` varchar(511) DEFAULT NULL,
  `leader` varchar(511) NOT NULL,
  `customer` varchar(511) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `format` varchar(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `webpage` varchar(255) DEFAULT NULL,
  `is_winner_gold` tinyint(1) NOT NULL,
  `is_winner_silver` tinyint(1) NOT NULL,
  `is_nominated` tinyint(1) NOT NULL,
  `sent_nominee_notification` date DEFAULT NULL,
  `motivation` longtext,
  `year` varchar(4) NOT NULL,
  `category_id` int NOT NULL,
  `profile_id` int NOT NULL,
  `video_url` varchar(511) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entries_profile_id_7d89e707_fk_profiles_id` (`profile_id`),
  KEY `entries_category_id_af1fa84d_fk_categories_id` (`category_id`),
  CONSTRAINT `entries_category_id_af1fa84d_fk_categories_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `entries_profile_id_7d89e707_fk_profiles_id` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (2,'2020-09-01 09:37:50.613731','2020-09-01 09:38:14.923967','123213','Ett bidrag','','jo','jo','jo','jo','avatars/Skarmavbild_2020-09-01_kl._10.37.47.png',NULL,NULL,NULL,1,0,1,NULL,'','2020',9,1,NULL,NULL),(3,'2020-09-01 13:17:46.249535','2020-09-01 13:17:46.249629',NULL,'dwdw','','dw','dw','dw','de','avatars/PCD172_Trust_cover.jpg',NULL,NULL,NULL,0,0,1,NULL,'','2020',11,1,NULL,NULL),(4,'2020-09-01 13:18:26.223723','2020-09-01 13:18:26.223764',NULL,'fe','','fe','fw','f','f','avatars/PCD172_Trust_cover_AUbdc91.jpg',NULL,NULL,NULL,0,0,1,NULL,'','2020',13,1,NULL,NULL),(5,'2020-09-03 09:36:26.548417','2020-09-03 09:46:36.105329',NULL,'Tjoooo','','d','d','d','d','avatars/PCD172_Trust_cover_gMnFhrA.jpg',NULL,NULL,NULL,1,0,0,NULL,'','2019',11,1,NULL,NULL),(6,'2020-09-03 09:39:35.631069','2020-09-03 09:46:25.328922',NULL,'feafeage','','f','f','f','f','avatars/PCD172_Trust_cover_LcYhJhJ.jpg',NULL,NULL,NULL,1,0,0,NULL,'','2019',29,1,NULL,NULL);
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_images`
--

DROP TABLE IF EXISTS `entry_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `entry_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_images_entry_id_4e603be6_fk_entries_id` (`entry_id`),
  CONSTRAINT `entry_images_entry_id_4e603be6_fk_entries_id` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_images`
--

LOCK TABLES `entry_images` WRITE;
/*!40000 ALTER TABLE `entry_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `entry_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mails`
--

DROP TABLE IF EXISTS `mails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sender` varchar(80) NOT NULL,
  `subject` varchar(80) NOT NULL,
  `content` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mails`
--

LOCK TABLES `mails` WRITE;
/*!40000 ALTER TABLE `mails` DISABLE KEYS */;
INSERT INTO `mails` VALUES (3,'2020-03-04 14:19:47.194000','2020-03-04 14:19:47.194000','VOTE_CONFIRM','no-reply@designpriset.se','Verifiera dina röster','<p><span style=\"background-color: rgb(255, 255, 255);\"><span style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\">Hej!<span class=\"Apple-converted-space\" style=\"\">&nbsp;</span></span><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><span style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\">Dina röster är strax klara att skickas in. Det enda som återstår är att verifiera dem.<span class=\"Apple-converted-space\">&nbsp;</span></span><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px; caret-color: rgb(149, 149, 149);\">[#vote_confirm_link]</span></font><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><b style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\">Missa inte slutresultatet: 17 oktober - den festliga Prisutdelningen på Rondo, Liseberg- i Göteborg.</b><span style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><span class=\"Apple-converted-space\">&nbsp;</span></span><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><br style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\"><span style=\"caret-color: rgb(149, 149, 149); color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; text-size-adjust: auto;\">Hälsningar Svenska Designpriset<span class=\"Apple-converted-space\" style=\"\">&nbsp;</span></span></span><br></p>'),(10,'2020-03-04 14:39:19.773000','2020-03-26 10:13:57.864000','ENTRY_CONFIRM','info@designpriset.se','Anmälan Svenska Designpriset','<p><font style=\"text-size-adjust: auto; font-family: Arial; font-size: 40px; font-weight: bold; margin-bottom: 5px; color: rgb(198, 162, 48); line-height: 45px;\">Tack!<span class=\"Apple-converted-space\">&nbsp;</span><span class=\"Apple-converted-space\">&nbsp;</span></font><span style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto; background-color: rgb(245, 245, 243);\"></span><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto;\"><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto;\"></p><p>Tjosan hoppsan!<br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto;\"><font style=\"text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Vi har mottagit din anmälan till Svenska Designpriset 2019! Kansliet skickar också en bekräftelse.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Varje bidrag kostar [#price_per_entry]:- exkl. moms. Faktura med 10 dagars betalning skickas från Svenska Designpriset.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Antal bidrag:&nbsp;</span></font></font><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">[#amount_of_entries]</span></font><span style=\"font-size: 13px; color: rgb(149, 149, 149); font-family: Arial;\">&nbsp;st.</span></p><p><font style=\"text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Pris per bidrag: [#price_per_entry]:- exkl. moms.</span></font><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Ändringar kan göras fram till 14 Juni. Klicka på länken för att ändra i bidragen eller lägga till ytterligare bidrag.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">[#register_edit_link]</span></font><br><br><br></font></p><h3 style=\"font-family: Arial; font-size: 25px; font-weight: bold; color: rgb(198, 162, 48);\">Allmänna uppgifter</h3><ul style=\"list-style: none; padding-left: 0px;\"><li>[#profile]</li><li><br></li><li>[#entries_list]<br></li></ul><p>[#register_add_link]<br></p><ul style=\"text-size-adjust: auto; list-style: none; padding: 0px;\"><font style=\"\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Läs mer om tävlingen på</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">&nbsp;</span><a href=\"http://www.designpriset.se/\" style=\"color: rgb(198, 162, 48); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">www.designpriset.se</a><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">&nbsp;</span></font></ul>'),(12,'2020-03-04 14:44:58.611000','2020-03-26 13:28:59.833000','NOMINEE','no-reply@designpriset.se','Grattis! Ert bidrag är nominerat till Svenska Designpriset','<p><font style=\"text-size-adjust: auto; font-family: Arial; font-size: 25px; font-weight: bold; color: rgb(198, 162, 48);\">Ert bidrag är nominerat<span class=\"Apple-converted-space\">&nbsp;</span></font><span style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 12px; text-size-adjust: auto; background-color: rgb(245, 245, 243);\"></span><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 12px; text-size-adjust: auto;\"><font face=\"Helvetica\"><span style=\"font-size: 12px;\">[#entry_name_with_category]</span></font><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 12px; text-size-adjust: auto;\"><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 12px; text-size-adjust: auto;\"><font style=\"text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Efter Juryns arbete i juli och augusti har ert bidrag nominerats till slutomröstning i Svenska Designpriset 2019.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Redan den 2 september respektive den 9 september startar omröstningen på</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><a href=\"http://www.designpriset.se/\" traget=\"_blank\" style=\"color: rgb(197, 161, 47); font-family: Arial; font-size: 13px; font-weight: bold;\">www.designpriset.se</a><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">och hela design-Sverige får vara med och rösta fram vinnaren.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Kontrollera vilken röstvecka ni är nominerade för era pressmeddelanden. Vecka 1 är kategorierna Redaktionell och Information. Övriga kategorier vecka 2.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Vinnaren presenteras den</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;[#award_date]</span><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">under den festliga prisutdelningen på</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><span class=\"Apple-converted-space\" style=\"\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\"><b>[#award_place]</b>&nbsp;</span></font></span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Representanter från er och uppdragsgivaren är välkomna att närvara. Inbjudan skickas ut separat inom kort.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Från den</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><b style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">28 augusti kan ni GÅ UT</b><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">med pressmeddelande och dylikt om att ni är nominerade i Svenska Designpriset 2019. Ni har också rätt att använda Svenska Designprisets symbol.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">För att kunna presentera ert bidrag behöver ni</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><b style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">KONTROLLERA OCH EV. UPPDATERA ERA UPPGIFTER SENAST den 29 augusti:</b></font></p><ul><li>en miniatyrbild av ert bidrag (alla kategorier)</li><li>PDF för alla printbidrag</li><li>URL till alla webbidrag, device och bild/rörligt</li></ul><p><font style=\"text-size-adjust: auto; font-family: Arial; font-size: 13px; color: rgb(149, 149, 149);\"><br><br><b>Miniatyrbild -</b><span class=\"Apple-converted-space\">&nbsp;</span>Bild på ert bidrag/omslag/etta som används som klickbar bild på sajten för omröstning.<span class=\"Apple-converted-space\">&nbsp;</span><br><br><b>PDF -</b><span class=\"Apple-converted-space\">&nbsp;</span>Spara en pdf-fil av ditt printbidrag. Filen är till för att granska ert bidrag vid omröstningen. Pdf-filen skall vara lågupplöst för granskning på skärm. Alla som vill rösta klickar på PDF för att titta på just ert bidrag. Om ert bidrag är mer än en sida välj ut de sidor du känner bäst representerar ert bidrag. MAX STORLEK på PDF:en är 5Mb. Hur ni väljer att presentera bidraget inom ramen för dessa 5Mb bestämmer ni själva.<span class=\"Apple-converted-space\">&nbsp;</span><br><br><b>URL -</b><span class=\"Apple-converted-space\">&nbsp;</span>Består bidraget av en webbsida, casefilm, film eller bild så anger du en URL istället för PDF.<span class=\"Apple-converted-space\">&nbsp;</span><br><br><font color=\"#c5a12f\"><span style=\"font-size: 14px;\"><b>Vänligen</b></span></font><span class=\"Apple-converted-space\" style=\"color: rgb(197, 161, 47); font-weight: bold; font-size: 14px;\">&nbsp;</span><b style=\"color: rgb(197, 161, 47); font-weight: bold; font-size: 14px;\">kontrollera och ev. uppdatera era uppgifter</b><span class=\"Apple-converted-space\" style=\"color: rgb(197, 161, 47); font-weight: bold; font-size: 14px;\">&nbsp;</span><font color=\"#c5a12f\"><span style=\"font-size: 14px;\"><b>här:</b></span></font></font></p><p><font style=\"text-size-adjust: auto;\"><span class=\"Apple-converted-space\" style=\"\"><font color=\"#c5a12f\" face=\"Arial\"><b>[#register_edit_link]</b></font><br></span><br><br><b style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">Omröstningen startar den 2 september!</b><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><br><br><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Läs mer om tävlingen på</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><a href=\"http://www.designpriset.se/\" style=\"color: rgb(198, 162, 48); font-family: Arial; font-size: 13px;\">www.designpriset.se</a><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span></font><br></p>'),(13,'2020-03-04 14:52:16.934000','2020-03-26 14:15:44.140000','ENTRY_UPDATE','info@designpriset.se','Uppdatering av bidrag','<p><font style=\"text-size-adjust: auto; font-family: Arial; font-size: 40px; font-weight: bold; margin-bottom: 5px; color: rgb(198, 162, 48); line-height: 45px;\">Bidrag uppdaterade!<span class=\"Apple-converted-space\">&nbsp;</span><span class=\"Apple-converted-space\">&nbsp;</span></font><span style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto; background-color: rgb(245, 245, 243);\"></span><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto;\"></p><p><span style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">Dina bidrag har blivit uppdaterade!</span><br style=\"caret-color: rgb(0, 0, 0); font-family: Helvetica; font-size: 15px; text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Ändringar kan göras fram till 14 Juni. Klicka på länken för att ändra i bidragen eller lägga till ytterligare bidrag.</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px;\">&nbsp;</span></p><p><font style=\"text-size-adjust: auto;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">[#register_edit_link]</span></font><br><br></font></p><ul style=\"list-style: none; padding-left: 0px;\"><li>[#profile]</li><li><br></li><li>[#entries_list]<br></li></ul><p>[#register_add_link]<br></p><ul style=\"text-size-adjust: auto; list-style: none; padding: 0px;\"><font color=\"#959595\" face=\"Arial\"><span style=\"font-size: 13px;\">Läs mer om tävlingen på</span></font><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">&nbsp;</span><a href=\"http://www.designpriset.se/\" style=\"color: rgb(198, 162, 48); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">www.designpriset.se</a><span class=\"Apple-converted-space\" style=\"color: rgb(149, 149, 149); font-family: Arial; font-size: 13px; caret-color: rgb(0, 0, 0);\">&nbsp;</span></ul>'),(14,'2020-03-26 14:13:54.153000','2020-03-26 14:13:54.153000','ENTRY_UPDATE_ADMIN','no-reply@designpriset.se','Uppdatering av bidrag','<p>Följande bidrag har uppdaterats:</p><p>[#entries_list]<br></p><p><br></p>'),(15,'2020-03-26 18:03:33.267000','2020-03-26 18:03:33.267000','ENTRY_CONFIRM_ADMIN','info@designpriset.se','Anmälan Svenska Designpriset','<p>Ny anmälan Svenska Designpriset:</p><p><br></p><p>[#profile]</p><p>[#entries_list]<br></p>');
/*!40000 ALTER TABLE `mails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailvars`
--

DROP TABLE IF EXISTS `mailvars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailvars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailvars`
--

LOCK TABLES `mailvars` WRITE;
/*!40000 ALTER TABLE `mailvars` DISABLE KEYS */;
INSERT INTO `mailvars` VALUES (1,'Antal bidrag','[#amount_of_entries]'),(2,'Pris per bidrag','[#price_per_entry]'),(3,'Länk till redigeringssida','[#register_edit_link]'),(4,'Allmänna uppgifter','[#profile]'),(5,'Anmälda bidrag','[#entries_list]'),(6,'Lägg till fler bidrag','[#register_add_link]'),(7,'Bidragsnamn med kategori','[#entry_name_with_category]'),(8,'Datum för prisutdelning','[#award_date]'),(9,'Plats för prisutdelning','[#award_place]'),(10,'Länk för röstverifiering','[#vote_confirm_link]'),(11,'Bidragsnamn','[#entry_name]'),(12,'Företagsnamn','[#company_name]');
/*!40000 ALTER TABLE `mailvars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phases`
--

DROP TABLE IF EXISTS `phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `name` varchar(63) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polls`
--

DROP TABLE IF EXISTS `polls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start` datetime(6) NOT NULL,
  `stop` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polls`
--

LOCK TABLES `polls` WRITE;
/*!40000 ALTER TABLE `polls` DISABLE KEYS */;
INSERT INTO `polls` VALUES (1,'2020-09-01 13:15:48.737154','2020-09-01 13:15:48.737193','dw','2020-09-01 13:15:35.000000','2020-09-10 13:15:37.000000');
/*!40000 ALTER TABLE `polls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polls_categories`
--

DROP TABLE IF EXISTS `polls_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polls_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poll_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `polls_categories_poll_id_category_id_aefe1b0b_uniq` (`poll_id`,`category_id`),
  KEY `polls_categories_category_id_9476da67_fk_categories_id` (`category_id`),
  CONSTRAINT `polls_categories_category_id_9476da67_fk_categories_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `polls_categories_poll_id_9404d01b_fk_polls_id` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polls_categories`
--

LOCK TABLES `polls_categories` WRITE;
/*!40000 ALTER TABLE `polls_categories` DISABLE KEYS */;
INSERT INTO `polls_categories` VALUES (1,1,9),(2,1,11),(3,1,13),(4,1,15),(5,1,16),(6,1,17),(7,1,19),(8,1,20),(9,1,21),(10,1,22),(11,1,23),(12,1,24),(13,1,25),(14,1,26),(15,1,28),(16,1,29),(17,1,30),(18,1,32),(19,1,33),(20,1,35),(21,1,37),(22,1,38),(23,1,41),(24,1,42),(25,1,43),(26,1,44),(27,1,48),(28,1,49),(29,1,50),(30,1,51);
/*!40000 ALTER TABLE `polls_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `contact` varchar(511) DEFAULT NULL,
  `company` varchar(511) NOT NULL,
  `address` varchar(511) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `city` varchar(63) DEFAULT NULL,
  `phone` varchar(31) DEFAULT NULL,
  `mail` varchar(63) NOT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `invoice_paid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'2020-03-05 09:27:44.860000','2020-03-05 09:27:44.860000','1234-541-fkofeo-feko','Johan Hjalmarsson','Wopii Development AB','Kungsgatan 32','411 19','Gothenburg','0705574754','johan@wopii.com','http://www.wopii.com',0);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `mail` varchar(63) NOT NULL,
  `verified` datetime(6) DEFAULT NULL,
  `ip` varchar(25) DEFAULT NULL,
  `entry_id` int NOT NULL,
  `poll_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `votes_entry_id_811c6b17_fk_entries_id` (`entry_id`),
  KEY `votes_poll_id_8c662955_fk_polls_id` (`poll_id`),
  CONSTRAINT `votes_entry_id_811c6b17_fk_entries_id` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`),
  CONSTRAINT `votes_poll_id_8c662955_fk_polls_id` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yearconfig`
--

DROP TABLE IF EXISTS `yearconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yearconfig` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `year` varchar(4) DEFAULT NULL,
  `phase_1_start` datetime(6) DEFAULT NULL,
  `phase_2_start` datetime(6) DEFAULT NULL,
  `phase_3_start` datetime(6) DEFAULT NULL,
  `phase_4_start` datetime(6) DEFAULT NULL,
  `phase_5_start` datetime(6) DEFAULT NULL,
  `register_deadline_date` datetime(6) DEFAULT NULL,
  `nominees_can_edit_start` datetime(6) DEFAULT NULL,
  `nominees_can_edit_end` datetime(6) DEFAULT NULL,
  `delayed_deadline_end` datetime(6) DEFAULT NULL,
  `price` varchar(31) DEFAULT NULL,
  `award_place` varchar(255) DEFAULT NULL,
  `award_date` datetime(6) DEFAULT NULL,
  `winner_preview` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year` (`year`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yearconfig`
--

LOCK TABLES `yearconfig` WRITE;
/*!40000 ALTER TABLE `yearconfig` DISABLE KEYS */;
INSERT INTO `yearconfig` VALUES (1,'2020-03-05 08:59:58.681000','2020-03-05 09:00:37.899000','2020','2020-04-26 22:00:00.000000','2020-06-12 21:59:00.000000','2020-09-06 22:00:00.000000','2020-09-21 21:59:00.000000','2020-10-22 20:00:00.000000','2020-06-12 21:59:00.000000','2020-08-19 22:00:00.000000','2020-09-06 22:00:00.000000','2020-06-13 21:59:00.000000','4000','Berns, Stockholm','2020-10-22 16:00:00.000000','');
/*!40000 ALTER TABLE `yearconfig` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03 12:22:27
