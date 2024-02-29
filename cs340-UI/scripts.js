document.addEventListener('DOMContentLoaded', function () {
    const addInventoryForm = document.getElementById('addInventoryForm');
    if (addInventoryForm) {
        addInventoryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Add your logic to handle form submission here
            console.log('Form submitted');
        });
    }

    const updateButtons = document.querySelectorAll('.updateButton');
    updateButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Add your logic for handling update button clicks here
            console.log('Update button clicked');
        });
    });

    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Add your logic for handling delete button clicks here
            console.log('Delete button clicked');
        });
    });
});
