// function addTodo() {
//     $('#todos').hide()
//     $("#register").hide()
//     $("#login").hide()
//     $('#navbar').show()
//     const token = localStorage.token
//     const { title, description }
//     $.ajax('http://localhost:3000/todos', {
//         method: 'GET',
//         headers: { token },
//         data: { title, description }
//     })
// }

function fetchTodos() {
    $("#register").hide()
    $("#login").hide()
    $('#navbar').show()
    $('#todos').show()
    // temperature()
    const token = localStorage.token
    $.ajax('http://localhost:3000/todos', {
        method: 'GET',
        headers: { token }
    })
    .done(todos => {
        $('#todos').empty()
        todos.forEach(todo => {
            if(todo.status === false) {
                $("#todos").append(`<li class="list-group-item">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${todo.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${todo.due_date}</h6>
                      <h6 class="card-subtitle mb-2 text-muted">Undone</h6>
                      <p class="card-text">${todo.description}</p>
                      <a id=${todo.id} href="" class="card-link editTodoLink">Edit Todo</a>
                      <a id=${todo.id + 'delete'} href="" class="card-link deleteTodoLink">Delete Todo</a>
                    </div>
                  </div>
            </li>`);
            }
        })
        $('.editTodoLink').click(e => {
            e.preventDefault()
            const filteredTodo = todos.filter(todo => todo.id == e.target.id)
            console.log(filteredTodo[0].title)
            editTodoForm(filteredTodo[0])
        })
        $('.deleteTodoLink').click(e => {
            e.preventDefault()
            const filteredTodo = todos.filter(todo => todo.id == parseInt(e.target.id))
            deleteTodo(filteredTodo[0].id)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googlesignin',
        data: {
          id_token
        }
      })
    .done(user => {
        // set localStorage
        localStorage.setItem('token', user.token)
        temperature()
        fetchTodos()
        $('#todos').show()
        $("#register").hide()
        $("#login").hide()
        $('#navbar').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function signOut() {
    console.log('gsignout')
    $('#temperature').val('')
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      showLogin()
    });
}


function showLogin() {
    $("#register").hide()
    $("#login").show()
    $('#navbar').hide()
    $('#todos').hide()
    $('#temp-box').hide()
}

function showRegister() {
    $('#register').show()
    $('#login').hide()
    $('#temp-box').hide()
}

function addTodoForm() {
    $('#todos').hide()
    $('#addTodo').show()
    $('#editTodo').hide()
}

function editTodoForm(data) {
    $('#todos').hide()
    editTodo(data)
    console.log('EDITTT')
}

function addTodo() {
    $('#temp-box').hide()
    const token = localStorage.token
    const title = $('#add-title').val()
    const description = $('#add-description').val()
    const due_date = $('#add-date').val()
    console.log(title, description, due_date, 'INPUTTTTTTTTTTT')
    $.ajax('http://localhost:3000/todos', {
        method: 'POST',
        headers: { token },
        data: { title, description, due_date }
    })
    .done(added => {
        
        $('#add-title').val('')
        $('#add-description').val('')
        $('#add-date').val('')
        $('#addTodo').hide()
        fetchTodos()
    })
    .fail(err => {
        console.log(err)
    })
}

function editTodo(todo) {
    $('#temp-box').hide()
    $('#editTodo').show()
    $('#edit-title').val(todo.title)
    $('#edit-description').val(todo.description)
    $('#edit-date').val(todo.due_date)
    console.log('EDIT TODOOO')
    console.log(todo.title, todo.description, todo.due_date, 'EDIT INPUTTTTTTTTTTT')
    $('#edit-btn').on("click", (e) => {
        const token = localStorage.token
        const title = $('#edit-title').val()
        const description = $('#edit-description').val()
        const due_date = $('#edit-date').val()
        $('#editTodo').on("submit", (e) => {
            e.preventDefault()
            $.ajax('http://localhost:3000/todos/' + todo.id
        , {
            method: 'PUT',
            headers: { token },
            data: { title, description, due_date }
        })
        .done(edited => {
            console.log(edited)
            $('#edit-title').val('')
            $('#edit-description').val('')
            $('#edit-date').val('')
            $('#editTodo').hide()
            fetchTodos()
        })
        .fail(err => {
            console.log(err)
        })
        })
    })
    console.log(todo.id)
    console.log(todo.title, todo.description, todo.due_date, 'EDIT EDD')
}

function deleteTodo(id) {
    const token = localStorage.token
    $.ajax('http://localhost:3000/todos/' + id, {
        method: 'DELETE',
        headers: { token }
    })
    .done(deleted => {
        fetchTodos()
    })
    .fail(err => {
        console.log(err)
    })
}


function temperature() {
    $('#temp-box').show()
    // $('#temperature').val('')
    $.ajax('http://localhost:3000/api', {
        method: 'GET'
    })
    .done(({ data }) => {
        $('#temperature').html('')
        $('#temperature').append(`
        <h5 class="card-title">${data.data.current.weather.tp} °C</h5>
        `)
        $('#temperature').val('')
    })
    .fail(err => {

    })
}

function showTodos() {
    $('#addTodo').hide()
    $('#editTodo').hide()
    fetchTodos()
}

function contentPage() {
    $('#addTodo').hide()
    $('#editTodo').hide()
    fetchTodos()
}

$(document).ready(function(){

    if(localStorage.token) {
        contentPage()
    }
    else{
        $('#addTodo').hide()
        $('#editTodo').hide()
        $('#navbar').hide()
        $('#register').hide()
        $('#login').show()
        $('#temp-box').hide()
    }
    

    $('#register-btn').on("click", () => {
        showRegister()
    })
    $('#login-btn').on("click", () => {
        showLogin()
    })
    $('#addTodo').on("submit", (e) => {
        e.preventDefault()
        addTodo()
    })

    $('#addTodoForm').on("click", () => {
        addTodoForm()
    })
    $( "div" ).delegate( "a#editTodoForm", "click", function(e) {
        e.preventDefault();
        editTodoForm()
      });
    $('#showTodos').on("click", () => {
        showTodos()
    })
    $("#register").on("submit", (e) => {
        e.preventDefault()
        const email = $('#register-email').val()
        const password = $('#register-password').val()   
        console.log(email, password, '><><><><><><><><><') 
        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: { email, password }
        })
        .done(registered => {
            showLogin()
        })
        .fail(err => {
            console.log(err)
        })
    });

    $("#login").on("submit", (e) => {
        e.preventDefault()
        const email = $('#login-email').val()
        const password = $('#login-password').val()
        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: { email, password }
        })
        .done(user => {
            localStorage.setItem('token', user.token)
            temperature()
            fetchTodos()
        })
        .fail(err => {
            console.log(err)
        })
    });
});