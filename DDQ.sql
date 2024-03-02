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
    customerID INT NOT NULL,
    orderDate VARCHAR(255) NOT NULL,
    numOrder INT NOT NULL,
    totalAmount INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    orderID INT NOT NULL,
    bookID INT NOT NULL,
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

-- Insert example data
-- Insert example data into Customers table
INSERT INTO Customers (firstName, lastName, emailID) VALUES
    ('John', 'Doe', 'john.doe@example.com'),
    ('Jane', 'Smith', 'jane.smith@example.com'),
    ('Bob', 'Johnson', 'bob.johnson@example.com'),
    ('Alice', 'Williams', 'alice.williams@example.com'),
    ('Charlie', 'Brown', 'charlie.brown@example.com');

-- Insert example data into Books table
INSERT INTO Books (bookID, bookName, category, author, price) VALUES
    (1, 'The Great Gatsby', 'Fiction', 'F. Scott Fitzgerald', 20),
    (2, 'To Kill a Mockingbird', 'Fiction', 'Harper Lee', 18),
    (3, '1984', 'Dystopian', 'George Orwell', 25),
    (4, 'The Catcher in the Rye', 'Fiction', 'J.D. Salinger', 22),
    (5, 'Pride and Prejudice', 'Romance', 'Jane Austen', 15);

-- Insert example data into Orders table
INSERT INTO Orders (customerID, orderDate, numOrder, totalAmount) VALUES
    (1, '2024-02-08 12:00:00', 1001, 60),
    (2, '2024-02-08 12:30:00', 1002, 45),
    (3, '2024-02-08 13:00:00', 1003, 30),
    (4, '2024-02-08 13:30:00', 1004, 75),
    (5, '2024-02-08 14:00:00', 1005, 50);

-- Insert example data into OrderDetails table
INSERT INTO OrderDetails (orderID, bookID) VALUES
    (1, 5),
    (1, 2),
    (2, 2),
    (3, 1),
    (4, 5);

-- Insert example data into Inventories table
-- INSERT INTO Inventories (bookID, quantityInStock) VALUES
--     (1, 50),
--     (2, 30),
--     (3, 20),
--     (4, 40),
--     (5, 25);

-- Enable foreign key checks and commit changes
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Add dynamic filter in SELECT statement
SELECT * FROM Orders WHERE customerID = :dynamicCustomerID;



SELECT * FROM Customers;
SELECT * FROM Books;
SELECT * FROM Orders;
SELECT * FROM OrderDetails;
-- SELECT * FROM Inventories;  