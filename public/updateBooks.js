// Get the form element
let updateBookForm = document.getElementById('update-book-form-ajax');

// Modify the form submission behavior
updateBookForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to retrieve data from
    let inputBookID = document.getElementById("bookID");
    let inputBookName = document.getElementById("bookName");
    let inputCategory = document.getElementById("category");
    let inputAuthor = document.getElementById("author");
    let inputPrice = document.getElementById("price");

    // Get the values from the form fields
    let bookIDValue = inputBookID.value;
    let bookNameValue = inputBookName.value;
    let categoryValue = inputCategory.value;
    let authorValue = inputAuthor.value;
    let priceValue = inputPrice.value;
    
    // Create a data object with the values
    let data = {
        bookID: bookIDValue,
        bookName: bookNameValue,
        category: categoryValue,
        author: authorValue,
        price: priceValue
    }
    
    // Set up the AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-book-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define how to handle the response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the table with the new data
            updateRow(xhttp.response, bookIDValue);
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

// Function to update the table row with new data
function updateRow(data, bookID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("booksTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       // Iterate through rows
       if (table.rows[i].getAttribute("data-value") == bookID) {

            // Get the location of the row with the matching book ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update cells with new data
            let cells = updateRowIndex.getElementsByTagName("td");
            cells[0].innerText = parsedData.bookID;
            cells[1].innerText = parsedData.bookName;
            cells[2].innerText = parsedData.category;
            cells[3].innerText = parsedData.author;
            cells[4].innerText = parsedData.price;

            // Exit loop since we found the row
            break;
       }
    }
}

