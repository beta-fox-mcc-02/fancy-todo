function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: "POST",
        url: "http://localhost:3000/user/gSignIn",
        headers: {id_token}
    })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
        })
        .catch((err) => {
            console.log(err)
        })
}