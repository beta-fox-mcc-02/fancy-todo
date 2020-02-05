// visible menu settings
function menu(opt){
    opt ? (
        $("#menu-home").show(), $("#menu-login").show(),
        $("#menu-register").show(),$("#menu-logout").show()
    ) : (
        $("#menu-home").hide(), $("#menu-login").hide(),
        $("#menu-register").hide(), $("#menu-logout").hide()
    );
}

// visible menu transaction (CRUD) settings
function menuTrans(opt){
    opt ? ( $("#menu-list").show(), $("#menu-create").show() )
    : ( $("#menu-list").hide(), $("#menu-create").hide() );
}

// visible container menu settings
function cont(opt){
    opt ? (
        $("#cont-home").show(), $("#cont-login").show(),
        $("#cont-register").show()
    ) : (
        $("#cont-home").hide(), $("#cont-login").hide(),
        $("#cont-register").hide()
    );
}

// visible container transaction (CRUD) settings
function contTrans(opt){
    opt ? (
        $("#cont-list").show(), $("#cont-create").show()
    ) : (
        $("#cont-list").hide(), $("#cont-create").hide()
    );
}

function startMenu(){
    menu(true);
    menuTrans(false);
    $("#menu-logout").hide();

    cont(false);
    contTrans(false);
    $("#cont-home").show()
}

function getTodos(token){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/",
        headers: { 
            "token" : token
            }
    })
        .done(function(data) {
            $("#todos").empty();
            data.data.forEach(element => {
                $("#todos").append("<li>" + element.title + "</li>")
            });
        })
        .fail(function() {
            console.log("failed get all todos");
        })
}

function addTodos(token, data){
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos/",
        headers: { 
            "token" : token
            }
    })
        .done(function() {
            getTodos(token);
        })
        .fail(function() {
            console.log("failed create todos");
        })
}

$(document).ready(function(){
    startMenu();

    if(localStorage.getItem("token")) {
        // $("#menu-logout").show();
        // $("#menu-register").hide();
        // $("#menu-login").hide();

        // getTodos(localStorage.getItem("token"));
    }

    $("#menu-home").click(function () {
        // $("#cont-login").hide();
        // $("#cont-register").hide();
        // $("#cont-home").show();

       
    })

    $("#menu-login").click(function () {
        menu(true);
        cont(false);
        contTrans(false);

        $("#cont-login").show();
        // $("#cont-home").hide();
    })

    $("#menu-register").click(function () {
        // $("#cont-login").hide();
        // $("#cont-register").show();
        // $("#cont-home").hide();
    })

    $("#menu-logout").click(function () {
        localStorage.clear();
        // $("#menu-register").show();
        // $("#menu-login").show();
        // $("#cont-home").hide();
    })

    $("#menu-list-todos").click(function () {
        menu(false);
        $("#menu-home").show();
        $("#menu-logout").show();
        
        menuTrans(true);
        console.log(getTodos(localStorage.getItem("token")));
    })

    $("#login").click(function(){       
        let email = $("#email").val();
        let password = $("#password").val();

        if(email === '' || password === ''){
            $('input[type="text"],input[type="password"]').css("border","2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
            console.log("Please input all fields...!!!!!!");
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/login",
                data: { email, password }
            })
                .done(function(data) {
                    localStorage.setItem("token", data.token)
                    // $("#menu-logout").show();
                    // $("#menu-register").hide();
                    // $("#menu-login").hide();
                    // $("#cont-home").show();
                    // $("#cont-login").hide();
                    // $("#cont-register").hide();

                    getTodos(localStorage.getItem("token"));
                })
                .fail(function() {
                    console.log("Wrong username / Password");
                })
        }
    });

    $("#register").click(function(){       
        let email = $("#regis-email").val();
        let password = $("#regis-password").val();
        let password2 = $("#regis-password2").val();

        if(password !== password2){
            $('input[type="password"],input[type="password2"]').css("border","2px solid red");
            $('input[type="password"],input[type="password2"]').css("box-shadow","0 0 3px red");
            console.log("Password and confirm password not match...!!!!!!");
        } else if(password === '' || password2 === '') {
            $('input[type="password"],input[type="password2"]').css("border","2px solid red");
            $('input[type="password"],input[type="password2"]').css("box-shadow","0 0 3px red");
            console.log("Password or confirm password don't blank...!!!!!!");
        } else if(email === '') {
            $('input[type="email"]').css("border","2px solid red");
            $('input[type="email"]').css("box-shadow","0 0 3px red");
            console.log("Email don't blank...!!!!!!");
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/create",
                data: { email, password }
            })
                .done(function(data) {
                    localStorage.setItem("token", data.token)
                })
                .fail(function() {
                    console.log("Aborted create user process");
                })
        }
    });

    $("#register").click(function(){       
        let email = $("#regis-email").val();
        let password = $("#regis-password").val();
        let password2 = $("#regis-password2").val();

        if(password !== password2){
            $('input[type="password"],input[type="password2"]').css("border","2px solid red");
            $('input[type="password"],input[type="password2"]').css("box-shadow","0 0 3px red");
            console.log("Password and confirm password not match...!!!!!!");
        } else if(password === '' || password2 === '') {
            $('input[type="password"],input[type="password2"]').css("border","2px solid red");
            $('input[type="password"],input[type="password2"]').css("box-shadow","0 0 3px red");
            console.log("Password or confirm password don't blank...!!!!!!");
        } else if(email === '') {
            $('input[type="email"]').css("border","2px solid red");
            $('input[type="email"]').css("box-shadow","0 0 3px red");
            console.log("Email don't blank...!!!!!!");
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/create",
                data: { email, password }
            })
                .done(function(data) {
                    localStorage.setItem("token", data.token)
                })
                .fail(function() {
                    console.log("Aborted create user process");
                })
        }
    });
});