-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: yf_integration
-- ------------------------------------------------------
-- Server version	5.7.24-log

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
-- Table structure for table `app_campaccess`
--

DROP TABLE IF EXISTS `app_campaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_campaccess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `camp` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_campaccess`
--

LOCK TABLES `app_campaccess` WRITE;
/*!40000 ALTER TABLE `app_campaccess` DISABLE KEYS */;
INSERT INTO `app_campaccess` VALUES (1,'nate@test.com','12578'),(2,'nate@test.com','12263'),(3,'nate@test.com','12569'),(4,'nate2@test.com','12355'),(5,'nate2@test.com','12263'),(6,'nate2@test.com','12674'),(7,'nate3@test.com','12578'),(8,'nate3@test.com','12263'),(9,'nate3@test.com','12569'),(10,'nate3@test.com','12322'),(11,'nate3@test.com','12348'),(12,'nate3@test.com','12556'),(13,'conner.madigan@yellowfin.bi','12578'),(14,'conner.madigan@yellowfin.bi','12355'),(15,'conner.madigan@yellowfin.bi','12263'),(16,'conner.madigan@yellowfin.bi','12674'),(17,'conner.madigan@yellowfin.bi','12569'),(18,'conner.madigan@yellowfin.bi','12322'),(19,'conner.madigan@yellowfin.bi','12348'),(20,'conner.madigan@yellowfin.bi','12474'),(21,'conner.madigan@yellowfin.bi','12556'),(22,'conner.madigan@yellowfin.bi','12693'),(23,'conner.madigan@yellowfin.bi','12387'),(24,'conner.madigan@yellowfin.bi','12539'),(25,'my@email.com','12578'),(26,'my@email.com','12674'),(27,'my@email.com','12569'),(28,'my@email.com','12322'),(29,'my@email.com','12348'),(30,'my@email.com','12474'),(31,'emma.urli@yellowfin.bi','12578'),(32,'emma.urli@yellowfin.bi','12355'),(33,'emma.urli@yellowfin.bi','12263'),(34,'emma.urli@yellowfin.bi','12674'),(35,'emma.urli@yellowfin.bi','12569'),(36,'emma.urli@yellowfin.bi','12322'),(37,'emma.urli@yellowfin.bi','12348'),(38,'emma.urli@yellowfin.bi','12474'),(39,'mike@test.com','12355'),(40,'mike@test.com','12674'),(41,'mike@test.com','12569'),(42,'mike@test.com','12348'),(43,'mike@test.com','12556'),(44,'nate4@test.com','12569'),(45,'nate4@test.com','12322'),(46,'nate4@test.com','12556'),(47,'nate4@test.com','12387'),(48,'nate4@test.com','12539'),(49,'rob.aldridge@yellowfin.bi','12578'),(50,'rob.aldridge@yellowfin.bi','12355'),(51,'rob.aldridge@yellowfin.bi','12263'),(52,'rob.aldridge@yellowfin.bi','12674'),(53,'rob.aldridge@yellowfin.bi','12569'),(54,'rob.aldridge@yellowfin.bi','12322'),(55,'rob.aldridge@yellowfin.bi','12348'),(56,'rob.aldridge@yellowfin.bi','12474'),(57,'test7@test.com','12578'),(58,'test7@test.com','12355'),(59,'test7@test.com','12263'),(60,'test7@test.com','12674'),(61,'test7@test.com','12322'),(62,'test7@test.com','12348'),(63,'justin@test.com','12578'),(64,'justin@test.com','12355'),(65,'justin@test.com','12322'),(66,'justin@test.com','12474'),(67,'justin@test.com','12693'),(68,'foo@bar.com','12578'),(69,'foo@bar.com','12355'),(70,'scot@provetto.com','12569'),(71,'scot@provetto.com','12322'),(72,'beth.plale@gmail.com','12578'),(73,'beth.plale@gmail.com','12674'),(74,'beth.plale@gmail.com','12569'),(75,'beth.plale@gmail.com','12556'),(76,'beth.plale@gmail.com','12539'),(77,'readuser@test.com','12578'),(78,'readuser2@test.com','12578'),(79,'readuser3@test.com','12578'),(80,'scot.house@yellowfin.bi','12578'),(81,'scot.house@yellowfin.bi','12355'),(82,'scot.house@yellowfin.bi','12263'),(83,'scot.house@yellowfin.bi','12674'),(84,'scot.house@yellowfin.bi','12569'),(85,'scot.house@yellowfin.bi','12322'),(86,'john.doe@yellowfin.bi','12578'),(87,'eric.mooney@advicent.com','12674'),(88,'eric.mooney@advicent.com','12569'),(89,'eric.mooney@advicent.com','12693'),(90,'eric.mooney@advicent.com','12539');
/*!40000 ALTER TABLE `app_campaccess` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-28 16:21:13
