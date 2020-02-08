function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax('http://localhost:3000/googleSignIn', {
        method: 'POST',
        headers: {
            access_token: id_token
        }
    })
    .done((response) => {
        localStorage.setItem('access_token', response.access_token)
        fetchTodo()
    })
    .fail((err) => {
        console.log('error', err)
    })
}

function logout() {
    //local server logout
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
    });
}

function addTodo() {
    const title = $('#todoTitle').val()
    const description = $('#todoDescription').val()
    const due_date = $('#todoDueDate').val()

    $.ajax({
        url: `http://localhost:3000/todos`,
        method: 'POST',
        data: {
            title,
            description,
            due_date
        },
        headers : { access_token: localStorage.access_token}
    })
    .done((result) => {
        console.log('success add todo')
        fetchTodo()
    })
}

function editForm(id) {
    localStorage.setItem('id', id)
    console.log(`masuk editForm`)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {access_token: localStorage.access_token}
    })
        .done(todos => {
            console.log(todos)
            let todoArr = todos.data
            $('#editTitle').val(`${todoArr.title}`)
            $('#editDescription').val(`${todoArr.description}`)
            $('#editStatus').val(`${todoArr.status}`)
            $('#editDate').val(`${(todoArr.due_date).substring(0, 10)}`)
        })
        .fail(err => {
            console.log(err)
        })
}

function editTodo() {
    const id = localStorage.getItem('id')
    console.log(`masuk editTodo!`)
    let title = $('#editTitle').val()
    let description = $('#editDescription').val()
    let status = $('#editStatus').val()
    let due_date = $('#editDate').val()

    $.ajax({
        url: `http://localhost:3000/todos/${+id}`,
        method: 'PUT',
        data: {
            title,
            description,
            status,
            due_date
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        console.log(`success edit`)
        fetchTodo()
    })
}

function deleteTodo(id) {
    console.log(`try to delete todo with id: ${id}`)
    $.ajax({
        url: `http://localhost:3000/todos/${+id}`,
        method: 'DELETE',
        headers: {access_token: localStorage.access_token}
    })
    .done((data) => {
        console.log(`todo with ${id} deleted!`)

        fetchTodo()
    })
    .fail((err) => {
        console.log(err)
    })
}

function fetchTodo() {
    console.log('masuk findAll')
    console.log(`${localStorage.getItem('access_token')}`)
    $.ajax(`http://localhost:3000/todos`, {
        method: 'GET',
        headers: {access_token :localStorage.access_token}
    })
    .done((todos) => {
        console.log(todos.data)
        let todoArr = todos.data
        $('#listTodo').empty()
        for (let i in todoArr) {
            $('#listTodo').append(`
            <tr>
                <td>${todoArr[i].id}</td>
                <td>${todoArr[i].title}</td>
                <td>${todoArr[i].description}</td>
                <td>${todoArr[i].status === false? 'Ongoing': 'Done'}</td>
                <td>${new Date(todoArr[i].due_date).toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                <td><a href="#" onclick="editForm(${todoArr[i].id})">Edit</a> | <a href="#" onclick="deleteTodo(${todoArr[i].id})">Delete</a></td>
            </tr>
            `)
        }
    })
    .fail((err) => {
        console.log(err)
    })
}


$(document).ready(()=> {
    //login
    $("#login-form").on("submit", (e) => {
        e.preventDefault()
        console.log('masuk login')

        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email: $("#email-login").val(),
                password: $("#password-login").val()
            }
        })
        .done((response) => {
            localStorage.setItem('access_token', response.access_token)
            fetchTodo()
        })
        .fail((err) => {
            console.log('error', err)
        })
    })
    //register
    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        console.log('register testing', $("#email-register").val())

        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email: $("#email-register").val(),
                password: $("#password-register").val()
            }
        })
        .done((response) => {
            console.log('register success', response)
        })
        .fail((err) => {
            console.log('error', err)
        })
    })  

    //logout
    $("#logout").on("click", (e) => {
        e.preventDefault()
        console.log('logout success')
        logout()
        // initPage()
    })
    
    //addTodo
    $('#addTodo').on("submit", (e) => {
        e.preventDefault()
        console.log('add todo testing')
        addTodo()
    })

    //editTodo
    $('#editTodo').on("submit", (e) => {
        e.preventDefault()
        console.log(`edit todo testing`)
        editTodo()
    })


    //findAllTodo

    //editTodo

    //deleteTodo
})


//air visual api
$.ajax({
    url: 'http://localhost:3000/api',
    method: 'GET'
  })
    .done(result => {
      $("#air-visual").append(`
        <h3>Nearby Weather Information</h3>
        <span>&nbsp;&nbsp;${result.data.city}, ${result.data.country}</span><br>
        <span>&nbsp;&nbsp;${Number(result.data.current.weather.tp)} <sup>o</sup>C</span><br>
        <span>&nbsp;&nbsp;${result.data.current.pollution.aqius} (Level of Polution - US AQI)</span>
      `)
    })
    .fail(err => {
      console.log(err)
    })
