-- Disable foreign key checks and set autocommit to 0
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist to minimize import errors
DROP TABLE IF EXISTS OrderDetails, Inventories, Orders, Books, Customers;

-- Create Customers table
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    emailID VARCHAR(255) NOT NULL
);

-- Create Books table
CREATE TABLE Books (
    bookID INT AUTO_INCREMENT PRIMARY KEY,
    bookName VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price INT NOT NULL
);

-- Create Orders table
CREATE TABLE Orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    orderDate VARCHAR(255) NOT NULL,
    numOrder INT NOT NULL,
    totalAmount INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE SET NULL
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    orderID INT NOT NULL,
    bookID INT NOT NULL,
    qty INT NOT NULL,
    price INT NOT NULL,
    line_total INT NOT NULL,
    PRIMARY KEY (orderID, bookID),
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
);

-- Create Inventories table
CREATE TABLE Inventories (
    inventoryID INT AUTO_INCREMENT PRIMARY KEY,
    bookID INT NOT NULL,
    quantityInStock INT NOT NULL,
    FOREIGN KEY (bookID) REFERENCES Books(bookID) ON DELETE CASCADE
);

-- Enable foreign key checks and commit changes
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Select all data from tables
SELECT * FROM Customers;
SELECT * FROM Books;
SELECT * FROM Orders;
SELECT * FROM OrderDetails;
SELECT * FROM Inventories;
