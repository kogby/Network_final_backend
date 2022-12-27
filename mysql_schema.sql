DROP DATABASE IF EXISTS ShopDB;
CREATE DATABASE ShopDB  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE ShopDB;

CREATE TABLE `SELLER` (
  `seller_name` varchar(20) NOT NULL,
  `real_name` varchar(20) DEFAULT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `account` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `address` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`seller_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `USER` (
  `user_name` varchar(20) NOT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `account` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `POST` (
  `post_title` varchar(60) NOT NULL,
  `content` varchar(90) DEFAULT '`No content`',
  `STARTDATE` date DEFAULT (now()),
  `ENDDATE` date NOT NULL DEFAULT '2033-12-31',
  `legal` tinyint(1) GENERATED ALWAYS AS ((case when ((to_days(`ENDDATE`) - to_days(`STARTDATE`)) < 0) then 0 else 1 end)) VIRTUAL,
  `post_seller_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`post_title`),
  UNIQUE KEY `POST_TITLE_UNIQUE` (`post_title`),
  KEY `post_seller_name_idx` (`post_seller_name`),
  CONSTRAINT `post_seller_name` FOREIGN KEY (`post_seller_name`) REFERENCES `SELLER` (`seller_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ITEM` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT 'no name',
  `price` int NOT NULL DEFAULT '1' COMMENT '一元起標',
  `description` varchar(45) DEFAULT 'no description',
  `inventory` int NOT NULL DEFAULT '1',
  `category` varchar(20) DEFAULT 'no category',
  `image` varchar(100) DEFAULT NULL,
  `is_sold` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Not sold is 0 sold is 1',
  `item_post_title` varchar(60) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `item_post_title_idx` (`item_post_title`),
  CONSTRAINT `item_post_title` FOREIGN KEY (`item_post_title`) REFERENCES `POST` (`post_title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `BID` (
  `bid_id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL DEFAULT '1',
  `quantity` int DEFAULT '1',
  `bid_item_id` int NOT NULL,
  `bid_user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `bid_item_id_idx` (`bid_item_id`),
  KEY `bid_user_name_idx` (`bid_user_name`),
  CONSTRAINT `bid_item_id` FOREIGN KEY (`bid_item_id`) REFERENCES `ITEM` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bid_user_name` FOREIGN KEY (`bid_user_name`) REFERENCES `USER` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `v_FORSALE` (
    `POST_TITLE` varchar(20) NOT NULL,
    `IS_FORSALE` int NOT NULL DEFAULT '0'
);

CREATE TABLE `TRANSACTION` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `sold_num` int DEFAULT '1',
  `total_revenue` int DEFAULT NULL,
  `enter_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_user_name` varchar(20) DEFAULT NULL,
  `transaction_seller_name` varchar(20) DEFAULT NULL,
  `transaction_item_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `transaction_user_name_idx` (`transaction_user_name`),
  KEY `transaction_seller_name_idx` (`transaction_seller_name`),
  KEY `transaction_item_id_idx` (`transaction_item_id`),
  CONSTRAINT `transaction_item_id` FOREIGN KEY (`transaction_item_id`) REFERENCES `ITEM` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transaction_seller_name` FOREIGN KEY (`transaction_seller_name`) REFERENCES `SELLER` (`seller_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transaction_user_name` FOREIGN KEY (`transaction_user_name`) REFERENCES `USER` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TRACK` (
  `track_item_id` int NOT NULL,
  `track_user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`track_item_id`,`track_user_name`),
  KEY `track_user_name_idx` (`track_user_name`),
  CONSTRAINT `track_item_id` FOREIGN KEY (`track_item_id`) REFERENCES `ITEM` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `track_user_name` FOREIGN KEY (`track_user_name`) REFERENCES `USER` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `RATING` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(90) DEFAULT 'no content',
  `score` int DEFAULT NULL,
  `rating_transaction_id` int NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `rating_transaction_id_idx` (`rating_transaction_id`),
  CONSTRAINT `rating_transaction_id` FOREIGN KEY (`rating_transaction_id`) REFERENCES `TRANSACTION` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `COMMENT` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(100) DEFAULT 'no content',
  `comment_post_title` varchar(60) NOT NULL,
  `comment_user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_post_title_idx` (`comment_post_title`),
  KEY `comment_user_name_idx` (`comment_user_name`),
  CONSTRAINT `comment_post_title` FOREIGN KEY (`comment_post_title`) REFERENCES `POST` (`post_title`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_user_name` FOREIGN KEY (`comment_user_name`) REFERENCES `USER` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `USER` (`user_name`,`phone_num`,`account`,`password`,`role`) VALUES ('chloe',NULL,'chloethin','thinchloe','normal');
INSERT INTO `USER` (`user_name`,`phone_num`,`account`,`password`,`role`) VALUES ('neo1202','0978785785','b09705009','b09705009','seller');
INSERT INTO `USER` (`user_name`,`phone_num`,`account`,`password`,`role`) VALUES ('rich_boy','1234567890','rich123','123rich','normal');
INSERT INTO `USER` (`user_name`,`phone_num`,`account`,`password`,`role`) VALUES ('shikang','0000000555','b1234','1234b','seller');
INSERT INTO `USER` (`user_name`,`phone_num`,`account`,`password`,`role`) VALUES ('yichen',NULL,NULL,NULL,'seller');

INSERT INTO `SELLER` (`seller_name`,`real_name`,`phone_num`,`account`,`password`,`address`) VALUES ('neo1202','吳驊祐','0978785785','b09705009','b09705009','台北大安敦化南路');
INSERT INTO `SELLER` (`seller_name`,`real_name`,`phone_num`,`account`,`password`,`address`) VALUES ('shikang','史康宇','0000000555','b1234','1234b','台北士林');
INSERT INTO `SELLER` (`seller_name`,`real_name`,`phone_num`,`account`,`password`,`address`) VALUES ('yjchen','陳奕兆',NULL,NULL,NULL,'板橋');

INSERT INTO `POST` (`post_title`,`content`,`STARTDATE`,`ENDDATE`,`post_seller_name`) VALUES ('單身男子出租','160/hr','2022-12-27','2033-12-31','yjchen');
INSERT INTO `POST` (`post_title`,`content`,`STARTDATE`,`ENDDATE`,`post_seller_name`) VALUES ('演唱會多買的票','周杰倫','2022-12-27','2022-12-28','neo1202');
INSERT INTO `POST` (`post_title`,`content`,`STARTDATE`,`ENDDATE`,`post_seller_name`) VALUES ('用不到的夜燈','有緣者得','2023-01-01','2023-12-31','neo1202');
INSERT INTO `POST` (`post_title`,`content`,`STARTDATE`,`ENDDATE`,`post_seller_name`) VALUES ('舊衣服便宜出清','衣服為主','2022-12-27','2033-12-31','shikang');
INSERT INTO `POST` (`post_title`,`content`,`STARTDATE`,`ENDDATE`,`post_seller_name`) VALUES ('限時賣飯糰','過期了','2022-12-27','2022-12-01','neo1202');

INSERT INTO `ITEM` (`price`, `description`, `inventory`, `category`, `is_sold`, `item_post_title`) VALUES ('160', '台北多處置產帥哥', '0', '感情', '1', '單身男子出租');
INSERT INTO `ITEM` (`name`, `price`, `description`, `inventory`, `category`, `is_sold`, `item_post_title`) VALUES ('ticket', '3000', 'B區23號', '2', '娛樂', '0', '演唱會多買的票');
INSERT INTO `ITEM` (`price`, `description`, `inventory`, `category`, `is_sold`, `item_post_title`) VALUES ('1000', '附保固', '1', '家具', '0', '用不到的夜燈');
INSERT INTO `ITEM` (`name`, `price`, `description`, `inventory`, `category`, `is_sold`, `item_post_title`) VALUES ('skirt', '400', '155實穿剛好', '0', '服飾', '1', '舊衣服便宜出清');
INSERT INTO `ITEM` (`price`, `description`, `inventory`, `category`, `is_sold`, `item_post_title`) VALUES ('10', '沒賣掉', '5', '食物', '0', '限時賣飯糰');