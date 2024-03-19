/* UPDATE FOR ORDERS */

 // Get the objects we need to modify
 let updateOrderDetailsForm = document.getElementById('update-order-details-form-ajax');

 // Modify the objects we need
 updateOrderDetailsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("orderIDSelect");
     let inputCustomerID = document.getElementById("input-customer-id");
    let inputOrderDate = document.getElementById("input-order-date");
    let inputNumOfOrders = document.getElementById("input-num-of-orders");
    let inputTotalAmount = document.getElementById("input-total-amount");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
     let customerIDValue = inputCustomerID.value;
    let orderDateValue = inputOrderDate.value;
    let numOfOrdersValue = inputNumOfOrders.value;
    let totalAmountValue = inputTotalAmount.value;

    // Put our data we want to send in a JavaScript object
     let data = {
       orderID: orderIDValue,
        customerID: customerIDValue,
          orderDate: orderDateValue,
        numOfOrders: numOfOrdersValue,
        totalAmount: totalAmountValue
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

   let table = document.getElementById("order-details-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
     // Iterate through rows
      // Rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {

          // Get the location of the row where we found the matching order ID
             let updateRowIndex = table.getElementsByTagName("tr")[i];


            // Get td of customer ID value
            let tdCustomerID = updateRowIndex.getElementsByTagName("td")[1];
           // Get td of order date value
             let tdOrderDate = updateRowIndex.getElementsByTagName("td")[2];
            // Get td of number of orders value
          let tdNumOfOrders = updateRowIndex.getElementsByTagName("td")[3];
           // Get td of total amount value
          let tdTotalAmount = updateRowIndex.getElementsByTagName("td")[4];

           // Reassign values to the updated ones
             tdCustomerID.innerHTML = parsedData[0].customerID;
          tdOrderDate.innerHTML = parsedData[0].orderDate;
           tdNumOfOrders.innerHTML = parsedData[0].numOfOrders;
          tdTotalAmount.innerHTML = parsedData[0].totalAmount;
     }
    }
 }
