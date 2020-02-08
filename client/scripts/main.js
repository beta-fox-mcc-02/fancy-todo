//helpers
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


function submitLogin() {
    const email = $("#InputEmailLogin").val();
    const password = $("#InputPasswordLogin").val();
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
        data: { email, password }
    })
}

function getTodos() {
    return $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            "access_token": localStorage.token
        }
    })
}

function submitRegister() {
    const email = $("#InputEmailRegister").val();
    const first_name = $("#InputFnameRegister").val();
    const last_name = $("#InputLnameRegister").val();
    const password = $("#InputPasswordRegister").val();
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/register",
        data: { email, password, first_name, last_name }
    })
}

function addTodo() {
    const title = $("#titleTodo").val()
    const description = $("#descTodo").val()
    const due_date = $("#dateTodo").val()
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
        data: { title, description, due_date },
        headers: {
            "access_token": localStorage.token
        }
    })
}

function addTodoByDate() {
    const title = $("#titleTodoByDate").val()
    const description = $("#descTodoByDate").val()
    const due_date = $("#dateTodoByDate").val()
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
        data: { title, description, due_date },
        headers: {
            "access_token": localStorage.token
        }
    })
}

function destroyTodo(id) {
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            "access_token": localStorage.token
        }
    })
        .done(response => {
            showTodo()
        })
        .fail(err => {
            console.log(err)
        })
}

function getTodo(id) {
    return $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            "access_token": localStorage.token
        }
    })
}

function updateTodo(id) {
    const title = $("#titleTodoEdit").val()
    const description = $("#descTodoEdit").val()
    const due_date = $("#dateTodoEdit").val()
    return $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${id}`,
        data: { title, description, due_date },
        headers: {
            "access_token": localStorage.token
        }
    })
}


function resetInputValue() {
    $("#titleTodo").val('');
    $("#descTodo").val('');
    $("#dateTodo").val('');
    $("#InputEmailRegister").val('');
    $("#InputPasswordRegister").val('');
    $("#InputFnameRegister").val('');
    $("#InputLnameRegister").val('');
    $("#InputEmailLogin").val('');
    $("#InputPasswordLogin").val('');
}

function emptyError() {
    $("#errorLogin").empty()
    $("#errorRegister").empty()
    $("#errorAddTodo").empty()
    $("#errorEditTodo").empty()
    $("#errorAddTodoByDate").empty()
}

function isLogin() {
    if (localStorage.token) {
        $("#publicNav").hide()
        $("#userButton").show()
    } else {
        $("#publicNav").show()
        $("#userButton").hide()
    }
}

function showHome() {
    $("#homePage").show()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#editTodoPage").hide()
    $('#holidayPage').hide()
}

function showLogin() {
    $("#homePage").hide()
    $("#loginPage").show()
    $("#todoPage").hide()
    $("#editTodoPage").hide()
    $('#holidayPage').hide()

    emptyError()
}

function showTodo() {
    $("#homePage").hide()
    $("#loginPage").hide()
    $("#editTodoPage").hide()
    $("#todoPage").show()
    $('#holidayPage').hide()
    getTodos()
        .done(response => {
            $("#listTodo").empty()
            $("#listTodo").append((`<tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
                </tr>`))
            response.data.forEach(todo => {
                if (todo.status) {
                    $("#listTodo").append(`<tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td><i class="fa fa-check" aria-hidden="true"></i></td>
                    <td>${formatDate(todo.due_date)}</td>
                    <td><a class="btn btn-info icon" onclick="destroyTodo('${todo.id}')"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    <a class="btn btn-info icon" onclick="showEditTodo('${todo.id}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <button class="btn btn-success icon" disabled>Completed</button>
                    </td>
                </tr>`)
                } else {
                    $("#listTodo").append(`<tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td><i class="fa fa-times" aria-hidden="true"></i>
                    </td>
                    <td>${formatDate(todo.due_date)}</td>
                    <td><a class="btn btn-info icon" onclick="destroyTodo('${todo.id}')"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    <a class="btn btn-info icon" onclick="showEditTodo('${todo.id}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a class="btn btn-info icon" onclick="complete('${todo.id}')">Complete</a>
                    </td>
                </tr>`)
                }
            });
        })
        .fail(err => {
            console.log(err)
        })
}

function showEditTodo(id) {
    $("#homePage").hide()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#editTodoPage").show()
    $('#holidayPage').hide()

    emptyError()
    getTodo(id)
        .done(response => {
            $("#titleTodoEdit").val(response.data.title);
            $("#descTodoEdit").val(response.data.description);
            $("#dateTodoEdit").val(formatDate(response.data.due_date));
            localStorage.editId = response.data.id
        })
        .fail(err => {
            console.log(err)
        })
}

function showAddTodoByDate(date) {
    if (localStorage.token) {
        $('#modalAddTodoByDate').modal('show');
        $("#dateTodoByDate").val(date);
        $('#dateTodoByDate').prop("disabled", true);
    } else {
        showLogin()
    }
    resetInputValue();
    emptyError();
}

function complete(id) {
    const status = true
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${id}/status`,
        data: { status },
        headers: {
            "access_token": localStorage.token
        }
    })
        .done(response => {
            showTodo()
            resetInputValue()
            emptyError()
        })
        .fail(err => {
            console.log(err)
        })
}

function showHolidays() {
    $("#homePage").hide()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#editTodoPage").hide()
    $('#holidayPage').show()
}

//google-sign-in
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/login/google",
        headers: {
            "access_token": id_token
        }
    })
        .done(response => {
            localStorage.token = response.accessToken
            console.log(response.payload.image)
            $('#userButton').append(`<img src="${response.payload.image ? response.payload.image : './styles/img/avatar.png'}" alt="" class="avatar"> <h8>${response.payload.first_name} ${response.payload.last_name ? response.payload.last_name : ''}</h8>`)
            isLogin()
            showHome()
        })
        .fail(err => {
            console.log(err)
        })
}

$(document).ready(function () {
    isLogin()
    showHome()
    //klik home
    $(".navHome").click(function () {
        showHome()
        resetInputValue()
    })
    //klik holiday
    $(".navHolidays").click(function () {
        showHolidays()
        resetInputValue()
    })
    //klik startButton di home
    $('#startButton').click(function () {
        if (localStorage.token) {
            showTodo()
        } else {
            showLogin();
        }
        resetInputValue()
    })
    //klik login
    $("#navLogin").click(function () {
        showLogin()
        resetInputValue()
    })
    //klik logout
    $("#navLogout").click(function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            showHome()
            localStorage.clear()
            isLogin()
            resetInputValue()
            $('#userButton').empty()
        });
    })
    //klik todo
    $("#navTodo").click(function () {
        showTodo()
        resetInputValue()
    })
    //klik add todo
    //modal
    $("#addTodoButton").click(function () {
        $('#modalAddTodo').modal('show')
        resetInputValue()
        emptyError()
    })
    // klik register
    // modal
    $("#registerLink").click(function (e) {
        e.preventDefault();
        $('#modalRegister').modal('show')
        resetInputValue()
        emptyError()
    })
    //submit login
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        emptyError()
        submitLogin()
            .done(response => {
                localStorage.token = response.accessToken
                $('#userButton').append(`<img src="${response.payload.image ? response.payload.image : './styles/img/avatar.png'}" alt="" class="avatar"> <h8>${response.payload.first_name} ${response.payload.last_name ? response.payload.last_name : ''}</h8>`)
                isLogin()
                showHome()
            })
            .fail(err => {
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorLogin").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error[0]}</div>`))
                } else {
                    $("#errorLogin").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error}</div>`))
                }
            })
    })
    //submit register
    $("#registerForm").submit(function (e) {
        e.preventDefault();
        emptyError()
        submitRegister()
            .done(response => {
                localStorage.token = response.accessToken
                $('#userButton').append(`<img src="${response.payload.image ? response.payload.image : './styles/img/avatar.png'}" alt="" class="avatar"> <h8>${response.payload.first_name} ${response.payload.last_name ? response.payload.last_name : ''}</h8>`)
                $('#modalRegister').modal('hide')
                isLogin()
                showHome()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorRegister").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error[0]}</div>`))
                } else {
                    $("#errorRegister").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error}</div>`))
                }
            })
    })
    //submit add todo
    $("#addTodoForm").submit(function (e) {
        e.preventDefault();
        emptyError()
        addTodo()
            .done(response => {
                $('#modalAddTodo').modal('hide')
                showTodo()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorAddTodo").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error[0]}</div>`))
                } else {
                    $("#errorAddTodo").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error}</div>`))
                }
            })
    })
    //submit add todo by date
    $("#addTodoFormByDate").submit(function (e) {
        e.preventDefault();
        emptyError()
        addTodoByDate()
            .done(response => {
                $('#modalAddTodoByDate').modal('hide')
                showTodo()
            })
            .fail(err => {
                console.log(err)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorAddTodoByDate").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error[0]}</div>`))
                } else {
                    $("#errorAddTodoByDate").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error}</div>`))
                }
            })
    })

    //submit edit todo
    $("#editTodoForm").submit(function (e) {
        e.preventDefault();
        emptyError()
        updateTodo(localStorage.editId)
            .done(response => {
                showTodo()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorEditTodo").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error[0]}</div>`))
                } else {
                    $("#errorEditTodo").append((`<div class="alert alert-danger" role="alert">${err.responseJSON.error}</div>`))
                }
            })
    })

    // Closes the sidebar menu
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });
    // Closes responsive menu when a scroll trigger link is clicked
    $('#sidebar-wrapper .js-scroll-trigger').click(function () {
        $("#sidebar-wrapper").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    });
});