$(document).ready(function(){
  
  if (localStorage.getItem('roken')){
    $("#login").hide()
    $("#todo").show()
  } else {
    $("#login").show()
    $("#todo").hide()
  }
  $("#register").hide()
  

  $("#btnHome").click(function(){
    $("#login").hide()
    $("#register").hide()
    $("#todo").show()
  })

  $("#btnLogin").click(function(){
    $("#login").show()
    $("#register").hide()
    $("#todo").hide()
  })

  $("#btnRegister").click(function(){
    $("#login").hide()
    $("#register").show()
    $("#todo").hide()
  })
})

