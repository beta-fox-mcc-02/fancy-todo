const {Todo} = require('../models');

module.exports = function(req, res, next){
  Todo.findByPk(req.params.id)
    .then(todo => {
      if(todo){
        if(todo.UserId === req.currentUserId){
          next()
        }else{
          next({
            status: 401, 
            message: 'You are not authorized'
          })
        }
      }else{
        next({
          status: 400,
          message: 'Not Found'
        })
      }
    })
    .catch(next)
}