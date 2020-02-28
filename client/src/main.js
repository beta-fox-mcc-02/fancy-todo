class Main {
    static home(){
        $('#due_dateCreate').attr("min", new Date().toISOString().substr(0,10))
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
        $('#submitCreate').on('submit', (event) =>{
            // event.preventDefault()
            Main.create()
        })
    }
    static register(){
        $.ajax({
            url :'https://mysterious-bastion-25366.herokuapp.com/register',
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
            url :'https://mysterious-bastion-25366.herokuapp.com/login',
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
            localStorage.email = $('#emailLogin').val()
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
            url :'https://mysterious-bastion-25366.herokuapp.com/todos',
            method : 'get',
            headers : {
                token : localStorage.token
            }
        })
        .done(({data}) => {
            console.log(data)
            $('#tableBody').empty()
            for (let i = 0; i < data.length; i++) {
                let friend = []
                data[i].due_date = new Date (data[i].due_date)
                for (let j = 0; j < data[i].Users.length; j++){
                    if(data[i].Users[j].email != localStorage.email){
                        friend.push(data[i].Users[j].email.split('@')[0])
                    }
                }
                    $('#tableBody').append(
                        `<tr>
                            <td> ${data[i].id} </td>
                            <td> ${data[i].title} </td>  
                            <td> ${data[i].description} </td>  
                            <td> ${data[i].status} </td>  
                            <td> ${friend} </td>
                            <td> ${data[i].due_date.toLocaleString('id').substr(0, 10)} </td>  
                            <td> <a class="text-primary btn btn" id="updateTodo${data[i].id}"><i class="fas fa-edit"></i></a> | <a class="text-primary btn" id="deleteTodo${data[i].id}"><i class="fas fa-trash-alt"></i></a> | <a class="text-primary btn" id="addFriend${data[i].id}"><i class="fas fa-user-plus"></i></a></td> 
                        </tr>`)
                    $(`#deleteTodo${data[i].id}`).on('click', (event) => {
                        // event.preventDefault()
                        // console.log('masuuuk')
                        Main.delete(data[i].id)
                    })
                    $(`#addFriend${data[i].id}`).on('click', (event) => {
                        // event.preventDefault()
                        $('#todosList').hide()
                        $('#chooseFriend').show()
                        Main.friend(data[i].id)
                    })
                    $(`#updateTodo${data[i].id}`).on('click', (event) => {
                        // event.preventDefault()
                        $('#titleUpdate').val(data[i].title)
                        $('#descriptionUpdate').val(data[i].description)
                        if(data[i].status){
                            $('#radioTrue').prop("checked", true)
                        }
                        else{
                            $('#radioFalse').prop("checked", true)
                        }
                        $('#due_dateUpdate').val(data[i].due_date.toISOString().substr(0,10))
                        $('#due_dateUpdate').attr("min", new Date().toISOString().substr(0,10))
                        $('#todosList').hide()
                        $('#updateForm').show()
                        Main.update(data[i].id)
                    })
            }
        })
        .fail((err) => {
            $('span#errorLogin').append(err.responseJSON.msg) 
        })
    }
    static currency(){
        $.ajax({
            url : 'https://mysterious-bastion-25366.herokuapp.com/todos/currencys',
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
            url : "https://mysterious-bastion-25366.herokuapp.com/todos/teams",
            method : 'get',
            headers : {
                id : id,
                token : localStorage.token
            }
        })
        .done(result => {
            console.log(result)
            $('#friendBody').empty()
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
            url : "https://mysterious-bastion-25366.herokuapp.com/todos/teams",
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
            Main.home()
            Main.readAll()
        })
        .fail(err => {
            Main.readAll()
        })
    }
    static create(){
        // console.log($('#titleCreate').val())
        // console.log($('#descriptionCreate').val())
        // console.log($('#due_dateCreate').val())
        $.ajax({
            url : "https://mysterious-bastion-25366.herokuapp.com/todos",
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
            $('#createForm').hide()
            $('#todosList').show()
            Main.readAll()
        })
        .catch(err => {
            console.log(err)
        })
    }
    static update(id){
        $('#submitUpdate').on('click', (event) =>{
            $.ajax({
                url : `https://mysterious-bastion-25366.herokuapp.com/todos/${id}`,
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
            url : `https://mysterious-bastion-25366.herokuapp.com/todos/${id}`,
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
        url : 'https://mysterious-bastion-25366.herokuapp.com/gLogin',
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
        // $('#createForm').hide()
        // $('#updateForm').hide()
        Main.readAll()
        Main.home()
    }else{
        $('#nav-todos').hide()
        $('#nav-logout').hide()
        Main.home()
    }
})