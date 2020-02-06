const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY

module.exports = {
    generateToken: (data) => {
        // console.log(data, 'DARI HELPER JWT', process.env.PRIVATEKEY)
        return jwt.sign(data, privateKey)
    },
    verify: (token) => {
        return jwt.verify(token, privateKey)
    }
}