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
            console.log('success in main.js')
            localStorage.setItem('token', data.token)              
         })
         .fail(err => {
            $("div#formLogin").hide()
         })
}

function addTodoList() {
   $("#showTodoList").empty()
   $.ajax({
      method: "POST",
      url: "http://localhost:3000/todos",
      data : {
         title: $("#addTitle").val(),
         description: $("#addDescription").val(),
         due_date : $("#addDueDate").val()
      },
      headers : {
         token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         fetchTodoList()         
      })
      .fail(err => {
         console.log(err)
      })
}

function fetchTodoList() {
   $("#showTodoList").empty()
   $.ajax({
      method: "GET",
      url: "http://localhost:3000/todos",
      headers : {
        token : localStorage.getItem("token")
      }
   })
      .done(todos => {
         // console.log(todos.data)
         todos.data.forEach(todo => {
            // console.log(todo)
            $("#showTodoList").append(
               `<div>
                  <ul class="list-group list-group-flush" >
                     <li>${todo.title} ${todo.description} ${todo.due_date}</li>
                  </ul>
               </div>`
            )
         })
      })
      .fail(err => {
         console.log('fail fetch todo list')
      })
}

function updateTodoList(id) {
   $("#showTodoList").empty()
   $.ajax({
      method: "PUT",
      url: `http://localhost:3000/todos/${id}`,
      data : {
         title : $("#addTitle").val(),
         description : $("#description").val(),
         due_date : $("#due_date").val(),
      },
      headers : {
         token : localStorage.getItem("token")
      }
   })
      .done(todo => {
         fetchTodoList()
      })
      .fail(err => {
         console.log(err)
      })
}

function deleteTodoList(id) {
   
   $("#showTodoList").empty()
   $.ajax({
      method: "DELETE",
      url: `http://localhost:3000/todos/${id}`,
      headers : {
         token
      }
   })
      .done(todo => {
         fetchTodoList()
      })
      .fail(err => {
         console.log(err)
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
         fetchTodoList()         
      })
      .fail(err => {
         console.log(err, 'fail login====================')
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
         console.log('success register')
      })
      .fail(err => {
         console.log(err, 'register')
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
}

function showHome() {
   $("div.col").hide()
}

function whenLogin() {
   $("li#navLogin").hide()
   $("li#navLogout").show()
   $("li#navRegister").hide()   
   $("li#navTodoList").show()
}

function whenLogout() {
   $("li#navLogin").show()
   $("li#navLogout").hide()
   $("li#navRegister").show()
   $("li#navTodoList").hide()
}

$(document).ready(function(){
   showHome()
   if(localStorage.token) {
      whenLogin()
   } else {
      whenLogout()
   }   

   $("li#navHome").on('click', function() {
      showHome()
      if(localStorage.token) {
         whenLogin()
      } else {
         whenLogout()
      }
   })

   $("li#navLogin").on('click', function() {
      showHome()
      $("div#formLogin").show()
      whenLogin()
      $("#logingIn").on('click', function(el) {
         el.preventDefault()
         isLogin()
      })
   })

   $("li#navLogout").on('click', function() {
      showHome()
      whenLogout()
      logingOut()
   })
   
   $("li#navRegister").on('click', function() {
      showHome()
      whenLogout()
      $("div#formRegister").show()
      $("#registerUser").on('click', function(el) {
         el.preventDefault()
         register()
      })
   })

   $("li#navTodoList").on("click", function() {
      showHome()
      $("div#todoList").show()
      whenLogin()
      fetchTodoList()
      $("#addTodo").on("submit", function(el) {
         el.preventDefault()
         addTodoList()
      })
   })

})