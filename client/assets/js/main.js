function noUserLandingPage() {
    $('#home-page').show()
    $('#show-todo').hide()
    $('#no-todo-found').hide()
    $('#newTodoForm').hide()
    $('#todo-update').hide()
    $('#btn-login').show()
    $('#btn-register').show()
    $('#dropdown-action').hide()
    $('#all-todo').hide()
    $('#show-todo').hide()
}

function loggedUserLandingPage() {
    $('#home-page').show()
    $('#show-todo').hide()
    $('#no-todo-found').hide()
    $('#newTodoForm').hide()
    $('#todo-update').hide()
    $('#btn-login').hide()
    $('#btn-register').hide()
    $('#show-todo').hide()
    $('#all-todo').hide()
    $('#dropdown-action').show()
    $('#username-actions').empty()
    $('#username-actions').append(`<img src="https://robohash.org/${localStorage.currentUser}?set=set5" width="23" height="23" alt="${localStorage.currentUser} icon"> ${localStorage.currentUser}`)
}

function register() {
    let name = $('#input-new-name').val()
    let email = $('#input-new-email').val()
    let password = $('#input-new-password').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            name,
            email,
            password
        }
    })
        .done(({data}) => {
            console.log(data)
            $('#registerForm').modal('hide')
            $('.error-message').empty()
            setTimeout(() => {
                $('#loginForm').modal('show')
            }, 400)
        })
        .fail(err => {
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
}

function login() {
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
            localStorage.currentUser = data.name
            listAll()
            $('#loginForm').modal('hide')
            $('.error-message').empty()
            $('#btn-login').hide()
            $('#btn-register').hide();
            $('#dropdown-action').show()
            $('#username-actions').empty()
            $('#username-actions').append(`<img src="https://robohash.org/${data.name}?set=set5" style="width: 10%;" alt="assets/img/favicon/aeab52dcc9ee9b028f28623a7778de3b.ico"> ${data.name}`)
        })
        .fail(err => {
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/gLogin',
        headers: {
          id_token
        }
    })
        .done(({data}) => {
            localStorage.token = data.token
            localStorage.currentUser = data.name
            listAll()
            $('#loginForm').modal('hide')
            $('#btn-login').hide()
            $('#btn-register').hide();
            $('#dropdown-action').show()
            $('#username-actions').empty()
            $('#username-actions').append(`<img src="https://robohash.org/${data.name}?set=set5" style="width: 10%;" alt="assets/img/favicon/aeab52dcc9ee9b028f28623a7778de3b.ico"> ${data.name}`)
        })
        .fail(err => {
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
    
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        console.log('User signed out.');
    });
}

function listAll() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            token: localStorage.token
        }
    })
        .done(({data}) => {
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
                    $('#todo-cards').append(`<div class="col-sm-3"><div class="card"><div class="card-body"><h5 class="card-title">${todo.title}</h5><p class="card-text">${todo.description}</p><p class="card-text">Due Date: ${new Date(todo.due_date).toLocaleDateString()}</p><p class="card-text">Status: ${status()}</p><a href="#" class="card-link btn btn-primary" onclick="genUpdateForm(${todo.id})">Edit</a><a href="#" class="card-link btn btn-danger" onclick="genDeleteConfirm(${todo.id})">Delete</a></div></div></div>`)
                })
                $('#home-page').hide();
                $('#register').hide();
                $('#login').hide();
                $('#newTodoForm').hide();
                $('#all-todo').show();
                $('#show-todo').show();
                $('#no-todo-found').hide();
                $('#todo-update').hide();
            } else {
                $('#home-page').hide();
                $('#register').hide();
                $('#login').hide();
                $('#newTodoForm').hide();
                $('#all-todo').show();
                $('#show-todo').hide();
                $('#no-todo-found').show();
                $('#todo-update').hide();
            }
            
        })
        .fail(err => {
            loggedUserLandingPage()
        })
}

function newTodoSubmit() {
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
            $('#newTodoForm').modal('hide')
            $('.error-message').empty()
            listAll()
        })
        .fail(err => {
            console.log(err)
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
}

function genUpdateForm(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
        .done(({data}) => {
            $('#update-title').val(data.title)
            $('#update-description').val(data.description)
            if(data.status) {
                $('#true-status').attr('checked',true)
            } else {
                $('#false-status').attr('checked',true)
            }
            let date = new Date(data.due_date)
            $('#update-due-date').val(date.toISOString().split('T')[0])
            localStorage.id_todo = data.id
            $('#updateTodoForm').modal('show')
        })
        .fail(err => {
            listAll()
        })
}

function updateTodo(id) {
    let title = $('#update-title').val()
    let description = $('#update-description').val()
    let status = $('input[name=status]:checked', '#todo-update-form').val()
    let due_date = $('#update-due-date').val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.token
        },
        data: {
            title,
            description,
            status,
            due_date
        } 
    })
        .done(({data}) => {
            localStorage.removeItem('id_todo')
            $('#updateTodoForm').modal('hide')
            listAll()
        })
        .fail(err => {
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
}

function genDeleteConfirm(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
        .done(({data}) => {
            $('#delete-todo-id').val(data.id)
            $('#delete-title').val(data.title)
            $('#delete-description').val(data.description)
            if(data.status) {
                $('#delete-true-status').attr('checked',true)
            } else {
                $('#delete-false-status').attr('checked',true)
            }
            let date = new Date(data.due_date)
            $('#delete-due-date').val(date.toISOString().split('T')[0])
            localStorage.id_todo = data.id
            $('#deleteTodoConfirm').modal('show')
        })
        .fail(err => {
            $('.error-message').empty()
            $('.error-message').append(`<small class="form-text text-muted">${err.responseJSON.msg}</small>`)
        })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.token
        } 
    })
        .done(({data}) => {
            listAll()
        })
        .fail(err => {
            listAll()
        })
}

$(document).ready(() => {
    if(localStorage.token) {
        loggedUserLandingPage()
    } else {
        noUserLandingPage()
    }

    // home button
    $('#logo-home').on('click', () => {
        if(localStorage.token) {
            loggedUserLandingPage()
        } else {
            noUserLandingPage()
        }
    })
    $('#home').on('click', () => {
        if(localStorage.token) {
            loggedUserLandingPage()
        } else {
            noUserLandingPage()
        }
    })

    // todo list button
    $('#todo-read-all').on('click', () => {
        listAll()
    })

    // register process
    $('#btn-register-click').on('click', () => {
        $('#input-new-name').val('')
        $('#input-new-email').val('')
        $('#input-new-password').val('')
    })
    $('#register-form').on('submit', event => {
        event.preventDefault()
        register()
    })

    // login process
    $('#btn-login-click').on('click', () => {
        $('#input-email').val('')
        $('#input-password').val('')
    })
    $('#login-form').on('submit', event => {
        event.preventDefault()
        login()
    })

    $('#btn-logout').on('click', () => {
        signOut()
        localStorage.clear()
        noUserLandingPage()
    })

    // submit new todo
    $('#new-todo-modal').on('click', () => {
        $('#input-title').val('')
        $('#input-description').val('')
        $('#input-due-date').val('')
    })
    $('#todo-form').on('submit', event => {
        event.preventDefault()
        newTodoSubmit()
    })

    $('#todo-update-form').on('submit', event => {
        event.preventDefault()
        updateTodo(localStorage.id_todo)
    })

    $('#confirm-delete-todo').on('click', () => {
        deleteTodo($('#delete-todo-id').val())
        $('#deleteTodoConfirm').modal('hide')
    })
})