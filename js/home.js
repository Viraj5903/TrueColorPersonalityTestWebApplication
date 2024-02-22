
let cache = window.sessionStorage;

if ('username' in cache) {

    let login_logout = document.getElementById('login_logout');
    login_logout.textContent = 'Log out';
    login_logout.href = './logout.html';

    // With using jQuery
    $('#buttonTest').click(function (event) {
        event.preventDefault();
        window.location.href = './question1.html';
    });

    // Without using jQuery
    /* const buttonTest = document.getElementById('buttonTest');
    buttonTest.onclick = function () {
        window.location.href = './question1.html';
    } */

}
else {

    // With using jQuery
    $('#buttonTest').text('Log in').click(function (event) {
        event.preventDefault();
        window.location.href = './index.html';
    })

    // Without using jQuery
    /* const buttonTest = document.getElementById('buttonTest');
    buttonTest.textContent = 'Log in';
    buttonTest.onclick = function () {
        window.location.href = './index.html';
    } */
}
