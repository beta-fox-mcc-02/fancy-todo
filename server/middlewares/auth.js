const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = {
  authenticate: (req, res, next) => {
    const input  = req.headers.token
    const decoded = verifyToken(input)
    let id = decoded.id
    // console.log(input, decoded, 'jagyfwkuegf===========================')
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
    let todoId = +req.params.id
    console.log(currentId, todoId, '================================')
    User.findByPk(currentId)
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
