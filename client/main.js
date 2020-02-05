//login function
function login(){
  $('#login-form').on('submit', (e) => {
    e.preventDefault()
    let user = $('#user').val()
    let password = $('#password').val()
    $.ajax('http://localhost:3000/users/login', {
      method: 'POST',
      data: {
        user, password
      }
     })
    .done(data => {
      localStorage.token = data.token
      localStorage.username = data.username
      $('#user').val("")
      $('#password').val("")
      showContent()
      Swal.fire({
        title: 'Login Success!',
        text: `Welcome ${data.username}`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })
    .fail(() => {
      Swal.fire({
        title: 'Error!',
        text: `Wrong username/ email/ password`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    })
  })
}

//logout
function logout() {
  $('#logout').on('click', ()=> {
    localStorage.clear()
    intialPage()
    Swal.fire({
      title: 'Logout Success!',
      text: `Goodbye!`,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  })
}

//showing intial page
function intialPage() {
  $("#content").hide()
  $('#logout').hide()
  $('#login').show()
  $('#username').empty()
}

//shwoing user's contents
function showContent() {
  let username = localStorage.username
  $("#content").show()
  $('#logout').show()
  $('#login').hide()
  $('#username').append(`<span>Welcome ${username}</span>`)
}

//running jqueries
$(document).ready(() => {
  if (!localStorage.token) {
    intialPage()
  } else {
    showContent()
  }
  
  login()
  logout()
})

//google sign in
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const id_token = googleUser.getAuthResponse().id_token
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}