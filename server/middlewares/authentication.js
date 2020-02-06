const { User } = require('../models')
const{ verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.token)
    req.decoded = decoded
    User
      .findOne({
        where: {
          id: req.decoded.id
        }
      })
      .then(user => {
        if (user) {
          next()
        } else {
          next({
            name: 'Authorization Error',
            status: 401,
            msg: 'You must register firts'
          })
        }
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
}