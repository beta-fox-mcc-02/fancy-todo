menu// visible menu settings
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
    opt ? ( $("#menu-list-todos").show(), $("#menu-create-todos").show() )
    : ( $("#menu-list-todos").hide(), $("#menu-create-todos").hide() );
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
        $("#cont-list-todos").show(), $("#cont-create-todos").show(), $("#cont-edit-todos").show()
    ) : (
        $("#cont-list-todos").hide(), $("#cont-create-todos").hide(), $("#cont-edit-todos").show()
    );
}

function startMenu(){
    menu(true); menuTrans(false);
    cont(false); contTrans(false);
    $("#menu-logout").hide();
    $("#cont-home").show();
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
            $("#todos").append('<tr><th>No</th><th>Title</th><th>Description</th><th>Actions</th></tr>')

            data.data.forEach(element => {
                $("#todos").append(`<tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${element.description}</td>
                    <td><a href="#" onclick=preEditTodos(${element.id})>edit</a> |
                        <a href="#" onclick=deleteTodos(${element.id})>delete</a>
                    </td>
                </tr>`);
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
            },
        data: { title: data.title, description: data.description, status: false, due_date: data.dueDate}
    })
        .done(function(data) {
            $("#alert-create").empty();      
            $("#alert-create").append("Input data succeeded");
        })
        .fail(function(err) {
            $("#alert-create").empty();
            $("#alert-create").append(err.responseJSON.msg);
        })
}

function preEditTodos(id){
    menu(false); menuTrans(true);
    cont(false); contTrans(false);

    $("#menu-home").show();
    $("#menu-logout").show();
    $("#cont-edit-todos").show();
    
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos/"+id,
        headers: { 
            "token" : localStorage.getItem("token")
            }
    })
        .done(function(data) {
            console.log(data);
            $("#edit-id").val(data.data.id);
            $("#edit-title").val(data.data.title);
            $("#edit-description").val(data.data.description);
            $("#duedatepicker-edit").val(data.data.due_date);
            (data.data.status) ? $("#edit-status").val("Done") : $("#edit-status").val("On Progress");
            // data.data.forEach(element => {
            //     $("#edit-id").val(id);
            //     $("#todos").append(`<tr>
            //         <td>${element.id}</td>
            //         <td>${element.title}</td>
            //         <td>${element.description}</td>
            //         <td>${element.dueDate}</td>
            //         </td>
            //     </tr>`);
            // });
        })
        .fail(function() {
            console.log("failed get all todos");
        })
}

function deleteTodos(id, token){
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/todos/" + id,
        headers: { 
            "token" : token
            }
    })
        .done(function(data) {
            $("#alert-list").empty();      
            $("#alert-list").append("Delete data succeeded");

            getTodos(token);
        })
        .fail(function(err) {
            $("#alert-list").empty();
            $("#alert-list").append(err.responseJSON.msg);
        })
}

function editTodos(data){
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos/",
        headers: { 
            "token" : token
            },
        data: { id: data.id, title: data.title, description: data.description, status: false, dueDate: data.dueDate }
    })
        .done(function(data) {
            $("#alert-edit").empty();      
            $("#alert-edit").append("Edit data succeeded");
        })
        .fail(function(err) {
            $("#alert-edit").empty();
            $("#alert-edit").append(err.responseJSON.msg);
        })
}

function start() {
    if(localStorage.getItem("token")) {
        menu(false); menuTrans(true);
        cont(false); contTrans(false);

        $("#menu-logout").show();
        $("#menu-home").show();
        $("#cont-home").show();
    } else startMenu();
}

$(document).ready(function(){
    let token;
    let UserId = 0;
    if(!token) start();
    
    $("#menu-home").click(function () {
        start();
    })

    $("#menu-login").click(function () {
        menu(true); menuTrans(false);
        cont(false); contTrans(false);

        $("#menu-logout").hide();
        $("#cont-login").show();
    })

    $("#menu-register").click(function () {
        menu(true); menuTrans(false);
        cont(false); contTrans(false);

        $("#menu-logout").hide();
        $("#cont-register").show();
    })

    $("#menu-logout").click(function () {
        localStorage.clear();
        startMenu();
    })

    $("#menu-list-todos").click(function () {
        menu(false); menuTrans(true);
        cont(false); contTrans(false);

        $("#menu-home").show();
        $("#menu-logout").show();
        $("#cont-list-todos").show();

        getTodos(localStorage.getItem("token"));
    })

    $("#menu-create-todos").click(function () {
        menu(false); menuTrans(true);
        cont(false); contTrans(false);

        $("#menu-home").show();
        $("#menu-logout").show();
        $("#cont-create-todos").show();
    })

    $("#login").click(function(){       
        let email = $("#email").val();
        let password = $("#password").val();

        if(email === '' || password === ''){
            $('input[type="text"],input[type="password"]').css("border","2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
            
            $("#alert-login").empty();
            $("#alert-login").append("Please input all fields...!!!!!!");
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/login",
                data: { email, password }
            })
                .done(function(data) {
                    localStorage.setItem("token", data.token)
                    
                    menu(true); menuTrans(true);
                    cont(false); contTrans(false);
                    $("#menu-login").hide();
                    $("#menu-register").hide();
                    $("#cont-list-todos").show();

                    $("#menu-list-todos").click();
                    token = localStorage.getItem("token");
                    // getTodos(localStorage.getItem("token"));
                })
                .fail(function(err) {
                    $("#alert-login").empty();
                    $("#alert-login").append(err.responseJSON.msg);
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

            $("#alert-regis").empty();
            $("#alert-regis").append("Password and confirm password does not match...!!!!!!");
        } else if(password === '' || password2 === '') {
            $('input[type="password"],input[type="password2"]').css("border","2px solid red");
            $('input[type="password"],input[type="password2"]').css("box-shadow","0 0 3px red");
            
            $("#alert-regis").empty();
            $("#alert-regis").append("Password or confirm password don't blank...!!!!!!");
        } else if(email === '') {
            $('input[type="email"]').css("border","2px solid red");
            $('input[type="email"]').css("box-shadow","0 0 3px red");

            $("#alert-regis").empty();
            $("#alert-regis").append("Email don't blank...!!!!!!");
        } else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/register",
                data: { email, password }
            })
                .done(function(data) {
                    $("#alert-regis").empty();
                    // localStorage.setItem("token", data.token)
                })
                .fail(function(err) {
                    $("#alert-regis").empty();
                    $("#alert-regis").append(err.responseJSON.msg);
                })
        }
    });

    $("#create").click(function(){  
        let title = $("#create-title").val();
        let description = $("#create-description").val();
        let dueDate = $("#duedatepicker-create").val();

        if(title === ''){
            $('input[type="create-title"]').css("border","2px solid red");
            $('input[type="create-title"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the title");
        } else if(description === ''){
            $('input[type="create-description"]').css("border","2px solid red");
            $('input[type="create-description"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the description");
        } else if(dueDate === ''){
            $('input[type="duedatepicker-create"]').css("border","2px solid red");
            $('input[type="duedatepicker-create"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the due date");
        } else {
            console.log(token);
            
            if(!token) {
                $("#alert-create").empty();
                $("#alert-create").append("You don't have this access");
            }
            else addTodos(localStorage.getItem("token"), {title, description, dueDate})
        }
    });

    $("#edit").click(function(){  
        console.log("edit");
        
        let id = $("#edit-id").val();
        let title = $("#edit-title").val();
        let description = $("#edit-description").val();
        let dueDate = $("#duedatepicker-edit").val();

        if(title === ''){
            $('input[type="create-title"]').css("border","2px solid red");
            $('input[type="create-title"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the title");
        } else if(description === ''){
            $('input[type="create-description"]').css("border","2px solid red");
            $('input[type="create-description"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the description");
        } else if(dueDate === ''){
            $('input[type="duedatepicker-create"]').css("border","2px solid red");
            $('input[type="duedatepicker-create"]').css("box-shadow","0 0 3px red");

            $("#alert-create").empty();
            $("#alert-create").append("Please insert the due date");
        } else {
            if(localStorage.getItem("token")) {
                $("#alert-create").empty();
                $("#alert-create").append("You don't have this access");
            }
            else editTodos(localStorage.getItem("token"), {id, title, description, dueDate})
        }
    });
});