let currentUser = localStorage.currentUser
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
    $('#content').empty()
    data.forEach((todo, i) => {
      $('#content').append(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${todo.title}</td>
          <td>${todo.due_date}</td>
          <td>
          <span style="cursor: pointer;" onclick="editTodo(${todo.id})">Edit</span> |
          <span style="cursor: pointer;" onclick="doneTodo((${todo.id}), true)">Done</span> | 
          <span style="cursor: pointer;" onclick="deleteTodo(${todo.id})">Delete</span>
          </td>
        </tr>
      `)
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
    .done( ({ data }) => {
      Swal.fire({
        title: 'Yuhuuu..',
        text: `Adding ${data.title} Success !`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      fetchTodo()
    })
    .fail( err => {
      console.log(err, 'fail')
    })
  })
}

function editTodo (id) {
  // $.ajax({
  //   method: 'PUT',

  // })
  console.log('edit ', id)
}

function doneTodo (id, v) {
  console.log('done ', id, v)
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
  $('#contentPage').show()
  $('#landingPage').hide()
}

function fetchName () {
  $('#currentUser').empty()
  $('#currentUser').append(`Welcome ${currentUser}`)
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

  signOut()
  signInFancy()
  signUpFancy()

  addTodo()
})