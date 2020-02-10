const { Todo } = require('../models')
module.exports = (req, res, next) => {
  
  Todo
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(todo => {
      if(todo) {
        if(todo.UserId === req.decoded.id){
          next()
        } else {
          next({
            name: 'Authentication Error',
            msg: "Not Authorized"
          })
        }
      } else {
        next({
          name: 'Authentication Error',
          status: 404,
          msg: 'Todo Not Found'
        })
      }
    })
    .catch(next)
}