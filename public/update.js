
/* UPDATE FOR ORDER DETAILS */
// Get the objects we need to modify
let updateOrderDetailsForm = document.getElementById('update-order-details-form-ajax');

// Modify the objects we need
updateOrderDetailsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("orderIDSelect");
    let inputBookID = document.getElementById("input-book-id");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let bookIDValue = inputBookID.value;
    
    // Put our data we want to send in a JavaScript object
    let data = {
        orderID: orderIDValue,
        bookID: bookIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-details-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, orderIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, orderID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("orderDetailsTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == orderID) {
            // Get the location of the row where we found the matching order ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of book ID value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign book ID to the value we updated to
            td.innerHTML = parsedData[0].bookID;
        }
   }

