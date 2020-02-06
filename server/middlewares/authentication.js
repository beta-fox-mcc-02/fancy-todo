const { User } = require('../models')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, SECRET)
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