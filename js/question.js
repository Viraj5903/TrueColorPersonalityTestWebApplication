/* const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton"); */
const errorMessage = document.getElementById('errorMessage');

let cache = window.sessionStorage;

let currentQuestion = parseInt(cache.getItem("currentQuestion"));

console.log("Session Storage: ");
console.log(cache);

// Showing previous option value as checked which were checked.
function loadPreviousData() {

    if (`answer${currentQuestion}` in cache) {

        let options = ['A', 'B', 'C', 'D'];

        // A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        // The JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
        // JSON.parse is a method in JavaScript used to parse a JSON string and convert it into a JavaScript object.
        answer = JSON.parse(cache[`answer${currentQuestion}`]);
        // console.log(answer);

        answer.forEach(function (value, index) {

            // console.log(options[index], value);

            // $(`input[name="option${options[index]}"][value="${value}"]`).prop('checked', true);

            /* W3School: https://www.w3schools.com/jquery/html_prop.asp
            The prop() method sets or returns properties and values of the selected elements.
            When this method is used to return the property value, it returns the value of the FIRST matched element.
            When this method is used to set property values, it sets one or more property/value pairs for the set of matched elements. 
            // $(`input[name="option${options[index]}"][value="${value}"]`).checked = true;
            */

            document.querySelector(`input[name="option${options[index]}"][value="${value}"]`).checked = true;
        })
    }

    else {
        return;
    }
}

window.onload = loadPreviousData;

function validateForm() {

    // Initialize an array to store selected options in sequence
    let selectedOptions = [];

    // Get selected order for each option (a, b, c, d)
    let orderA = Number($('input[name="optionA"]:checked').val());
    let orderB = Number($('input[name="optionB"]:checked').val());
    let orderC = Number($('input[name="optionC"]:checked').val());
    let orderD = Number($('input[name="optionD"]:checked').val());
    // console.log(orderA);

    // Check if every option has an associated order
    if (!orderA || !orderB || !orderC || !orderD) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error: Every option must have an associated order for each question.";
        // alert("Error: Every option must have an associated order for each question.");
        return;
    }

    // Add selected options to the array in sequence
    selectedOptions.push(orderA, orderB, orderC, orderD);

    // console.log("Form submitted successfully!");
    // console.log("Selected options array:", selectedOptions);

    // JSON is a format for storing and transporting data. JSON is often used when data is sent from a server to a web page.
    // JSON (JavaScript Object Notation) is a lightweight data interchange format that represents data as key-value pairs. It is easy for both humans to read and write and for machines to parse and generate. JSON is commonly used to transmit data between a server and a web application, and it serves as a language-independent data format.

    // JSON.stringify is a method in JavaScript used to convert a JavaScript object into a JSON string.
    // Converting the JavaScript object into JSON Format and storing into the cache.
    cache.setItem(`answer${currentQuestion}`, JSON.stringify(selectedOptions));

    // For question 1 to 11 only.
    if (currentQuestion < 11) {

        // Incrementing the currentQuestion.
        currentQuestion++;

        // Storing the next question.
        cache.setItem("currentQuestion", currentQuestion);

        window.location.href = `./question${currentQuestion}.html`;
    }
    else {
        window.location.href = `./result.html`;
    }
}

// With using jQuery
$('#nextButton').click(function (event) {
    event.preventDefault();
    validateForm();
});

// Without using jQuery
/* const nextButton = document.getElementById("nextButton");
nextButton.onclick = validateForm; */

// With using jQuery
$('#previousButton').click(function (event) {
    event.preventDefault();

    // Decrementing the currentQuestion.
    currentQuestion--;

    // Storing the next question.
    cache.setItem("currentQuestion", currentQuestion);

    window.location.href = `./question${currentQuestion}.html`;
});

// Without using jQuery
/* const previousButton = document.getElementById("previousButton");
previousButton.onclick = function (event) {

    event.preventDefault();

    // Decrementing the currentQuestion.
    currentQuestion--;

    // Storing the next question.
    cache.setItem("currentQuestion", currentQuestion);

    window.location.href = `./question${currentQuestion}.html`;
} */

function clickedOptionCheck(selectedOption, otherOptions) {

    /* 
    let selected = document.querySelector('input[name="' + selectedOption + '"]:checked').value;
    
    let radio1 = document.querySelector('input[name="' + otherOptions[0] + '"][value="' + selected + '"]');
    let radio2 = document.querySelector('input[name="' + otherOptions[1] + '"][value="' + selected + '"]');
    let radio3 = document.querySelector('input[name="' + otherOptions[2] + '"][value="' + selected + '"]'); 
    */

    /* let selected = document.querySelector(`input[name="${selectedOption}"]:checked`).value;

    let radio1 = document.querySelector(`input[name="${otherOptions[0]}"][value="${selected}"]`);
    let radio2 = document.querySelector(`input[name="${otherOptions[1]}"][value="${selected}"]`);
    let radio3 = document.querySelector(`input[name="${otherOptions[2]}"][value="${selected}"]`);

    radio1.checked = false;
    radio2.checked = false;
    radio3.checked = false; */

    // Selecting the value of the selected option which is checked.
    let selected = document.querySelector(`input[name="${selectedOption}"]:checked`).value;

    // Unchecking the other options which have value = ${selected}.
    document.querySelector(`input[name="${otherOptions[0]}"][value="${selected}"]`).checked = false;
    document.querySelector(`input[name="${otherOptions[1]}"][value="${selected}"]`).checked = false;
    document.querySelector(`input[name="${otherOptions[2]}"][value="${selected}"]`).checked = false;
}

// Adding event listener to all radio buttons
document.querySelectorAll('input[type="radio"]').forEach(function (radio, key) {

    // console.log(key);

    radio.addEventListener('click', function () {

        // Get the option name (e.g., optionA, optionB, etc.)
        let optionName = this.name;

        // Determine the other options based on the clicked option
        let otherOptions = ['optionA', 'optionB', 'optionC', 'optionD'].filter(function (value, index) {
            // console.log(`Value = ${value}. Index = ${index}`);
            if (value !== optionName) {
                return true;
            }
            else {
                return false;
            }
        });

        // Create an array using filter method and select all the other options expect 'optionName' variable.
        // The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
        // The filter() method returns a new array with all elements that pass the test defined by the given function.
        // Here filter is a callback function.

        // Call the clickedOptionCheck function.
        clickedOptionCheck(optionName, otherOptions);
    });
});