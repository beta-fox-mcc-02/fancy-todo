const jwt = require('jsonwebtoken')

module.exports = {
    createToken : (inputToken) => {
        return jwt.sign(inputToken, process.env.SECRET)
    },
    decodeToken : (token) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            if(decoded) return decoded
            else return null
        } catch(err) {
            return err
        }
    }
}