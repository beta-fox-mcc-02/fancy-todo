// import { response } from "express"

//login function
function login(){
  $('#login-form').on('submit', (e) => {
    e.preventDefault()
    $('#username').empty()
    let user = $('#user').val()
    let password = $('#password').val()
    $.ajax('http://localhost:3000/users/login', {
      method: 'POST',
      data: {
        user, password
      }
     })
    .done(response => {
      localStorage.token = response.token
      localStorage.username = response.username
      $('#user').val("")
      $('#password').val("")
      showContent()
      Toastify({
        text: "Login success",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
    })
    .fail(() => {
      Toastify({
        text: "Login fail",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
    })
  })
}

//logout
function logout() {
  $('#logout').on('click', () => {
    localStorage.clear()
    signOut()
    intialPage()
    Toastify({
      text: "Logout success",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      className: "info",
    }).showToast();
  })
}

//showing intial page
function intialPage() {
  $("#content").hide()
  $('#logout').hide()
  $('#login').show()
  $('#username').empty()
}

//calling user's todo
function showTodo() {
  $.ajax({
    url: 'http://localhost:3000/todos', 
    method: 'get',
    headers: {
      token: localStorage.token
    }
  })
    .done(todos => {
      let todoCard = ``
      if(!todos.length) todoCard = "Apparently, you don't have any todo yet..."
      else {
        console.log(todos)
        todos.forEach(todo => {
          let date = new Date(todo.due_date).toLocaleString('id', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          let status = ''
          if (todo.status) status = "DONE"
          else status = "NOT DONE"
          todoCard += `
          <li style="margin: 10px;">
            <div class="card">
              <h4 class="card-header" style="background-color: orange;">${todo.title}</h4>
              <div class="card-body" style="background-color: rosybrown;">
                <h5 class="card-title">${todo.description}</h5>
                <p class="card-text"><b>Due Date</b>: ${date}</p>
                <p class="card-text"><b>Status</b>: ${status}</p>
                <a href="#" onclick="markTodo(${todo.id}, ${todo.status})" class="btn btn-secondary">Mark</a>
                <a href="#" class="btn btn-secondary" id="edit-${todo.id}">Edit</a>
                <a href="#"  class="btn btn-secondary" id="delete-${todo.id}">Delete</a>
            </div>
          </li>
          `
        });
      }
      $('#todo-card').html(todoCard)
    })
    .fail(err => {
      console.log(err, "Error panggil todo")
    })
}

//create new todo
function newTodo() {
  console.log("buat todo")
  $('#newTodoForm').on('submit', (e) => {
    e.preventDefault()
    let title = $('#judul').val()
    let description = $('#description').val()
    let due_date = $('#due_date').val()
    console.log($('#title').val(), description, due_date)
    $.ajax('http://localhost:3000/todos', {
      method: 'POST',
      data: {
        title, description, due_date, status: false
      },
      headers: {token: localStorage.token}
     })
      .done(response => {
        $('#title').empty()
        $('#description').empty()
        $('#due_date').empty()
        showTodo()
      })
      .fail(err => console.log(err))
    })
}

//mark Todo
function markTodo(id, status) {
  let newStatus = !status
  console.log('jalan', id, status, newStatus)
    $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      method: 'put',
      headers: {token: localStorage.token},
      data: {
        status : newStatus
      }
    })
      .done(response => {
        console.log(response)
        showContent()
      })
      .fail(err => {
        Toastify({
          text: "This is a toast",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "info",
        }).showToast();
      })
}

//shwoing user's contents
function showContent() {
  let username = localStorage.username
  showTodo()
  $("#content").show()
  $('#logout').show()
  $('#login').hide()
  $('#username').html(`<span>Welcome ${username}</span>`)
}


//running jqueries
$(document).ready(() => {
  if (!localStorage.token) {
    intialPage()
  } else {
    showContent()
  }

  newTodo()
  login()
  logout()

  //to restrict past date in date input forms
  $('#due_date').attr('min', new Date().toISOString().slice(0,10));
})

//google sign in
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const id_token = googleUser.getAuthResponse().id_token
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  //sending to server through api
  $.ajax('http://localhost:3000/users/gsignin', {
    method: 'POST',
    headers: {
      id_token
    }
  })
    .done(response => {
      console.log(response)
      localStorage.token = response.token
      localStorage.username = response.username
      $('#user').val("")
      $('#password').val("")
      showContent()
      Swal.fire({
        title: 'Login Success!',
        text: `Welcome ${response.username}`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })
    .fail(err => {
      console.log(err)
      signOut()
      Swal.fire({
        title: 'Error!',
        text: `Error signin with google`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
}

//google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}