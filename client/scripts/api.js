const parsingDate = (date) => {
  date = date.toLocaleDateString()
  const array = date.split('/')
  const year = array[2]
  const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
  const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
  return `${year}-${month}-${day}`
}

const formatDate = (date) => {
  date = date.toLocaleDateString()
  const array = date.split('/')
  const year = array[2]
  const month = +array[0] < 10 ? `0${array[0]}` : `${array[0]}`
  const day = +array[1] < 10 ? `0${array[1]}` : `${array[1]}`
  return `${day}-${month}-${year}`
}

const loginSuccess = (data) => {
  $('#error-login').addClass('hide').text()
  $('#form-login').hide()
  $('#header-login').addClass('hide')
  $('#navbarDropdown').removeClass('hide')
  $('#header-username').removeClass('hide')
  $('.todo-container').show()
  localStorage.setItem('token', data.token)
  $('#input-email-login').val('')
  $('#input-password-login').val('')
}

const loginFailed = (err) => {
  $('#navbarDropdown').addClass('hide')
  let errorMessages = ''
  for (const e of err.responseJSON.errors) {
    errorMessages += e + '\n'
  }
  $('#error-login').removeClass('hide').text(errorMessages.substring(0, errorMessages.length))
  $('#error-login').show()
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
      findUser()
        .done(response => {
          $('#navbarDropdown').text(response.user.username)
          getAllTodo()
        })
        .fail(err => {
          loginFailed(err)
        })
    })
    .fail(err => {
      loginFailed(err)
    })
}

function onSignIn(googleUser) {
  $.ajax({
    url: 'http://localhost:3000/users/gLogin',
    method: 'POST',
    headers: {
      token: googleUser.getAuthResponse().id_token
    }
  })
    .done(data => {
      loginSuccess(data)
      findUser()
        .done(response => {
          $('#navbarDropdown').text(response.user.username)
          getAllTodo()
        })
        .fail(err => {
          loginFailed(err)
        })
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
      username: $('#input-username-register').val(),
      email: $('#input-email-register').val(),
      password: $('#input-password-register').val()
    }
  })
    .done(response => {
      $('#form-login').show()
      $('#success-register').removeClass('hide').text(response.message)
      $('#success-register').show()
      $('#error-register').addClass('hide')
      $('#form-register').hide()
      $('#input-email-register').val('')
      $('#input-password-register').val('')
    })
    .fail(err => {
      let errorMessage = ''
      for (const e of err.responseJSON.errors) {
        errorMessage += e + '\n'
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
    .done(todos => {
      if (todos.data.length) {
        let contentHtml = '<h3>Todo List</h3>'
        contentHtml += '<br></br>'
        contentHtml += '<div class="todo-wrapper">'
        for (const todo of todos.data) {
          contentHtml += '<div class="todo-title">'
          contentHtml += '<span class="heading">' + todo.title + '</span>'
          if (todo.status) {
            contentHtml += '<span class="badge badge-success">Completed</span>'
          } else {
            contentHtml += '<span class="badge badge-danger">Uncompleted</span>'
          }
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
          contentHtml += '<label>' + formatDate(new Date(todo.due_date)) + '</label>'
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
    .fail(err => {
      $('#todo-list').html()
    })
}

const createTodo = () => {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  const location = $('#location').val()
  $.ajax({
    url: 'http://localhost:3000/todos',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
    data: {
      title,
      description,
      due_date,
      location
    }
  })
    .done(newTodo => {
      getAllTodo()
      closeModal()
      $('#location').val('')
    })
    .fail(err => {
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
    .done(todo => {
      todo = todo.data
      if (todo.status) {
        $('#status').prop('checked', true)
      } else {
        $('#status').prop('checked', false)
      }
      if (todo.Location) {
        $('#modal-body-nearby-places').show()
        $('#search-location').val(todo.Location.name)
        $('#location').val(JSON.stringify([todo.Location]))
        $('#options-locations').prop('checked', true)
        $('#location-detail').show()
        $('#location-detail-name').text(todo.Location.name)
        $('#location-detail-address').text(todo.Location.address)
        $('#location-detail-phone-number').text(todo.Location.phone_number)
        $('#todo-location').show()
        getLocationDetail(todo.Location.google_place_id)
      } else {
        $('#modal-body-nearby-places').hide()
        $('#search-location').val('')
        $('#todo-location').hide()
        $('#search-location').val('')
        $('#location-detail').hide()
        $('#options-locations').prop('checked', false)
        $('#location-detail-name').text('')
        $('#location-detail-address').text('')
        $('#location-detail-phone-number').text('')
      }
      $('#todo-status-form').removeClass('hide')
      $('#modal-title').text('Edit Task')
      $('#title').val(todo.title)
      $('#description').val(todo.description)
      $('#due_date').val(parsingDate(new Date(todo.due_date)))
      $('.modal form').attr('id', 'form-edit-task')
      $('#modal-add-edit').show()
      $('#todo-id').val(todo.id)
    })
    .fail(err => {
      console.log(err)
    })
}

const updateTodo = (id) => {
  const title = $('#title').val()
  const description = $('#description').val()
  const due_date = $('#due_date').val()
  const status = $('#status').is(":checked")
  const location = $('#location').val()
  $.ajax({
    url: 'http://localhost:3000/todos/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
    data: {
      title,
      description,
      due_date,
      status,
      location
    }
  })
    .then(todo => {
      $('.modal').hide()
      getAllTodo()
      $('#location').val('')
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
    .done(todo => {
      $('.modal').hide()
      getAllTodo()
    })
    .fail(err => {
      console.log(err)
    })
}

const getNearbyPlaces = (parameters) => {
  $('#sp-loader').show()
  $('#nearby-places').html('')
  $.ajax({
    url: 'http://localhost:3000/locations/nearby',
    method: 'GET',
    data: {
      radius: parameters.radius,
      type: parameters.type,
      location: parameters.location
    }
  })
    .done(nearbyPlaces => {
      let contentHtml = ''
      const data = [...nearbyPlaces.results].slice(0, 5)
      for (const d of data) {
        contentHtml += '<div class="place-name">' + d.name + '</div>'
        contentHtml += '<div class="place-address">' + d.vicinity + '</div>'
        if (d.rating) {
          contentHtml += '<div class="place-rating"><i class="fa fa-star color-rating"></i>&nbsp;' + d.rating + '</div>'
        }
        contentHtml += '<br>'
      }
      $('#nearby-places').html(contentHtml)
      $('#sp-loader').hide()
      $('#modal-body-nearby-places').show()
    })
    .fail(err => {
      $('#nearby-places').html('')
    })
}

const getLocationDetail = (place_id) => {
  $.ajax({
    url: 'http://localhost:3000/locations/detail',
    method: 'GET',
    data: {
      place_id
    }
  })
    .done(detail => {
      const data = detail.result
      const geometry = data.geometry.location
      const location = [geometry.lat, geometry.lng].join(',')
      const parameters = {
        location,
        radius: 1500,
        type: 'restaurant'
      }
      getNearbyPlaces(parameters)
    })
    .fail(err => {
      console.log(err)
    })
}

