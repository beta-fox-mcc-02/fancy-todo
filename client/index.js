function initialInterface() {
    $("button.cannot-register").hide()
    $("span.register").hide()
    $('span.signin-required-field').hide()
    $("span.signin-validation-err").hide()
    $("section#todo-container").show()
    $("section#actual-news-guardian").hide()
    $("#create-todo-form").hide()
    let token = localStorage.getItem('token')
    if (!token) showLogin()
    else {
        showLogout()
        findData()
        $("span.name").append(`Welcome ${localStorage.getItem('name')}!`)
    }
}

function showLogin() {
    $("#sidebar").hide()
    $("#upperbar").hide()
    $("main").hide()
    $("#login-form").show()
}

function showLogout() {
    $("#sidebar").show()
    $("#upperbar").show()
    $("main").show()
    $("section#todo-container").hide()
    $("#login-form").hide()
}

function findData() {
    $("section#todo-container").show()
    $("section#todo-container").empty()
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
    })
        .done((result) => {
            console.log(result.data)
            let userID = localStorage.getItem('id')
            result.data.forEach((key) => {
                let status;
                let class_name;
                if(!key.status) {
                    status = `mark as done`
                    class_name = 'status-false'
                }
                else {
                    status = `completed`
                    class_name = `status-true`
                }
                $("section#todo-container").append(`
                <div class="gridbox">
                    <div id="box-title">
                        <p>${key.title}</p>
                    </div>
                    <div id="box-desc">
                        <p>${key.description}</p>
                    </div>
                    <div id="box-button">
                        <button class="${class_name}" name="statusID" onclick="completeTask(${key.id}, ${userID})">${status}</button>
                        <button class="delete-button" name="deleteID" onclick="deleteTask(${key.id}, ${userID})">delete</button>
                        <button class="edit-button" name="editID" onclick="">edit</button>
                    </div>
                </div>
                `)
            })
        })
        .fail((err) => console.log(err))
        .always(() => console.log(`Done`))
}

function register() {
    let email = $("#input-email").val()
    let password = $("#input-password").val()
    if(email && password) {
        axios({
            method: "POST",
            url: "http://localhost:3000/user/register",
            data: { 
                email,
                password
            }
        })
        .then((result) => {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('id', result.data.id)
            localStorage.setItem('name', result.data.name)
            $("#input-email").val('')
            $("#input-password").val("")
            showLogout()
            findData()
            $("span.name").append(`Welcome ${result.data.name}!`)
        })
        .catch((err) => {
            console.log(err)
            $("#input-email").val('')
            $("#input-password").val("")
            $("button.register").hide()
            $('span.signin-required-field').hide()
            $("button.cannot-register").show()
            $("span.register").show()
        })
    }
    else $('span.signin-required-field').show()
}

function login() {
    let email = $("#input-email").val()
    let password = $("#input-password").val()
    if(email && password) {
        axios({
            method: "POST",
            url: "http://localhost:3000/user/login",
            data: { 
                email,
                password
            }
        })
        .then((result) => {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('id', result.data.id)
            localStorage.setItem('name', result.data.name)
            $("#input-email").val('')
            $("#input-password").val("")
            showLogout()
            findData()
            $("span.name").append(`Welcome ${result.data.name}!`)
        })
        .catch((err) => {
            $("#input-email").val('')
            $("#input-password").val("")
            $("span.signin-validation-err").show()
        })
    }
    else $('span.signin-required-field').show()
}

function createTodo() {
    let title = $("#todo-title").val()
    let description = $("#todo-desc").val()
    let due_date = $("#todo-due").val()

    if(title.length > 0 && title.length <= 15 && due_date) {
        axios({
            method: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title,
                description,
                due_date,
                UserId: localStorage.getItem('id')
            }
        })
            .then(() => {
                findData()
                $("#todo-title").val('')
                $("#todo-desc").val('')
                $("#todo-due").val('')
                $("#create-todo-form").hide()
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

function completeTask(todoId, UserId) {
    axios({
        method: 'PUT',
        url: `http://localhost:3000/todos/${todoId}`,
        data: { UserId }
    })
        .then((data) => {
            console.log(data, `success`)
            findData()
        })
        .catch((err) => {
            console.log(err)
            console.log(`UNAUTHORIZED USER DETECTED`)
        })
}

function deleteTask(todoId, UserId) {
    axios({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${todoId}`,
        data: { UserId }
    })
        .then((message) => {
            console.log(message)
            findData()
        })
        .catch((err) => {
            console.log(err)
            console.log(`UNAUTHORIZED USER DETECTED`)
        })
}

function findNews() {
    $("div.query-news").empty()
    let API_guardian = "8a28f02a-be5a-49dc-8329-679d9ad97e18"
    let query = $("input.query-news").val()
    axios({
        method: "GET",
        url: `https://content.guardianapis.com/search?q=${query}&api-key=${API_guardian}`
    })
        .then((data) => {
            let news = data.data.response.results
            console.log(news)
            news.forEach((i) => {
                $("div.query-news").append(`
                    <div class="news-bar">
                        <a href="${i.webUrl}">${i.webTitle}</a>
                    </div>
                `)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

$(document).ready(() => {
    initialInterface()

    $("button.register").on("click", (event) => {
        event.preventDefault()
        register()
    })

    $("button.login").on("click", (event) => {
        event.preventDefault()
        login()
    })

    $("div.g-signin2").on('click', () => {
        showLogout()
        findData()
    })

    $("#todo-button").on("click", () => {
        $("section#todo-container").hide()
        $("section#actual-news-guardian").hide()
        $("#create-todo-form").show()
        $("#create-todo").on("click", (event) => {
            event.preventDefault()
            createTodo()
        })
    })

    $("#show-all-todo").on("click", () => {
        findData()
        $("#create-todo-form").hide()
        $("section#actual-news-guardian").hide()
    })

    $("#guardian-news").on("click", () => {
        $("section#todo-container").hide()
        $("#create-todo-form").hide()
        $("section#actual-news-guardian").show()
        findNews()
        $("button.query-news").on('click', () => {
            findNews()
        })
    })

    $("button.logout").on("click", () => {
        showLogin()
        $("span.name").empty()
        $("section#todo-container").empty()
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(() => {
            localStorage.clear()
        })
    })

    $("#input-email").on("click", () => {
        initialInterface()
    })
})