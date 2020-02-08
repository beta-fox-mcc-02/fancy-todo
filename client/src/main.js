class Main {
    static home(){
        if(localStorage.token){
            $('#home').hide()
            $('#todosList').show()
            $('#createForm').hide()
            $('#updateForm').hide()
            Main.readAll()
        }
        else{
            $('#home').show()
            $('#currency').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#todoPage').hide()
        }
        $('#register').on('click', () =>{
            $('#loginForm').hide()
            $('#registerForm').show()
        })
        $('#submitRegister').on('click', (event) => {
            event.preventDefault()
            Main.register()
            Main.readAll()
            $('#registerForm').hide()
            $('#loginForm').hide()
        })
        $('#login').on('click', () =>{
            $('#registerForm').hide()
            $('#loginForm').show()
        })
        $('#submitLogin').on('click', (event) => {
            event.preventDefault()
            Main.login()
            Main.readAll()
        })
        $('#nav-todos').on('click', () =>{
            $('#home').hide()
            $('#todosList').show()
            $('#createForm').hide()
            $('#updateForm').hide()
            Main.readAll()
        })
        $('#nav-home').on('click', () =>{
            $('#home').show()
            $('#todosList').hide()
        })
        $('#nav-logout').on('click', () =>{
            $('#home').show()
            $('#todosList').hide()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#createForm').hide()
            $('#updateForm').hide()
            $('#nav-home').hide()
            $('#nav-todos').hide()
            $('#nav-logout').hide()
            $('#currency').hide()
            localStorage.clear()
        })
        $('#addTodo').on('click', () => {
            $('#todosList').hide()
            $('#createForm').show()
        })
        $('#submitCreate').on('click', (event) =>{
            Main.create()
        })
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
        .done(result)
        .fail(err)
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
            localStorage.token = result.token
            let token = result.token
            localStorage.setItem('token', token)
            Main.readAll()
            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#home').hide()
            $('#todosList').show()
            $('#nav-home').hide()
            $('#nav-todos').show()
            $('#nav-logout').show()
        })
        .fail((err) => {
            $('span#errorLogin').append(err.responseJSON.msg) 
        })
    }
    static readAll(){
        Main.currency()
        $('#chooseFriend').hide()
        $.ajax({
            url :'http://localhost:3000/todos',
            method : 'get',
            headers : {
                token : localStorage.token
            }
        })
        .done(result => {
            // console.log(result)
            $('#tableBody').empty()
            result.data.forEach(el => {
                el.due_date = new Date(el.due_date)
                $('#tableBody').append(
                    `<tr>
                        <td> ${el.id} </td>
                        <td> ${el.title} </td>  
                        <td> ${el.description} </td>  
                        <td> ${el.status} </td>  
                        <td> ${result.friend} </td>
                        <td> ${el.due_date.toLocaleString('id').substr(0, 10)} </td>  
                        <td> <a class="text-primary btn btn" id="updateTodo${el.id}">Update</a> | <a class="text-primary btn" id="deleteTodo${el.id}">Delete</a> | <a class="text-primary btn" id="addFriend${el.id}">Friend</a></td> 
                    </tr>`)
                $(`#deleteTodo${el.id}`).on('click', (event) => {
                    // event.preventDefault()
                    // console.log('masuuuk')
                    Main.delete(el.id)
                })
                $(`#addFriend${el.id}`).on('click', (event) => {
                    // event.preventDefault()
                    $('#todosList').hide()
                    $('#chooseFriend').show()
                    Main.friend(el.id)
                })
                $(`#updateTodo${el.id}`).on('click', (event) => {
                    // event.preventDefault()
                    $('#titleUpdate').val(el.title)
                    $('#descriptionUpdate').val(el.description)
                    if(el.status){
                        $('#radioTrue').prop("checked", true)
                    }
                    else{
                        $('#radioFalse').prop("checked", true)
                    }
                    $('#due_dateUpdate').val(el.due_date.toISOString().substr(0,10))
                    $('#todosList').hide()
                    $('#updateForm').show()
                    Main.update(el.id)
                })
            })
        })
        .fail((err) => {
            $('span#errorLogin').append(err.responseJSON.msg) 
        })
    }
    static currency(){
        $.ajax({
            url : 'http://localhost:3000/todos/currencys',
            method : 'get'
        })
        .then(result => {
            const key = Object.keys(result)
            // console.log(key)
            for(let i = 0; i < key.length; i++){
                $('#currencyRates').append(
                    `<tr>
                        <td> ${key[i]} </td>
                        <td> ${result[key[i]]} </td> 
                    </tr>`
                    )
            }
            for(val in result){
                console.log(val)
                $('#currencyRates').append(
                    `<tr>
                        <td> ${val} </td>
                        <td> ${result.CAD} </td> 
                    </tr>`)
            }
        })
    }
    static friend(id){
        $.ajax({
            url : "http://localhost:3000/todos/teams",
            method : 'get',
            headers : {
                id : id,
                token : localStorage.token
            }
        })
        .done(result => {
            console.log(result)
            result.data.forEach(el => {
                $('#friendBody').append(`
                    <tr>
                        <td>${el.id}</td>
                        <td>${el.email}</td>
                        <td><a class="btn text-primary" id="invite${el.id}">Invite</a></td>
                    </tr>
                `)
                $(`#invite${el.id}`).on('click', () => {
                  Main.insertFriend(el.id, id)
                })
            })
        })
    }
    static insertFriend(friendId, TodoId){
        $.ajax({
            url : "http://localhost:3000/todos/teams",
            method : 'post',
            data : {
                UserId : friendId,
                TodoId
            },
            headers : {
                id : TodoId,
                token : localStorage.token
            }
        })
        .done(result => {
            console.log(result)
            Main.readAll()
        })
        .fail(err => {
            Main.readAll()
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
                id : id,
                token : localStorage.token
            }
        })
        .done(result => {
            // console.log(result)
            $('#createForm').hide()
            $('#todosList').show()
            Main.readAll()
        })
        .catch(err => {
            // console.log(err)
        })
    }
    static update(id){
        $('#submitUpdate').on('click', (event) =>{
            $.ajax({
                url : `http://localhost:3000/todos/${id}`,
                method : 'put',
                data : {
                    title : $('#titleUpdate').val(),
                    description : $('#descriptionUpdate').val(),
                    status : $('input[name=statusUpdate]:checked').val(),
                    due_date : $('#due_dateUpdate').val()
                },
                headers : {
                    id : id,
                    token : localStorage.token
                }
            })
            .done(result => {
                // event.preventDefault()
                $('#todosList').show()
                $('#updateForm').hide()
                Main.readAll()
            })
            .fail(err => {
                event.preventDefault()
                // console.log(err)
            })
        })
    }
    static delete(id){
        $.ajax({
            url : `http://localhost:3000/todos/${id}`,
            method : 'delete',
            headers : {
                id : id,
                token : localStorage.token
            }
        })
        .done(result => {
            // event.preventDefault()
            $('#todosList').show()
            Main.readAll()
        })
        .fail(err => {
            // console.log(err)
        })
    }
}

function onSignIn(googleUser){
    let id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        url : 'http://localhost:3000/gLogin',
        method : 'post',
        data : {
            gToken : id_token
        }
    })
    .then(result => {
        // console.log(result)
        let token = result.data.token
        localStorage.setItem('token', token)
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#home').hide()
        $('#todosList').show()
        $('#nav-home').hide()
        $('#nav-todos').show()
        $('#nav-logout').show()
        Main.readAll()
    })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    //   console.log('User signed out.');
    });
 
let id_token = googleUser.getAuthResponse().id_token
}

$(document).ready(() => {
    if(localStorage.token){
        $('#home').hide()
        $('#nav-home').hide()
        $('#nav-todos').show()
        $('#nav-logout').show()
        Main.home()
        Main.readAll()
    }else{
        $('#nav-todos').hide()
        $('#nav-logout').hide()
        Main.home()
    }
})