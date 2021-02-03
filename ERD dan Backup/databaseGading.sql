/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - backend_2021
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`backend_2021` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `backend_2021`;

/*Table structure for table `locations` */

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `locations` */

insert  into `locations`(`id`,`location`) values 
(1,'Bandung'),
(2,'Jakarta'),
(3,'Serpong');

/*Table structure for table `movie_status` */

DROP TABLE IF EXISTS `movie_status`;

CREATE TABLE `movie_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `movie_status` */

insert  into `movie_status`(`id`,`status`) values 
(1,'2'),
(2,'2'),
(3,'2');

/*Table structure for table `movies` */

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(85) NOT NULL,
  `release_date` int(11) NOT NULL,
  `release_month` int(11) NOT NULL,
  `release_year` int(11) NOT NULL,
  `duration_min` int(11) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `description` varchar(425) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `status_foreign` (`status`),
  CONSTRAINT `status_foreign` FOREIGN KEY (`status`) REFERENCES `movie_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `movies` */

insert  into `movies`(`id`,`name`,`release_date`,`release_month`,`release_year`,`duration_min`,`genre`,`description`,`status`) values 
(1,'Avengers: Endgame',24,4,2019,182,'Action','After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',3),
(2,'Frozen 2',20,11,2019,113,'Fantasy','Queen Elsa starts hearing a mysterious melodic voice calling to her. Unsettled, she answers it and that awakens the elemental spirits that lead her to a quest to restore an old injustice.',2),
(3,'Demon Slayer: Kimetsu no Yaiba the Movie: Mugen Train',6,1,2021,129,'Anime','A youth begins a quest to fight demons and save his sister after finding his family slaughtered and his sister turned into a demon.',1),
(4,'Weathering with You',21,8,2019,111,'Romance','A boy runs away to Tokyo and befriends a girl who appears to be able to manipulate the weather.',2),
(5,'The Nun',5,9,2018,96,'Horror','When a young nun at a cloistered abbey in Romania takes her own life, a priest with a haunted past and a novitiate on the threshold of her final vows are sent by the Vatican to investigate. Together, they uncover the order\'s unholy secret. Risking not only their lives but their faith and their very souls, they confront a malevolent force in the form of a demonic nun.',3),
(6,'Spider-Man: Far From Home',3,7,2019,129,'Action','As Spider-Man, a beloved superhero, Peter Parker faces four destructive elemental monsters while on holiday in Europe. Soon, he receives help from Mysterio, a fellow hero with mysterious origins.',2),
(8,'Black Widow',4,29,2021,133,'Action','At birth the Black Widow (aka Natasha Romanova) is given to the KGB, which grooms her to become its ultimate operative. When the U.S.S.R. breaks up, the government tries to kill her as the action moves to present-day New York, where she is a freelance operative.',1),
(9,'Mulan',25,3,2020,120,'Fantasy','A girl disguises as a male warrior and joins the imperial army in order to prevent her sick father from being forced to enlist as he has no male heir.',2),
(10,'Ki Prana Lewu The Movie',3,2,2020,120,'comedy','Pada suatu hari',2);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `roles` */

insert  into `roles`(`id`,`role`) values 
(1,'admin'),
(2,'user');

/*Table structure for table `schedules` */

DROP TABLE IF EXISTS `schedules`;

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_movie` (`movie_id`),
  KEY `foreign_location` (`location_id`),
  KEY `foreign_time` (`time_id`),
  CONSTRAINT `foreign_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foreign_movie` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foreign_time` FOREIGN KEY (`time_id`) REFERENCES `show_times` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

/*Data for the table `schedules` */

insert  into `schedules`(`id`,`movie_id`,`location_id`,`time_id`) values 
(1,1,2,3),
(2,1,2,3),
(3,1,2,3),
(4,1,2,3),
(5,1,2,3),
(6,1,2,3),
(7,1,2,3),
(8,1,2,3),
(9,1,2,3),
(10,2,2,3),
(11,2,2,3),
(12,2,2,3),
(13,3,2,3),
(14,3,2,3),
(15,3,2,3),
(16,4,2,3),
(17,4,2,3),
(18,4,2,3),
(19,4,2,3),
(20,5,2,3),
(21,5,2,3),
(22,5,2,3),
(23,6,2,3),
(24,6,2,3),
(25,6,2,3),
(26,8,2,3),
(27,8,2,3),
(28,9,2,3),
(29,9,2,3),
(31,9,2,3);

/*Table structure for table `show_times` */

DROP TABLE IF EXISTS `show_times`;

CREATE TABLE `show_times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `show_times` */

insert  into `show_times`(`id`,`time`) values 
(1,'9 AM'),
(2,'11 AM'),
(3,'1 PM'),
(4,'3 PM'),
(5,'7 PM'),
(6,'9 PM');

/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `status` */

insert  into `status`(`id`,`status`) values 
(1,'active'),
(2,'not-active'),
(3,'closed');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) CHARACTER SET utf8 NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(225) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 2,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `role_foreign` (`role`),
  KEY `role_status` (`status`),
  CONSTRAINT `role_foreign` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_status` FOREIGN KEY (`status`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`uid`,`username`,`email`,`password`,`role`,`status`) values 
(1,'1612336211910','superman','superman@gmail.com','superman1!',2,1),
(2,'1612344415209','makalele','makalele@gmail.com','makalele1!',2,1),
(3,'1612344720935','adinda','dinda@gmail.com','dinda1!',2,3),
(4,'1612345588839','admingading','admingading@gmail.com','admin1!',1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
