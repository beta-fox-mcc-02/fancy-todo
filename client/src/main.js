function readTodo(token) {
    $.ajax('http://localhost:3000/todos', {
        method: "GET",
        headers: {
            token: token || localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                $('#todos').append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].due_date}</td>
                    <td>
                        <a href='#' id='delete'>Delete</a> |
                        <a href='#' id='Edit'>Edit</a> |
                        <a href='#' id='mark'>Done Todos</a>
                    </td>
                </tr>
                `)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function signIn() {
    const email = $('#emailIn').val()
    const password = $('#passwordIn').val()
    $.ajax('http://localhost:3000/login', {
        method: 'POST',
        data: {
            email, password
        }
    })
        .done(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            $('#signIn').hide()
            $('#getSignIn').hide()
            $('#getSignUp').hide()
            $('#getLogOut').show()
            $('#landing-page').hide()
            readTodo()
            $('#user-home').show()
        })
        .fail(err => {
            console.log(err)
        })
}

function signUp() {
    const email = $('#emailReg').val()
    const password = $('#passwordReg').val()
    // console.log(email, password)
    $.ajax('http://localhost:3000/register', {
        method: 'POST',
        data: {
            email, password
        }
    })
        .done(() => {
            $('#signIn').show()
            console.log('success register')
        })
        .fail(err => {
            console.log(err)
            console.log('failed register')
        })
}

function addTodo(e) {
    const title = $('#title-add').val()
    const description = $('#description-add').val()
    const due_date = $('#date-add').val()
    // console.log(title, description, due_date)
    $.ajax('http://localhost:3000/todos', {
        method: 'POST',
        data: {
            title, description, due_date
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            e.preventDefault()
            readTodo()
            $('#user-home').show()
            $('#form-add-todo').hide()
            // console.log(data)
        })
        .fail(err => {
            console.log(err)
        })
}

function home() {
    if (localStorage.token) {
        $('#user-home').show()
        $('#getSignIn').hide()
        $('#getSignUp').hide()
        $('#getLogOut').show()
        $('#signUp').hide()
        $('#signIn').hide()
        $('#landing-page').hide()
        $('#delete-oy').hide()
        readTodo()
    } else {
        $('#landing-page').show()
        $('#signUp').hide()
        $('#signIn').hide()
        $('#user-home').hide()
        $('#getLogOut').hide()
        $('#form-add-todo').hide()
        $('#delete-oy').hide()
    }
}

$(document).ready(() => {
    home()
    $('#getHome').on('click', () => {
        home()
    })

    $('#getSignIn').on('click', function () {
        $('#signUp').hide()
        $('#signIn').show()
        $('#user-home').hide()
    })

    $('#getSignUp').on('click', function () {
        $('#signIn').hide()
        $('#signUp').show()
        $('#user-home').hide()
    })

    $('#signUp').on('submit', () => {
        signUp()
    })

    $('#signIn').on('submit', () => {
        signIn()
    })

    $('#getLogOut').on('click', () => {
        localStorage.clear()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        $('#landing-page').show()
        $('#getSignUp').show()
        $('#getSignIn').show()
        $('#signUp').hide()
        $('#signIn').hide()
        $('#user-home').hide()
        $('#getLogOut').hide()
        $('#form-add-todo').hide()
    })

    $('#add-todo').on('click', () => {
        $('#user-home').hide()
        $('#form-add-todo').show()
    })

    $('#form-add-todo').on('submit', (e) => {
        addTodo(e)
    })
})