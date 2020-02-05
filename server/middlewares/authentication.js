const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = function(req, res, next) {
    try {
        const decoded = verifyToken(req.headers.token)

        User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        })
            .then(user => {
                if (user) {
                    req.decoded = decoded
                    next()
                } else {
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err) {
        next(err)
    }
}