DROP DATABASE IF EXISTS raid_pos;

CREATE DATABASE raid_pos;
USE raid_pos;

DROP TABLE IF EXISTS `fruits`;
CREATE TABLE `fruits` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `fruit` VARCHAR(20) NOT NULL,
	`price` FLOAT NOT NULL,
    `remaining_quantity` INT NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO fruits (fruit, price,remaining_quantity)
VALUES ('apple', 2.00, 10), ('banana', 1.50, 10), ('pear', 2.30, 10), ('orange', 1.80, 10), ('durian', 10.50, 10);

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `items_bought` JSON NOT NULL, 
    `total` FLOAT NOT NULL,
    
    PRIMARY KEY (`id`)
);

INSERT INTO transactions (items_bought, total)
VALUES ('[{"fruit": "apple", "quantity": 4, "price": 2}, {"fruit": "durian", "quantity": 3, "price": 10.50}]', 39.50), 
('[{"fruit": "banana", "quantity": 4, "price": 1.50}]', 6.00);

select * from transactions;