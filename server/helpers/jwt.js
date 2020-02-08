const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY

module.exports = {
    generateToken: (data) => {
        return jwt.sign(data, privateKey)
    },
    verify: (token) => {
        return jwt.verify(token, privateKey)
    }
}