//reset page
function resetPage() {
   $("#homePage").hide()
   $("#formLogin").hide()
   $("#formRegister").hide()
   $("#todoList").hide()
   $("#listZomato").hide()
   $("#alert").hide()
   $("#homeAlert").hide()
}

//nav setting when login
function whenLogin() {
   $("li#navLogin").hide()
   $("li#navLogout").show()
   $("li#navRegister").hide()   
   $("li#navTodoList").show()
}

//nav setting when logout
function whenLogout() {
   $("li#navLogin").show()
   $("li#navLogout").hide()
   $("li#navRegister").show()
   $("li#navTodoList").hide()
}

//nav control 
function navControl() {
   if(localStorage.token) {
      whenLogin()
   } else {
      whenLogout()
   }
}

//show Homepage
function showHome() {
   resetPage()
   navControl()
   $("#homePage").show()
}

//reset error/success warning/notification
function resetWarning() {
   $("div#successRegister").hide()
   $("div#failRegister").hide()
   $("div#failLogin").hide()
   $("div#successCreateTodo").hide()
   $("div#failCreateTodo").hide()
}

$(document).ready(function(){
   resetPage()
   if(localStorage.token) {
      whenLogin()
   } else {
      whenLogout()
      $("#homePage").show()
   }

   //nav Logo
   $("a.navbar-brand").on("click", function() {
      resetPage()
      navControl()
      $("#homePage").show()
   })

   //nav Home
   $("li#navHome").on('click', function() {
      resetPage()
      navControl()
      $("#homePage").show()
   })

   //nav Login
   $("li#navLogin").on('click', function() {
      $("#loginEmail").val('')
      $("#loginPassword").val('')
      resetPage()
      resetWarning()
      $("div#formLogin").show()
   })
   $("button#logingIn").on('click', function(el) {
      el.preventDefault()
      resetWarning()
      isLogin()
   })

   //nav Logout
   $("li#navLogout").on('click', function() {
      resetPage()
      whenLogout()
      logingOut()
   })

   //nav Register
   $("li#navRegister").on('click', function() {
      $("#registerEmail").val('')
      $("#registerPassword").val('')
      resetPage()
      whenLogout()
      resetWarning()
      $("div#formRegister").show()
   })
   $("button#registerUser").on('click', function(el) {
      el.preventDefault()
      register()
   })

   //nav TodoList
   $("li#navTodoList").on("click", function() {
      resetPage()
      whenLogin()
      resetWarning()
      $("div#todoList").show()
      fetchTodoList()
   })
   $("button#addTodo").on("click", function(el) {
      el.preventDefault()
      resetWarning()
      addTodoList()
   })

   //close Modal
   $(".close-modal").on("click", function(el) {
      el.preventDefault()
      $("#modalDeleteTodo").hide()
      $("#modalUpdateTodo").hide()
      $("#todoList").show()
      $("#zomatoModal").hide()
      $("#modalAddTodo").hide()

      fetchTodoList()
   })

   $("#addZomato").on("click", function(el) {
      el.preventDefault()
      $("#zomatoModal").show()
      $("#todoList").hide()
   })

   $("#showListZomato").on("click", function(el) {
      el.preventDefault()
      $("#listZomato").show()
      $("#zomatoModal").hide()
      zomato()
   })

   $("#backToTodo").on("click", function(el) {
      el.preventDefault()
      $("#todoList").show()
      $("#zomatoModal").hide()
      $("#listZomato").hide()
   })

   $("#addZomatoConfirm").on('click', function(el){
      el.preventDefault()
      resetWarning()
      addZomatoList()
   })

   $("#showModalAddButton").on('click', function(el) {
      el.preventDefault()
      $("#todoList").hide()
      $("#modalAddTodo").show()
   })
})