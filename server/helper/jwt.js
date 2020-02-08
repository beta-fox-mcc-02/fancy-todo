const jwt =  require('jsonwebtoken')

class JwtHelper {
    static generate (email){
        const token = jwt.sign(email,'secret')
        return token
    }
    static vertify (token) {
        const vertif = jwt.verify(token,'secret')
        return vertif
    }
}

module.exports = JwtHelper