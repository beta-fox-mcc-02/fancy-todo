const {decodeToken} = require('../helpers/jwt')
const jwt = require('jsonwebtoken')

module.exports = {
    auth : (req, res, next) => {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            if(decoded.name === 'JsonWebTokenError'){
                const err = {
                    name : 'JsonWebTokenError',
                    message : 'you must login first'
                }
                next(err)
            }
            else{
                req.decode = decoded
                next()
            }
        } catch(err) {
            next(err)
        }
    }
}