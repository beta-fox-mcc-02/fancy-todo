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
    $("#todos").empty()
    todos.data.forEach(el => {
      let arr = el.due_date.split('T')
      $("#todos").append(
      `<tr>
        <td>${el.title}</td>
        <td>${arr[0]}</td>
        <td><a id="li-${el.id}" href="#">detail</a></td>
       </tr>`
        );
      $(`#li-${el.id}`).on("click", function(){
        selectOne(el.id)
        .then(todo=>{
          $("#listTodo").hide()
          $("#div-f1").show()
          $("ul#todo-findOne").empty()
          $("ul#todo-findOne").append(`<li><b>Title :</b><br>${todo.data.data.title}</li>
          `);
          $("ul#todo-findOne").append(`<li><b>Description :</b><br>${todo.data.data.description}</li>`);
          let arr = todo.data.data.due_date.split('T')
          $("ul#todo-findOne").append(`<li><b>Due date :</b><br>${arr[0]}</li>`);
          $("#id-select").val(`${el.id}`)
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

function updateTodo(data,id){
  return axios({
    method: 'put',
    url: `http://localhost:3000/todos/${id}`,
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

function deleteTodo(id){
  return axios({
    method: 'delete',
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

function fetchQuote(){
  return axios({
    method : 'get',
    url : 'http://localhost:3000/quote'
  }) 
    .then(result=>{
      $('#quote-text').html(`${result.data.quote}`)
      $('#quote-author').html(`${result.data.author}`)
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err)      
    })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  googleSignIn(id_token)
  .then(user=>{
    const token = user.data.accesToken
    localStorage.setItem('token',token)
    $("#listTodo").hide()
    fetchData()
    afterLogin()
  })
  .catch(err =>{
    console.log(err)
  })
}

function showHome(){
  // fetchQuote()
  if(!localStorage.token){
    $("#div-home").show()
    $("#quote").show()
    $("#div-register").hide()
    $("#div-login").hide()
    $("#div-edit").hide()
    $("#div-f1").hide()
    $("#click-list").hide()
    $("#listTodo").hide() 
    $("#click-logout").hide()
    $("#loading").hide() 
  } else {
    $("#div-home").show()
    $("#quote").show()
    $("#click-register").hide()
    $("#click-login").hide()
    $("#div-edit").hide()
    $("#listTodo").hide()
    $("#div-register").hide()
    $("#div-login").hide()
    $("#div-f1").hide()
    $("#loading").hide() 
  }
}

function afterLogin(){
  $("ul#todo-findOne").empty()
  $("#div-login").hide()
  $("#click-register").hide()
  $("#click-login").hide()
  $("#click-logout").show()
  $("#click-list").show()
  $("#listTodo").hide()
  $("#div-home").show()
  $("#quote").show()
}

function showList(){
  fetchData()
  $("#listTodo").show()
  $("#div-home").hide()
  $("#div-register").hide()
  $("#div-login").hide()
  $("#div-edit").hide()
  $("#div-f1").hide()
  $("#quote").hide() 
  $("#click-logout").show() 
}

$(document).ready(function(){
  fetchQuote()
  showHome()

  $("#click-login").on("click", function(){
    $("#div-home").hide()
    $("#div-login").show()
    $("#div-register").hide()
    $("#quote").hide() 
  })

  $("#click-register").on("click", function(){
    $("#div-home").hide()
    $("#div-register").show()
    $("#div-login").hide()
    $("#quote").hide() 
  })

  $("#click-list").click(function(){
    showList()
  });

  $("#click-home").click(function(){
    showHome()
  });

  $("#register").on("submit",function(el){
    el.preventDefault()
    const email = $("#e-register").val()
    const password = $("#p-register").val()
    const data = {email, password}
    regiter(data)
      .then(user=>{
        console.log(user.data)
        $("#div-login").show()
        $("#div-register").hide()
        $("#warning-reg").html("")
        $("#e-register").val("")
        $("#p-register").val("")
      })
      .catch(err=>{
        // console.log(typeof err.response.data.errObj.msg)
        if(typeof err.response.data.errObj.msg==='string'){
          $("#warning-reg").html(`${err.response.data.errObj.msg}`)
        } else {
        $("#warning-reg").html(`${err.response.data.errObj.msg[0]}`)
        }
        console.log(err.response.data)
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
      $("#warning-login").html("")
      $("#e-login").val("")
      $("#p-login").val("")
      fetchData()
      afterLogin()
    })
    .catch(err=>{
      $("#warning-login").html(`${err.response.data.errObj.msg}`)
    })
  })

  $("#addTodo").on("submit", function(el){
    el.preventDefault()
    const title = $("#t-add").val()
    const description = $("#d-add").val()
    const due_date = $("#due-add").val()
    const data = {title, description, due_date}
    addTodo(data)
    .then(todo=>{
      showList()
    })
    .catch(err=>{
      if(typeof err.response.data.errObj.msg==='string'){
        $("#warning-add").html(`${err.response.data.errObj.msg}`)
      } else {
      $("#warning-add").html(`${err.response.data.errObj.msg[0]}`)
      }
      console.log(err.response)
    })
  })

  $("#click-logout").on("click", function(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear();
      showHome()
      $("#click-register").show()
      $("#click-login").show()
      $("#click-logout").hide()
      $("#click-list").hide()
    });
  })

  $("#delete-todo").on("click", function(){
    let id = $("#id-select").val()
    deleteTodo(id)
      .then(result=>{
        showList()
      })
      .catch(err=>{
        console.log(err)
      })
  })

  $("#edit-todo").on("click", function(){
    let id = $("#id-select").val()
    selectOne(id)
    .then(result=>{
      $("#div-f1").hide()
      $("#div-edit").show()
      $("ul#todo-findOne").empty()
      $("#t-edit").val(`${result.data.data.title}`)
      $("#d-edit").val(`${result.data.data.description}`)
      let arr = result.data.data.due_date.split('T')
      $("#due-edit").val(`${arr[0]}`)
    })
    .catch(err=>{
      console.log(err)
    })
  })

  $("#editTodo").on("submit", function(el){
    el.preventDefault()
    let id = $("#id-select").val()
    const title = $("#t-edit").val()
    const description = $("#d-edit").val()
    const due_date = $("#due-edit").val()
    const data = {title, description, due_date}
    updateTodo(data,id)
    .then(result=>{
      console.log(result.data)
      showList()
    })
    .catch(err=>{
      console.log(err)
    })
  })

  $("#close-add").on("click", function(){
    $("#t-add").val("")
    $("#d-add").val("")
    $("#due-add").val("")
  })
});