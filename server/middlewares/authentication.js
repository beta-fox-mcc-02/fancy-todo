const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY
const { User } = require('../models')

module.exports = {
    authentication: (req, res, next) => {
        let token = req.headers.token
        let decoded = jwt.verify(token, privateKey)
        User.findByPk(decoded.id)
        .then((data) => {
            if(data) {
                req.currentUserId = data.id
                next()
            }
            else {
                next({msg: `user not found`})
            }
        })
        .catch((err) => next(err))
    }
}