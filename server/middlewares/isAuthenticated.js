const { JwtHelper } = require('../helpers')
const { User } = require('../models')

const isAuthenticated = (req, res, next) => {
  let authorization = req.headers.authorization
  if (authorization) {
    let token = authorization.split(' ')[1]
    if (token) {
      try {
        let decoded = JwtHelper.verifyToken(token)
        User.findOne({
          where: {
            id: decoded.id
          }
        })
          .then(user => {
            if (user) {
              req.decoded = decoded.id
              next()
            } else {
              next({
                status: 401,
                message: 'Please register first'
              })
            }
          })
          .catch(err => {
            next(err)
          })
      } catch (error) {
        next(error)
      }
    } else {
      next({
        status: 400,
        message: 'Please login first'
      })
    }
  } else {
    next({
      status: 400,
      message: 'Please login first'
    })
  }

}

module.exports = isAuthenticated