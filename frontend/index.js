// LOGIN

function login() {
    const email = $('#email').val()
    const password = $('#password').val()

    const data = { email, password }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login',
        data
    })
        .done(({ token }) => {
            localStorage.token = token
            toggleLogin(true)
        })
        .fail(err => {
            console.log('Error')
            console.log(err)
        })
}

// LOGOUT

function logout() {
    localStorage.clear()
    signOut()
    toggleLogin(false)
}

// TOGGLE LOGIN

function toggleLogin(isLogin) {
    if (isLogin) {
        $('#login-section').hide()
        $('#dashboard-section').show()
        fetchTodo()
        renderAddForm()
    } else {
        $('#login-section').show()
        $('#dashboard-section').hide()
    }
}

// FETCH TODO

function fetchTodo() {
    const token = localStorage.token
    $.ajax({
        url: 'http://localhost:3000/todos',
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    })
        .done(({ data }) => {
            $('#todo-table').empty()
            $('#todo-table').append(`
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Weather</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            `)
            data.forEach(el => {
                // title, description, due_date, location, status, weather
                const {
                    id,
                    title,
                    description,
                    due_date,
                    location,
                    status,
                    weather
                } = el
                $('#todo-table').append(`
                    <tr>
                        <td>${id}</td>
                        <td>${title}</td>
                        <td>${description}</td>
                        <td>${location}</td>
                        <td>${weather}</td>
                        <td>${due_date}</td>
                        <td>${status}</td>
                        <td>
                            <button onclick="renderUpdateForm(${id})" >Update</button>
                            <button onclick="deleteTodo(${id})" >Delete</button>
                        </td>
                    </tr>
                `)
            })
        })
        .fail(error => {
            console.log(error)
        })
}

// RENDER ADD FORM

function renderAddForm() {
    let formHtml = `
    <form id="add-todo-form">
        <label for="title">Title</label>
        <input type="text" name="title" id="title">
        <br>
        <label for="description">Description</label>
        <input type="text" name="description" id="description">
        <br>
        <label for="due_date">Due Date</label>
        <input type="date" name="due_date" id="due_date">
        <br>
        <label for="location">Location</label>
        <input type="text" name="location" id="location">
        <br>
        <button id="add-button" onclick="submitAdd(event)">Add Todo</button>
    </form> 
    `
    $('#todo-form-section').empty()
    $('#todo-form-section').append(formHtml)
}

// RENDER UPDATE FORM

function renderUpdateForm(id) {
    // panggil dari api buat ambil satu data
    const token = localStorage.token
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    })
        .done(({ data }) => {
            const { id, title, description, location, due_date, status } = data
            const date = new Date(due_date).toISOString().split('T')[0]
            let formHtml = `
            <form id="update-todo-form">
                <input id="status" name="status" type="hidden" value="${status}"/>
                <label for="title">Title</label>
                <input type="text" name="title" id="title" value="${title}">
                <br>
                <label for="description">Description</label>
                <input type="text" name="description" id="description" value="${description}">
                <br>
                <label for="due_date">Due Date</label>
                <input type="date" name="due_date" id="due_date" value="${date}">
                <br>
                <label for="location">Location</label>
                <input type="text" name="location" id="location" value="${location}">
                <br>
                <button id="update-button" onclick="submitUpdate(event, ${id})">Update</button>
                <button id="cancel-update-button" onclick="renderAddForm()">Cancel</button>
            </form> 
            `
            $('#todo-form-section').empty()
            $('#todo-form-section').append(formHtml)
        })
        .fail(err => {
            console.log('Error')
            console.log(err)
        })
}

// SUBMIT UPDATE

function submitUpdate(e, id) {
    e.preventDefault()
    const token = localStorage.token
    const title = $('#title').val()
    const description = $('#description').val()
    const location = $('#location').val()
    const due_date = $('#due_date').val()

    const data = {
        title,
        description,
        location,
        due_date,
        status: status === 'true' ? true : false
    }

    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
        .done(result => {
            console.log('Berhasil')
        })
        .fail(err => {
            console.log(err)
            console.log('gagal hehe')
        })
}

// SUBMIT ADD

function submitAdd(event) {
    event.preventDefault()
    const token = localStorage.token
    const title = $('#title').val()
    const description = $('#description').val()
    const location = $('#location').val()
    const due_date = $('#due_date').val()

    const data = {
        title,
        description,
        location,
        due_date,
        status: false
    }

    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/todos`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
        .done(result => {
            fetchTodo()
            clearForm()
            console.log('Berhasil')
            console.log(result)
        })
        .fail(err => {
            console.log(err)
            console.log('gagal hehe')
        })
}

// CLEAR FORM

function clearForm() {
    const elem = $('form')
    for (let i = 0; i < elem.length; i++) {
        elem[i].reset()
    }
}

// DELETE TODO

function deleteTodo(id) {
    const token = localStorage.token
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .done(result => {
            fetchTodo()
            console.log('Berhasil')
            console.log(result)
        })
        .fail(err => {
            console.log(err)
            console.log('gagal hehe')
        })
}

function renderRegister() {
    // hide login
    $('#login-section').hide()

    // show register
    $('#register-section').show()
}

function renderLogin(e) {
    e.preventDefault()
    $('#login-section').show()
    $('#register-section').hide()
}

function register() {
    const email = $('#register-email').val()
    const password = $('#register-password').val()

    const data = { email, password }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/register',
        data
    })
        .done(result => {
            $('#register-section').hide()
            $('#login-section').show()
            console.log('berhasil')
            console.log(result)
        })
        .fail(err => {
            console.log('Error')
            console.log(err)
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        url: 'http://localhost:3000/gSignIn',
        method: 'POST',
        data: { id_token }
    })
        .done(({ token }) => {
            localStorage.token = token
            toggleLogin(true)
        })
        .fail(err => {
            console.log('Error')
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
        console.log('User signed out.')
    })
}

$(document).ready(() => {
    console.log('Readyyyyy')
    $('#login-form').submit(function(e) {
        e.preventDefault()
        login()
    })
    $('#register-form').submit(function(e) {
        e.preventDefault()
        register()
    })

    $('#logout-btn').click(function() {
        logout()
    })

    // nanti diganti cek dulu ke server masih valid ngga tokennya
    let token = localStorage.getItem('token')

    if (token) {
        toggleLogin(true)
    } else {
        toggleLogin(false)
    }
})
