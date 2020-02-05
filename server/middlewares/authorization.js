const { Todo } = require('../models')

module.exports = function(req, res, next) {
    let id = req.params.id
    Todo.findByPk(id)
        .then(function(todo) {
            if (todo) {
                if(todo.UserId === req.currentUserId) {
                    next()
                } else {
                    next({msg : "not authorized"})
                }
            } else {
                res.status(404).json({msg : "not found"})
            }
        })
        .catch(next)
}