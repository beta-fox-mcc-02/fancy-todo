const jwt = require('jsonwebtoken')

module.exports = {
    generate: (payload) => {
        return jwt.sign(payload, process.env.SECRET)
    },
    verify: (token) => {
        return jwt.verify(token, process.env.SECRET)
    }
}