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
    const token = localStorage.token
    $.ajax('http://localhost:3000/todos', {
        method: 'GET',
        headers: { token }
    })
    .done(todos => {
        todos.forEach(todo => {
            if(todo.status === false) {
                $("#todos").append(`<li class="list-group-item">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${todo.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${todo.due_date}</h6>
                      <p class="card-text">${todo.description}</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>
            </li>`);
            }
        });
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googlesignin',
        data: {
          google_token
        }
      })
    .done(user => {
        fetchTodos()
        // set localStorage
        localStorage.setItem('token', user.token)
        console.log(user.token)
        $('#todos').show()
        $("#register").hide()
        $("#login").hide()
        $('#navbar').show()
    })
    .fail(err => {
        console.log(err)
    })
  }


function showLogin() {
    $("#register").hide()
    $("#login").show()
}

function showRegister() {
    $('#register').show()
    $('#login').hide()
}

$(document).ready(function(){
    function addTodoForm() {
        $('#todos').hide()
        $('#addTodo-form').show()
        
        // const token = localStorage.token
        // const { title, description }
        // $.ajax('http://localhost:3000/todos', {
        //     method: 'GET',
        //     headers: { token },
        //     data: { title, description }
        // })
    }
    // function addTodo

    $('#navbar').hide()
    $('#register').hide()
    $('#login').show()
    $('#addTodo-form').hide()

    $('#register-btn').on("click", () => {
        showRegister()
    })
    $('#login-btn').on("click", () => {
        showLogin()
    })
    $('#addTodo').on("click", () => {
        addTodo()
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
            fetchTodos()
            // set localstoragre
            localStorage.setItem('token', user.token)
            console.log(user.token)
            $('#todos').show()
            $("#register").hide()
            $("#login").hide()
            $('#navbar').show()
            // munculin apa ?
        })
        .fail(err => {
            console.log(err)
        })
    });
});