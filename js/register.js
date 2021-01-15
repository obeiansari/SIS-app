const myform = document.querySelector('#myform');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const confirmpassword = document.querySelector('#confirmpassword');


myform.addEventListener('submit', onSubmit);
username.addEventListener('keyup', validateUserName);
password.addEventListener('keyup', validatePassword);
confirmpassword.addEventListener('keyup', validateConfirmPassword);

function validateUserName() {
    if (username.value === '') {
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        username.nextElementSibling.textContent = 'This field is required';
        return false;
    }
    if (username.value.length < 3) {
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        username.nextElementSibling.textContent = 'At least 3 char required';
        return false;
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(username.value)) {
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        username.nextElementSibling.textContent = 'Invalid email';
        return false;
    }

    username.classList.add('is-valid');
    username.classList.remove('is-invalid');
    username.nextElementSibling.textContent = '';
    return true;
}

function validatePassword() {
    if (password.value === '') {
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
        password.nextElementSibling.textContent = 'This field is required';
        return false;
    }
    if (password.value != confirmpassword.value) {
        confirmpassword.classList.add('is-invalid');
        confirmpassword.classList.remove('is-valid');
        confirmpassword.nextElementSibling.textContent = 'Please enter same password as above';
        return false;
    }

    password.classList.add('is-valid');
    password.classList.remove('is-invalid');
    password.nextElementSibling.textContent = '';
    return true;
}

function validateConfirmPassword() {
    if (confirmpassword.value === '') {
        confirmpassword.classList.add('is-invalid');
        confirmpassword.classList.remove('is-valid');
        confirmpassword.nextElementSibling.textContent = 'This field is required';
        return false;
    }
    if (password.value != confirmpassword.value) {
        confirmpassword.classList.add('is-invalid');
        confirmpassword.classList.remove('is-valid');
        confirmpassword.nextElementSibling.textContent = 'Please enter same password as above';
        return false;
    }

    confirmpassword.classList.add('is-valid');
    confirmpassword.classList.remove('is-invalid');
    confirmpassword.nextElementSibling.textContent = '';
    return true;
}


function isValid() {
    const isUserName = validateUserName();
    const isPassword = validatePassword();
    const isConfirmPassword = validateConfirmPassword();
    return isUserName && isPassword && isConfirmPassword;
}

function onSubmit(e) {
    e.preventDefault();
    if (!isValid()) {
        return;
    } else {
        const data = {
            username: username.value,
            password: password.value,
        };

        $.ajax({
            type: 'POST',
            url: `http://localhost:3000/api/account/register`,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (response) => {
                location.href = 'http://127.0.0.2:5501/login.html';
            },
            error: (error) => {
                if (error.status === 409) {
                    alert(error.responseJSON.message);
                } else {
                    alert('Something went wrong');
                }
            }
        })
    }
}