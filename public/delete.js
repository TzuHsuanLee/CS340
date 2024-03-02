// // code for deletePerson function using jQuery
// function deleteBook(personID) {
//     let link = '/delete-person-ajax/';
//     let data = {
//       id: bookID
//     };
  
//     $.ajax({
//       url: link,
//       type: 'DELETE',
//       data: JSON.stringify(data),
//       contentType: "application/json; charset=utf-8", 
//       success: function(result) {
//         deleteRow(bookID);
//       }
//     });
//   }
  
  
//   function deleteRow(personID){
  
//       let table = document.getElementById("people-table");
//       for (let i = 0, row; row = table.rows[i]; i++) {
//          //iterate through rows
//          //rows would be accessed using the "row" variable assigned in the for loop
//          if (table.rows[i].getAttribute("data-value") == personID) {
//               table.deleteRow(i);
//               break;
//          }
//       }
//   }