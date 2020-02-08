function readTodo(token) {
    $.ajax('http://localhost:3000/todos', {
        method: "GET",
        headers: {
            token: token || localStorage.getItem('token')
        }
    })
        .done(({ data }) => {
            console.log(data, 'READDD TODOOOOOOO')
            // e.preventDefault()
            // console.log(data[0].due_date.getFullYear())
            // style="text-decoration: line-through red
            $('#todos').empty()
            if (data.length === 0) {
                $('.table').hide()
                $('.dont-have-todo').show()
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === true) {
                        const a = new Date(data[i].due_date)
                        console.log(a)
                        const year = a.getFullYear()
                        const month = switchMonth(a.getMonth())
                        const date = a.getDate()
                        console.log(date, month, year)
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
                        console.log(a)
                        const year = a.getFullYear()
                        const month = switchMonth(a.getMonth())
                        const date = a.getDate()
                        console.log(date, month, year)
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
            console.log(err)
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
            // console.log(data)
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
            console.log(data)
            localStorage.setItem('token', data.token)
            $('#signIn').hide()
            $('#getSignIn').hide()
            $('#getSignUp').hide()
            $('#getLogOut').show()
            $('#landing-page').hide()
            readTodo()
            $('#user-home').show()
            $('.dont-have-todo').hide()
        })
        .fail(err => {
            alert(err.responseJSON.msg)
            // $('.alert').html(`
            //     ${err.responseJSON.msg}
            // `)
            // $('.alert').show()
            // setTimeout(function () { $('.alert').hide() }, 1000)
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
            // $('#signIn').show()
            // $('#success-register').show()
            $('#signUp').hide()
            $('#signIn').show()
            alert('Register Success')
            // console.log('success register')
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
            // console.log(err)
            // $('.alert').html(`
            //     ${err.responseJSON.msg}
            // `)
            // $('.alert').show()
            // setTimeout(function () { $('.alert').hide() }, 1000)
            // console.log(err)
            // console.log('failed register')
        })
}

function addTodo(e) {
    const title = $('#title-add').val()
    const description = $('#description-add').val()
    const due_date = $('#date-add').val()
    console.log(title, description, due_date)
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
            $('.table').show()
            $('.dont-have-todo').hide()
            $('#form-add-todo').hide()
            alert('success add todo')
            // console.log(data)
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
            // $('.alert').html(`
            //     ${err.responseJSON.msg[0]}
            // `)
            // $('.alert').show()
            // setTimeout(function () { $('.alert').hide() }, 1000)
            // console.log(err)
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
            readTodo()
            console.log('sukses')
        })
        .fail(err => {
            console.log(err)
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
            console.log(data)
        })
        .fail(err => {
            console.log(err)
        })

}

function editTodo(e) {
    // console.log(updateId)
    const id = localStorage.getItem('id')
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const due_date = $('#date-edit').val()
    // console.log(title, description, due_date)
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
            $('#user-home').show()
            $('.dont-have-todo').hide()
            $('#form-edit-todo').hide()
            // console.log(data)
        })
        .fail(err => {
            alert(err.responseJSON.msg[0])
            // $('.alert').html(`
            //     ${err.responseJSON.msg[0]}
            // `)
            // $('.alert').show()
            // setTimeout(function () { $('.alert').hide() }, 1000)
            // console.log(err.responseJSON.msg[0])
        })
}

function api() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/news'
    })
        .done(data => {
            console.log(data.data.articles)
            const news = data.data.articles
            news.forEach(el => {
                $('.card').append(`
                    <img class="card-img-top" src="${el.urlToImage}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${el.title}</p>
                        <a href="${el.url}">More...</a>
                    </div>
                `)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

function alert(value) {
    Toastify({
        text: `${value}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: 'left', // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
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
        // $('.alert').hide()
        $('#landing-page').hide()
    })

    $('#signUp').on('submit', () => {
        signUp()
    })

    $('#signIn').on('submit', () => {
        signIn()
    })

    $('#getLogOut').on('click', () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            localStorage.clear()
            api()
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

    $('#add-todo').on('click', () => {
        // $('.alert').hide()
        $('#user-home').hide()
        $('#form-add-todo').show()
    })

    $('#form-add-todo').on('submit', (e) => {
        addTodo(e)
    })

    $('#form-edit-todo').on('submit', (e) => {
        // console.log('TESSTTTTT')
        editTodo(e)
    })

})