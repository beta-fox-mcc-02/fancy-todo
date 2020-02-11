const jwt = require('jsonwebtoken')

const privateKey = process.env.SECRET

module.exports = {
    generateToken: payload => {
        return jwt.sign(payload, privateKey)
    },
    verifyToken: token => {
        return jwt.verify(token, privateKey)
    }
}