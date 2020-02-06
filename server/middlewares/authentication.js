const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')


module.exports = (req, res, next) =>  {
    try {
        let decoded = verifyToken(req.headers.token)
        let id = decoded.id
        console.log(id)

        User
            .findByPk(id)
            .then(success => {
                req.currentUserId = decoded.id
                next()
            })
            .catch(next)

    } catch(err) {
         next(err)
    }
}