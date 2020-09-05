function onSignIn(googleUser) {
   let id_token = googleUser.getAuthResponse().id_token;
   console.log('hai')

   $.ajax({
      method: "POST",
      url: "http://localhost:3000/googleSignIn",
      headers : {
         token : id_token
      }
   })
         .done(data => {
            localStorage.setItem('token', data.token)
            whenLogin()
            $("div#formLogin").hide()
            $("div#todoList").show() 
            resetWarning() 
            successNotif('login via google')
            fetchTodoList()            
         })
         .fail(err => {
            $("div#formLogin").hide()
         })
}

function isLogin() {
   const email = $("#loginEmail").val()
   const password = $("#loginPassword").val()

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
         successNotif('login')
         fetchTodoList()         
      })
      .fail(err => {
         $("#failLogin").show()
      })
}

function successNotif(msg) {
   let success = `
   <div class="alert alert-success mx-auto" role="alert">
      ${msg} success
   </div>
   `
   $("#alert").show()
   $("#alert").html(success)
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
        //  console.log(err.responseJSON.msg)

         let errorMessage = []
         if (err.responseJSON.msg.length !== 0) {
          err.responseJSON.msg.forEach(message => {
            errorMessage.push(message.message)
          })
          errorMessage = errorMessage.join(', ')  
         } else {
          errorMessage = err.responseJSON.msg
         }
         console.log(errorMessage)
         $("div#failRegister").html(errorMessage)
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
   $("#homeAlert").show()
   let success = `
   <div class="alert alert-success mx-auto" role="alert">
      Log out success
   </div>
   `
   $("#homeAlert").html(success)
}