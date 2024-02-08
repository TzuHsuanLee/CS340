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
    orderDate INT NOT NULL,
    numOrder INT NOT NULL,
    totalAmount INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    orderID INT NOT NULL,
    bookID INT NOT NULL,
    PRIMARY KEY (orderID, bookID),
    FOREIGN KEY (orderID) REFERENCES Orders(orderID),
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
);

-- Create Inventories table
CREATE TABLE Inventories (
    inventoryID INT AUTO_INCREMENT PRIMARY KEY,
    bookID INT NOT NULL,
    quantityInStock INT NOT NULL,
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
);
