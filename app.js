// App.js

 // Citation for this file- app.js
 // Date: 3/18/2024
 // Copied from Node JS Starter App Ecampus
 // We looked at the Node JS Starter App from Ecampus to help us with a lot of implementation (including the update, add and delete function)
 // Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var bodyParser = require('body-parser');
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9531;                 // Set a port number at the top so it's easy to change in the future

// create application/json parser
var jsonParser = bodyParser.json()

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static('public', { 
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', function(req, res)
{
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});    

app.get('/customers', function(req, res)
{
    query = 'SELECT * FROM Customers;';                    // Note the call to render() and not send(). Using render() ensures the templating engine

    db.pool.query(query, function (err, customers, fields){
        res.render('customers', {
            customers
        });
    });  
});

app.get('/books', function(req, res)
{
    query = 'SELECT * FROM Books;';                    // Note the call to render() and not send(). Using render() ensures the templating engine

    db.pool.query(query, function (err, books, fields){
        res.render('books', {
            books
        });
    });                      // Note the call to render() and not send(). Using render() ensures the templating engine
}); 

app.get('/orders', function(req, res)
{
    query = 'SELECT * FROM Orders;';                    // Note the call to render() and not send(). Using render() ensures the templating engine

    db.pool.query(query, function (err, orders, fields){
        res.render('orders', {
            orders
        });
    });                   // Note the call to render() and not send(). Using render() ensures the templating engine
}); 

app.get('/orderDetails', function(req, res)
{
    query = 'SELECT * FROM OrderDetails;';                    // Note the call to render() and not send(). Using render() ensures the templating engine

    db.pool.query(query, function (err, orderDetails, fields){
        res.render('orderDetails', {
            orderDetails
        });
    });                        // Note the call to render() and not send(). Using render() ensures the templating engine
}); 

/*
    Add
*/
app.post('/add-book-form' , jsonParser, function(req, res){
    // console.log(req.body); 
    let data = req.body;
    let bookID =  parseInt(data.bookID);
    let bookName = data.bookName;
    let category = data.category;
    let author = data.author;
    let price =  data.price;

    query1 = `INSERT INTO Books (bookID, bookName, category, author, price) VALUES ('${bookID}', '${bookName}', '${category}', '${author}', ${price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/books');
        }
    })
})

app.post('/add-customer-form' , jsonParser, function(req, res){
    // console.log(req.body); 
    let data = req.body;
    let customerID =  parseInt(data.customerID);
    let firstName = data.firstName;
    let lastName = data.lastName;

    query1 = `INSERT INTO Customers (firstName, lastName, customerID) VALUES ('${firstName}', '${lastName}', '${customerID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
})

app.post('/add-order-form' , jsonParser, function(req, res){
        // console.log(req.body); 
        let data = req.body;
        let orderID =  parseInt(data.orderID);
        let customerID =  parseInt(data.customerID);
        let orderDate = data.orderDate;
        let numOrder = data.numOrder;
        let totalAmount = data.totalAmount;

    
        query1 = `INSERT INTO Orders (orderID, customerID, orderDate, numOrder, totalAmount) VALUES ('${orderID}', '${customerID}', '${orderDate}', '${numOrder}', '${totalAmount}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/orders');
            }
        })
    })

app.post('/add-orderDetail-form' , jsonParser, function(req, res){
    // console.log(req.body); 
    let data = req.body;
    let orderID =  parseInt(data.orderID);
    let bookID =  parseInt(data.bookID);

    query1 = `INSERT INTO OrderDetails (orderID, bookID) VALUES ('${orderID}', '${bookID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/orderDetails');
        }
    })
})


/*
    Delete
*/
app.delete('/delete-orderDetail-ajax/', jsonParser, function(req,res,next){
    let data = req.body;
    let bookID = parseInt(data.bookID);
    let orderID = parseInt(data.orderID);
    let deleteOrderDetail= `DELETE FROM OrderDetails WHERE bookID = ? AND orderID = ?`;

    db.pool.query(deleteOrderDetail, [bookID, orderID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        {
            res.sendStatus(204);
        }
    })
});


app.delete('/delete-book-ajax/', jsonParser, function(req,res,next){
    let data = req.body;
    let bookID = parseInt(data.bookID);
    let deleteOrderDetail= `DELETE FROM OrderDetails WHERE bookID = ?`;
    let deletebook= `DELETE FROM Books WHERE bookID = ?`;

    // Run the 1st query
    db.pool.query(deleteOrderDetail, [bookID], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deletebook, [bookID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
    })
});

app.delete('/delete-order-ajax/', jsonParser, function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.orderID);
    let deleteOrderDetail= `DELETE FROM OrderDetails WHERE orderID = ?`;
    let deleteOrder= `DELETE FROM Orders WHERE orderID = ?`;

    // Run the 1st query
    db.pool.query(deleteOrderDetail, [orderID], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deleteOrder, [orderID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax/', jsonParser, function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let findOrderDetails = `SELECT * FROM Orders WHERE customerID = ?`;
    // let deleteOrderDetail= `DELETE FROM OrderDetails WHERE customerID = ?`;
    // let deleteOrder= `DELETE FROM Orders WHERE customerID = ?`;
    // let deleteCustomer= `DELETE FROM Customers WHERE customerID = ?`;

    // Run the 1st query
    db.pool.query(findOrderDetails, [customerID], function(error, rows, fields) {
        rows.forEach((row) => {
            let deleteOrderDetail = `DELETE FROM OrderDetails WHERE orderID = ?`;

            db.pool.query(deleteOrderDetail, [row.orderID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
            });
        })
    });

    let deleteOrder = `DELETE FROM Orders WHERE customerID = ?`;
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
    db.pool.query(deleteOrder, [customerID], function(error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    });

    
});

/* UPDATE */
app.put('/put-order-details-ajax', jsonParser, function(req, res, next) {
    let data = req.body;

    let orderID = parseInt(data.orderID);
    let bookID = parseInt(data.bookID);

    let queryUpdateOrderDetails = `UPDATE OrderDetails SET bookID = ? WHERE orderID = ?`;
    let selectOrderDetails = `SELECT * FROM OrderDetails WHERE orderID = ?`;

    // Run the query to update order details
    db.pool.query(queryUpdateOrderDetails, [bookID, orderID], function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the second query
            db.pool.query(selectOrderDetails, [orderID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    });
});

// Update route for orders
app.put('/put-order-ajax', jsonParser, function(req, res, next) {
  // Extract data from request
    let data = req.body;
    let orderID =  parseInt(data.orderID);
    let customerID =  parseInt(data.customerID);
    let orderDate = data.orderDate;
    let numOrder = data.numOrder;
    let totalAmount = data.totalAmount;

  // SQL query to update order status
    // let queryUpdateOrder = `UPDATE orders SET orderId = ? WHERE id = ?`;
    let queryUpdateOrder = `UPDATE INTO Orders SET orderID, customerID, orderDate, numOrder, totalAmount = ? WHERE  orderID = ?`;
    let selectOrderDetails = `SELECT * FROM Orders WHERE orderID = ?`;


  // Execute the update query
    db.pool.query(queryUpdateOrder, [newStatus, orderId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            res.sendStatus(200); // OK
        }
    });
});

// Update route for customers
app.put('/put-customer-ajax', function(req, res, next) {
  let data = req.body;

  // Extract data from request
  let customerId = parseInt(data.customerId);
  let newFirstName = data.firstName;
  let newLastName = data.lastName;

  // SQL query to update customer information
  let queryUpdateCustomer = `UPDATE customers SET firstName = ?, lastName = ? WHERE id = ?`;

  // Execute the update query
  db.pool.query(queryUpdateCustomer, [newFirstName, newLastName, customerId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400); // Bad request
    } else {
      res.sendStatus(200); // OK
    }
  });
});


// Update route for books
app.put('/put-book-ajax', function(req, res, next) {
  let data = req.body;

  // Extract data from request
  let bookId = parseInt(data.bookId);
  let newBookName = data.bookName;
  let newCategory = data.category;
  let newAuthor = data.author;
  let newPrice = parseFloat(data.price); // Convert to float for price

  // SQL query to update book information
  let queryUpdateBook = `UPDATE books SET bookName = ?, category = ?, author = ?, price = ? WHERE id = ?`;

  // Execute the update query
  db.pool.query(queryUpdateBook, [newBookName, newCategory, newAuthor, newPrice, bookId], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400); // Bad request
    } else {
      res.sendStatus(200); // OK
    }
  });
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
