const parsingDate = (date) => {
  date = date.toLocaleDateString()
  const array = date.split('/')
  const year = array[2]
  const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
  const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
  return `${year}-${month}-${day}`
}

const loginSuccess = (data) => {
  $('#error-login').addClass('hide').text()
  $('#form-login').hide()
  $('#header-login').hide()
  $('#header-logout').parent().removeClass('hide')
  $('.todo-container').show()
  localStorage.setItem('token', data.token)
  $('#input-email-login').val('')
  $('#input-password-login').val('')
}

const loginFailed = (err) => {
  $('#header-logout').parent().addClass('hide')
  $('#error-login').removeClass('hide').text(err.responseJSON.message)
}

const login = () => {
  const email = $('#input-email-login').val()
  const password = $('#input-password-login').val()
  $.ajax({
    url: 'http://localhost:3000/users/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done(data => {
      loginSuccess(data)
      getAllTodo()
    })
    .fail(err => {
      loginFailed(err)
    })
}

function onSignIn(googleUser) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/gLogin',
    headers: {
      token: googleUser.getAuthResponse().id_token
    }
  })
    .done(data => {
      loginSuccess(data)
    })
    .fail(err => {
      loginFailed(err)
    })
}

const register = () => {
  $.ajax({
    url: 'http://localhost:3000/users/register',
    method: 'POST',
    data: {
      email: $('#input-email-register').val(),
      password: $('#input-password-register').val()
    }
  })
    .then(response => {
      $('#form-login').show()
      $('#success-register').removeClass('hide').text(response.message)
      $('#error-register').addClass('hide')
      $('#form-register').hide()
      $('#input-email-register').val('')
      $('#input-password-register').val('')
    })
    .catch(err => {
      let errorMessage = ''
      for (const e of err.responseJSON.message) {
        errorMessage += e.message + '\n'
      }
      errorMessage = errorMessage.substring(0, errorMessage.length)
      $('#error-register').text(errorMessage)
      $('#error-register').removeClass('hide')
    })
}

const findUser = () => {
  return $.ajax({
    url: 'http://localhost:3000/users/find',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
}

const getAllTodo = () => {
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
    .then(todos => {
      if (todos.data.length) {
        let contentHtml = '<h3>Todo List</h3>'
        contentHtml += '<br></br>'
        contentHtml += '<div class="todo-wrapper">'
        for (const todo of todos.data) {
          contentHtml += '<div class="todo-title">'
          contentHtml += '<h5>' + todo.title + '</h5>'
          contentHtml += '</div>'
          contentHtml += '<div class="todo-description form-group row">'
          contentHtml += '<label class="col-sm-2 col-form-label">Description</label>'
          contentHtml += '<div class="col-sm-8">'
          contentHtml += '<textarea disabled readonly class="form-control">' + todo.description + '</textarea>'
          contentHtml += '</div>'
          contentHtml += '<div class="col-sm-2">'
          contentHtml += '<a class="edit-todo link" onclick="openModalEdit(' + todo.id + ')"><i class="fa fa-pencil" aria-hidden="true"></i></a>'
          contentHtml += '&nbsp;&nbsp;&nbsp;'
          contentHtml += '<a class="delete-todo link" onclick="openModalDelete(' + todo.id + ')"><i class="fa fa-trash" aria-hidden="true"></i></a>'
          contentHtml += '</div>'
          contentHtml += '</div>'
          contentHtml += '<div class="todo-due_date form-group row">'
          contentHtml += '<label class="col-sm-2 col-form-label">Due Date</label>'
          contentHtml += '<div class="col-sm-10">'
          contentHtml += '<label>' + new Date(todo.due_date).toLocaleDateString() + '</label>'
          contentHtml += '</div>'
          contentHtml += '</div>'
          contentHtml += '<br>'
        }
        contentHtml += '</div>'
        $('#todo-list').html(contentHtml)
      } else {
        $('#todo-list').html('<h1>You have no todo list</h1>')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

const createTodo = () => {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
    data: {
      title,
      description,
      due_date
    }
  })
    .then(newTodo => {
      console.log(newTodo)
      getAllTodo()
      closeModal()
    })
    .catch(err => {
      console.log(err)
    })
}

const findTodo = (id) => {
  $.ajax({
    url: 'http://localhost:3000/todos/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
    .then(todo => {
      todo = todo.data
      $('#modal-title').text('Edit Task')
      $('#title').val(todo.title)
      $('#description').val(todo.description)
      $('#due_date').val(parsingDate(new Date(todo.due_date)))
      $('.modal .btn-success').attr('id', 'submit-edit-task')
      $('#modal-add-edit').show()
      $('#todo-id').val(todo.id)
    })
    .catch(err => {
      console.log(err)
    })
}

const updateTodo = (id) => {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  $.ajax({
    url: 'http://localhost:3000/todos/' + id,
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
    data: {
      title,
      description,
      due_date
    }
  })
    .then(todo => {
      $('.modal').hide()
      getAllTodo()
    })
    .catch(err => {
      console.log(err)
    })
}

const deleteTodo = (id) => {
  $.ajax({
    url: 'http://localhost:3000/todos/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
  })
    .then(todo => {
      $('.modal').hide()
      getAllTodo()
    })
    .catch(err => {
      console.log(err)
    })
}

