const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authenticate: (req, res, next) => {
    const input  = req.headers.token
    const decoded = verifyToken(input)
    let id = decoded.id
    User.findByPk(id)
      .then(user => {
        if (!user) next({
          name: "AuthenticationError"
        })
        else {
          req.currentUserId = id
          next()
        }
      })
      .catch(next)
  },

  authorize: (req, res, next) => {
    let currentId = req.currentUserId
    let ownerId = req.params.id
    User.findByPk(ownerId)
      .then(user => {
        if (!user) next({
          name: "AuthorizationError"
        }) 
        else {
          if (user.id != currentId) next({
            name: "AuthorizationError"
          }) 
          else next()
        }
      })
      .catch(next)
  }
}
