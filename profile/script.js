// Write your script here
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const saveInfo = document.getElementById('save-info');
const oldPassword = document.getElementById('o-pw');
const newPassword = document.getElementById('n-pw');
const confirmPassword = document.getElementById('c-pw');
const changePasswordBtn = document.getElementById('cpw-btn');

const rawCUserData = localStorage.getItem('currentUser');
const rawUsersData = localStorage.getItem('users');
var users = []
var cUser = {};
if (rawCUserData) {
    cUser = JSON.parse(rawCUserData)
}
if (rawUsersData) {
    users = JSON.parse(rawUsersData)
}

// console.log(users)

users.forEach((element) => {
    if (element.email == cUser.email) {
        fname.value = element.firstName;
        lname.value = element.lastName;
    }
})
var fnameValue = ''
var lnameValue = ''
fname.addEventListener("keyup", (e) => {
    fnameValue = e.target.value;
})
lname.addEventListener("keyup", (e) => {
    lnameValue = e.target.value;
})

saveInfo.addEventListener("click", () => {
    users.forEach((element) => {
        if (element.email == cUser.email) {
            element.firstName = fnameValue;
            console.log(element.firstName)
            element.lastName = lnameValue;
            const newUsers = JSON.stringify(users)
            localStorage.setItem('users', newUsers)
        }
    })
})

var oldPasswordValue = '';
var newPasswordValue = '';
var newPasswordConfirmValue = '';

oldPassword.addEventListener("keyup", (e) => {
    oldPasswordValue = e.target.value;

})
newPassword.addEventListener("keyup", (e) => {
    newPasswordValue = e.target.value;

})
confirmPassword.addEventListener("keyup", (e) => {
    newPasswordConfirmValue = e.target.value;

})

changePasswordBtn.addEventListener("click", () => {
    users.forEach((element) => {
        if (element.email == cUser.email) {
            if (element.password == oldPasswordValue) {
                if (newPasswordValue == newPasswordConfirmValue) {
                    element.password = newPasswordValue;
                    const newUsers = JSON.stringify(users)
                    localStorage.setItem('users', newUsers)
                } else {
                    alert('Password does not match')
                }
            }
            else {
                alert('Old Password Does not match !')
            }
        }
    })
})