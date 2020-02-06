const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { User } = require('../models')

module.exports = function(req, res, next) {
    const token = req.headers.token

    try {
        const decoded = jwt.verify(token, secret)
        User.findByPk(decoded.id)
            .then(userData => {
                if(!userData) {
                    next({
                        name: 'DecodedError',
                        code: 401,
                        msg: 'User not logged in'
                    })
                }
                else{
                    req.currentUserId = decoded.id
                    next()
                }

            })
            .catch(next)
    }
    catch(err) {
        next(err)
    }
}