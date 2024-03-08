// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var bodyParser = require('body-parser');
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9534;                 // Set a port number at the top so it's easy to change in the future

// create application/json parser
var jsonParser = bodyParser.json()

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static('public'))

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
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

//Delete
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

            else
            {
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
            console.log(row.orderID)
        })
    });

    // db.pool.query(deleteOrderDetail, [customerID], function(error, rows, fields){
    //     if (error) {

    //         // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
    //         console.log(error);
    //         res.sendStatus(400);
    //         }

    //         else
    //         {
    //             db.pool.query(deleteOrder, [customerID], function(error, rows, fields){
    //             if (error) {

    //                 // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
    //                 console.log(error);
    //                 res.sendStatus(400);
    //                 }

    //                 else{
    //                     // Run the second query
    //                     db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {

    //                         if (error) {
    //                             console.log(error);
    //                             res.sendStatus(400);
    //                         } else {
    //                             res.sendStatus(204);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
