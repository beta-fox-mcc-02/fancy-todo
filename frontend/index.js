// GOOGLE

function onSuccess(googleUser) {
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
            console.log(err)
        })
}
function onFailure(error) {
    console.log(error)
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: onSuccess,
        onfailure: onFailure
    })
}

// END OF GOOGLE

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
        $('#register-section').hide()
        $('#dashboard-section').show()
        $('#signin-button').hide()
        $('#signup-button').hide()
        $('#signout-button').show()
        $('#welcome-section').hide()
        fetchTodo()
        renderAddForm()
    } else {
        $('#welcome-section').show()
        $('#login-section').hide()
        $('#dashboard-section').hide()
        $('#signin-button').show()
        $('#signout-button').hide()
        $('#signup-button').show()
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
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Weather</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            `)
            data.forEach((el, i) => {
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
                        <td>${i + 1}</td>
                        <td>${title}</td>
                        <td>${description}</td>
                        <td>${location}</td>
                        <td>${weather}</td>
                        <td>${formatDateBackslash(due_date)}</td>
                        <td>${status === true ? 'finished' : 'unfinished'}</td>
                        <td>
                            <div>
                                ${
                                    status === false
                                        ? `
                                        <a onclick="setFinished(${id})" href="#">
                                            <span class="icon has-text-success ">
                                            <i class="fas fa-check"></i>
                                            </span>
                                        </a>`
                                        : `
                                        <a onclick="setUnfinished(${id})" href="#">
                                            <span class="icon has-text-warning">
                                            <i class="fas fa-check"></i>
                                            </span>
                                        </a> 
                                     `
                                }
                                
                                <a onclick="renderUpdateForm(${id})" href="#">
                                    <span class="icon has-text-info">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </a>
                                <a onclick="deleteTodo(${id})" href="#">
                                    <span class="icon has-text-danger">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </a>
                            </div>
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
    clearForm()
    let button = `
    <div class="field">
        <div class="control">
            <button class="button is-primary" onclick="submitAdd(event)">
                Add Todo
            </button>
        </div>
    </div>
    `
    $('#change-on-update-or-delete').empty()
    $('#change-on-update-or-delete').append(button)
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
            // Jadinya set value aja ya wqwqwq

            const { id, title, description, location, due_date } = data
            const date = new Date(due_date).toISOString().split('T')[0]

            $('#title').val(title)
            $('#description').val(description)
            $('#location').val(location)
            $('#due_date').val(formatDate(due_date))

            let button = `

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary" onclick="submitUpdate(event, ${id})">
                        Update
                    </button>
                </div>
                <div class="control">
                    <button class="button is-light" onclick="renderAddForm()">
                        Cancel
                    </button>
                </div>
            `
            $('#change-on-update-or-delete').empty()
            $('#change-on-update-or-delete').append(button)
        })
        .fail(err => {
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
        due_date
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
            fetchTodo()
            clearForm()
            renderAddForm()
        })
        .fail(err => {
            console.log(err)
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
        })
        .fail(err => {
            console.log(err)
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
            console.log(result)
        })
        .fail(err => {
            console.log(err)
        })
}

function renderRegister() {
    $('#login-section').hide()
    $('#dashboard-section').hide()
    $('#welcome-section').hide()
    $('#register-section').show()
}

function renderHome() {
    $('#login-section').hide()
    $('#dashboard-section').hide()
    $('#welcome-section').show()
    $('#register-section').hide()
}

function renderLogin() {
    $('#login-section').show()
    $('#welcome-section').hide()
    $('#dashboard-section').hide()
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
            console.log(result)
        })
        .fail(err => {
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
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
        console.log('User signed out.')
    })
}

function firstLoad() {
    $('#signout-button').hide()
    clearForm()
}

function formatDateBackslash(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join('/')
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

function setStatus(id, status) {
    const token = localStorage.token
    const data = {
        status
    }

    $.ajax({
        type: 'PATCH',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
        .done(result => {
            fetchTodo()
            clearForm()
            renderAddForm()
        })
        .fail(err => {
            console.log(err)
        })
}

function setUnfinished(id) {
    setStatus(id, false)
}

function setFinished(id) {
    setStatus(id, true)
}

$(document).ready(() => {
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

    // $('#welcome-section').show()

    firstLoad()
    // $('#dashboard-section').show()

    // nanti diganti cek dulu ke server masih valid ngga tokennya
    let token = localStorage.getItem('token')

    if (token) {
        toggleLogin(true)
    } else {
        toggleLogin(false)
    }

    // BULMA

    $('.navbar-burger').click(function() {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $('.navbar-burger').toggleClass('is-active')
        $('.navbar-menu').toggleClass('is-active')
    })
    // / Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]')

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
        // Add listener to date:selected event
        calendar.on('date:selected', date => {
            console.log(date)
        })
    })

    // To access to bulmaCalendar instance of an element
    const element = document.querySelector('#my-element')
    if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
            console.log(datepicker.data.value())
        })
    }
})
