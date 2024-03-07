// // code for deletePerson function using jQuery
function deleteBook(bookID) {
    console.log(bookID)
    let link = '/delete-book-ajax/';
    let data = {
      id: bookID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(bookID);
      }
    });
  }
  
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
