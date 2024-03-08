function deleteBook(bookID) {
    console.log(bookID)
    let link = '/delete-book-ajax/';
    let data = {
      bookID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-book-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            // deleteRow(personID);
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
};
  
function deleteOrderDetail(orderID, bookID) {
    console.log(orderID, bookID);
    let link = '/delete-orderDetail-ajax/';
    let data = {
      orderID, bookID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-orderDetail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            // deleteRow(personID);
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
};

function deleteOrder(orderID) {
  console.log(orderID);
  let link = '/delete-order-ajax/';
  let data = {
    orderID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-order-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          // deleteRow(personID);
          location.reload();

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
};


function deleteCustomer(customerID) {
  console.log(customerID)
  let link = '/delete-customer-ajax/';
  let data = {
    customerID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          // deleteRow(personID);
          location.reload();

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}
