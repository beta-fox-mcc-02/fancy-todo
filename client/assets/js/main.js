let currentUser = localStorage.currentUser
let updateId
let city = localStorage.city || 'Jakarta'
// USER QUERY
function onSignIn(googleUser) {
  const token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/glogin',
    headers: {
      token
    }
  })
  .done( data => {
    localStorage.token = data.token
    localStorage.currentUser = data.name
    currentUser = data.name
    contentPage()
    fetchTodo()
    fetchWeather()
  })
  .fail( err => {
    landingPage()
  })
}

function signInFancy () {
  $('#signIn').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
        email: $('#email-login').val(),
        password: $('#password-login').val()
      }
    })
    .done( data => {
      $('#email-login').val('')
      $('#password-login').val('')
      localStorage.token = data.token
      localStorage.currentUser = data.name
      currentUser = data.name
      Swal.fire({
        title: 'Login Success !',
        text: `Welcome Back ${data.name} !`,
        icon: 'success',
        confirmButtonText: 'Cool !'
      })
      contentPage()
      fetchTodo()
      fetchWeather()
    })
    .fail(() => {
      Swal.fire({
        title: 'Error!',
        text: `Email / Password Wrong !`,
        icon: 'error',
        confirmButtonText: 'Try Again !'
      })
    })
  })
}

function signUpFancy () {
  $('#signUp').on('submit', (e) => {
    e.preventDefault()
    let username = $('#username-register').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: {
        username,
        email,
        password
      }
    })
    .done( () => {
      $('#username-register').val('')
      $('#email-register').val('')
      $('#password-register').val('')
      Swal.fire({
        title: 'Register Success!',
        text: `Plase Login !`,
        icon: 'success',
        confirmButtonText: 'Cool !'
      })
      landingPage()
    })
    .fail( err => {
      Swal.fire({
        title: 'Ohhh Noo !!',
        text: `Register Fail !`,
        icon: 'error',
        confirmButtonText: 'Try Again !'
      })
    })
  })
}

function signOutFancy () {
  $('#SignOut').on('click', () => {
    localStorage.clear()
    currentUser = ''
    landingPage()
  })
}

function signOut() {
  $('#SignOut').on('click', function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      currentUser = ''
      landingPage()
    })
  })
}


// CRUD TODO
function fetchTodo () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.token
    }
  })
  .done(({ data }) => {
    $('#content-done').empty()
    $('#content-todo').empty()
    data.forEach((todo, i) => {
      const date = todo.due_date.split('-')
      const fixDate = `${date[2]}-${date[1]}-${date[0]}`
      if(!todo.status) {
        $('#content-todo').append(`
          <tr>
            <th scope="row">${i + 1}</th>
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${fixDate}</td>
            <td>
            <span style="cursor: pointer;" onclick="editTodo(${todo.id})">Edit</span> |
            <span style="cursor: pointer;" onclick="doneTodo((${todo.id}), true)">Done</span> | 
            <span style="cursor: pointer;" onclick="deleteTodo(${todo.id})">Delete</span>
            </td>
          </tr>
        `)
      } else {
        $('#content-done').append(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${fixDate}</td>
          <td>
          <span style="cursor: pointer;" onclick="editTodo(${todo.id})">Edit</span> |
          <span style="cursor: pointer;" onclick="doneTodo((${todo.id}), false)">Undone</span> | 
          <span style="cursor: pointer;" onclick="deleteTodo(${todo.id})">Delete</span>
          </td>
        </tr>
      `)
      }
    })
  })
  .fail(err => {
    console.log(err)
  })
}

function addTodo () {
  $('#add-todo').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/todos',
      data: {
        title: $('#title').val(),
        description: $('#description').val(),
        due_date: $('#due_date').val()
      },
      headers: {
        token: localStorage.token
      }
    })
    .done(({ data }) => {
      Swal.fire({
        title: 'Yuhuuu..',
        text: `Adding ${data.title} Success !`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      $('#title').val('')
      $('#description').val('')
      $('#due_date').val('')
      fetchTodo()
    })
    .fail( err => {
      console.log(err, 'fail')
    })
  })
}

function editTodo (id) {
  updateId = id
  // console.log('edit ', id)
  $('#contentPage').hide()
  $('#formEdit').show()
  $('#Navbar').show()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      token: localStorage.token
    }
  })
  .done(({ data }) => {
    // console.log(data)
    $('#title-update').val(`${data.title}`)
    $('#description-update').val(`${data.description}`)
    $('#due_date-update').val(`${data.due_date}`)
  })
  .fail(err => console.log(err))
}

function updateTodo () {
  $('#update-todo').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/todos/${updateId}`,
      data: {
        title: $('#title-update').val(),
        description: $('#description-update').val(),
        due_date: $('#due_date-update').val()
      },
      headers: {
        token: localStorage.token
      }
    })
    .done(({ data }) => {
      Swal.fire({
        title: 'Yuhuuu..',
        text: `Update ${data.title} Success !`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      $('#title-update').val('')
      $('#description-update').val('')
      $('#due_date-update').val('')
      updateId = ''
      fetchTodo()
      contentPage()
      
    })
    .fail(err => console.log(err))
  })
}

function doneTodo (id, v) {
  // console.log('done ', id, v)
  $.ajax({
    method: 'PUT',
    url: `http://localhost:3000/todos/${id}`,
    data: {
      status: v
    },
    headers: {
      token: localStorage.token
    }
  })
  .done( todo => {
    // console.log(todo)
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })

}

function deleteTodo (id) {
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      token: localStorage.token
    }
  })
  .done(() => {
    Swal.fire({
      title: 'Yuhuuu..',
      text: `Deleting Success !`,
      icon: 'success',
      confirmButtonText: 'OK'
    })
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}

// PAGE MANAGE
function landingPage () {
  $('#contentPage').hide()
  $('#landingPage').show()
}

function contentPage () {
  fetchName()
  $('#Navbar').show()
  $('#contentPage').show()
  $('#landingPage').hide()
  $('#formEdit').hide()
}

function fetchName () {
  $('#currentUser').empty()
  $('#currentUser').append(`Welcome ${currentUser}`)
}

function backHome () {
  $('#cancel').on('click', (e) => {
    contentPage()
  })
}

// weather
function checkWeather () {
  $('#weather').on('submit', (e) => {
    e.preventDefault()
    city = $('#city').val()
    localStorage.city = $('#city').val()
    $('#city').val('')
    fetchWeather()
  })
}

function fetchWeather (){
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/weathers/${city}`
    })
    .done( data => {
      console.log(data)
      let weather = {
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        city: data.name
      }
      $('#weather-detail').empty()
      $('#weather-detail').append(`
      <tr>
        <td>City</td>
        <td>${city}</td>
      </tr>
      <tr>
        <td>${weather.main}</td>
        <td>${weather.description}</td>
      </tr>
      <tr>
        <td>Temp</td>
        <td>${weather.temp} &#8457</td>
      </tr>
      <tr>
        <td>Temp Min</td>
        <td>${weather.temp_min} &#8457</td>
      </tr>
      <tr>
        <td>Temp Max</td>
        <td>${weather.temp_max} &#8457</td>
      </tr>
      <tr>
        <td>Humidity</td>
        <td>${weather.humidity}%</td>
      </tr>
      `)
    })
    .fail(err => console.log(err))
}


// DOCUMENT READY
$(document).ready(() => {
  if(localStorage.getItem('token')) {
    fetchName()
    contentPage()
    fetchTodo()
  } else {
    landingPage()
  }
  // user
  signOut()
  signInFancy()
  signUpFancy()
  
  // todo
  addTodo()
  updateTodo()

  // 3rd party
  checkWeather()
  fetchWeather()

  // asd
  backHome()
})