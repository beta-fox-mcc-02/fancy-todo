const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')


module.exports = function(req, res, next) {
    try {
        console.log('MASUK AUTHENTICATION')
        console.log(req.headers.token)
        let decoded = verifyToken(req.headers.token)
        req.currentUserId = decoded.id
        console.log(req.currentUserId)
        User.findByPk(req.currentUserId)
            .then(function(user) {
                console.log('MASUK FIND BY PK')
                console.log(user)
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
