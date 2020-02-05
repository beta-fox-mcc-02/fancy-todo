function showLogin() {
    $("button#logout").hide()
    $("#sidenav").show()
}

function showLogout() {
    $("#sidenav").hide()
    $("button#logout").show()
}

function findData() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
    })
        .done((result) => {
            for(let i of result.data) {
                let status = `COMPLETE`
                if(!i.status) status = `UNCOMPLETE`
                $("div#todo-container").append(`
                <div class="gridbox">
                    <b>${i.title}</b>
                    <p>${i.description}</p>
                    <i>${status}</i>
                </div>
                `)
            }
        })
        .fail((err) => console.log(err))
        .always(() => console.log(`Done`))
}

// function register() {
//     $.ajax({
//         method: "POST",
//         url: "http://localhost:3000/user/register",
//         body: { 
//             email: req.query.email,
//             password: req.query.password
//         }
//     })
//     .done((result) => {
//         console.log(result)
//     })
//     .fail((err) => console.log(err))
//     .always(() => console.log(`Done`))
// }

$(document).ready(() => {
    let token  = localStorage.getItem('token')
    if (!token) showLogin()
    else {
        showLogout()
        findData()
    }

    // $("#register").on("click", () => {
    //     register()
    // })

    $("div.g-signin2").on('click', () => {
        showLogout()
        findData()
    })

    $("button#logout").on("click", () => {
        showLogin()
        $("div#todo-container").empty()
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(() => {
            localStorage.clear()
        })
    })
})