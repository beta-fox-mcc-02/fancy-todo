const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

const authentication = (req, res, next) => {
    if (req.headers.access_token) {
        try {
            let decoded = verifyToken(req.headers.access_token);
            User.findOne({
                where: {
                    id: decoded.id
                }
            })
                .then(user => {
                    if (user) {
                        req.decoded = decoded
                        next()
                    } else {
                        next({
                            status: 401,
                            message: 'Unauthorized',
                            type: 'Login first'
                        })
                    }
                })
                .catch(err => {
                    next(err)
                })
        } catch (error) {
            next({
                status: 401,
                message: 'Unauthorized',
                type: error.message
            })
        }
    } else {
        next({
            status: 401,
            message: 'Unauthorized',
            type: 'Login first'
        })
    }
}

module.exports = authentication