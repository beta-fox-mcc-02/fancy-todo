module.exports = {
    gSignIn = (token) => {
        $.ajax({
            url : 'http://localhost:3000/login',
            method : 'POST',
            data : {}
        })
    }
}