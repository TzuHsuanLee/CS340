// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9044;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


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



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});