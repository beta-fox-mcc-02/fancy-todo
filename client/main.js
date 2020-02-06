function showHome() {
    $("#welcomeGreet").show()
    $("#buttonTodos").show()
    $("#signUp").hide()
    $("#signIn").hide()
    $("#showTodos").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax('http://localhost:3000/googleSignIn', {
            method : 'post',
            data : { idToken : id_token }
        })
        .done(result => {
            showHome()
            console.log(register)
            console.log(result.data)
        })
        .fail( err => {
            console.log(err)
        })
        .always( result => {
            console.log(`success`)
        })
  }

function hideAll(){
    $("#welcomeGreet").hide()
    $("#buttonTodos").hide()
    $("#signUp").hide()
    $("#signIn").hide()
    $("#showTodos").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
}

function isLogin(){
    if(localStorage.token){
        showHome()
    } else {
        hideAll()
        $("#signIn").show()
    }
}

$(document).ready(() => {
    isLogin()
    
    $("#Sign").on("click", function () {
        // console.log(`masuk`)
        showHome()
    })
    
    $("#commonFormSignIn").on("click", function () {
        hideAll()
        $("#signIn").show()
        // $("#buttonTodos").hide()
        // $("#signUp").hide()
        // $("#welcomeGreet").hide()
        // $("#showTodos").hide()
    })
    
    $("#commonFormSignUp").on("click", function () {
        $("#signUp").show()
        $("#buttonTodos").hide()
        $("#signIn").hide()
        $("#welcomeGreet").hide()
        $("#showTodos").hide()
    })
    
    
    $('#signUp').submit( (event) => {
        event.preventDefault()
        let register = {
                email : $("#emailSignUp").val(),
                password : $("#passwordSignUp").val()
            }
            
            $.ajax('http://localhost:3000/register', {
                    method : 'post',
                    data : register
                })
                .done(result => {
                    showHome()
                    console.log(register)
                    console.log(result.data)
                })
                .fail( err => {
                    console.log(err)
                })
                .always( result => {
                    console.log(`success`)
                })
      });


      $('#signIn').submit( (event) => {
        event.preventDefault()
        let loginData = {
                email : $("#emailSignIn").val(),
                password : $("#passwordSignIn").val()
            }
            // console.log(loginData)
            $.ajax('http://localhost:3000/login', {
                    method : 'post',
                    data : loginData
                })
                .done(result => {
                    $("#signIn").hide()
                    $("#buttonTodos").show()
                    localStorage.setItem('token', result.token)
                    // console.log(`MASOOOOOK+++=+++++++++++++++++++`)
                })
                .fail( err => {
                    console.log(err)
                })
                .always( result => {
                    console.log(`success`)
                })
      });

      $('#readAll').on("click", (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token')
        $.ajax('http://localhost:3000/todos', {
                method : 'get',
                headers : {
                    token : token
                }
        })
            .done(todos => {
                hideAll()
                $("#buttonTodos").show()
                $("#showTodos").show()
                // console.log(todos.data)
                $('#tbody').empty()

                todos.data.forEach(todo => {
                    $("#tbody").append(`
                        <tr>
                            <th scope="row">${todo.id}</th>
                            <td>${todo.title}</td>
                            <td>${todo.description}</td>
                            <td>${todo.status}</td>
                            <td>${todo.due_date}</td>
                            <td> <a href="#" id="update" value=${todo.id} >EDIT</a>  | <a href="">DELETE</a> </td>
                        </tr>
                    `)                    
                });
            })
            .fail( err => {
                console.log(err)
            })
            .always( result => {
                console.log(`success`)
            })

      });

      $('#showForm').on("click", (event) => {
          hideAll()
          $("#createTodo").show()
      });

      $('#createTodo').on("submit", (event) => {
        event.preventDefault()
        let newTodo = {
            title : $('#title').val(),
            description : $('#description').val(),
            due_date : $('#due_date').val()
        }
        let token = localStorage.getItem('token')
        console.log(token)
        $.ajax('http://localhost:3000/todos', {
                method : 'post',
                data : newTodo,
                headers : {
                    token : token
                }
        })
            .done(todos => {
                $("#signIn").hide()
                $("#buttonTodos").show()
                // $("#showTodos").show()
                console.log(todos.data)
                
            })
            .fail( err => {
                console.log(err)
            })
            .always( result => {
                console.log(`success`)
            })

      });


      $('#update').on("click", (event) => {
       console.log(update.val())
      //   $("#createTodo").show()
    });






})