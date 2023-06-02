const loginNav = document.querySelector('.login');
const signupNav = document.querySelector('.signup');
const signupLink = document.querySelector('.register-link');
const home = document.querySelector('.home');



home.addEventListener("click", () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../shop.html';
    }
    else {
        window.location.href = '../index.html';
    }
})

loginNav.addEventListener("click", () => {
    window.location.href = "index.html"
})

signupNav.addEventListener("click", () => {
    window.location.href = "../signup";
})


const email = document.querySelector('#login-email');
const loginSubmit = document.querySelector('.login-button');
const password = document.querySelector('#login-password');
// at this page local storage must contain a users key
const users = JSON.parse(localStorage.getItem('users'));
// filter out the logged in details from users array and store that user in current user object;
const currentUser = {};

loginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    // if 
    if (!users) {
        alert('You have not sign up yet. Please Sign Up first.');
        window.location.href = '../signup'
        return;
    }

    let invalidCredentials = true;
    users.map(data => {
        if (data.email === email.value && data.password === password.value) {
            invalidCredentials = false;
            currentUser.email = data.email;
            currentUser.name = data.name;
            currentUser.password = data.password;
        }
        if (invalidCredentials) {
            alert("Invalid email or password!!!");
            return false;
        }
        else {
            currentUser.token = `${Math.random().toString(26).slice(2)}${Math.random().toString(26).slice(2, 6)}`;
            window.localStorage.setItem('currentUser', (JSON.stringify(currentUser)));
            alert('Logged in successfully!!!')
            window.location.href = '../shop';
        }
    });
})

// if user is already logged in redirect him to landing page
if (window.localStorage.getItem('currentUser')) {
    window.location.href = '../shop';
}
