
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `billing_info`;
CREATE Table `billing_info`(
 `bi_id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 `phone_number` int NOT NULL,
 `credit_card_name`varchar(255) NOT NULL,
 `credit_card_number` bigint(16) NOT NULL,
 `csc_number` int(3) NOT NULL,
 `exp_mon` int(2) NOT NULL,
 `exp_yr` int(2) NOT NULL,
 `card_type` varchar(255) NOT NULL,
 PRIMARY KEY(`bi_id`),
 FOREIGN KEY (`user_id`) references `users`(`user_id`)
)ENGINE=InnoDB;
