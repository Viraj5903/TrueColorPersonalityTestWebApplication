// Click event for button with id='back-button'
$('#back_button').click(function (event) {
    event.preventDefault();

    // Going to previous page.
    window.history.back();
});

// Without using jQuery
/* const back_button = document.getElementById('back_button');
back_button.onclick = function (event) {
    event.preventDefault();

    // Going to previous page.
    window.history.back();
} */