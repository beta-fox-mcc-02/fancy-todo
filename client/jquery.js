
function hideall (){
    $(".card").hide()
    $("#register").hide()
    $("#login").hide()
    $("#add").hide()
    $("#edit").hide()
    $("#todolist").hide()
}

function deleted(id){   
    // console.log(id)
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method : "delete",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            console.log(data)
            location.reload(true);
        })
        .fail(err => {
            console.log(err)
        })
        .always(uwu => {
            console.log(uwu)
        })
}

function home(){
    hideall()
    $("#add").show()
    $("#todolist").show()
    $.ajax({
        url : "http://localhost:3000/todos",
        method : "get",
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {

            $.each(data.data ,(index,value)=> {
                console.log(value.id)
                $("#todolist").append(
                    ` 
                    <tbody>
                        <tr>
                            <td>
                            ${value.title}</td>
                            <td>
                            ${value.description}</td>
                            <td><a style="cursor: pointer;" onclick="deleted(${value.id})"  value=${value.id}>delete</a> | <a style="cursor: pointer;" onclick="edit(${value.id})"  value=${value.id}>edit</a> </td>
                        </tr>
                    </tbody>
                    `
                )

            })
        })
        .fail(err => {
            console.log(err)
        })
        .always(success => {
            // console.log(success)
        })

}

function logout(){
    localStorage.clear()
    hideall()
}


function login(){
    $("#login-account").on("click",(e)=>{
        e.preventDefault()
        console.log($("#loginEmail").val())
        $.ajax({
            url : "http://localhost:3000/login",
            method : "POST",
            data : {
                email : $("#loginEmail").val(),
                password : $("#loginPassword").val()
            }
        })
            .done(data  => {
                console.log(data)
                localStorage.setItem("token",data.token)
                home()
            })
            .fail(err => {
                console.log(err)
            })
            .always(success =>{
                console.log(success)
            })
    })
}
function islogin(){
    if(!localStorage.token){
        hideall()
        $("#login").show()
        login()
    }else{
    $("#Login").hide()

        home()
    }
}

$(document).ready(function(){
    islogin()

    $("#Logout").on('click',(e)=>{
        e.preventDefault()
        logout()
        $("#login").show()
    })
    $("#Login").on('click',(e)=>{
        e.preventDefault()
        $("#login").show()
        login()
    })
    $("#addtodolist").on("click",function(e){
        let input = {
            title : $("#title").val(),
            description : $("#description").val(),
            status : $("#status").val(),
            due_date : $("#due_date").val()
        }
        // console.log(input)
        $.ajax({
            url : "http://localhost:3000/todos",
            method : 'post',
            data : input,
            headers : {
                token : localStorage.getItem('token')
            }
        })
            .done(data =>{
                console.log(data)
                home()
            })

    })
    $("#Register").on("click",(e)=>{
        e.preventDefault()
        hideall()
        $("#register").show()
        $("#register-account").click((event) =>{
            event.preventDefault()
            let register = {
                email : $("#registEmail").val(),
                password : $("#registPassword").val()
            }
            $.ajax({
                url : "http://localhost:3000/register",
                method :"post",
                data : register
            })
                .done(data => {
                    console.log(data)
                    hideall()

                })
                $("login").show()
        })
    })
})
