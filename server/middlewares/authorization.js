const { Todo } = require('../models')

function isAuthorization (req, res, next) {
   let id = +req.params.id
   Todo.findOne({
      where : {
         id
      }
   })
      .then(todo => {
         if(todo) {
            if(todo.UserId === req.decoded) {
               next()
            } else {
               next('Unauthorize user')
            }
         } else {
            next('Todo not found')
         }
      })
      .catch(err => {
         next(err)
      })
}

module.exports = isAuthorization