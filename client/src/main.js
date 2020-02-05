class Main {
    static home(){
        $('#todosList').hide()
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#createForm').hide()
        $('#register').on('click', () =>{
            // $('#btnRegLog').hide()
            $('#loginForm').hide()
            $('#registerForm').show()
        })
        $('#submitRegister').on('click', (event) => {
            event.preventDefault()
            Main.register()
            $('#registerForm').hide()
            $('#loginForm').hide()
        })
        $('#login').on('click', () =>{
            // $('#btnRegLog').hide()
            $('#registerForm').hide()
            $('#loginForm').show()
        })
        $('#submitLogin').on('click', (event) => {
            event.preventDefault()
            Main.login()
            // alert(token)
            // }
        })
        $('#nav-todos').on('click', () =>{
            // $('#btnRegLog').hide()
            $('#home').hide()
            $('#todosList').show()
            Main.readAll()
        })
        $('#nav-home').on('click', () =>{
            // $('#btnRegLog').hide()
            $('#home').show()
            $('#todosList').hide()
        })
        $('#nav-logout').on('click', () =>{
            // $('#btnRegLog').hide()
            $('#home').show()
            localStorage.removeItem('token')
        })
        $('#addTodo').on('click', () => {
            $('#todosList').hide()
            $('#createForm').show()
        })
        $('#submitCreate').on('click', (event) =>{
            Main.create()
            $('#todoList').show()
        })
        if(localStorage.condition){
            $('#deleteTodo').on('click', (event) => {
                console.log('masuuuk')
                Main.delete()
            })
        }
    }
    static register(){
        $.ajax({
            url :'http://localhost:3000/register',
            method : 'post',
            data : {
                        email : $('#emailRegister').val(),
                        password : $('#passwordRegister').val()
                    }
        })
        .done(result => console.log(result))
        .fail(err => console.log(err))
    }
    static login(){
        $.ajax({
            url :'http://localhost:3000/login',
            method : 'post',
            data : {
                        email : $('#emailLogin').val(),
                        password : $('#passwordLogin').val()
                    }
        })
        .done(result => {
            console.log(result, 'iiiiiiiiiiii')
            localStorage.token = result.token
            var token = result.token
            localStorage.setItem('token', token)
            // if(localStorage.token){
                $('#registerForm').hide()
                $('#loginForm').hide()
                $('#home').hide()
                $('#todosList').show()
                Main.readAll()
        })
        .fail((err) => {
            // console.log(err.responseJSON.msg)
            $('span#errorLogin').val(err.responseJSON.msg) 
        })
    }
    static readAll(){
        $.ajax({
            url :'http://localhost:3000/todos',
            method : 'get',
            headers : {
                token : localStorage.token
            }
        })
        .done(result => {
            console.log(result)
            // $('#tableBody').empty()
            result.data.forEach(el => {
                $('#tableBody').append("<tr>" + "<td>"+ el.id + "</td>"
                 + "<td>"+ el.title + "</td>" + "<td>"+ el.description + 
                 "</td>" + "<td>"+ el.status + "</td>" + "<td>"+ el.due_date + "</td>" + 
                 "<td>" + `<a value="${el.id}" id="updateTodo">Update</a> | <a href="#"  value="${el.id}" id="deleteTodo">Delete</a>` + "</td>" +
                 "</tr>")
            });
        })
        .fail((err) => {
            // console.log(err.responseJSON.msg)
            localStorage.condition = true
            $('span#errorLogin').val(err.responseJSON.msg) 
        })
    }
    static create(){
        $.ajax({
            url : "http://localhost:3000/todos",
            method : 'post',
            data : {
                title : $('#titleCreate').val(),
                description : $('#descriptionCreate').val(),
                due_date : $('#due_dateCreate').val()
            },
            headers : {
                token : localStorage.token
            }
        })
        .done(result => {
            console.log(result)
            $('#todosList').show()
            $('#createForm').hide()
        })
        .catch(err => {
            console.log(err)
        })
    }
    static update(id){

    }
    static delete(id){
        $.ajax({
            url : `http://localhost:3000/todos/${id}`,
            method : 'delete',
            headers : {
                token : localStorage.token
            }
        })
        .done(result => {
            Main.readAll()
            $('#todosList').show()
        })
    }
}

function onSignIn(googleUser){
    let profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present
    let id_token = googleUser.getAuthResponse().id_token
    // console.log(id_token)
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
 
let id_token = googleUser.getAuthResponse().id_token
}

$(document).ready(() => {
    Main.home()
    if(localStorage.token){
        $('#nav-todos').show()
        $('#nav-logout').show()
    }else{
        $('#nav-todos').hide()
        $('#nav-logout').hide()
    }
})