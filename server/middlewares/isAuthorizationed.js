const { Todo } = require('../models')

const isAuthorizationed = (req, res, next) => {
  const id = +req.params.id
  const user_id = req.decoded
  Todo.findOne({
    where: {
      id
    }
  })
    .then(todo => {
      if (todo) {
        if (todo.user_id === user_id) {
          next()
        } else {
          next({
            status: 401,
            message: 'You are not authorized'
          })
        }
      } else {
        next({
          status: 404,
          message: 'Todo is not found with id ' + id
        })
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = isAuthorizationed