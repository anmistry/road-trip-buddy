SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `users`;
create table `users` (
`user_id` int(11) not null auto_increment,
`user_nm` varchar(255) not null,
`password` varchar(255) not null,
`user_email` varchar(255) not null,
`hikes` tinyint(1),
`tpark` tinyint(1),
`museum` tinyint(1),
`mall` tinyint(1),
`npark` tinyint(1),
`sports` tinyint(1),
`wpark` tinyint(1),
`landmark` tinyint(1),
`musicEvent` tinyint(1),
`make` varchar(255),
`model` varchar(255),
primary key (`user_id`)
) engine=innodb;

