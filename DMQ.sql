-- Query to add a new customer
INSERT INTO Customers (firstName, lastName, emailID)
VALUES (:firstNameInput, :lastNameInput, :emailInput);

-- Query to add a new book to the inventory
INSERT INTO Books (bookName, category, author, price)
VALUES (:bookNameInput, :categoryInput, :authorInput, :priceInput);

-- Query to place a new order
INSERT INTO Orders (customerID, orderDate, numOrder, totalAmount)
VALUES (:customerIDInput, NOW(), :numOrderInput, :totalAmountInput);

-- Query to add books to an order (OrderDetails)
INSERT INTO OrderDetails (orderID, bookID, qty, price, line_total)
VALUES (:orderIDInput, :bookIDInput, :qtyInput, :priceInput, :qtyInput * :priceInput);

-- Query to update customer information
UPDATE Customers
SET firstName = :newFirstNameInput, lastName = :newLastNameInput, emailID = :newEmailInput
WHERE customerID = :customerIDToUpdate;

-- Query to update book information
UPDATE Books
SET bookName = :newBookNameInput, category = :newCategoryInput, author = :newAuthorInput, price = :newPriceInput
WHERE bookID = :bookIDToUpdate;

-- Query to update order information
UPDATE Orders
SET numOrder = :newNumOrderInput, totalAmount = :newTotalAmountInput
WHERE orderID = :orderIDToUpdate;

-- Query to delete a customer
DELETE FROM Customers WHERE customerID = :customerIDToDelete;

-- Query to delete a book
DELETE FROM Books WHERE bookID = :bookIDToDelete;

-- Query to delete an order and its details
BEGIN TRANSACTION;
DELETE FROM OrderDetails WHERE orderID = :orderIDToDelete;
DELETE FROM Orders WHERE orderID = :orderIDToDelete;
COMMIT;

-- Query to remove a book from an order (OrderDetails)
DELETE FROM OrderDetails WHERE orderID = :orderIDToDelete AND bookID = :bookIDToDelete;

-- Query to search for a customer by name
SELECT * FROM Customers
WHERE firstName LIKE :searchInput OR lastName LIKE :searchInput;
