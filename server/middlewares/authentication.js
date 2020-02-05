const { verify } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = verify(token)
        // console.log(decoded)
        if (token) {
            User.findByPk(decoded.id)
            .then(user => {
                if (user) {
                    // console.log(user)
                    req.currentUserId = decoded.id
                    next()
                } else {
                    next({
                        status: 401,
                        msg: 'youre not authorized'
                    })
                }
            })
        } else {
            next({
                status: 401,
                msg: 'youre not authorized'
            })
        }
    } catch (err) {
        next({
            status: 401,
            msg: 'youre not authorized'
        })
    }
}