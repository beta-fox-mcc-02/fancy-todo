function home() {
    $('#home-page').show();
    $('#register').hide();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();
}

function register() {
    $('#home-page').hide();
    $('#register').show();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();

}

function login() {
    $('#home-page').hide();
    $('#register').hide();
    $('#login').show();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();
}

// function listAll() {
//     axios({
//         method: 'GET',
//         url: 'http://localhost:3000/todos',
        
//     })
    
// }

function genTodoForm() {
    $('#home-page').hide();
    $('#register').hide();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').show();
}

$(document).ready(() => {
    home()
    if(localStorage.token) {
        $('#btn-logout').show()
        $('#btn-login').hide()
    } else {
        $('#btn-logout').hide()
        $('#btn-login').show()
    }
    $('a#logo-home').on('click', () => {
        home()
    })
    $('a#home').on('click', () => {
        home()
    })
    $('a#btn-register').on('click', () => {
        register()
    })
    $('a#btn-login').on('click', () => {
        login()
    })
    $('a#todo-create').on('click', () => {
        genTodoForm()
    })
    $('form#register-form').on('submit', (e) => {
        e.preventDefault()
        let email = $('#input-new-email').val()
        let password = $('#input-new-password').val()
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: {
                email,
                password
            }
        })
            .done(({data}) => {
                console.log(data)
                login()
                $('#success-alert').show();
            })
            .fail(err => {
                console.log(err.responseJSON.msg)
                register()
                $('#warning-alert').show();
            })
    })
    $('form#login-form').on('submit', (e) => {
        e.preventDefault()
        let email = $('#input-email').val()
        let password = $('#input-password').val()
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: {
                email,
                password
            }
        })
            .done(({data}) => {
                console.log(data)
                localStorage.token = data.token
                home()
                $('#btn-logout').show()
                $('#btn-login').hide()
                $('#success-alert').show();
            })
            .fail(err => {
                console.log(err.responseJSON.msg)
                login()
                $('#warning-alert').show();
            })
    })
    $('#btn-logout').on('click', () => {
        $('#btn-logout').hide()
        $('#btn-login').show()
        localStorage.clear()
    })
})