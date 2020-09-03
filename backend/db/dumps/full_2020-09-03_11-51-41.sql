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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add Category',1,'add_category'),(2,'Can change Category',1,'change_category'),(3,'Can delete Category',1,'delete_category'),(4,'Can view Category',1,'view_category'),(5,'Can add Entry',2,'add_entry'),(6,'Can change Entry',2,'change_entry'),(7,'Can delete Entry',2,'delete_entry'),(8,'Can view Entry',2,'view_entry'),(9,'Can add Poll',3,'add_poll'),(10,'Can change Poll',3,'change_poll'),(11,'Can delete Poll',3,'delete_poll'),(12,'Can view Poll',3,'view_poll'),(13,'Can add Content',4,'add_content'),(14,'Can change Content',4,'change_content'),(15,'Can delete Content',4,'delete_content'),(16,'Can view Content',4,'view_content'),(17,'Can add Profile',5,'add_profile'),(18,'Can change Profile',5,'change_profile'),(19,'Can delete Profile',5,'delete_profile'),(20,'Can view Profile',5,'view_profile'),(21,'Can add Vote',6,'add_vote'),(22,'Can change Vote',6,'change_vote'),(23,'Can delete Vote',6,'delete_vote'),(24,'Can view Vote',6,'view_vote'),(25,'Can add log entry',7,'add_logentry'),(26,'Can change log entry',7,'change_logentry'),(27,'Can delete log entry',7,'delete_logentry'),(28,'Can view log entry',7,'view_logentry'),(29,'Can add permission',8,'add_permission'),(30,'Can change permission',8,'change_permission'),(31,'Can delete permission',8,'delete_permission'),(32,'Can view permission',8,'view_permission'),(33,'Can add group',9,'add_group'),(34,'Can change group',9,'change_group'),(35,'Can delete group',9,'delete_group'),(36,'Can view group',9,'view_group'),(37,'Can add user',10,'add_user'),(38,'Can change user',10,'change_user'),(39,'Can delete user',10,'delete_user'),(40,'Can view user',10,'view_user'),(41,'Can add content type',11,'add_contenttype'),(42,'Can change content type',11,'change_contenttype'),(43,'Can delete content type',11,'delete_contenttype'),(44,'Can view content type',11,'view_contenttype'),(45,'Can add session',12,'add_session'),(46,'Can change session',12,'change_session'),(47,'Can delete session',12,'delete_session'),(48,'Can view session',12,'view_session'),(49,'Can add Phase',13,'add_phase'),(50,'Can change Phase',13,'change_phase'),(51,'Can delete Phase',13,'delete_phase'),(52,'Can view Phase',13,'view_phase'),(53,'Can add year config',14,'add_yearconfig'),(54,'Can change year config',14,'change_yearconfig'),(55,'Can delete year config',14,'delete_yearconfig'),(56,'Can view year config',14,'view_yearconfig'),(57,'Can add Mail',15,'add_mail'),(58,'Can change Mail',15,'change_mail'),(59,'Can delete Mail',15,'delete_mail'),(60,'Can view Mail',15,'view_mail'),(61,'Can add MailVar',16,'add_mailvar'),(62,'Can change MailVar',16,'change_mailvar'),(63,'Can delete MailVar',16,'delete_mailvar'),(64,'Can view MailVar',16,'view_mailvar'),(65,'Can add ContentPhase',17,'add_contentphase'),(66,'Can change ContentPhase',17,'change_contentphase'),(67,'Can delete ContentPhase',17,'delete_contentphase'),(68,'Can view ContentPhase',17,'view_contentphase'),(69,'Can add Content template',18,'add_contenttemplate'),(70,'Can change Content template',18,'change_contenttemplate'),(71,'Can delete Content template',18,'delete_contenttemplate'),(72,'Can view Content template',18,'view_contenttemplate'),(73,'Can add attachment',19,'add_attachment'),(74,'Can change attachment',19,'change_attachment'),(75,'Can delete attachment',19,'delete_attachment'),(76,'Can view attachment',19,'view_attachment'),(77,'Can add entry images',20,'add_entryimages'),(78,'Can change entry images',20,'change_entryimages'),(79,'Can delete entry images',20,'delete_entryimages'),(80,'Can view entry images',20,'view_entryimages'),(81,'Can add Entry image',20,'add_entryimage'),(82,'Can change Entry image',20,'change_entryimage'),(83,'Can delete Entry image',20,'delete_entryimage'),(84,'Can view Entry image',20,'view_entryimage');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$H3Kqpw1eDyYX$PPDXLe9QY96Sp4OJS85yhAo/lMHYIcR06zOQveeSJAQ=','2020-08-10 12:01:24.299593',1,'root','','','',1,1,'2019-11-19 14:30:40.258427'),(2,'pbkdf2_sha256$180000$YvKYD0M8UlOW$crEfBsEkvO2tJ0qeQhh6GS5ShdsVGPIIuetuoR+yoj8=','2020-08-28 08:51:01.184823',1,'hjalmar','','','',1,1,'2020-02-05 13:31:24.514574');
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
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'2020-02-14 11:02:48.233516','2020-02-14 11:02:48.233565','Testkategori','Tstar','123',1,'digital',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'2020-02-10 12:49:23.967075','2020-06-22 13:00:30.593141','test','<p>adsf</p>','content_images/test.jpg',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_phases`
--

LOCK TABLES `content_phases` WRITE;
/*!40000 ALTER TABLE `content_phases` DISABLE KEYS */;
INSERT INTO `content_phases` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_template`
--

LOCK TABLES `content_template` WRITE;
/*!40000 ALTER TABLE `content_template` DISABLE KEYS */;
INSERT INTO `content_template` VALUES (1,'standard','Sidor som visas i menyn'),(2,'start_innehåll','Information och innehåll som ska visas överst på startsidan'),(3,'start_calendar','Information om årets olika datum'),(4,'register_info','Den information som ska visas överst på anmälningssidan');
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
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2019-11-19 15:36:13.888312','1','Wopii',1,'[{\"added\": {}}]',5,1),(2,'2019-11-19 15:36:37.628993','1','Testkategori',1,'[{\"added\": {}}]',1,1),(3,'2019-11-19 15:37:13.730077','1','Test entry',1,'[{\"added\": {}}]',2,1),(4,'2019-11-21 12:54:29.623307','1','Test entry',2,'[{\"changed\": {\"fields\": [\"source\"]}}]',2,1),(5,'2019-11-21 12:59:46.817210','1','Test entry',2,'[{\"changed\": {\"fields\": [\"avatar\"]}}]',2,1),(6,'2019-11-22 11:20:18.608189','1','Fas 1 2019',1,'[{\"added\": {}}]',13,1),(7,'2019-11-22 12:36:02.897098','2','Fas 1 2019',1,'[{\"added\": {}}]',13,1),(8,'2019-11-22 12:56:21.346875','3','Oktober fas',1,'[{\"added\": {}}]',13,1),(9,'2019-11-22 12:56:43.346386','4','idag 2',1,'[{\"added\": {}}]',13,1),(10,'2019-11-22 12:56:53.968106','5','Ikväll',1,'[{\"added\": {}}]',13,1),(11,'2019-11-22 12:57:48.643844','6','idag 3',1,'[{\"added\": {}}]',13,1),(12,'2019-11-22 13:30:36.741185','2','2020',1,'[{\"added\": {}}]',14,1),(13,'2019-11-22 13:44:05.226026','2','2020',2,'[{\"added\": {\"name\": \"yearconfig-phase relation\", \"object\": \"YearConfig_phases object (1)\"}}, {\"added\": {\"name\": \"yearconfig-phase relation\", \"object\": \"YearConfig_phases object (2)\"}}, {\"added\": {\"name\": \"yearconfig-phase relation\", \"object\": \"YearConfig_phases object (3)\"}}]',14,1),(14,'2020-02-05 14:39:08.033593','1','def',1,'[{\"added\": {}}]',17,2),(15,'2020-02-05 14:39:16.044150','2','1',1,'[{\"added\": {}}]',17,2),(16,'2020-02-10 12:49:00.047288','1','def',1,'[{\"added\": {}}]',17,2),(17,'2020-02-10 12:49:22.247535','1','def',1,'[{\"added\": {}}]',18,2),(18,'2020-02-10 12:49:23.972817','1','test',1,'[{\"added\": {}}]',4,2),(19,'2020-02-10 12:55:20.342868','1','2020',1,'[{\"added\": {}}]',14,2),(20,'2020-02-10 12:56:36.591236','2','1',1,'[{\"added\": {}}]',17,2),(21,'2020-02-10 12:56:39.643457','1','test',2,'[{\"changed\": {\"fields\": [\"Phase\"]}}]',4,2),(22,'2020-02-10 12:57:45.903265','1','test',2,'[]',4,2),(23,'2020-02-14 10:23:00.287373','1','test',2,'[{\"changed\": {\"fields\": [\"Image\"]}}]',4,1),(24,'2020-02-14 11:02:48.234654','1','Testkategori',1,'[{\"added\": {}}]',1,1),(25,'2020-02-24 10:12:49.503424','3','bidrag3',2,'[{\"changed\": {\"fields\": [\"Winner Gold\"]}}]',2,1),(26,'2020-03-03 15:15:57.119065','1','Test omröstning',1,'[{\"added\": {}}]',3,1),(27,'2020-03-03 15:20:08.591838','1','h@wopii.se - bidrag',1,'[{\"added\": {}}]',6,1),(28,'2020-03-04 12:50:28.645234','1','Testing',2,'[{\"changed\": {\"fields\": [\"E-mail\", \"Homepage\"]}}]',5,1),(29,'2020-03-16 13:57:52.939972','2','EntryImage object (2)',1,'[{\"added\": {}}]',20,1),(30,'2020-03-16 13:58:00.935795','1','EntryImage object (1)',3,'',20,1),(31,'2020-03-18 15:16:38.019754','3','bidrag3',2,'[{\"added\": {\"name\": \"Entry image\", \"object\": \"74\"}}, {\"added\": {\"name\": \"Entry image\", \"object\": \"75\"}}]',2,1),(32,'2020-06-22 11:54:16.664851','3','bidrag3',2,'[{\"changed\": {\"fields\": [\"Winner Gold\", \"Nominated\"]}}]',2,2),(33,'2020-06-22 11:56:18.002560','1','Test omröstning',2,'[{\"changed\": {\"fields\": [\"Stop\"]}}]',3,2),(34,'2020-06-22 12:04:19.026987','1','Vote confirmation',1,'[{\"added\": {}}]',15,2),(35,'2020-06-22 12:04:46.308456','2','hjalmar@wopii.com - bidrag3',3,'',6,2),(36,'2020-06-22 13:00:30.599645','1','test',2,'[{\"changed\": {\"fields\": [\"Phase\"]}}]',4,2),(37,'2020-06-22 13:02:05.781422','250','test_entry',2,'[{\"changed\": {\"fields\": [\"Webpage\", \"Winner Gold\"]}}]',2,2),(38,'2020-06-25 13:37:39.767982','266','test_entry',2,'[{\"changed\": {\"fields\": [\"Webpage\"]}}]',2,2),(39,'2020-06-25 13:38:03.340130','266','test_entry',2,'[]',2,2),(40,'2020-06-25 13:38:24.879530','266','test_entry',2,'[]',2,2),(41,'2020-06-25 13:55:29.080357','266','test_entry',2,'[]',2,2),(42,'2020-06-25 14:07:18.887111','266','test_entry',2,'[]',2,2),(43,'2020-06-26 07:48:22.667640','266','test_entry',2,'[]',2,2),(44,'2020-06-26 07:48:47.228560','266','test_entry',2,'[]',2,2),(45,'2020-06-26 07:50:01.714413','266','test_entry',2,'[]',2,2),(46,'2020-06-26 07:52:47.124803','266','test_entry',2,'[]',2,2),(47,'2020-06-26 07:53:14.101635','266','test_entry',2,'[]',2,2),(48,'2020-06-26 08:19:58.291842','266','test_entry',2,'[]',2,2),(49,'2020-08-10 12:01:43.217959','1','Test omröstning',2,'[{\"changed\": {\"fields\": [\"Stop\"]}}]',3,1);
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
INSERT INTO `django_content_type` VALUES (7,'admin','logentry'),(9,'auth','group'),(8,'auth','permission'),(10,'auth','user'),(11,'contenttypes','contenttype'),(1,'despri_admin','category'),(4,'despri_admin','content'),(17,'despri_admin','contentphase'),(18,'despri_admin','contenttemplate'),(2,'despri_admin','entry'),(20,'despri_admin','entryimage'),(15,'despri_admin','mail'),(16,'despri_admin','mailvar'),(13,'despri_admin','phase'),(3,'despri_admin','poll'),(5,'despri_admin','profile'),(6,'despri_admin','vote'),(14,'despri_admin','yearconfig'),(19,'django_summernote','attachment'),(12,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-11-19 14:30:13.180372'),(2,'auth','0001_initial','2019-11-19 14:30:13.299336'),(3,'admin','0001_initial','2019-11-19 14:30:13.749473'),(4,'admin','0002_logentry_remove_auto_add','2019-11-19 14:30:13.821117'),(5,'admin','0003_logentry_add_action_flag_choices','2019-11-19 14:30:13.832721'),(6,'contenttypes','0002_remove_content_type_name','2019-11-19 14:30:13.911412'),(7,'auth','0002_alter_permission_name_max_length','2019-11-19 14:30:13.954693'),(8,'auth','0003_alter_user_email_max_length','2019-11-19 14:30:13.983790'),(9,'auth','0004_alter_user_username_opts','2019-11-19 14:30:13.997620'),(10,'auth','0005_alter_user_last_login_null','2019-11-19 14:30:14.049771'),(11,'auth','0006_require_contenttypes_0002','2019-11-19 14:30:14.053588'),(12,'auth','0007_alter_validators_add_error_messages','2019-11-19 14:30:14.066184'),(13,'auth','0008_alter_user_username_max_length','2019-11-19 14:30:14.133061'),(14,'auth','0009_alter_user_last_name_max_length','2019-11-19 14:30:14.190855'),(15,'auth','0010_alter_group_name_max_length','2019-11-19 14:30:14.218491'),(16,'auth','0011_update_proxy_permissions','2019-11-19 14:30:14.232940'),(18,'despri_admin','0002_auto_20191119_1027','2019-11-19 14:30:14.318753'),(19,'despri_admin','0003_auto_20191119_1029','2019-11-19 14:30:14.348743'),(20,'despri_admin','0004_auto_20191119_0615','2019-11-19 14:30:14.418329'),(21,'despri_admin','0005_poll','2019-11-19 14:30:14.496015'),(22,'despri_admin','0006_auto_20191119_1348','2019-11-19 14:30:14.668520'),(23,'despri_admin','0007_auto_20191119_1349','2019-11-19 14:30:14.722723'),(24,'despri_admin','0008_auto_20191119_1353','2019-11-19 14:30:14.731506'),(25,'despri_admin','0009_auto_20191119_1420','2019-11-19 14:30:14.827673'),(26,'despri_admin','0010_auto_20191119_1428','2019-11-19 14:30:14.986050'),(27,'despri_admin','0011_auto_20191119_1436','2019-11-19 14:30:15.095371'),(28,'sessions','0001_initial','2019-11-19 14:30:15.155093'),(29,'despri_admin','0012_auto_20191119_1532','2019-11-19 14:33:06.825674'),(30,'despri_admin','0013_auto_20191121_1353','2019-11-21 12:53:16.395492'),(31,'despri_admin','0014_auto_20191122_1218','2019-11-22 11:18:55.569220'),(32,'despri_admin','0015_auto_20191122_1334','2019-11-22 12:34:57.534476'),(33,'despri_admin','0016_auto_20191122_1414','2019-11-22 13:16:18.488444'),(34,'despri_admin','0017_auto_20191122_1416','2019-11-22 13:16:18.513850'),(35,'despri_admin','0018_auto_20191122_1420','2019-11-22 13:21:10.019746'),(36,'despri_admin','0019_yearconfig_phases','2019-11-22 13:32:47.739586'),(37,'despri_admin','0020_auto_20191122_1526','2019-11-22 14:26:49.003262'),(38,'despri_admin','0002_category_shorttag','2020-02-05 13:31:42.106075'),(39,'despri_admin','0003_auto_20191205_1212','2020-02-05 13:31:42.132129'),(40,'despri_admin','0004_auto_20191205_1416','2020-02-05 13:31:43.039371'),(41,'despri_admin','0005_auto_20191205_1416','2020-02-05 13:31:43.231614'),(43,'despri_admin','0001_initial','2020-02-10 12:46:26.518658'),(44,'django_summernote','0001_initial','2020-02-20 10:32:12.521557'),(45,'django_summernote','0002_update-help_text','2020-02-20 10:32:12.528030'),(46,'despri_admin','0002_category_active','2020-02-20 12:34:58.239290'),(47,'despri_admin','0003_auto_20200220_1408','2020-02-20 13:19:19.561270'),(48,'despri_admin','0002_auto_20200316_1334','2020-03-16 12:35:03.656806'),(49,'despri_admin','0003_auto_20200316_1337','2020-03-16 12:37:16.622616'),(50,'despri_admin','0004_auto_20200316_1510','2020-03-16 14:10:37.380497'),(51,'despri_admin','0002_category_type','2020-03-19 12:42:20.355914'),(52,'despri_admin','0003_entry_video_url','2020-03-19 13:15:58.979691'),(53,'despri_admin','0004_entry_description','2020-03-31 12:17:51.571447'),(54,'despri_admin','0005_auto_20200330_0718','2020-03-31 12:17:51.581199'),(55,'despri_admin','0006_category_order','2020-06-22 11:53:07.101138');
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
INSERT INTO `django_session` VALUES ('0q0l2abtm4bpo8p9unmezw1hstqerhp8','MGFkOTU2N2NkN2NhYzE5MmU5NGRiZmQ0MTNiZTEwNzRjZDI5OGUwOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzOTQxZGY4ZmUzMjM2Nzc3N2RhMTdjOTI2NDNiMmRkZDZkZTJjYTY2In0=','2020-03-30 12:25:53.381025'),('38kjlq5cflapnspg5fzwwi1qvwpnxefc','MGFkOTU2N2NkN2NhYzE5MmU5NGRiZmQ0MTNiZTEwNzRjZDI5OGUwOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzOTQxZGY4ZmUzMjM2Nzc3N2RhMTdjOTI2NDNiMmRkZDZkZTJjYTY2In0=','2020-03-05 12:42:40.126224'),('463yidljuf2ut58wf8j3h0lmq172no9n','MDRjNjkwZGIxMDg0NzhmZTcxY2EyMGQ2ZDgzMzUxOWQwZTk3MTM4Yzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlODlkMTFkY2JkOTIyYzQxOGMxZjY5YTVhY2VmYjkzNmRhOGQ3MjVjIn0=','2020-07-06 11:52:36.572637'),('8jes5bzyveu9qtyhpzklulru5ooq0q5o','MGFkOTU2N2NkN2NhYzE5MmU5NGRiZmQ0MTNiZTEwNzRjZDI5OGUwOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzOTQxZGY4ZmUzMjM2Nzc3N2RhMTdjOTI2NDNiMmRkZDZkZTJjYTY2In0=','2020-02-28 09:05:30.089121'),('t4obrlb9dpdbbtqabd7ql23l0hy39uv3','NTAxMzQ2NDZiMjgxMzY2MjdjYTM4MTEwNTVkM2U4MDkzNTYwZjM3Nzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjZjE1YmQyZDM4OGQyYzA4YTBhYWYxOTkxNDEzNWU3ZWEzODYxNTgyIn0=','2019-12-03 14:30:49.267101'),('w3wo729qbbs9bwq2i4k3qgycsjdikl5k','MDRjNjkwZGIxMDg0NzhmZTcxY2EyMGQ2ZDgzMzUxOWQwZTk3MTM4Yzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlODlkMTFkY2JkOTIyYzQxOGMxZjY5YTVhY2VmYjkzNmRhOGQ3MjVjIn0=','2020-09-11 08:51:01.187911'),('wy4ugywiq3sl3vb9w4fcrhg8k556p9mq','MDRjNjkwZGIxMDg0NzhmZTcxY2EyMGQ2ZDgzMzUxOWQwZTk3MTM4Yzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJlODlkMTFkY2JkOTIyYzQxOGMxZjY5YTVhY2VmYjkzNmRhOGQ3MjVjIn0=','2020-02-19 13:34:51.609661'),('y4gzjxisi00ayj15ymtrmto8xc4svqye','MGFkOTU2N2NkN2NhYzE5MmU5NGRiZmQ0MTNiZTEwNzRjZDI5OGUwOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzOTQxZGY4ZmUzMjM2Nzc3N2RhMTdjOTI2NDNiMmRkZDZkZTJjYTY2In0=','2020-08-24 12:01:24.302624');
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
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (1,'2020-02-14 14:21:17.000000','2020-02-14 14:21:17.000000','1d7006c1691915ec61b710efd2ede80c','bidrag','om_mmm_2.pdf','testare','testare','testare','testare','avatar-x405wf7yk6m6szae.png',NULL,NULL,'wopii.com',0,0,0,NULL,'','2020',1,1,NULL,NULL),(2,'2020-02-14 15:43:07.000000','2020-02-14 15:43:07.000000','931ff24dea128ea0d4e444307e8cbef8','bidrag2','sources/202001-johan-underlag.pdf','test','test','test','wopii','avatars/avatar-x405wf82rk6ma77jz.png',NULL,NULL,NULL,0,0,0,NULL,'','2020',1,2,NULL,NULL),(3,'2020-02-14 15:53:18.000000','2020-06-22 11:54:16.662743','66fc9a533568f5db9da914d129579fe3','bidrag3','sources/201910-johan.pdf','test','test','test','tst','avatars/avatar-x405wf83nk6mak0rv.png',NULL,NULL,NULL,0,0,1,NULL,'','2020',1,3,NULL,NULL),(66,'2020-03-18 11:36:33.000000','2020-03-18 11:36:33.000000',NULL,'test_entry_2','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-03-18','test motivation','2020',1,1,NULL,NULL),(73,'2020-03-18 11:59:05.000000','2020-03-18 11:59:05.000000',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-03-18','test motivation','2020',1,1,NULL,NULL),(231,'2020-03-31 14:19:27.000000','2020-03-31 14:19:27.000000',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-03-31','test motivation','2020',1,1,NULL,NULL),(238,'2020-03-31 14:27:36.000000','2020-03-31 14:27:36.000000',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-03-31','test motivation','2020',1,1,NULL,NULL),(242,'2020-03-31 14:28:43.000000','2020-03-31 14:28:43.000000',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-03-31','test motivation','2020',1,1,NULL,NULL),(250,'2020-03-31 14:46:59.000000','2020-06-22 13:02:05.778832',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','http://wopii.com',1,0,0,'2020-03-31','test motivation','2020',1,1,NULL,NULL),(262,'2020-06-22 14:02:22.000000','2020-06-22 14:02:22.000000',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','test webpage',0,0,0,'2020-06-22','test motivation','2020',1,1,NULL,NULL),(266,'2020-06-22 15:12:53.000000','2020-06-26 08:19:58.290128',NULL,'test_entry','sources/test_source','test designer','test illustrator','test leader','test customer','avatars/test_avatar','test format','test size','http://wopii.com',0,0,0,'2020-06-22','test motivation','2020',1,1,NULL,NULL);
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
  `entry_id` int NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `despri_admin_entryimages_entry_id_e44ac0da_fk_entries_id` (`entry_id`),
  CONSTRAINT `despri_admin_entryimages_entry_id_e44ac0da_fk_entries_id` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=490 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_images`
--

LOCK TABLES `entry_images` WRITE;
/*!40000 ALTER TABLE `entry_images` DISABLE KEYS */;
INSERT INTO `entry_images` VALUES (74,'2020-03-18 15:16:38.017399','2020-03-18 15:16:38.017418','avatars/kastrull.png',3,0),(75,'2020-03-18 15:16:38.018325','2020-03-18 15:16:38.018350','avatars/tallrik.png',3,0),(409,'2020-03-31 14:19:27.000000','2020-03-31 14:19:27.000000','avatars/extra-x405wf8102k7x74scm.jpg',231,0),(410,'2020-03-31 14:19:27.000000','2020-03-31 14:19:27.000000','avatars/extra-x405wf8102k7x74scr.jpg',231,0),(424,'2020-03-31 14:27:36.000000','2020-03-31 14:27:36.000000','avatars/extra-x405wf8102k7x74scm.jpg',238,0),(425,'2020-03-31 14:27:36.000000','2020-03-31 14:27:36.000000','avatars/extra-x405wf8102k7x74scr.jpg',238,0),(432,'2020-03-31 14:28:43.000000','2020-03-31 14:28:43.000000','avatars/extra-x405wf8102k7x74scm.jpg',242,0),(433,'2020-03-31 14:28:43.000000','2020-03-31 14:28:43.000000','avatars/extra-x405wf8102k7x74scr.jpg',242,0),(448,'2020-03-31 14:46:59.000000','2020-03-31 14:46:59.000000','avatars/extra-x405wf8102k7x74scm.jpg',250,0),(449,'2020-03-31 14:46:59.000000','2020-03-31 14:46:59.000000','avatars/extra-x405wf8102k7x74scr.jpg',250,0),(472,'2020-06-22 14:02:22.000000','2020-06-22 14:02:22.000000','avatars/extra-x405wf8102k7x74scm.jpg',262,0),(473,'2020-06-22 14:02:22.000000','2020-06-22 14:02:22.000000','avatars/extra-x405wf8102k7x74scr.jpg',262,0),(480,'2020-06-22 15:12:53.000000','2020-06-22 15:12:53.000000','avatars/extra-x405wf8102k7x74scm.jpg',266,0),(481,'2020-06-22 15:12:53.000000','2020-06-22 15:12:53.000000','avatars/extra-x405wf8102k7x74scr.jpg',266,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mails`
--

LOCK TABLES `mails` WRITE;
/*!40000 ALTER TABLE `mails` DISABLE KEYS */;
INSERT INTO `mails` VALUES (1,'2020-06-22 12:04:19.025183','2020-06-22 12:04:19.025239','VOTE_CONFIRM','Test','Röstverifiering - test','[#vote_confirm_link]');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailvars`
--

LOCK TABLES `mailvars` WRITE;
/*!40000 ALTER TABLE `mailvars` DISABLE KEYS */;
INSERT INTO `mailvars` VALUES (1,'Antal bidrag','amount_of_entries'),(2,'Pris per bidrag','price_per_entry'),(3,'Länk till redigeringssida','register_edit_link'),(4,'Allmänna uppgifter','profile'),(5,'Anmälda bidrag','entries_list'),(6,'Lägg till fler bidrag','register_add_link'),(7,'Bidragsnamn med kategori','entry_name_with_category'),(8,'Datum för prisutdelning','award_date'),(9,'Plats för prisutdelning','award_place'),(10,'Länk för röstverifiering','vote_confirm_link');
/*!40000 ALTER TABLE `mailvars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `old_winner_entries`
--

DROP TABLE IF EXISTS `old_winner_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `old_winner_entries` (
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
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entries_profile_id_7d89e707_fk_profiles_id` (`profile_id`),
  KEY `entries_category_id_af1fa84d_fk_categories_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_winner_entries`
--

LOCK TABLES `old_winner_entries` WRITE;
/*!40000 ALTER TABLE `old_winner_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `old_winner_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `old_winner_profiles`
--

DROP TABLE IF EXISTS `old_winner_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `old_winner_profiles` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `old_winner_profiles`
--

LOCK TABLES `old_winner_profiles` WRITE;
/*!40000 ALTER TABLE `old_winner_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `old_winner_profiles` ENABLE KEYS */;
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
INSERT INTO `polls` VALUES (1,'2020-03-03 15:15:57.114791','2020-08-10 12:01:43.215805','Test omröstning','2020-02-01 15:15:40.000000','2020-08-31 14:15:50.000000');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polls_categories`
--

LOCK TABLES `polls_categories` WRITE;
/*!40000 ALTER TABLE `polls_categories` DISABLE KEYS */;
INSERT INTO `polls_categories` VALUES (1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'2020-02-14 14:21:17.000000','2020-03-04 12:50:28.643934','1d7006c1691915ec61b710efd2ede80c','Test','Testing','testgatan','123456','Teststad','123456','hjalmar@wopii.com','http://wopii.com',0),(2,'2020-02-14 15:43:06.000000','2020-02-14 15:43:06.000000','931ff24dea128ea0d4e444307e8cbef8','test','test2','testg','123456','testort','1234567','hjalmar@wopii.com','wopii.com',0),(3,'2020-02-14 15:53:18.000000','2020-02-14 15:53:18.000000','66fc9a533568f5db9da914d129579fe3','wopii','wopii','asdf','123423','asdf','12341234','hjalmar@wopii.com','a.b.c',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,'2020-03-03 15:20:08.589907','2020-03-03 15:20:08.589968','123','h@wopii.se',NULL,'127.0.0.1',1,1),(3,'2020-06-22 13:05:18.000000','2020-06-22 13:05:18.000000','bc49ccf9893bf4e273b0dfdc000024aa','hjalmar@wopii.com','2020-06-22 13:10:21.000000','1234.1234.1234',3,1),(4,'2020-06-24 13:36:06.000000','2020-06-24 13:36:06.000000','1266186c709c7b7d6469f6cd1fe0bdc1','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(5,'2020-06-24 13:36:26.000000','2020-06-24 13:36:26.000000','a32b51f4e1b7b32537b0552d9a30dc8f','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(6,'2020-06-24 13:37:47.000000','2020-06-24 13:37:47.000000','3c891124431b4f5d4cd5f884b95177f5','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(7,'2020-06-24 13:39:38.000000','2020-06-24 13:39:38.000000','196a1e09ad3fc197f8af32d90e23dd53','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(8,'2020-06-24 13:43:37.000000','2020-06-24 13:43:37.000000','8f2bd7e9b1b3fc32a0ab9179ce4c5f0f','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(9,'2020-06-24 13:45:15.000000','2020-06-24 13:45:15.000000','8da5ea23168be87aa54ce2787809a6e7','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(10,'2020-06-24 13:47:06.000000','2020-06-24 13:47:06.000000','24e66f4c37a0a30616f0feda9b80bcc0','hjalmar@wopii.com',NULL,'1234.1234.1234',3,1),(11,'2020-06-24 13:58:00.000000','2020-06-24 13:58:00.000000','d754107427dc8a31fd3a1dcb9f43a435','hjalmarlindskog@gmail.com',NULL,'1234.1234.1234',3,1);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `winner_view`
--

DROP TABLE IF EXISTS `winner_view`;
/*!50001 DROP VIEW IF EXISTS `winner_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `winner_view` AS SELECT 
 1 AS `id`,
 1 AS `entry_name`,
 1 AS `source`,
 1 AS `designer`,
 1 AS `illustrator`,
 1 AS `leader`,
 1 AS `customer`,
 1 AS `avatar`,
 1 AS `format`,
 1 AS `size`,
 1 AS `webpage`,
 1 AS `video_url`,
 1 AS `is_winner_gold`,
 1 AS `is_winner_silver`,
 1 AS `motivation`,
 1 AS `year`,
 1 AS `category_name`,
 1 AS `category_type`,
 1 AS `company`,
 1 AS `homepage`*/;
SET character_set_client = @saved_cs_client;

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
  `year` varchar(4) NOT NULL,
  `phase_1_start` datetime(6) DEFAULT NULL,
  `phase_2_start` datetime(6) DEFAULT NULL,
  `phase_3_start` datetime(6) DEFAULT NULL,
  `phase_4_start` datetime(6) DEFAULT NULL,
  `phase_5_start` datetime(6) DEFAULT NULL,
  `register_deadline_date` datetime(6) DEFAULT NULL,
  `nominees_can_edit_start` datetime(6) DEFAULT NULL,
  `nominees_can_edit_end` datetime(6) DEFAULT NULL,
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
INSERT INTO `yearconfig` VALUES (1,'2020-02-10 12:55:20.340837','2020-02-10 12:55:20.340867','2020','2020-01-01 12:53:52.000000','2020-02-13 12:54:02.000000','2020-06-10 11:54:10.000000','2020-08-13 11:54:18.000000','2020-10-08 11:54:27.000000','2020-04-16 11:54:36.000000','2020-07-10 11:54:43.000000','2020-08-13 11:54:56.000000','23','Gbg','2020-11-21 12:55:14.000000','');
/*!40000 ALTER TABLE `yearconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `winner_view`
--

/*!50001 DROP VIEW IF EXISTS `winner_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`wopii`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `winner_view` AS select `e`.`id` AS `id`,`e`.`entry_name` AS `entry_name`,`e`.`source` AS `source`,`e`.`designer` AS `designer`,`e`.`illustrator` AS `illustrator`,`e`.`leader` AS `leader`,`e`.`customer` AS `customer`,`e`.`avatar` AS `avatar`,`e`.`format` AS `format`,`e`.`size` AS `size`,`e`.`webpage` AS `webpage`,`e`.`video_url` AS `video_url`,`e`.`is_winner_gold` AS `is_winner_gold`,`e`.`is_winner_silver` AS `is_winner_silver`,`e`.`motivation` AS `motivation`,`e`.`year` AS `year`,`c`.`name` AS `category_name`,`c`.`type` AS `category_type`,`p`.`company` AS `company`,`p`.`homepage` AS `homepage` from ((`entries` `e` join `categories` `c` on((`c`.`id` = `e`.`category_id`))) join `profiles` `p` on((`p`.`id` = `e`.`profile_id`))) union all select (-(1) * `e`.`id`) AS `id`,`e`.`entry_name` AS `entry_name`,`e`.`source` AS `source`,`e`.`designer` AS `designer`,`e`.`illustrator` AS `illustrator`,`e`.`leader` AS `leader`,`e`.`customer` AS `customer`,`e`.`avatar` AS `avatar`,`e`.`format` AS `format`,`e`.`size` AS `size`,`e`.`webpage` AS `webpage`,NULL AS `video_url`,`e`.`is_winner_gold` AS `is_winner_gold`,`e`.`is_winner_silver` AS `is_winner_silver`,`e`.`motivation` AS `motivation`,`e`.`year` AS `year`,`c`.`name` AS `category_name`,`c`.`type` AS `category_type`,`p`.`company` AS `company`,`p`.`homepage` AS `homepage` from ((`old_winner_entries` `e` join `categories` `c` on((`c`.`shorttag` = `e`.`category`))) join `old_winner_profiles` `p` on((`p`.`id` = `e`.`profile_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03  9:51:42
