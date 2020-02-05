const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const privateKey = process.env.SECRET

module.exports = {
    generateToken: payload => {
        return jwt.sign(payload, privateKey)
    },
    verifyToken: token => {
        return jwt.verify(token, privateKey)
    }
}