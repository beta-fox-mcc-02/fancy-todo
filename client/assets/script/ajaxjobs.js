function login() {
  const user = {
    email: $("#email").val(),
    password: $("#password").val()
  }
  $.ajax({
    url: "http://localhost:3000/login",
    method: "POST",
    data: user
  })
    .done(success => {
      localStorage.access_token = success.token
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })
      $("#email").val('')
      $("#password").val('')
      tokenCheck()
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.responseJSON.msg
      })
    })
}

function register() {
  const user = {
    email: $("#email").val(),
    password: $("#password").val()
  }
  $.ajax({
    url: "http://localhost:3000/register",
    method: "POST",
    data: user
  })
    .done(() => {
      Swal.fire({
        icon: 'success',
        title: 'Register Success',
        showConfirmButton: false,
        timer: 1500
      })
      $("#email").val('')
      $("#password").val('')
      tokenCheck()
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Register Failed',
        text: `${err.responseJSON.msg}: ${err.responseJSON.errors[0]}`
      })
    })
}

function fetchTodo() {
  return $.ajax({
    url: "http://localhost:3000/todos",
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
}

function fetchOne(id) {
  $.ajax({
    url: "http://localhost:3000/todos/" + id,
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(todo => {
      $('#todoDetails').empty()
      $('#todoDetails').append(
        `<div class="card" style="width: 100%; background: rgba(10, 90, 165, 0.8);">
            <div class="card-header text-center" style="font-weight: bold;">
              TODO DETAIL
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <p>TITLE</p>
                <p>${todo.title}</p>
              </li>

              <li class="list-group-item">
                <p>DESCRIPTION</p>
                <p>${todo.description}</p>
              </li>

              <li class="list-group-item">
                <p>PRIORITY</p>
                <p>${todo.priority}</p>
              </li>

              <li class="list-group-item">
                <p>STATUS</p>
                <p>${todo.status ? "Done" : "Ongoing"}</p>
              </li>

              <li class="list-group-item">
                <p>DUE DATE</p>
                <p>${new Date(todo.due_date).toLocaleDateString("id-ID")}</p>
              </li>
            </ul>
            <div style="position: absolute; bottom: 5px; right: 5px;">
              <button class="btn btn-primary btn-sm fas fa-edit"></button>
              <button class="btn btn-danger btn-sm fas fa-trash-alt" id="deleteTodo"></button>
            </div>
          </div>
        `
      )
      $('#deleteTodo').click(event => {
        deleteTodo(todo.id)
      })
      initMap(todo.location)
    })
}

function addTodo() {
  const title = $('#title').val()
  const description = $('#description').val()
  const priority = $('#priority').val()
  const address = $('#location').val()
  const due_date = $('#duedate').val()

  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'post',
    data: {
      title, description, address, priority, due_date
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(todo => {
      Swal.fire({
        icon: 'success',
        title: 'Todo Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      $('#title').val('')
      $('#description').val('')
      $('#priority').val('standard')
      $('#location').val('')
      $('#duedate').val('')
      $('#addTodo').modal('hide')
      showMainContent()
    })
}

function deleteTodo(id) {
  $.ajax({
    url: "http://localhost:3000/todos/" + id,
    method: "delete",
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(() => {
      showMainContent()
      $(".detailContainer").hide()
    })
}