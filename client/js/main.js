function home() {
    $("#nav-home").hide()
    $("#nav-user").show()
    $("#welcome").show()
    $("#register").hide()
    $("#login").hide()
    $("#content-todo").hide()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#eror").hide()
    showPublicHoliday()
    $("#public-holiday").show()
}

function registerPage() {
    $("#nav-home").show()
    $("#welcome").hide()
    $("#register").show().css("margin", "100px auto")
    $("#login").hide()
    $("#nav-user").hide()
    $("#content-todo").hide()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#eror").hide()
    $("#public-holiday").hide()
}

function registerPageError() {
    $("#nav-home").show()
    $("#welcome").hide()
    $("#register").show().css("margin", "100px auto")
    $("#login").hide()
    $("#nav-user").hide()
    $("#content-todo").hide()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#eror").show()
    $("#public-holiday").hide()
}

function loginPage() {
    $("#nav-home").show()
    $("#welcome").hide()
    $("#register").hide()
    $("#login").show().css("margin", "100px auto")
    $("#nav-user").hide()
    $("#content-todo").hide()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#eror").hide()
}

function pageLogin() {
    $("#listdata").empty()
    
    $("#nav-home").hide()
    $("#welcome").hide()
    $("#register").hide()
    $("#login").hide()
    $("#nav-user").show()
    fetch()
    $("#add-todo").hide()
    $("#update-todo").hide()
    $("#eror").hide()
    $("#public-holiday").hide()
}

function addTodoPage() {
    $("#nav-home").hide()
    $("#welcome").hide()
    $("#register").hide()
    $("#login").hide()
    $("#nav-user").show()
    $("#content-todo").hide()
    $("#add-todo").show()
    $("#update-todo").hide()
    $("#eror").hide()
    $("#public-holiday").hide()
}

function updateTodoPage() {
    $("#nav-home").hide()
    $("#welcome").hide()
    $("#register").hide()
    $("#login").hide()
    $("#nav-user").show()
    $("#content-todo").hide()
    $("#add-todo").hide()
    $("#update-todo").show()
    $("#eror").hide()
    $("#public-holiday").hide()
}


function registerProcess(email, password) {
    $.ajax({
        url: "http://localhost:3000/register",
        method : "POST",
        data: {
            email,
            password
        }
        })
        .done(function(data) {
            $("#nav-home").show()
            $("#welcome").hide()
            $("#register").hide()
            $("#login").show().css("margin", "100px auto")
            $("#nav-user").hide()
            $("#content-todo").hide()
        })
        .fail(function(err) {
            console.log(err)
            console.log(err.responseJSON.errors[0].msg)
            let content = `
               <p> ${err.responseJSON.errors[0].msg} </p>
            `
            $("#eror").html(content)
            $("#eror").show()
        })
}

function loginProcess(email, password) {
    $.ajax({
        url: "http://localhost:3000/login",
        method : "POST",
        data: {
            email,
            password
        }
    })
        .done(function(data) {
            localStorage.token = data.accesToken
            home()
        })
        .fail(function(err) {
            console.log(err.responseJSON.errors[0].msg)
            let content = `
                <p>${err.responseJSON.errors[0].msg}</p>
            `
            $("#error-handler #eror").html(content)
        })
}

function logoutProcess() {
    localStorage.removeItem('token')
        $("#nav-home").show()
        $("#welcome").hide()
        $("#register").hide()
        $("#login").show().css("margin", "100px auto")
        $("#nav-user").hide()
        $("#content-todo").hide()
        $("#add-todo").hide()
        $("#update-todo").hide()
        signOut()
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
 
    $.ajax({
        url: "http://localhost:3000/googleSign",
        method : "POST",
        data: {
            id_token
        }
    })
        .done(function(data) {
            localStorage.token = data.accesToken
            home()
        })
        .fail(function(err) {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function fetch() {
    $.ajax({
        url: "http://localhost:3000/todos",
        method : "GET",
        headers : {
            token : localStorage.token
        }
      })
        .done(function(data) {
            // console.log(data)
            $("#listdata").empty()
            let index = 0
            data.data.forEach(todo => {
                index++
                let statusNow
                if (todo.status === true) {
                    statusNow = "Done"
                } else {
                    statusNow = "OnGoing"
                }
                $("#listdata").append(`
                <tr>
                    <th>${index}</th>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${statusNow}</td>
                    <td>${todo.due_date}</td>
                    <td style="cursor:pointer; color:red; font-weight:bold;"> <a id="Done${todo.id}" onclick="finishedTodo(${todo.id})">Done</a> | <a id="update${todo.id}">UPDATE</a> | <a href="#" id="delete${todo.id}" onclick="deleteTodo(${todo.id})">DELETE</a><td>
                </tr>
                `)
                $(`#update${todo.id}`).click(function() {
                    // alert(`update ${todo.id}`)

                    let content = `
                    <center>
                        <form style="width:25%;">
                            <h2>Update Todo</h2>
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" id="edit-title" class="form-control" value="${todo.title}">
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input type="text" id="edit-description" class="form-control" value="${todo.description}">
                            </div>
                            <div class="form-group">
                                <label for="due_Date">Due Date</label>
                                <input type="date" id="edit-due_date" class="form-control" value="${todo.due_date}">
                            </div>
                            <div id="edit-status">
                                <select name="status" id="UpdateStatus">
                                    <option value="onGoing">On Going</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary" onclick="editTodo(${todo.id})">Submit</button>
                        </form>
                    </center>   
                    `
                    $(`#update-todo`).html(content)
                    updateTodoPage()
                })
            })
            $("#content-todo").show()
            // // pageLogin()
        })
        .fail(function(err) {
            console.log(err)
        })
}

function finishedTodo(id) {
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : 'GET',
        data : {
            id
        },
        headers : {
            token : localStorage.token
        }
    })
        .done(function(data) {
            let payload = {
                title : data.title,
                description : data.description,
                status : true,
                due_date : data.due_date
            }
            editTodoAjax(id, payload)
        })
        .fail(function(err) {
            console.log(err)
        })
}

function editTodo(id) {
    let status = $("#UpdateStatus").val()
    console.log(status)
    let newStatus = ''
    if ( status === "Done") {
        newStatus = true;
    } else if (status === "onGoing") {
        newStatus = false;
    }
    let payload = {
        title : $("#edit-title").val(),
        description : $("#edit-description").val(),
        status : newStatus || false,
        due_date : $("#edit-due_date").val(),
    }
    editTodoAjax(id, payload)
}

function editTodoAjax(id, payload) {
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : "PUT",
        data : {
            title : payload.title,
            description : payload.description,
            status : payload.status,
            due_date : payload.due_date
        },
        headers : {
            token : localStorage.token
        }
    })
        .done(function(data) {

            pageLogin()
        })
        .fail(function(err) {
            console.log(err)
        })
}

function deleteTodo(id) {
    let accesToken = localStorage.token
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : "DELETE",
        headers : {
            token : accesToken
        }
    })
        .done(function(data) {
            pageLogin()
        })
        .fail(function(err) {
            console.log(err)
        })
}
 
function checkLogin() {
    if (!localStorage.token) {
        registerPage()
    } else {
        home()
    }
}

function showPublicHoliday() {
  $.ajax({
    url: "http://localhost:3000/api/publicHoliday",
    method: "GET"
  })
    .done(function (holidayDate) {
        $("#public-holiday #dating").empty()
        $("#public-holiday #year h1").empty()
      let currentYear = new Date().getFullYear()
      $("#public-holiday #year h1").append(`
      <h1 style="">${currentYear} Indonesian Public Holiday</h1>
      `)
      let arr = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DES']
      holidayDate.data.forEach(element => {
        let month = +element.date.slice(5, 7)
        let tanggal = element.date.slice(8, 10)
        $("#public-holiday #dating").append(
          `
            <li>
                <div class="time">
                  <h2>${arr[month - 1]}</h2>
                </div> 
                <div class="details">
                  <div class="date">
                    <h2>${tanggal}</h2>
                  </div>  
                  <h3>${element.localName}</h3> 
                </div>
                <div style="clear: both;"> </div>
              </li>
          `
        )
      });
    })
    .fail(function (err) {
      console.log(err)
    })
}


$(document).ready(function() {
    checkLogin()

    $("#nav-home .register").click(function() {
       registerPage()
    })

    $("#nav-home .login").click(function() {
        loginPage()
    })
    
    $("#register-g-sign").on("click", e=> {
        e.preventDefault()
        home()
    })

    $("#register").on("submit", e => {
        e.preventDefault()
        let email = $("#emailRegister").val()
        let password = $("#passwordRegister").val()
        registerProcess(email, password)
    })

    $("#login").on("submit", e => {
        e.preventDefault()
        let payload = {
            email : $("#emailLogin").val(),
            password : $("#passwordLogin").val()
        }
        loginProcess(payload.email, payload.password)
    })

    $("#nav-user #logout").on("click", e => {
        e.preventDefault()
        logoutProcess()
    })

    $("#nav-user #nav-homeUser").on("click", e => {
        e.preventDefault()
        home()
    })    

    $("#nav-user #nav-addTodo").on("click", e => {
        e.preventDefault()
        addTodoPage()
        
    })
    $("#add-todo").on("submit", e => {
        e.preventDefault()
        let payload = {
            title : $("#title").val(),
            description : $("#description").val(),
            status : false,
            due_date : $("#due_date").val(),
        }
        console.log(payload)
        $.ajax({
            url: "http://localhost:3000/todos",
            method : "POST",
            data: {
                title : payload.title,
                description: payload.description,
                status: payload.status,
                due_date: payload.due_date
            },
            headers: {
                token : localStorage.token
            }
        })
            .done(function(todo) {
                pageLogin()
            })
            .fail(function(err) {
                console.log(err)
            })
    })     

    $("#nav-user #nav-todoList").click(() => {
        pageLogin()
    })
    
})