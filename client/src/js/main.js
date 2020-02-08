$(document).ready(function(){
  checkLogin()
  pageNavigator()
  fetchTodos()
  restrictInputDueDate()

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

        $('#emailLogin').val('')
        $('#passwordLogin').val('')
        checkLogin()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
        if (err.responseJSON.name === 'invalid email/password') {
          Swal.fire({
            title: err.responseJSON.msg,
            text: err.responseJSON.msg + '. Please check your email/password.',
            icon: 'error',
            confirmButtonText: 'Close'
          })
        }
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
        localStorage.token = user.token
        Swal.fire({
          title: 'Register Success!',
          text: 'Register success. Please wait',
          icon: 'success',
          confirmButtonText: 'Close'
        })
        $('#nameRegister').val('')
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
        checkLogin()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
        if (err.responseJSON.name === 'SequelizeUniqueConstraintError') {
          Swal.fire({
            title: 'Email registered!',
            text: 'Email has been registered. Please login or register with another email ',
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else if (err.responseJSON.msg === 'Minimum password length is 6') {
          Swal.fire({
            title: 'Too short',
            text: err.responseJSON.msg,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else {
          console.log(err.responseJSON)
        }
        
      })
  })

  $("#btnLogout").click(function(){
    localStorage.clear()
    checkLogin()
  })

  $("#saveTodo").click(function(){
    const title = $('#addTitleTodo').val()
    const description = $('#addDescriptionTodo').val()
    const status = false
    const due_date = $('#due_date').val()
    $.ajax({
      url: "http://localhost:3000/todos",
      method: "POST",
      headers: {
        token: localStorage.token
      },
      data: {
        title,
        description,
        status,
        due_date
      },
    })
      .done(function(todos) {
        console.log(todos)
        Swal.fire({
          title: 'Success!',
          text: todos.msg,
          icon: 'success',
          confirmButtonText: 'Close'
        })
        $('#addTitleTodo').val('')
        $('#addDescriptionTodo').val('')
        $('#due_date').val('')
        fetchTodos()
      })
      .fail(function(err) {
        console.log(err.responseJSON)
      })
    $('#addTodoModal').modal('hide')
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
  $("#todo").hide()
}

function pageRegister () {
  $("#loginPage").hide()
  $("#registerPage").show()
  $("#todo").hide()
  $("#navbar").hide()
}

function fetchTodos () {
  $('#listTodos').empty()
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "GET",
  })
    .done(function(todos) {
      // console.log(todos)
      displayTodos(todos)
    })
    .fail(function(err) {
      console.log(err.responseJSON)
    })
}

function displayTodos (todos) {
  todos.forEach(todo => {
    const id = todo.id
    const cardTodo = `
      <div class="col-sm-6">
        <div class="card m-1">
          <div class="card-header">
            <h3>${todo.title}</h3>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Deadline: ${todo.due_date.slice(0, 10)}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Status: ${todo.status ? 'Done' : 'On progress'}</h6>
            <p class="card-text">${todo.description}</p>
            <a href="#" id="updateTodo${id}" class="btn btn-primary" onclick="addAttrId(${id})" data-toggle="modal" data-target="#updateTodoModal">Update</a>
            <a href="#" id="deleteTodo${id}" class="btn btn-danger">Delete</a>
            <a href="#" id="doneTodo${id}" class="btn btn-success doneTodos">Done</a>
          </div>
        </div>
      </div>
      `

    $('#listTodos').append(cardTodo)

    $(`#saveUpdateTodo.updateTodoById${id}`).click(function(e){
      e.preventDefault()
      console.log('todo with id', id, 'updated')
    })
    addDeleteTodo(id)
    addDoneTodo(id)
  }) // end of forEach
}

function restrictInputDueDate () {
  const today = new Date().toISOString().slice(0, 10)
  $("#due_date").attr("min", today);
}

function deleteTodo (id) {
  return axios({
    method: 'delete',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.token
    }
  })
}

function addDeleteTodo (id) {
  $(`#deleteTodo${id}`).click(function(e){
    e.preventDefault()
    titleAlertify('delete')
    alertify.confirm("Are you sure ?",
      function(){
        deleteTodo(id)
          .then(({ data }) => {
            console.log(data)              
            if (data.todo) alertify.success(data.msg)
            else alertify.error('Delete failed')
            fetchTodos()
          })
          .catch(err => {
            console.log(err.response)
          })
      },
      function(){
        console.log('delete canceled')
    })
  })
}

function doneTodo (id) {
  return axios({
    method: 'patch',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.token
    },
    data: {
      status: true
    }
  })
}

function addDoneTodo (id) {
  $(`#doneTodo${id}`).click(function(e){
    e.preventDefault()
    titleAlertify('done')
    alertify.confirm("Are you sure ?",
      function(){
        doneTodo(id)
          .then(({ data }) => {
            console.log(data)              
            if (data.todo[0]) alertify.success(data.msg)
            else alertify.error('update status failed')
            fetchTodos()
          })
          .catch(err => {
            console.log(err.response)
          })
      },
      function(){
        console.log('delete canceled')
    })
  })
}

function addAttrId (id) {
  $('#saveUpdateTodo').attr("onclick", `addUpdateTodo(${id})`)
}

function addUpdateTodo (id) {
  const title = $('#updateTitleTodo').val()
  const description = $('#updateDescriptionTodo').val()
  let due_date = $('#updateDue_date').val()
  if (due_date === '') due_date = undefined
  axios({
    method: 'put',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.token
    },
    data: {
      title, 
      description, 
      due_date
    }
  })
    .then(({ data }) => {
      console.log(data)
      $('#updateTitleTodo').val('')
      $('#updateDescriptionTodo').val('')
      $('#updateDue_date').val('')
      if (data.todo[0]) alertify.success(data.msg)
      else alertify.error('update failed')
      fetchTodos()
    })
    .catch(err => {
      console.log(err.response)
    })
  console.log('Update todo with id', id)
}