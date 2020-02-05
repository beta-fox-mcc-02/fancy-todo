function login() {
    event.preventDefault()

    $.ajax("http://localhost:3000/users/login", {
        method: 'POST',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(response => {
            console.log(response)
            localStorage.setItem('token', response.token)
            location.reload(true)
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete')
        })
}

function logout() {
    localStorage.clear()
    location.reload(true)
}

function register() {
    event.preventDefault()

    $.ajax("http://localhost:3000/users/register", {
        method: 'POST',
        data: {
            email: $('#register-email').val(),
            password: $('#register-password').val()
        }
    })
        .done(response => {
            console.log(response)
            $('#register').hide()
            $('#login').show()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete')
        })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax("http://localhost:3000/users/gSignIn", {
        method: 'POST',
        headers: {
            id_token
        }
    })
        .done(response => {
            console.log(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete g-sign-in')
        })
  }

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
    console.log('User signed out.');
});
}