const jwt = require('jsonwebtoken')
const privatKey = process.env.SECRET 

module.exports = {
    generateToken :(data) => {
        return jwt.sign(data, privatKey)
    },
    verifyToken: (token) => {
        return jwt.verify(token, privatKey)
    }
}