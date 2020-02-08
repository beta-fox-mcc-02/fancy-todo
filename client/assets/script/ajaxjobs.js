function login() {
  const user = {
    email: $("#email").val(),
    password: $("#password").val()
  }
  $.ajax({
    url: "http://3.0.180.11:3000/login",
    method: "POST",
    data: user
  })
    .done(success => {
      localStorage.access_token = success.token
      localStorage.userEmail = success.email
      $('#userGreeting').empty()
      $('#userGreeting').append(`<h3>Hello, ${getUsername(success.email)}!</h3>`)
      alertify.success(`<span class="fredoka">You've been logged in successfully</span>`)
      $("#email").val('')
      $("#password").val('')
      tokenCheck()
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
    })
}

function register() {
  const user = {
    email: $("#email").val(),
    password: $("#password").val()
  }
  $.ajax({
    url: "http://3.0.180.11:3000/register",
    method: "POST",
    data: user
  })
    .done(() => {
      alertify.success(`<span class="fredoka">You've been registered successfully</span>`)
      $("#email").val('')
      $("#password").val('')
      tokenCheck()
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.errors[0]}</span>`)
    })
}

function fetchTodo() {
  return $.ajax({
    url: "http://3.0.180.11:3000/todos",
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
}

function fetchOne(id) {
  $.ajax({
    url: "http://3.0.180.11:3000/todos/" + id,
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
    url: 'http://3.0.180.11:3000/todos',
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
      if (err.responseJSON.erros) {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something\'s wrong',
          text: err.responseJSON.errors[0]
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Location or Due Date Error',
          text: 'Please check your input on location and due date field'
        })
      }
    })
}

function deleteTodo(id) {
  $.ajax({
    url: "http://3.0.180.11:3000/todos/" + id,
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
    url: "http://3.0.180.11:3000/todos/" + id,
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
          url: 'http://3.0.180.11:3000/todos/' + todo.id,
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
    url: 'http://3.0.180.11:3000/google-auth',
    data: { google_token }
  })
    .done(success => {
      localStorage.access_token = success.token
      localStorage.userEmail = success.email
      $('#userGreeting').empty()
      $('#userGreeting').append(`<h3>Hello, ${getUsername(success.email)}!</h3>`)
      alertify.success(`<span class="fredoka">Logged in with Google Account</span>`)
      tokenCheck()
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
    })
}

function fetchCollId() {
  $.ajax({
    url: "http://3.0.180.11:3000/todos/collaborator",
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(collaboratorsId => {
      if (collaboratorsId) {
        fetchCollEmail(collaboratorsId)
      }
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
    })
}

function fetchCollEmail(collIds) {
  $('#collaborators').empty()
  collIds.forEach(collId => {
    $.ajax({
      url: "http://3.0.180.11:3000/todos/collaborator/" + collId,
      method: "get",
      headers: {
        access_token: localStorage.access_token
      }
    })
      .done(userData => {
        $('#collaborators').append(
          `<tr>
            <td>${userData.email}</td>
            <td><button class="btn btn-sm btn-outline-danger fas fa-times" onclick="deleteCollaborator(${userData.id})"></td>
          </tr>`
        )
      })
      .fail(err => {
        alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
      })
  })
}

function deleteCollaborator(id) {
  $.ajax({
    url: "http://3.0.180.11:3000/todos/collaborator/" + id,
    method: "get",
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(result => {
      if (result.email !== localStorage.userEmail) {
        $.ajax({
          url: "http://3.0.180.11:3000/todos/collaborator/" + id,
          method: "delete",
          headers: {
            access_token: localStorage.access_token
          }
        })
          .done(() => {
            alertify.success(`<span class="fredoka">Collaborator deleted successfully</span>`)
            showMainContent()
          })
          .fail(err => {
            alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
          })
      } else {
        alertify.error(`<span class="fredoka">Cannot remove yourself</span>`)
      }
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
    })
}

function addCollaborator() {
  const email = $('#collaboratorEmail').val()
  $.ajax({
    url: "http://3.0.180.11:3000/todos/collaborator",
    method: "post",
    data: {
      email
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(() => {
      showMainContent()
      alertify.success(`<span class="fredoka">Collaborator added successfully</span>`)
    })
    .fail(err => {
      alertify.error(`<span class="fredoka">${err.responseJSON.msg}</span>`)
    })
}

function searchTodo() {
  const words = $('#searchInput').val()
  return $.ajax({
    url: "http://3.0.180.11:3000/todos/search",
    method: "post",
    data: {
      words
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
}
