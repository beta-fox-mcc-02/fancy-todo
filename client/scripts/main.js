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
    const password = $("#InputPasswordRegister").val();
    return $.ajax({
        method: "POST",
        url: "http://localhost:3000/register",
        data: { email, password }
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



function isLogin() {
    if (localStorage.token) {
        $("#navLogin").hide()
        $("#navRegister").hide()
        $("#navTodo").show()
        $("#navLogout").show()
    } else {
        $("#navLogin").show()
        $("#navRegister").show()
        $("#navTodo").hide()
        $("#navLogout").hide()
    }
}

function showHome() {
    $("#homePage").show()
    $("#registerPage").hide()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#addTodoPage").hide()
    $("#editTodoPage").hide()
}

function showLogin() {
    $("#homePage").hide()
    $("#registerPage").hide()
    $("#loginPage").show()
    $("#todoPage").hide()
    $("#addTodoPage").hide()
    $("#editTodoPage").hide()

    $("#errorLogin").empty()
}

function showRegister() {
    $("#homePage").hide()
    $("#registerPage").show()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#addTodoPage").hide()
    $("#editTodoPage").hide()

    $("#errorRegister").empty()
}

function showTodo() {
    $("#homePage").hide()
    $("#registerPage").hide()
    $("#loginPage").hide()
    $("#todoPage").show()
    $("#addTodoPage").hide()
    $("#editTodoPage").hide()
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
                $("#listTodo").append((`<tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${formatDate(todo.due_date)}</td>
                    <td><button class="btn btn-info" onclick="destroyTodo('${todo.id}')">Delete</button>
                    <button class="btn btn-info" onclick="showEditTodo('${todo.id}')">Edit</button>
                    </td>
                </tr>`))
            });
        })
        .fail(err => {
            console.log(err)
        })
}

function showAddTodo() {
    $("#homePage").hide()
    $("#registerPage").hide()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#addTodoPage").show()
    $("#editTodoPage").hide()

    $("#errorAddTodo").empty()
}

function showEditTodo(id) {
    $("#homePage").hide()
    $("#registerPage").hide()
    $("#loginPage").hide()
    $("#todoPage").hide()
    $("#addTodoPage").hide()
    $("#editTodoPage").show()

    $("#errorEditTodo").empty()
    getTodo(id)
        .done(response => {
            $("#titleTodoEdit").attr({
                "value": response.data.title
            });
            $("#descTodoEdit").attr({
                "value": response.data.description
            });
            $("#dateTodoEdit").attr({
                "value": formatDate(response.data.due_date)
            });
            localStorage.editId = response.data.id
        })
        .fail(err => {
            console.log(err)
        })
}

$(document).ready(function () {
    isLogin()
    showHome()
    //klik home
    $("#navHome").click(function () {
        showHome()
    })
    //klik login
    $("#navLogin").click(function () {
        showLogin()
    })
    //klik register
    $("#navRegister").click(function () {
        showRegister()
    })
    //klik logout
    $("#navLogout").click(function () {
        showHome()
        localStorage.clear()
        isLogin()
    })
    //klik todo
    $("#navTodo").click(function () {
        showTodo()
    })
    //klik add todo
    $("#addTodoButton").click(function () {
        showAddTodo()
    })
    //submit login
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        $("#errorLogin").empty()
        submitLogin()
            .done(response => {
                localStorage.token = response.accessToken
                isLogin()
                showHome()
            })
            .fail(err => {
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorLogin").append((`<p>${err.responseJSON.error[0]}</p>`))
                } else {
                    $("#errorLogin").append((`<p>${err.responseJSON.error}</p>`))
                }
            })
    })
    //submit register
    $("#registerForm").submit(function (e) {
        e.preventDefault();
        $("#errorRegister").empty()
        submitRegister()
            .done(response => {
                showLogin()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorRegister").append((`<p>${err.responseJSON.error[0]}</p>`))
                } else {
                    $("#errorRegister").append((`<p>${err.responseJSON.error}</p>`))
                }
            })
    })
    //submit add todo
    $("#addTodoForm").submit(function (e) {
        e.preventDefault();
        $("#errorAddTodo").empty()
        addTodo()
            .done(response => {
                showTodo()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorAddTodo").append((`<p>${err.responseJSON.error[0]}</p>`))
                } else {
                    $("#errorAddTodo").append((`<p>${err.responseJSON.error}</p>`))
                }
            })
    })
    //submit edit todo
    $("#editTodoForm").submit(function (e) {
        e.preventDefault();
        $("#errorEditTodo").empty()
        updateTodo(localStorage.editId)
            .done(response => {
                showTodo()
            })
            .fail(err => {
                console.log(err.responseJSON.error)
                if (Array.isArray(err.responseJSON.error)) {
                    $("#errorEditTodo").append((`<p>${err.responseJSON.error[0]}</p>`))
                } else {
                    $("#errorEditTodo").append((`<p>${err.responseJSON.error}</p>`))
                }
            })
    })
});