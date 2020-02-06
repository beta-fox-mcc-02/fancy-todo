const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, secret)
    }
}