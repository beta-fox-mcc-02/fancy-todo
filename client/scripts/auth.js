function login() {
    $.ajax("http://localhost:3000/users/login", {
        method: 'POST',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(response => {
            localStorage.removeItem('welcome')
            localStorage.setItem('token', response.token)
            homePage()
            $('#nav-login').hide()
            $('#nav-register').hide()
            btnSignOutCondition()
            $('#welcome').show()
            $('#catet-btn').show()
            $('#catet-text').hide()
            $('#nav-logout').show()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete')
        })
}

function logout() {
    $('#welcome').show()
    $('#list-todo').hide()
    $('#nav-add-todo').hide()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-logout').hide()
    $('#catet-btn').hide()
    $('#catet-text').show()
    $('#nav-holiday').hide()

    localStorage.clear()
    localStorage.setItem('welcome', 'welcome')
}

function register() {
    $.ajax("http://localhost:3000/users/register", {
        method: 'POST',
        data: {
            email: $('#register-email').val(),
            password: $('#register-password').val()
        }
    })
        .done(response => {
            console.log(response)
            $('#nav-home').show()
            $('#register').hide()
            $('#login').show()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete register')
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
            homePage()
            $('#nav-login').hide()
            $('#nav-register').hide()
            $('#nav-g-logout').show()
            $('#welcome').show()
            $('#catet-btn').show()
            $('#catet-text').hide()
            localStorage.removeItem('welcome')
            localStorage.setItem('token', response.token)
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
    auth2.signOut()
        .then(function () {
            // homePage()
            $('#welcome').show()
            $('#list-todo').hide()
            $('#nav-add-todo').hide()
            $('#nav-login').show()
            $('#nav-register').show()
            $('#nav-g-logout').hide()
            $('#catet-btn').hide()
            $('#catet-text').show()
            $('#nav-holiday').hide()

            localStorage.clear()
            console.log('User signed out.')
            localStorage.setItem('welcome', 'welcome')
        })
}