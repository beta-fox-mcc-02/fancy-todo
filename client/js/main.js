function home() {
    $("#nav-home").show()
    $("#welcome").show()
    $("#register").hide()
    $("#login").hide()
    $("#nav-user").hide()
    $("#content-todo").hide()
}

function pageLogin() {
    fetch(localStorage.token)
    $("#nav-home").hide()
    $("#welcome").hide()
    $("#register").hide()
    $("#login").hide()
    $("#nav-user").show()
    $("#content-todo").show()
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
            // console.log(data.accesToken)
            localStorage.token = data.accesToken
            console.log(data)
            fetch(data.accesToken)
            $("#nav-home").hide()
            $("#login").hide()
            $("#nav-user").show()
            $("#content-todo").hide()
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

function fetch(accesToken) {
    $.ajax({
        url: "http://localhost:3000/todos",
        method : "GET",
        headers : {
            token : accesToken
        }
      })
        .done(function(data) {
            $("#listdata").empty()
            data.data.forEach(todo => {
                $("#listdata").append(`
                <tr>
                    <th>${todo.id}</th>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.due_date}</td>
                    <td style="cursor:pointer; color:red; font-weight:bold;"><a id="update${todo.id}">UPDATE</a> | <a id="delete${todo.id}">DELETE</a><td>
                </tr>
                `)
                $(`#update${todo.id}`).click(function() {
                    alert(`UPDATE DATA ${todo.id}` )
                })
                $(`#delete${todo.id}`).click(function() {
                    alert(`delete DATA ${todo.id}` )
                })
            })
            $("#content-todo").show()
        })
        .fail(function(err) {
            console.log(err)
        })
}

function checkLogin() {
    console.log(localStorage.token)
    if (!localStorage.token) {
        home()
    } else {
        pageLogin()
    }
}

$(document).ready(function() {
    checkLogin()
    
    $(".navbar-brand").click(function() {
        $("#nav-home").show()
        $("#welcome").show()
        $("#register").hide()
        $("#login").hide()
        $("#nav-user").hide()
        $("#content-todo").hide()
    })

    $("#nav-home .register").click(function() {
        $("#nav-home").show()
        $("#welcome").hide()
        $("#register").show().css("margin", "100px auto")
        $("#login").hide()
        $("#nav-user").hide()
        $("#content-todo").hide()
    })

    $("#nav-home .login").click(function() {
        $("#nav-home").show()
        $("#welcome").hide()
        $("#register").hide()
        $("#login").show().css("margin", "100px auto")
        $("#nav-user").hide()
        $("#content-todo").hide()
    })
    
    $("#register").on("submit", e => {
        e.preventDefault()
        let email = $("#emailRegister").val()
        let password = $("#passwordRegister").val()

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
            })
    })

    $("#login").on("submit", e => {
        e.preventDefault()
        let payload = {
            email : $("#emailLogin").val(),
            password : $("#passwordLogin").val()
        }
        $.ajax({
            url: "http://localhost:3000/login",
            method : "POST",
            data: payload
        })
            .done(function(data) {
                localStorage.token = data.accesToken
                fetch(data.accesToken)
                $("#nav-home").hide()
                $("#login").hide()
                $("#nav-user").show()
                $("#content-todo").hide()
            })
            .fail(function(err) {
                console.log(err)
            })
    })

    $("#nav-user #logout").on("click", e => {
        e.preventDefault()
        localStorage.removeItem('token')
        $("#nav-home").show()
        $("#welcome").hide()
        $("#register").hide()
        $("#login").show().css("margin", "100px auto")
        $("#nav-user").hide()
        $("#content-todo").hide()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {});
    })

    $("#add-todo").on("submit", e => {
        e.preventDefault()
        let payload = {
            title : $("#title").val(),
            description : $("#description").val(),
            status : false,
            due_date : $("#due_date").val(),
        }
        console.log(localStorage)
        $.ajax({
            url: "http://localhost:3000/todos",
            method : "POST",
            data: {
              title : payload.title,
              description : payload.description,
              status : payload.status,
              due_date : payload.due_date
            },
            headers: {
                token : localStorage.token
            }
        })
            .done(function(todo) {
                fetch(localStorage.token)

            })
            .fail(function(err) {
                console.log(err)
            })
    })
    

})