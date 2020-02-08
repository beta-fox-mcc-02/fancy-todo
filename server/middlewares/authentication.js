const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')


module.exports = function(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        req.currentUserId = decoded.id
        User.findByPk(req.currentUserId)
            .then(function(user) {
                if (user) {
                    next()
                } else {
                    next({
                        msg : "not found"
                    })
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}
