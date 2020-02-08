
const {Todo} = require('../models')

module.exports = function(req,res,next){
  let id = +req.params.id
  Todo.findOne({
    where : {
      id
    }
  })
    .then(todo=>{
      console.log(todo, "ini todo");
      if(todo){
        if(todo.UserId == req.decoded.id){
          next()
        } else {
          next({
            status : 401,
            message : "You are not Authorized"
          })
        }
      } else {
        next({
          status : 404,
          message : "Not Found"
        })        
      }
    })
    .catch(err=>{
      next(err)
    })
}