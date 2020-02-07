function login() {
    $.ajax("http://localhost:3000/users/login", {
        method: 'POST',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            homePage()
            $('#nav-login').hide()
            $('#nav-register').hide()
            btnSignOutCondition()
            $('#catet-btn').show()
            $('#catet-text').hide()
            // $('#home').show()
            // $('#list-todo').show()
            // $('#login').hide()
            // $('#nav-login').hide()
            // $('#nav-register').hide()
            // $('#nav-add-todo').show()
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
    // event.preventDefault()

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

    var token = googleUser.getAuthResponse().id_token;
    
    localStorage.setItem('gToken', token)

    $.ajax("http://localhost:3000/users/gSignIn", {
        method: 'POST',
        headers: {
            id_token: token
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            // afterGSignIn()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete g-sign-in')
        })
  }

function signOut() {
var auth2 = gapi.auth2.getAuthInstance()
auth2.signOut().then(function () {
    localStorage.clear()
    location.reload(true)
    console.log('User signed out.')
})
}