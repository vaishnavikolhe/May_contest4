const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const loginLink = document.querySelector('.login-link');
const home = document.querySelector('.home');

const firstname = document.querySelector('#signup-first-name');
const lastname = document.querySelector('#signup-last-name');
const mail = document.querySelector('#signup-email');
const passwords = document.querySelector('#signup-password');
const  cpasswords= document.querySelector('#signup-confirm-password');
const signupButton = document.querySelector('.signup-button');
var firstName="";
firstname.addEventListener("keyup",(e)=>{
    firstName=e.target.value;
})
var lastName="";
lastname.addEventListener("keyup",(e)=>{
    lastName=e.target.value;
})
var email="";
mail.addEventListener("keyup",(e)=>{
    email=e.target.value;
})
var password="";
passwords.addEventListener("keyup",(e)=>{
    password=e.target.value;
})
var confirmPassword="";
cpasswords.addEventListener("keyup",(e)=>{
    confirmPassword=e.target.value;
})
let users = [];
// if local storage contains 'users' key then assign the value of that key to 'users' variable else assign an empty array to 'users' variable. this ensures that every time the users array will get update with addition of new user
localStorage.getItem('users') ? users = JSON.parse(localStorage.getItem('users')) : [];

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Name Validation
    const fname = firstName.trim();
    const lname = lastName.trim();
    if (fname.length === 0 && lname.length ==0) {
        alert('Please enter valid name!!!');
        return false;
    }

    ///Email Validation
    if (email.indexOf('@') < 2) {
        alert("Please enter valid email address!!!");
        return false;
    }
    else if (email.lastIndexOf('.') !== email.length - 4 && email.lastIndexOf('.') !== email.length - 3) {
        alert("Please enter valid email address!!!");
        return false;
    }

    let sameEmail = false;
    let userArr = []
    if (localStorage.getItem('users')) {
        userArr = JSON.parse(localStorage.getItem('users'))
        if (userArr.filter(user => user.email == email).length != 0) {
            alert('Email already exists!!! Please go to login or sign up with another email address!!!');
            return false;
        }
    }

    //Password Validation
    if (password.trim().length < 4) {
        alert('Password must contains at least 4 characters!!!');
        return false;
    }

    //Confirm password validation
    if (password.trim() !== confirmPassword.trim()) {
        alert("Password and Confirm Password should be same!!!");
    }
    else {  // all input data is correct and email is also not exist in system  then just add user to local storage
        const userData = {
            firstName:fname.trim(),
            lastName: lname.trim(),
            email: email.trim(),
            password: password.trim(),
        }
        users.push(userData);  // Update Users array which contains all the users who sign up till date
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = "../login";  // redirect user to login page
        alert('Signed up successfully!!! Please login to continue!!!');
    }
})

// if user is not logged out then redirect the last logged in user to shop page
if (window.localStorage.getItem('currentUser')) {
    window.location.href = '../shop';
}