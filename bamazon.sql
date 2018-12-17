-- Drops the bamazon database if it exists currently --
DROP DATABASE IF EXISTS bamazon;

-- Creates the "bamazon" database --
CREATE database bamazon;

-- Makes it so all of the following code will affect the "bamazon" database --
USE bamazon;

-- Creates the table "products" within "bamazon" database --
CREATE TABLE products(

    -- Creates a numeric column called "item_id" which will automatically increment its default value as we create new rows --
	item_id INT(4) AUTO_INCREMENT NOT NULL,

    -- Makes a string column called "product_name" which cannot contain null --
	product_name VARCHAR(100) NOT NULL,

    -- Makes a string column called "department_name" which cannot contain null --
	department_name VARCHAR(100) NOT NULL,

    -- Makes an numeric column called "price" which cannot contain null --
	price DECIMAL(10,2) NOT NULL,

    -- Makes an numeric column called "stock_quantity" which cannot contain null --
	stock_quantity INT(100) NOT NULL,

    -- Sets item_id as this table's primary key which means all data contained within it will be unique --
	PRIMARY KEY (item_id)
);

-- Select * FROM products;

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (1001, "Harry Potter", "Books", 26.65, 35),
	   (2001, "The Legend of Zelda", "Games", 60.99, 30),
	   (1002, "A series of Unfortunate Events", "Books", 29.99, 25),
	   (2002, "Mario Kart Deluxe", "Games", 59.99, 40),
	   (3001, "IPhone X Case", "Phone Accessories", 18.75, 27),
	   (4001, "The Avengers", "Movies", 14.59, 50),
	   (3002, "Headphones", "Phone Accessories", 12.99, 23),
	   (4002, "Captain America", "Movies", 29.99, 10),
	   (3003, "Phone Charger", "Phone Accessories", 9.99, 19),
	   (1003, "SQL", "Books", 12.99, 25)