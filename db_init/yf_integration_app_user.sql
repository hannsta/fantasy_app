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
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES (1,'pbkdf2_sha256$120000$9botWUFbGGCR$eD/2PaVRBYaYIcjHjJinP8HtbngWCWv20QBE7Sorlqk=','2019-05-02 14:51:19.537647','nate@test.com','ADMIN',1,0),(2,'pbkdf2_sha256$120000$lLKFgGcsq0hI$jgkQlQXt9Z3LdWW+J6LOZzV6LPgBl54DxSKn6X/Q2Sc=','2018-11-08 20:06:48.232516','nate2@test.com','ADMIN',1,0),(3,'pbkdf2_sha256$120000$1lYPjJ4DC9bv$/vhwkubFBHc39TP9mB4eIo+4ehzmAfxoc5NCoXxX0zE=','2019-05-22 14:13:04.242225','nate3@test.com','ADMIN',1,0),(4,'pbkdf2_sha256$120000$k4bKI97gXYrN$bsSUyIwLDqZEBaZnNaVcFsga8Ggs/1Ksa1qpZeGxDyI=','2019-01-14 16:06:48.748640','conner.madigan@yellowfin.bi','ADMIN',1,0),(5,'pbkdf2_sha256$120000$HIawreKR56kN$QN43dlpVVypLGv5UlLItJ5mLZHlH5+wSCt7/YA59MVE=','2018-11-13 23:23:01.623205','my@email.com','ADMIN',1,0),(6,'pbkdf2_sha256$120000$mO7bwNqMyRf3$+ug5xP3pzCDDYRIbR46CDLjs3/E7N7R3mmWW1i5xsVs=','2019-02-07 03:04:41.580377','emma.urli@yellowfin.bi','ADMIN',1,0),(7,'pbkdf2_sha256$120000$3Y1FMYNbwfTm$rdD+OYDQ7rSaHNM16Xzi50JkPDgDkTHcWVQezWNkGpA=','2018-11-14 16:13:57.857131','mike@test.com','ADMIN',1,0),(8,'pbkdf2_sha256$120000$9cfaQbUicwly$Mkh4pHC30ASZffmJtpAElIY2TcXJ2/6d2RfXEwU1RVA=','2018-11-19 16:17:11.242423','nate4@test.com','ADMIN',1,0),(9,'pbkdf2_sha256$120000$cfktkHDnzdY5$71Xy+tBLq8ltzIgc9rGU0bdCg6LI0FP5ED1/wIDZBVY=','2018-12-19 05:44:45.105323','rob.aldridge@yellowfin.bi','ADMIN',1,0),(10,'pbkdf2_sha256$120000$yD0PZQvoFkKm$8lZ3L4veyKUoY0BnzO5pIuCy8IdpTPDVy7st/HCEUHY=',NULL,'test7@test.com','ADMIN',1,0),(11,'pbkdf2_sha256$120000$JzpIZW3AYIFd$r+UK8awT5InoHBGuKwGe2q0SzWVjIXThm3BHUptOpPA=','2019-05-21 20:50:24.131256','justin@test.com','ADMIN',1,0),(12,'pbkdf2_sha256$120000$RmSfJVsZ8Cab$zuBqrLkzvJvU8axLjtuGeM9MUIAjUyitIn0cngSvpNM=','2018-12-18 16:41:19.775109','foo@bar.com','ADMIN',1,0),(13,'pbkdf2_sha256$120000$ChPbWrVM2iDM$r+rZO9xgxaIgYdS5iMNkfM6XYOj/GrZlxZgW27TDYp0=','2018-12-19 22:36:47.869129','scot@provetto.com','CONSUMER',1,0),(14,'pbkdf2_sha256$120000$cP1pe6HIlPEl$IH1dxuHd86aT1qj2Vsy0ziyKvkIN9bM9TroWKFW8JUY=','2018-12-27 21:41:38.427573','beth.plale@gmail.com','ADMIN',1,0),(15,'pbkdf2_sha256$120000$Gzv4ZblAYhjT$bDS0aTHNoH4lXr2cPVxIkQaP2Jgh0hL03r89vK8CGZE=',NULL,'readuser@test.com','CONSUMER',1,0),(16,'pbkdf2_sha256$120000$w9XBf8O4yXfz$cZ5+mhHjlnSYF1Ws3T4g/VAsmmsK+yMi6p3DVVA7/+k=',NULL,'readuser2@test.com','CONSUMER',1,0),(17,'pbkdf2_sha256$120000$OZE854TiMbb2$fkn5+LgpOsiPmWvf6dWtML7jkjN3rLmndoSKGd8LgcQ=','2019-01-11 17:59:55.174291','readuser3@test.com','CONSUMER',1,0),(18,'pbkdf2_sha256$120000$7YbgoT4zIAu0$vVwOAGM8cR0no0wmgd85oO+5GZcjZd9g2VbOxZkrpLI=','2019-05-20 19:49:37.536154','scot.house@yellowfin.bi','ADMIN',1,0),(19,'pbkdf2_sha256$120000$h0W3ciaHe0Zi$fYA4UOa2wEtXsndo5BmTUeYmoorVOrQKjXSEaQ9C8yE=','2019-01-23 04:16:17.661222','john.doe@yellowfin.bi','CONSUMER',1,0),(20,'pbkdf2_sha256$120000$9yJFdlxdAaDs$X07gRcHpS6IjBX7ATbpWc65JPT/ITsNL6e6CEJRN/h8=','2019-05-15 20:30:32.553425','eric.mooney@advicent.com','CONSUMER',1,0);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
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
