const {decodeToken} = require('../helpers/jwt')

module.exports = {
    auth : (req, res, next) => {
        const token = req.headers.token
        // console.log(req.headers.token)
        let decoded = decodeToken(token)
        if(decoded.name === 'JsonWebTokenError'){
            const err = {
                name : 'JsonWebTokenError',
                message : 'you must login first'
            }
            next(err)
        }
        else{
            console.log(decoded)
            req.decode = decoded
            // res.status(200).json(req.decode)
            next()
        }
    }
}