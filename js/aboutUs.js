
let cache = window.sessionStorage;

if ('username' in cache) {

    let login_logout = document.getElementById('login_logout');
    login_logout.textContent = 'Log out';
    login_logout.href = './logout.html';
}
