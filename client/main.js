function create() {
    $('table#table').hide()
    $('h1#list').hide()
    $('form#login').hide()
    $('form#register').hide()
    $('form#create').show()
}
function list() {
    $('table#table').show()
    $('h1#list').show()
    $('form#login').hide()
    $('form#register').hide()
    $('form#create').hide()
}
function login() {
    $('form#login').show()
    $('table#table').hide()
    $('h1#list').hide()
    $('form#register').hide()
    $('form#create').hide()
}
function register() {
    $('form#register').show()
    $('form#create').hide()
    $('form#login').hide()
    $('table#table').hide()
    $('h1#list').hide()
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


$(document).ready(function () {
    login()
    $('a#create').on('click', () => {
        create()
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
    $('a#logout').on('click', () => {
        localStorage.clear()
        login()
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
                // console.log(data,'data')
                localStorage.setItem("token", data.token)
                localStorage.setItem('id', data.id)
                $.ajax("http://localhost:3000/todos", {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .done(({ data }) => {
                        data.forEach((el, i) => {
                            // console.log(el, 'el')
                            $('tbody#list').append(`
                            <tr>
                                <td>${i + 1}</td>
                                <td>${el.title}</td>
                                <td>${el.description}</td>
                                <td>${el.status}</td>
                                <td><a href="#">edit</a> | <a href="#">delete</a></td>
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
            .done(data => {
                console.log(data)
            })
            .fail(err => console.log(err))
        login()
        e.preventDefault()
    })
    $('form#create').submit((e) => {
        let title = $('#title-create').val()
        let description = $('#description-create').val()
        let due_date = $('#due-date-create').val()
        let UserId = localStorage.getItem('id')
        // console.log(title, description, due_date)
        $.ajax('http://localhost:3000/todos', {
            method: 'POST',
            data: {
                title,
                description,
                status: false,
                due_date,
                UserId
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .done(data => {
                console.log(data, 'asiq ter create')
                list()
            })
            .fail(err => console.log(err, 'error cok'))
        e.preventDefault()
    })

});