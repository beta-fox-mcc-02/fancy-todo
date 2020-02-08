function onSignIn(googleUser) {
   let id_token = googleUser.getAuthResponse().id_token;
   // console.log(id_token)
   // console.log(googleUser)
   $.ajax({
      method: "POST",
      url: "http://localhost:3000/googleSignIn",
      headers : {
         token : id_token
      }
   })
         .done(data => {
            console.log('success in login with google')
            localStorage.setItem('token', data.token)
            whenLogin()
            $("div#formLogin").hide()
            $("div#todoList").show() 
            resetWarning() 
            fetchTodoList()            
         })
         .fail(err => {
            console.log('fail')
            $("div#formLogin").hide()
         })
}

function isLogin() {
   const email = $("#loginEmail").val()
   const password = $("#loginPassword").val()
   // console.log($("#loginEmail").val())
   // console.log($("#loginPassword").val())
   $.ajax({
      method: "POST",
      url: `http://localhost:3000/users/login`,
      data : {
         email,
         password
      }
   })
      .done(todo => {
         localStorage.setItem("token", todo.token)
         $("div#formLogin").hide()
         $("div#todoList").show()
         whenLogin()
         resetWarning()
         fetchTodoList()         
      })
      .fail(err => {
         $("#failLogin").show()
      })
}

function register() {
   $.ajax({
      method: "POST",
      url: `http://localhost:3000/users/register`,
      data : {
         email : $("#registerEmail").val(),
         password : $("#registerPassword").val()
      }
   })
      .done(todo => {
         $("div#formRegister").hide()
         $("div#formLogin").show() 
         $("div#failLogin").hide()        
      })
      .fail(err => {
         console.log(err.responseJSON.msg)
         $("div#failRegister").html(err.responseJSON.msg)
         $("div#failRegister").show()
      })
}

function logingOut() {
   $("#loginEmail").val('')
   $("#loginPassword").val('')

   localStorage.clear()

   const auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     console.log('User signed out.');
   });
   $("#homePage").show()
}