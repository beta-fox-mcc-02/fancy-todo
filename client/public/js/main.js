function home() {
    $('#home-page').show();
    $('#register').hide();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();
    $('#todo-cards').hide();
    $('#no-todo-found').hide();
}

function register() {
    $('#home-page').hide();
    $('#register').show();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();
    $('#todo-cards').hide();
    $('#no-todo-found').hide();
}

function login() {
    $('#home-page').hide();
    $('#register').hide();
    $('#login').show();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').hide();
    $('#todo-cards').hide();
    $('#no-todo-found').hide();
}

//? google sign in functions belum berfungsi dengan baik
// function onSignIn(googleUser) {
//     let profile = googeUser.getBasicProfile();
//     let id_token = googleUser.getAuthResponse().id_token;
// }

// function signOut() {
//     let auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
// }


function listAll() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            token: localStorage.token
        }
    })
        .done(({data}) => {
            console.log(data)
            if(data.length) {
                $('#todo-cards').empty()
                data.forEach(todo => {
                    let status = () => {
                        if(todo.status) {
                            return 'Done'
                        } else {
                            return 'Not Done'
                        }
                    }
                    $('#todo-cards').append(`<div class="col-sm-3"><div class="card"><div class="card-body"><h5 class="card-title">${todo.title}</h5><p class="card-text">${todo.description}</p><p class="card-text">Due Date: ${new Date(todo.due_date).toLocaleDateString()}</p><p class="card-text">Status: ${status()}</p><a id="edit-todo" href="#" class="card-link">Edit</a><a id="delete-todo" href="#" class="card-link">Delete</a></div></div></div>`)
                })
                $('#home-page').hide();
                $('#register').hide();
                $('#login').hide();
                $('#success-alert').hide();
                $('#warning-alert').hide();
                $('#todo-new').hide();
                $('#todo-cards').show();
                $('#no-todo-found').hide();
            } else {
                $('#home-page').hide();
                $('#register').hide();
                $('#login').hide();
                $('#success-alert').hide();
                $('#warning-alert').hide();
                $('#todo-new').hide();
                $('#todo-cards').hide();
                $('#no-todo-found').show();
            }
            
        })
        .fail(err => {
            console.log(err)
            home()
        })
}

function genTodoForm() {
    $('#home-page').hide();
    $('#register').hide();
    $('#login').hide();
    $('#success-alert').hide();
    $('#warning-alert').hide();
    $('#todo-new').show();
}

//? feature find on, update and delete untuk todo belum jadi

$(document).ready(() => {
    home()
    if(localStorage.token) {
        $('#btn-logout').show()
        $('#btn-login').hide()
        $('a#btn-register').hide();
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
                $('a#btn-register').hide();
                $('#success-alert').show();
            })
            .fail(err => {
                console.log(err.responseJSON.msg)
                login()
                $('#warning-alert').show();
            })
    })
    $('#btn-logout').on('click', () => {
        home()
        $('#btn-logout').hide()
        $('#btn-login').show()
        $('a#btn-register').show()
        localStorage.clear()
    })

    //? login google belum jadi

    $('#todo-new').on('submit', (e) => {
        e.preventDefault()
        let title = $('#input-title').val()
        let description = $('#input-description').val()
        let due_date = $('#input-due-date').val()
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/todos',
            data: {
                title,
                description,
                due_date
            },
            headers: {
                token: localStorage.token
            }
        })
            .done(({data}) => {
                listAll()
            })
            .fail(err => {
                console.log(err)
                genTodoForm()
            })
    })

    $('#todo-read-all').on('click', () => {
        if(localStorage.token) {
            listAll()
        } else {
            login()
        }
    })
})