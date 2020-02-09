function hideAll(){
    $("#welcomeGreet").hide()
    $("#buttonTodos").hide()
    $("#signUp").hide()
    $("#signIn").hide()
    $("#showTodos").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
    $("#checkUpdate").hide()
}


function showHome() {
    $("#welcomeGreet").show()
    $("#buttonTodos").show()
    $("#signUp").hide()
    $("#signIn").hide()
    $("#showTodos").hide()
    $("#createTodo").hide()
    $("#editTodo").hide()
    $("#checkUpdate").hide()
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax('http://localhost:3000/googleSignIn', {
            method : 'post',
            data : { idToken : id_token }
        })
        .done(result => {
            showHome()
            console.log(result.data)
        })
        .fail( err => {
            console.log(err)
        })
        .always( result => {
            console.log(`success`)
        })
}

function remove(id) {
    let token = localStorage.getItem('token')

    $.ajax(`http://localhost:3000/todos/${id}`, {
            method : 'delete',
            headers : {
                token : token
            }
        })
        .done(result => {
            showHome()
            console.log(result.data)
            console.log(`berhasil hapus`)
        })
        .fail( err => {
            console.log(err)
        })
        .always( result => {
            console.log(`success`)
        })
}

function showFormUpdate(id){
    let token = localStorage.getItem('token')  
    hideAll()
    // $('#editTodo').
    $.ajax(`http://localhost:3000/todos/${id}`, {
            method : 'get',
            headers : {
                token : token
            }
        })
            .done(todo => {
                // showHome()
                console.log(`berhasil find one`)
                let input = todo.data
                $('#editId').val(input.id),
                $('#editTitle').val(input.title),
                $('#editDescription').val(input.description),
                $('#edit_due_date').val(Date(due_date))
                $('#editTodo').show()
            })
            .fail( err => {
                console.log(err)
            })
            .always( result => {
                console.log(`success`)
            })
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
    
    // SIGN IN ==================================================
    $("#commonFormSignIn").on("click", function () {
        hideAll()
        $("#signIn").show()
    })
    
    $("#Sign").on("click", function () {
        showHome()
    })
    
    // Google Sign in ==========
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

    // SIGN UP ==================================================
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


    // READ ALL ==================================================
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
                            <td> <a href="#" onclick="showFormUpdate(${todo.id})" value=${todo.id} >EDIT</a>  | <a href="#" onclick="remove(${todo.id})" value=${todo.id}>REMOVE</a> </td>
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


     // CREATE ==================================================

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
            hideAll()
            showHome()
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

     // EDIT ==================================================

     $('#editTodo').on("submit", (event) => {
         event.preventDefault()
         let token = localStorage.getItem('token') 

        let updateData = {
            title : $('#editTitle').val(),
            description : $('#editDescription').val(),
            due_date : $('#edit_due_date').val()
        } 
        
        $.ajax(`http://localhost:3000/todos/${$('#editId').val()}`, {
            method : 'put',
            data : updateData,
            headers : {
                token : token
            }
        })
            .done(result => {
                showHome()
                console.log(result.data)
                console.log(`berhasil update`)
            })
            .fail( err => {
                console.log(err)
            })
            .always( result => {
                console.log(`success`)
            })
    })






})