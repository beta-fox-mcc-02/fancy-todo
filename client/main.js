function home() {
    $('h1#home').show()
    $('table#table').hide()
    $('h1#list').hide()
    $('form#login').hide()
    $('form#register').hide()
}
function list() {
    $('h1#home').hide()
    $('table#table').show()
    $('h1#list').show()
    $('form#login').hide()
    $('form#register').hide()
}
function login() {
    $('form#login').show()
    $('table#table').hide()
    $('h1#home').hide()
    $('h1#list').hide()
    $('form#register').hide()
}
function register() {
    $('form#register').show()
    $('form#login').hide()
    $('table#table').hide()
    $('h1#home').hide()
    $('h1#list').hide()
}

$(document).ready(function () {
    login()
    $('a#home').on('click', () => {
        home()
    })
    $('a#list').on('click', () => {
        list()
    })
    $('a#login').on('click', () => {
        login()
    })
    $('a#register').on('click', () => {
        register()
    })

    $('form#login').submit((e) => {
        let email = $('#email-login').val()
        let password = $('#password-login').val()
        console.log(email, password)
        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
            .done(({ data }) => {
                localStorage.setItem("token", data.token)
                $.ajax("http://localhost:3000/todos", {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .done(({ data }) => {
                        data.forEach((el, i) => {
                            console.log(el, 'data')
                            $('tbody#list').append(`
                            <tr>
                                <td>${i + 1}</td>
                                <td>${el.title}</td>
                                <td>${el.description}</td>
                                <td>${el.status}</td>
                            </tr>
                            `)
                        });
                    })
                    .fail(err => {
                        console.log(err)
                    })
            })
            .fail(err => console.log(err))
        list()
        e.preventDefault()
    })

    $('form#register').submit((e) => {
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        console.log(email, password)
        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
        .done(data=>{
            console.log(data)
        })
        .fail(err=>console.log(err))
        login()
        e.preventDefault()
    })


});