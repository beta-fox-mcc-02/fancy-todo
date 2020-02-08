function readTodo(token) {
    $.ajax('http://localhost:3000/todos', {
        method: "GET",
        headers: {
            token: token || localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            $('#todos').empty()
            if (data.length === 0) {
                $('.table').hide()
                $('.dont-have-todo').show()
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === true) {
                        const a = new Date(data[i].due_date)
                        const year = a.getFullYear()
                        const month = switchMonth(a.getMonth())
                        const date = a.getDate()
                        $('#todos').append(`
                            <tr>
                                <td style="text-decoration: line-through red;">${i + 1}</td>
                                <td style="text-decoration: line-through red;">${data[i].title}</td>
                                <td style="text-decoration: line-through red;">${data[i].description}</td>
                                <td style="text-decoration: line-through red;">${date} ${month} ${year}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" id="delete" onClick="destroy(${data[i].id})" value="${data[i].id}">Delete</button>
                                    <button type="button" class="btn btn-warning" id="edit" onClick="edit(${data[i].id})" value="${data[i].id}">Edit</button>
                                </td>
                            </tr>
                            `)
                    } else {
                        const a = new Date(data[i].due_date)
                        const year = a.getFullYear()
                        const month = switchMonth(a.getMonth())
                        const date = a.getDate()
                        $('#todos').append(`
                        <tr>
                            <td>${i + 1}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].description}</td>
                            <td>${date} ${month} ${year}</td>
                            <td>
                                <button type="button" class="btn btn-danger" id="delete" onClick="destroy(${data[i].id})" value="${data[i].id}">Delete</button>
                                <button type="button" class="btn btn-warning" id="edit" onClick="edit(${data[i].id})" value="${data[i].id}">Edit</button>
                                <button type="button" class="btn btn-success" id="done" onClick="done(${data[i].id})" value="${data[i].id}">Done Todos</button>
                            </td>
                        </tr>
                        `)
                    }
                }
            }
        })
        .fail(err => {
            alert('error while read your todos')
        })
}

function done(id) {
    localStorage.setItem('id', id)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            const id = localStorage.getItem('id')
            const title = data.title
            const description = data.description
            const status = true
            const due_date = data.due_date
            $.ajax(`http://localhost:3000/todos/${id}`, {
                method: 'PUT',
                data: {
                    title, description, status, due_date
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .done(data => {
                    readTodo()
                    $('#user-home').show()
                    $('.dont-have-todo').hide()
                })
                .fail(err => {
                    console.log(err)
                })

        })
        .fail(err => {
            console.log(err)
        })
}

function switchMonth(val) {
    switch (val) {
        case 0:
            return 'Januari'
        case 1:
            return 'Februari'
        case 2:
            return 'Maret'
        case 3:
            return 'April'
        case 4:
            return 'Mei'
        case 5:
            return 'Juni'
        case 6:
            return 'Juli'
        case 7:
            return 'Agustus'
        case 8:
            return 'September'
        case 8:
            return 'Oktober'
        case 10:
            return 'November'
        case 11:
            return 'Desember'
    }
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
            localStorage.setItem('token', data.token)
            $('#signIn').hide()
            $('#getSignIn').hide()
            $('#getSignUp').hide()
            $('#getLogOut').show()
            $('#landing-page').hide()
            readTodo()
            alert('Login Success')
            $('#user-home').show()
            $('.dont-have-todo').hide()
        })
        .fail(err => {
            alert(err.responseJSON.msg)
        })
}

function signUp() {
    const email = $('#emailReg').val()
    const password = $('#passwordReg').val()
    $.ajax('http://localhost:3000/register', {
        method: 'POST',
        data: {
            email, password
        }
    })
        .done(() => {
            $('#signUp').hide()
            $('#signIn').show()
            alert('Register Success')
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
        })
}

function addTodo(e) {
    const title = $('#title-add').val()
    const description = $('#description-add').val()
    const due_date = $('#date-add').val()
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
            readTodo()
            alert('success add todo')
            e.preventDefault()
            $('#user-home').show()
            $('.table').show()
            $('.dont-have-todo').hide()
            $('#form-add-todo').hide()
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
        })
}

function home() {
    if (localStorage.token) {
        $('#user-home').show()
        $('.dont-have-todo').hide()
        $('#getSignIn').hide()
        $('#getSignUp').hide()
        $('#getLogOut').show()
        $('#signUp').hide()
        $('#signIn').hide()
        $('#landing-page').hide()
        $('#delete-oy').hide()
        $('#form-add-todo').hide()
        $('#form-edit-todo').hide()
        readTodo()
    } else {
        $('#landing-page').show()
        $('#signUp').hide()
        $('#signIn').hide()
        $('#user-home').hide()
        $('#getLogOut').hide()
        $('#form-add-todo').hide()
        $('#delete-oy').hide()
        $('#form-edit-todo').hide()
        api()
    }
}

function destroy(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            alert('todos deleted')
            readTodo()
        })
        .fail(err => {
            alert('todos deleted')
            readTodo()
        })
}

function edit(id) {
    localStorage.setItem('id', id)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            $('.alert').hide()
            $("#form-edit-todo").show()
            $("#user-home").hide()
            $('#title-edit').val(`${data.title}`)
            $('#description-edit').val(`${data.description}`)
        })
        .fail(err => {
            alert('load form edit error')
        })

}

function editTodo(e) {
    const id = localStorage.getItem('id')
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const due_date = $('#date-edit').val()
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
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
            alert('edit success')
            $('#user-home').show()
            $('.dont-have-todo').hide()
            $('#form-edit-todo').hide()
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
        })
}

function api() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/news'
    })
        .done(data => {
            const news = data.data.articles
            $('.row').empty()
            news.forEach(el => {
                $('.row').append(`
                    <div class="col-3 mr-5">
                        <div class="card card-block" style="width: 18rem;">
                            <img class="card-img-top" src="${el.urlToImage}" alt="Card image cap">
                            <div class="card-body">
                                <p class="card-text text-wrap">${el.title}</p>
                                <a href="${el.url}">More...</a>
                            </div>
                        </div>
                    </div>
                `)
            });
        })
        .fail(err => {
            alert('error fetch api')
        })
}

function alert(value) {
    Toastify({
        text: `${value}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: 'left',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();
}

$(document).ready(() => {
    home()
    $('#getHome').on('click', () => {
        home()
    })

    $('#getSignIn').on('click', function () {
        $('.alert').hide()
        $('#signUp').hide()
        $('#signIn').show()
        $('#user-home').hide()
        $('#landing-page').hide()
    })

    $('#getSignUp').on('click', function () {
        $('#signIn').hide()
        $('#signUp').show()
        $('#user-home').hide()
        $('#landing-page').hide()
    })

    $('#signUp').on('submit', (e) => {
        e.preventDefault()
        signUp()
    })

    $('#signIn').on('submit', (e) => {
        e.preventDefault()
        signIn()
    })

    $('#getLogOut').on('click', (e) => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            e.preventDefault()
            localStorage.clear()
            api()
            alert('user logout success')
            $('#landing-page').show()
            $('#getSignUp').show()
            $('#getSignIn').show()
            $('#signUp').hide()
            $('#signIn').hide()
            $('#user-home').hide()
            $('#getLogOut').hide()
            $('#form-add-todo').hide()
        });
    })

    $('#add-todo').on('click', (e) => {
        e.preventDefault()
        $('#user-home').hide()
        $('#form-add-todo').show()
    })

    $('#form-add-todo').on('submit', (e) => {
        e.preventDefault()
        addTodo(e)
    })

    $('#form-edit-todo').on('submit', (e) => {
        e.preventDefault()
        editTodo(e)
    })

})