function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: 'POST',
        url: 'http://localhost:3000/googlelogin',
        headers: {
            token: id_token
        }
    })
        .then(data => {
            localStorage.setItem('token', data.data.token)
            readTodo(data.data.token)
            $('#signIn').hide()
            $('#getSignIn').hide()
            $('#getSignUp').hide()
            $('#getLogOut').show()
            $('#landing-page').hide()
            $('#user-home').show()
            $('.dont-have-todo').hide()  
        })
        .catch(err => {
            console.log(err)
        })
}