function addTodo() {
    const title = $('#todoTitle').val()
    const description = $('#todoDescription').val()
    const due_date = $('#todoDueDate').val()

    $.ajax({
        url: `http://localhost:3000/todos`,
        method: 'POST',
        data: {
            title,
            description,
            due_date
        },
        headers : {
            access_token: localStorage.access_token
        }
    })
    .done((result) => {
        console.log('success add todo')
    })
}

$(document).ready(()=> {

    //initial page
    $("#todo-dashboard").hide()
    $("#login-form").hide()
    $("#register-form").hide()

    //register & login
    $("#tab-1").on('click', () => {
        $("#login-form").show()
        $("#todo-dashboard").hide()
        $("#register-form").hide()
    })
    $("#tab-2").on('click', () => {
        $("#register-form").show()    
        $("#login-form").hide()
        $("#todo-dashboard").hide()
    })

    //after register & login
    $("#button1").on('click', () => {
        $("#todo-dashboard").show()
        $("#login-box").hide()
        $("#login-form").hide()
        $("#register-form").hide()
    })

    $("#button2").on('click', () => {
        $("#login-form").show()
        $("#register-form").hide()
    })

    //login
    $("#login-form").on("submit", (e) => {
        e.preventDefault()

        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email: $("#email-login").val(),
                password: $("#password-login").val()
            }
        })
        .done((response) => {
            localStorage.setItem('access_token', response.access_token)
        })
        .fail((err) => {
            console.log('error', err)
        })
    })
    //register
    $("#register-form").on("submit", (e) => {
        e.preventDefault()
        console.log('register testing', $("#email-register").val())

        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email: $("#email-register").val(),
                password: $("#password-register").val()
            }
        })
        .done((response) => {
            console.log('register success', response)
        })
        .fail((err) => {
            console.log('error', err)
        })
    })  
    
    //addTodo
    $('#addTodo').on("submit", (e) => {
        e.preventDefault()
        console.log('add todo testing')
        addTodo()
    })

    //findAllTodo

    //editTodo

    //deleteTodo
})

