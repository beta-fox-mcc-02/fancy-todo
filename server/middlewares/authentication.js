const { User } = require('../models')
const { verifyToken } = require('../helper/jwt')

module.exports = (req, res, next) => {
    const token = req.headers.token
    const verify = verifyToken(token)
    User.findOne({ where: { email: verify.email } })
        .then(data => {
            if (data) {
                req.decoded = data.dataValues
                next()
            } else {
                next({
                    name: "notfound",
                    id
                })
            }
        })
        .catch(next)
}