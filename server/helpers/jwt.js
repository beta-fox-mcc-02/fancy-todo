const jwt = require('jsonwebtoken')
const privateKey = "fancy todo"

module.exports = {
    generateToken : id => {
        return jwt.sign(id, process.env.DEFAULT_PASSWORD)
    },
    verifyToken : token => {
        return jwt.verify(token, process.env.DEFAULT_PASSWORD)
    }
}