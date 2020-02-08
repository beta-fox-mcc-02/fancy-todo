const jwt = require('jsonwebtoken');
const privateKey = process.env.SECRET

class Token {
    static generateToken(email) {
        let token = jwt.sign(({ email }), privateKey)
        return token
    }
    static verifyToken(token) {
        let verify = jwt.verify(token, privateKey)
        return verify
    }
}

module.exports = Token