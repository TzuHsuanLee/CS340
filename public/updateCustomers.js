// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerId = document.getElementById("customerSelect");
    let inputFirstName = document.getElementById("input-first-name");
    let inputLastName = document.getElementById("input-last-name");

    // Get the values from the form fields
    let customerIdValue = inputCustomerId.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        customerId: customerIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, customerIdValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateRow(data, customerId) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customerId) {
            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of first name and last name
            let firstNameTd = updateRowIndex.getElementsByTagName("td")[1];
            let lastNameTd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign first name and last name to the values we updated to
            firstNameTd.innerHTML = parsedData[0].firstName;
            lastNameTd.innerHTML = parsedData[0].lastName;
        }
    }
}

