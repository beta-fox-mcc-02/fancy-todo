function regiter(data){
  return axios({
  method : 'POST',
  url : 'http://localhost:3000/register',
  data
  })
}

function login(data){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/login',
    data
  });
}

function fetchData(){
  $.ajax('http://localhost:3000/todos', {
  method : 'GET',
  headers : {
    token : localStorage.token
  }
})
  .done(function(todos){
    $("ul#todos").empty()
    todos.data.forEach(el => {
      $("ul#todos").append(`<li id="li-${el.id}">${el.title}</li>`);
      $(`li#li-${el.id}`).on("click", function(){
        selectOne(el.id)
        .then(todo=>{
          $("ul#todo-findOne").empty()
          $("ul#todo-findOne").append(`<li>Title :${todo.data.data.title}</li>`);
          $("ul#todo-findOne").append(`<li>Description :${todo.data.data.description}</li>`);
          $("ul#todo-findOne").append(`<li>Due date :${todo.data.data.due_date}</li>`);
          $("div#f1").append(`<button>delete</button>`)
        })
        .catch(err=>{
          console.log(err)
        })
      })
    });
  })
  .fail(function(err){
    console.log(err)
  })
}

function addTodo(data){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/todos',
    headers : {
      token : localStorage.token
    },
    data
  });
}

function selectOne(id){
  return axios({
    method: 'get',
    url: `http://localhost:3000/todos/${id}`,
    headers : {
      token : localStorage.token
    }
  });
}

function googleSignIn(token){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/glogin',
    headers : {
      token
    }
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  googleSignIn(id_token)
  .then(user=>{
    const token = user.data.accesToken
    localStorage.setItem('token',token)
    fetchData()
  })
  .catch(err =>{
    console.log(err)
  })
}

$(document).ready(function(){
  $("li#list").click(function(){
    $("#listTodo").show();
    $("#home").hide();
  });

  if(localStorage.token){
    fetchData()
  }

  $("#register").on("submit",function(el){
    el.preventDefault()
    const email = $("#e-register").val()
    const password = $("#p-register").val()
    const data = {email, password}
    regiter(data)
      .then(user=>{
        console.log(user.data)
      })
      .catch(err=>{
        console.log(err)
      })
  });


  $("#login").on("submit", function(el){
    el.preventDefault()
    const email = $("#e-login").val()
    const password = $("#p-login").val()
    const data = {email, password}
    login(data)
    .then(user=>{
      const token = user.data.accesToken
      localStorage.setItem('token',token)
      fetchData()
    })
    .catch(err=>{
      console.log(err)
    })
  })

  $("#addTodo").on("submit", function(el){
    el.preventDefault()
    const title = $("#t-add").val()
    const description = $("#d-add").val()
    const due_date = $("#due-add").val()
    const data = {title, description, due_date}
    // console.log(data)
    addTodo(data)
    .then(todo=>{
      console.log(todo.data)
      fetchData()
    })
    .catch(err=>{
      console.log(err)
    })
  })

  $("#f1").on("click", function(){
    let id = 4
    selectOne(id)
      .then(todo=>{
        console.log(todo)
        $("ul#todo-findOne").append(`<li>Title :${todo.data.data.title}</li>`);
        $("ul#todo-findOne").append(`<li>Description :${todo.data.data.description}</li>`);
        $("ul#todo-findOne").append(`<li>Due date :${todo.data.data.due_date}</li>`);
      })
      .catch(err=>{
        console.log(err)
      })
  })

  $("#logout").on("click", function(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear();
    });
  })
});