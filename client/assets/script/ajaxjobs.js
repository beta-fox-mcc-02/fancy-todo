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
      $('#userGreeting').empty()
      $('#userGreeting').append(`<h3>Hello, ${getUsername(success.email)}!</h3>`)
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
        text: err.responseJSON.errors[0]
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
            <div class="card-header text-center shadowFont" style="font-weight: bold; font-size: 22px;">
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
              <button class="btn btn-primary btn-sm fas fa-edit" id="editTodo"></button>
              <button class="btn btn-danger btn-sm fas fa-trash-alt" id="deleteTodo"></button>
            </div>
          </div>
        `
      )
      $('#deleteTodo').click(event => {
        deleteTodo(todo.id)
      })
      $('#editTodo').click(event => {
        editTodo(todo.id)
      })

      initMap(todo.location)
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something\'s wrong',
        text: err.responseJSON.msg
      })
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
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something\'s wrong',
        text: err.responseJSON.msg
      })
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
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something\'s wrong',
        text: err.responseJSON.msg
      })
    })
}

function editTodo(id) {
  $('#map').hide()
  $('#editContainer').show()
  $.ajax({
    url: "http://localhost:3000/todos/" + id,
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(todo => {
      $('#editContainer').empty()
      $('#editContainer').append(
        `<div style="height: 100%; width: 100%; display: grid; justify-content: center; align-content: center;">
          <form>
            <div style="margin-bottom: 1rem;">
              <input class="form-control" type="text" name="editTitle" id="editTitle" placeholder="Title" style="width: 32vw" value=${todo.title}>
            </div>
            <div style="margin-bottom: 1rem;">
              <textarea class="form-control" name="editDesc" id="editDesc" placeholder="Description" rows="4" style="width: 32vw">${todo.description}</textarea>
            </div>
            <div style="margin-bottom: 1rem;">
              <select class="form-control" id="editPriority" name="editPriority" style="width: 32vw" value=${todo.priority}>
                <option value="standard" selvar dd = today.getDate();

                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();ected>Standard</option>
                <option value="important">Important</option>
              </select>
            </div>
            <div style="margin-bottom: 1rem;">
              <input class="form-control" type="text" name="editLoc" id="editLoc" placeholder="Location" style="width: 32vw" value="Surapati, Bandung">
            </div>
            <div style="margin-bottom: 1rem;">
              Due Date :
              <span style="display: grid;"><input type="date" name="editDue" id="editDue" value=${datePlaceholder(todo.due_date)}></span>
            </div>
          </form>
          <button type="button" class="btn btn-primary btn-sm" id="editTodoButton">EDIT</button>
        </div>`
      )
      $('#editTodoButton').click(event => {
        const title = $('#editTitle').val()
        const description = $('#editDesc').val()
        const priority = $('#editPriority').val()
        const address = $('#editLoc').val()
        const due_date = $('#editDue').val()

        $.ajax({
          url: 'http://localhost:3000/todos/' + todo.id,
          method: 'put',
          data: {
            title, description, priority, address, due_date
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
          .done(todo => {
            Swal.fire({
              icon: 'success',
              title: 'Todo Edited Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            $('#title').val('')
            $('#description').val('')
            $('#priority').val('standard')
            $('#location').val('')
            $('#duedate').val('')
            $('#map').show()
            $('#editContainer').hide()
            showMainContent()
          })
      })
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something\'s wrong',
        text: err.responseJSON.msg
      })
    })
}

function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/google-auth',
    data: { google_token }
  })
    .done(success => {
      localStorage.access_token = success.token
      $('#userGreeting').empty()
      $('#userGreeting').append(`<h3>Hello, ${getUsername(success.email)}!</h3>`)
      Swal.fire({
        icon: 'success',
        title: 'Logged in with Google Account',
        showConfirmButton: false,
        timer: 1500
      })
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

function getUsername(email) {
  let username = ''
  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      break
    } else {
      username += email[i]
    }
  }
  return username
}

function datePlaceholder(duedate) {
  const date = new Date(duedate)
  const dd = date.getDate()
  const mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
}