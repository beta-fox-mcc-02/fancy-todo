function formCreate() {
    $('table#table').hide()
    $('h1#list').hide()
    $('form#login').hide()
    $('form#register').hide()
    $('form#create').show()
    $('form#edit').hide()
    if (!localStorage.token) {
        $('a#register').show()
        $('a#login').show()
        $('a#logout').hide()
    } else {
        $('a#register').hide()
        $('a#login').hide()
        $('a#logout').show()
    }
}
function formEdit(title, description, due_date) {
    $('table#table').hide()
    $('h1#list').hide()
    $('form#login').hide()
    $('form#register').hide()
    $('form#create').hide()
    $('form#edit').show()
    $('#title-edit').val(title)
    $('#description-edit').val(description)
    $('#due-date-edit').val(due_date)

    if (!localStorage.token) {
        $('a#register').show()
        $('a#login').show()
        $('a#logout').hide()
    } else {
        $('a#register').hide()
        $('a#login').hide()
        $('a#logout').show()
    }
}
function edit(id) {
    localStorage.setItem('id-edit', id)
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            const { title, description, due_date } = data
            console.log(due_date)

            formEdit(title, description, new Date(due_date))
        })
        .fail(err => {
            console.log(err)
        })

}
function destroy(id) {
    localStorage.setItem('id-destroy', id)
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            list()
        })
        .fail(({ err }) => {
            console.log(err)
        })
}
function stat(sts) {
    sts ? sts = false : sts = true
    sts ? list('Done') : list('Undone')
}
function list(status) {
    $('table#table').show()
    $('h1#list').show()
    $('form#login').hide()
    $('form#register').hide()
    $('form#create').hide()
    $('form#edit').hide()
    if (!localStorage.token) {
        $('a#register').show()
        $('a#login').show()
        $('a#logout').hide()
    } else {
        $('a#register').hide()
        $('a#login').hide()
        $('a#logout').show()
        $('tbody#list').empty()
        $.ajax("http://localhost:3000/todos", {
            method: "GET",
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(({ data }) => {
                data.forEach((el, i) => {
                    const wow = new Date(el.due_date)
                    const year = wow.getFullYear()
                    const month = wow.getMonth()
                    const day = wow.getDay()
                    let statusss = null
                    if(status == 'Done'){
                        statusss = true
                    }else if(status = 'Undone'){
                        statusss = false
                    }else{
                        statusss = el.status
                    }

                    $('a#register').hide()
                    $('a#login').hide()
                    $('a#logout').show()
                    $('tbody#list').append(`
                    <tr>
                        <td>${i + 1}</td>
                        <td>${el.title}</td>
                        <td>${el.description}</td>
                        <td><button type="button" class="btn btn-success" id="status-list" onClick="stat(${statusss})">${status}</button></td>
                        <td>${day} - ${month} - ${year}</td>
                        <td><button type="button" class="btn btn-outline-primary btn-sm" id="edit-list" onClick="edit(${el.id})">Edit</button> <button type="button" class="btn btn-outline-danger btn-sm" id="destroy-list" onClick="destroy(${el.id})">Delete</button></td>
                    </tr>`)
                });
            })
            .fail(err => {
                console.log(err)
            })
    }
}
function login() {
    $('form#login').show()
    $('table#table').hide()
    $('h1#list').hide()
    $('form#register').hide()
    $('form#create').hide()
    $('a#logout').hide()
    $('form#edit').hide()
}
function register() {
    $('form#edit').hide()
    $('form#register').show()
    $('form#create').hide()
    $('form#login').hide()
    $('table#table').hide()
    $('h1#list').hide()
    $('a#logout').hide()
}
function onSignIn(googleUser) {
    var token = googleUser.getAuthResponse().id_token;
    $.ajax('http://localhost:3000/gSignIn', {
        method: 'POST',
        headers: {
            token
        }
    })
        .done(data => {
            localStorage.setItem("token", data.token)
            localStorage.setItem('id', data.id)
            $.ajax("http://localhost:3000/todos", {
                method: "GET",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .done(({ data }) => {
                    list()
                })
                .fail(err => {
                    console.log(err)
                })
        })
        .fail(err => console.log(err, 'error cok'))
    list()
    e.preventDefault()
}
function weather() {
    $.ajax("http://localhost:3000/weather", {
            method: "GET",
            data:{
                city:"jakarta",
                country:"id"
            }
        })
            .done(data => {
                console.log('data woi',data)
                // data.forEach((el, i) => {
                
                // });
            })
            .fail(err => {
                console.log(err)
            })
}


$(document).ready(function () {
    weather()
    if (localStorage.token) {
        list()
    } else {
        login()
    }

    // REGISTER
    $('a#register').on('click', () => {
        register()
    })
    $('form#register').submit((e) => {
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        console.log(email, password)
        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
            .done(data => {
                login()
            })
            .fail(err => console.log(err))

        e.preventDefault()
    })

    // LOGOUT
    $('a#logout').on('click', () => {
        $('a#register').show()
        $('a#login').show()
        localStorage.clear()
        login()
    })

    // LOGIN
    $('a#login').on('click', () => {
        login()
    })
    $('form#login').submit((e) => {
        let email = $('#email-login').val()
        let password = $('#password-login').val()
        // console.log(email, password)
        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
            .done(({ data }) => {
                // console.log(data, 'data')
                localStorage.setItem("token", data.token)
                localStorage.setItem('id-login', data.id)
                // console.log('token cok',localStorage.token)
                list()
            })
            .fail(err => console.log(err))

        e.preventDefault()
    })

    // CREATE
    $('a#create').on('click', () => {
        if (!localStorage.token) {
            login()
        } else {
            formCreate()
        }
    })
    $('form#create').submit((e) => {
        let title = $('#title-create').val()
        let description = $('#description-create').val()
        let due_date = $('#due-date-create').val()
        let UserId = localStorage.getItem('id-login')
        // console.log(title, description, due_date)
        $.ajax('http://localhost:3000/todos', {
            method: 'POST',
            data: {
                title,
                description,
                status: false,
                due_date,
                UserId
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(data => {
                console.log(data, 'asiq ter create')
                list()
            })
            .fail(err => console.log(err, 'error cok'))
        e.preventDefault()
    })

    // LIST
    $('a#list').on('click', () => {
        if (!localStorage.token) {
            login()
        } else {
            list()
        }
    })

    // UPDATE
    $('form#edit').submit((e) => {
        const id = localStorage.getItem('id-edit')
        let title = $('#title-edit').val()
        let description = $('#description-edit').val()
        let due_date = $('#due-date-edit').val()
        // console.log(title, description, due_date)

        $.ajax(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            data: {
                title,
                description,
                status: false,
                due_date
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(data => {
                console.log(data, 'asiq ter update')
                list()
            })
            .fail(err => console.log(err, 'error cok'))
        e.preventDefault()
    })

});