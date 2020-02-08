const { User } = require('../models')
const jwt      = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        let decoded = jwt.verify(req.headers.access_token)
        User.findOne({where: {id: decoded.id}})
            .then(result => {
                if (result) {
                    req.decoded = decoded
                    next()
                } else {
                    let errObj = {
                        status: 400,
                        errors: [{
                          message: 'user is not found'
                        }]
                      }
                      next(errObj)
                }
            })
    } catch(err) {
        let errObj = {
          name: 'jsonwebtoken',
          status: 401,
          errors: [{
            message: 'jwt error'
          }]
        }
        next(errObj)
    }
}