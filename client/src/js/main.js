$(document).ready(function(){
  checkLogin()
  pageNavigator()
  fetchTodos()

  $("#login").submit(function(e){
    e.preventDefault()
    const email = $('#emailLogin').val()
    const password = $('#passwordLogin').val()
    $.ajax({
      url: "http://localhost:3000/auth/login",
      method: "POST",
      data: { email, password },
    })
      .done(function(user) {
        console.log(user)
        localStorage.token = user.token
        checkLogin()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
        if (err.responseJSON.name === 'invalid email/password') {
          Swal.fire({
            title: err.responseJSON.msg,
            text: err.responseJSON.msg + '. Please check your email/password.',
            icon: 'error',
            confirmButtonText: 'Close'
          })
        }
      })
  })

  $("#register").submit(function(e){
    e.preventDefault()
    const name = $('#nameRegister').val()
    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()
    $.ajax({
      url: "http://localhost:3000/auth/register",
      method: "POST",
      data: { name, email, password },
    })
      .done(function(user) {
        console.log(user)
        localStorage.token = user.token
        Swal.fire({
          title: 'Register Success!',
          text: 'Register success. Please wait',
          icon: 'success',
          confirmButtonText: 'Close'
        })
        checkLogin()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
        if (err.responseJSON.name === 'SequelizeUniqueConstraintError') {
          Swal.fire({
            title: 'Email registered!',
            text: 'Email has been registered. Please login or register with another email ',
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else if (err.responseJSON.msg === 'Minimum password length is 6') {
          Swal.fire({
            title: 'Too short',
            text: err.responseJSON.msg,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else {
          console.log(err.responseJSON)
        }
        
      })
  })

  $("#btnLogout").click(function(){
    localStorage.clear()
    checkLogin()
  })

  $("#saveTodo").click(function(){
    const title = $('#addTitleTodo').val()
    const description = $('#addDescriptionTodo').val()
    const status = false
    const due_date = $('#due_date').val()
    $.ajax({
      url: "http://localhost:3000/todos",
      method: "POST",
      headers: {
        token: localStorage.token
      },
      data: {
        title,
        description,
        status,
        due_date
      },
    })
      .done(function(todos) {
        console.log(todos)
        Swal.fire({
          title: 'Success!',
          text: todos.msg,
          icon: 'success',
          confirmButtonText: 'Close'
        })
        fetchTodos()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
      })
    $('#addTodoModal').modal('hide')
  })
})

function checkLogin () {
  if (localStorage.getItem('token')){
    pageHome()
    console.log('sudah login')
  } else {
    pageLogin()
    console.log('belum login')
  }
  console.log('checked')
}

function pageNavigator () {
  // Navigator
  $("#btnHome").click(function(){
    pageHome()
  })
  
  $("#btnLogin").click(function(){
    pageLogin()
  })

  $("#btnRegister").click(function(){
    pageRegister()
  })
  // end of navigator
}

function pageHome () {
  $("#loginPage").hide()
  $("#registerPage").hide()
  $("#todo").show()
  $("#navbar").show()
}

function pageLogin () {
  $("#loginPage").show()
  $("#registerPage").hide()
  $("#navbar").hide()
  $("#todo").hide()
}

function pageRegister () {
  $("#loginPage").hide()
  $("#registerPage").show()
  $("#todo").hide()
  $("#navbar").hide()
}

function fetchTodos () {
  $('#listTodos').empty()
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "GET",
  })
    .done(function(todos) {
      console.log(todos)
      displayTodos(todos)
    })
    .fail(function(err) {
      console.log(err.responseJSON)
    })
}

function displayTodos (todos) {
  todos.forEach(todo => {
    const cardTodo = `
      <div class="col-sm-6">
        <div class="card m-1">
          <div class="card-header">
            <h3>${todo.title}</h3>
          </div>
          <div class="card-body">
            <p class="card-text">${todo.description}</p>
            <a href="#" id="updateTodo${todo.id}" class="btn btn-primary">Update</a>
            <a href="#" id="deleteTodo${todo.id}" class="btn btn-primary">Delete</a>
          </div>
        </div>
      </div>
      `
    
    $('#listTodos').append()

    $(`#updateTodo${todo.id}`).click(function(e){
      e.preventDefault()
      console.log('todo with id', todo.id, 'updated')
    })

    $(`#deleteTodo${todo.id}`).click(function(e){
      e.preventDefault()
      console.log('todo with id', todo.id, 'deleted')
    })
  })
}

