$(document).ready(function(){
  checkLogin()
  pageNavigator()

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
        // localStorage.token = user.token
        // checkLogin()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
      })
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
}

function pageRegister () {
  $("#loginPage").hide()
  $("#registerPage").show()
  $("#todo").hide()
  $("#navbar").hide()
}