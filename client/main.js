function welcome() {
    $("section#welcome").show();
    $("section#register").hide();
    $("section#login").hide();
    $("section#list").hide();
    $("section#create").hide();
    $("li#list").hide();
    $("li#create").hide();
    $("li#logout").hide();
    $("li#login").show();
    $("li#register").show();
    $("li#weather").hide();
    $("section#update").hide();
    $("section#weather-section").hide();
}

function register() {
    $("section#register").show();
    $("section#login").hide();
    $("section#welcome").hide();
    $("section#list").hide();
    $("section#create").hide();
    $("li#list").hide();
    $("li#create").hide();
    $("li#logout").hide();
    $("li#weather").hide();
    $("section#update").hide();
    $("section#weather-section").hide();
}

function login() {
    $("section#register").hide();
    $("section#login").show();
    $("section#welcome").hide();
    $("section#list").hide();
    $("section#create").hide();
    $("li#list").hide();
    $("li#create").hide();
    $("li#logout").hide();
    $("li#weather").hide();
    $("section#update").hide();
    $("section#weather-section").hide();
}

function list() {
    $("section#register").hide();
    $("section#login").hide();
    $("section#welcome").hide();
    $("section#list").show();
    $("section#create").hide();
    $("li#list").show();
    $("li#create").show();
    $("li#logout").show();
    $("li#login").hide();
    $("li#register").hide();
    $("li#weather").show();
    $("section#update").hide();
    $("section#weather-section").hide();
}

function create() {
    $("section#register").hide();
    $("section#login").hide();
    $("section#welcome").hide();
    $("section#list").hide();
    $("section#create").show();
    $("li#list").show();
    $("li#create").show();
    $("li#login").hide();
    $("li#register").hide();
    $("li#weather").show();
    $("section#update").hide();
    $("section#weather-section").hide();
}

function update() {
    $("section#register").hide();
    $("section#login").hide();
    $("section#welcome").hide();
    $("section#list").hide();
    $("section#create").hide();
    $("li#list").show();
    $("li#create").show();
    $("li#login").hide();
    $("li#register").hide();
    $("li#weather").show();
    $("section#update").show();
    $("section#weather-section").hide();
}

function weather() {
    $("section#register").hide();
    $("section#login").hide();
    $("section#welcome").hide();
    $("section#list").hide();
    $("section#create").hide();
    $("li#list").show();
    $("li#create").show();
    $("li#login").hide();
    $("li#register").hide();
    $("li#weather").show();
    $("section#update").hide();
    $("section#weather-section").show();
}

function isLogin() {
    if (localStorage.token) {
        list_todo()
    } else {
        welcome()
    }
}


function login_todo() {
    console.log($("#email-login").val())
    console.log($("#password-login").val())
    $.ajax({
            method: "post",
            url: "http://localhost:3000/login",
            data: {
                email: $("#email-login").val(),
                password: $("#password-login").val()
            }
        })
        .done(data => {
            localStorage.setItem("token", data.token);
            console.log(data, "=====login berhasil")
            list_todo();
        })
        .fail(err => {
            console.log(err, "error dua");
        });
}

function register_todo() {
    $.ajax({
            method: "post",
            url: "http://localhost:3000/register",
            data: {
                email: $("#email-register").val(),
                password: $("#password-register").val()
            }
        })
        .done(data => {
            console.log(data);
            login();
        })
        .fail(err => {
            console.log(err);
        });
}

function list_todo() {
    $.ajax({
            method: "GET",
            url: "http://localhost:3000/todos",
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            if (data) {
                console.log(data)
                $("#tbody_list").empty();
                data.data.forEach(el => {
                    $("#tbody_list").append(
                        `<tr>
                        <td id="id_list">${el.id}</td>
                        <td>${el.title}</td>
                        <td>${el.description}</td>
                        <td>${el.status}</td>
                        <td>${el.due_date}</td>
                        <td><a href="#" onclick="formUpdate(${el.id})">Edit</a></td>
                        <td><a href="#" onclick="deleteTodo(${el.id})">Delete</a></td>
                    </tr>`
                    );
                });
                list();
            } else {
                list()
            }
        })
        .fail(err => {
            console.log(err, "error satu");
        });
}

function create_todo() {
    $.ajax({
            method: "post",
            url: "http://localhost:3000/todos",
            data: {
                title: $("#title-create").val(),
                description: $("#description-create").val(),
                status: false,
                due_date: $("#due_date_create").val(),
                UserId: localStorage.getItem("id")
            },
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            // console.log(data)
            list_todo();
        })
        .fail(err => {
            console.log(err);
        });
}

function formUpdate(id) {
    $.ajax({
            method: "GET",
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            // console.log(data.data.title)
            $("#id-update").val(data.data.id),
                $("#title-update").val(data.data.title),
                $("#description-update").val(data.data.description),
                $("#due_date_update").val(Date(data.data.due_date)),
                update()
        })
        .fail(err => {
            console.log(err, "error update form")
        })
}

function update_todo() {
    console.log($("#id-update").val())
    $.ajax({
            method: "PUT",
            url: `http://localhost:3000/todos/${$("#id-update").val()}`,
            data: {
                title: $("#title-update").val(),
                description: $("#description-update").val(),
                due_date: $("#due_date_update").val()
            },
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            console.log("update success")
            list_todo()
        })
        .fail(err => {
            console.log(err, "fail to update data")
        })
}

function deleteTodo(id) {
    console.log(id)
    $.ajax({
            method: 'delete',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            console.log("deleted successfully")
            list_todo()
        })
        .fail(err => {
            console.log(err, "failed to delete data")
        })
}

function search_weather() {
    console.log($("#city").val())
    $.ajax({
            method: "get",
            url: `http://localhost:3000/search`,
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(data => {
            console.log(data.data.title)
            $("#weather-section").append(`<h2>${data.data.title}</h2>`)
            $("#weather-section").append(`Weather for the next five days<br>
            --------------<br>`)
            let weather = data.data.consolidated_weather
            weather.forEach(weather => {
                $("#weather-section").append(
                    `
                    Date : ${weather.applicable_date} <br>
                    Weather : ${weather.weather_state_name}<br>
                    Mininmum temperature : ${weather.min_temp}<br>
                    Maximum temprature : ${weather.max_temp}<br>
                    -----------------------------------------<br>
                    `
                )
            })

        })
        .fail(err => {
            console.log(err)
        })
}

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     let id_token = googleUser.getAuthResponse().id_token;
//     console.log(id_token)
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }


function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
            method: "post",
            url: "http://localhost:3000/googleLogin",
            headers: {
                id_token: id_token
            }
        })
        .done(response => {
            // console.log(response)
            localStorage.setItem("token", response.token)
            list_todo()
        })
        .fail(err => {
            console.log(err, "error google login")
        })
}

$(document).ready(function () {
    isLogin()
    $("li#register").on("click", function () {
        register();
    });
    $("li#login").on("click", function () {
        login();
    });
    $("li#list").on("click", function () {
        list();
        list_todo();
    });
    $("li#create").on("click", function () {
        create();
    });
    $("li#weather").on("click", function () {
        weather();
        search_weather()
    });
    $("li#logout").on("click", function () {
        localStorage.clear();
        welcome();
    });

    $("#login-form").on("submit", e => {
        e.preventDefault();
        console.log($("#email-login").val());
        login_todo();
    });

    $("#register-form").on("submit", e => {
        e.preventDefault();
        register_todo();
    });

    $("#create-form").on("submit", e => {
        e.preventDefault();
        create_todo();
    });

    $("#update-form").on("submit", e => {
        e.preventDefault();
        update_todo();
    });


    $("#logout-button").on("click", (e) => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear()
            console.log('User signed out.');
        });
    })
});