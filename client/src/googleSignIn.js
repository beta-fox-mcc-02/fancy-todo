function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token, "ID TOKEEENNN COOKKKKKSSS")
    axios({
        method: 'POST',
        url: 'http://localhost:3000/googlelogin',
        headers: {
            token: id_token
        }
    })
        .then(data => {
            // console.log(data.data.token, "INIII TOKEEENNNNNN")
            localStorage.setItem('token', data.data.token)
            readTodo(data.data.token)
            $('#signIn').hide()
            $('#getSignIn').hide()
            $('#getSignUp').hide()
            $('#getLogOut').show()
            $('#landing-page').hide()
            $('#user-home').show()
            // console.log('macan tutul')  
        })
        .catch(err => {
            console.log(err)
        })
}