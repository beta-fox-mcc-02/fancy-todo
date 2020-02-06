const { Todo } = require('../models')

module.exports = function(req, res, next) {
    const id = req.params.id
    Todo.findByPk(id)
        .then(todoData => {
            if (!todoData) {
                res.status(404).json('Todo not found')
            }
            else {
                if(todoData.UserId == req.currentUserId) {
                    next()
                }
                else {
                    next({
                        name: 'AuthorizationError',
                        code: 401,
                        msg: 'Unauthorized User'
                    })
                }
            }
        })
        .catch(next)
}