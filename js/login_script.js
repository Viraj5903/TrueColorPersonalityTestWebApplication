
const username = document.getElementById("username");
const password = document.getElementById("password");
const incorrectMessage = document.getElementById("incorrect-message");
const submitButton = document.getElementById("submit_button");

function passwordGenerator() {

    const possibleCharacter = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ !@#$%^&*()[]{}*/+-=?.,;['\"\\><|`~";
    const length = 12;
    let password = "";

    let randomIndex = 0;

    for (let i = 0; i < length; i++) {
        // Selecting the random index.
        randomIndex = Math.floor(Math.random() * possibleCharacter.length);

        // Adding the character present on randomIndex position into password string.
        password += possibleCharacter[randomIndex];
    }

    return password;
}

let correctPassword = passwordGenerator();

console.log(`Correct password = ${correctPassword}`);

// Using jQuery
$('#eye').click(function (event) {
    event.preventDefault();

    // Toggle Password Visibility
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});

// Without using jQuery
// const eye = document.getElementById("eye");
/* eye.onclick = function () {
    // Toggle Password Visibility
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
} */

submitButton.addEventListener("click", function checkUser(event) {

    event.preventDefault();

    /* console.log(username.value);
    console.log(password.value); */

    if (username.value === '' || password.value !== correctPassword) {

        if (username.value === '') {
            incorrectMessage.innerHTML = `Please enter the username.`;
        }

        else {
            incorrectMessage.innerHTML = `Incorrect Password. Try again`;
        }

        clearInput();
    }

    else {
        let cache = window.sessionStorage;

        cache.setItem("username", username.value);
        cache.setItem("password", correctPassword);

        window.location.href = "./home.html";
    }
});

function clearInput() {
    username.value = "";
    password.value = "";
}

// submitButton.addEventListener("click", checkUser);

// Using jQuery
$('#login_forgot').click(function (event) {
    event.preventDefault();
    password.value = correctPassword;
});

// Without using jQuery
// const forgotPassword = document.getElementById("login_forgot");
/* forgotPassword.addEventListener("click", function () {
    // alert(`Password = ${correctPassword}.`);
    // console.log(`Password = ${correctPassword}`);
}); */