const myform = document.querySelector('#myform');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

myform.addEventListener('submit', onSubmit);
username.addEventListener('keyup', validateUserName);
password.addEventListener('keyup', validatePassword);

function validateUserName() {
    if (username.value === '') {
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        username.nextElementSibling.textContent = 'This field is required'
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
    } else {
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
        password.nextElementSibling.textContent = '';
        return true;
    }
}

function isValid() {
    const isUserName = validateUserName();
    const isPassword = validatePassword();
    return isUserName && isPassword;
}

function onSubmit(e) {
    e.preventDefault();
    if (!isValid()) {
        return;
    } else {
        // const data = {
        //     username: username.value,
        //     password: password.value,
        // };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/account/login',
            dataType: 'json',
            contentType: 'application.json',
            success: (response) => {
                location.href = 'http://127.0.0.2:5501/dashboard.html';
            },
            error: (error) => {
                if (error.status === 409) {
                    alert(error.responseJSON.message);
                } else {
                    alert('Something went wrong');
                }
            }
        });
    }

}