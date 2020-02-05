    function welcome() {
        $("section#welcome").show()
        $("section#register").hide()
        $("section#login").hide()
        $("section#list").hide()
        $("section#create").hide()
    }

    function register() {
        $("section#register").show()
        $("section#login").hide()
        $("section#welcome").hide()
        $("section#list").hide()
        $("section#create").hide()
    }

    function login() {
        $("section#register").hide()
        $("section#login").show()
        $("section#welcome").hide()
        $("section#list").hide()
        $("section#create").hide()
    }

    function list() {
        $("section#register").hide()
        $("section#login").hide()
        $("section#welcome").hide()
        $("section#list").show()
        $("section#create").hide()
    }

    function create() {
        $("section#register").hide()
        $("section#login").hide()
        $("section#welcome").hide()
        $("section#list").hide()
        $("section#create").show()
    }

    $(document).ready(function () {
        welcome()
        $("li#regis").on("click", function () {
            register()
        })
        $("li#log").on("click", function () {
            login()
        })
        $("li#list").on("click", function () {
            list()
        })
        $("li#create").on("click", function () {
            create()
        })

        $.ajax({
                method: "GET",
                url: "http://localhost:3000/todos"
            })
            .done(data => {
                data.data.forEach(el => {
                    $("table#list_value").append(`<tr><td>${el.id}</td><td>${el.title}</td><td>${el.description}</td></tr>`)
                })
                list()
                // console.log(data.data)
            })
            .fail(err => {
                console.log('masuk fail err')
            })
            .always(_ => {
                console.log("masuk always complete")
            })

        $("#login-form").on("submit", (e) => {
            e.preventDefault()
            console.log($("#email-login").val())
            $.ajax({
                    method: "post",
                    url: "http://localhost:3000/login",
                    data: {
                        email: $("#email-login").val(),
                        password: $("#password-login").val()
                    }
                })
                .done(data => {
                    localStorage.setItem("token", data.token)
                    $.ajax({
                            method: "get",
                            url: "http://localhost:3000/todos",
                            headers: {
                                token: localStorage.getItem("token")
                            }
                        })
                        .done(data => {
                            data.data.forEach(el => {
                                // $("table#list_value").empty()
                                $("table#list_value").append(`<tr><td>${el.id}</td><td>${el.title}</td><td>${el.description}</td></tr>`)
                            })
                            list()
                        })
                        .fail(err => {
                            console.log(err, "error satu")
                        })
                })
                .fail(err => {
                    console.log(err, "error dua")
                })
        })

        $("#register-form").on("submit", (e) => {
            e.preventDefault()
            $.ajax({
                    method: "post",
                    url: "http://localhost:3000/register",
                    data: {
                        email: $("#email-register").val(),
                        password: $("#password-register").val()
                    }
                })
                .done(data => {
                    console.log(data)
                    login()
                })
                .fail(err => {
                    console.log(err)
                })
        })

        $("#create-form").on("submit", (e) => {
            e.preventDefault()
            $.ajax({
                    method: "post",
                    url: "http://localhost:3000/todos",
                    data: {
                        title: $("#title-create").val(),
                        description: $("#description-create").val(),
                        status: false,
                        due_date: new Date(),
                        UserId: localStorage.getItem("id")
                    },
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                .done(data => {
                    console.log(data)
                    list()
                })
                .fail(err => {
                    console.log(err)
                })
        })

        $("#glogin").on("click", function onSignIn(googleUser) {
            let profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        })

        $("#logout").on("click", function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        })

    })