const { Todo } = require('../models')

module.exports = (req, res, next) => {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(todo => {
            if (todo) {
                if(todo.UserId === req.currentUserId) {
                    next()
                } else {
                    next({
                        status: 401,
                        msg: 'You didnt have authorization'
                    })
                }
            } else {
                next({
                    status: 404,
                    msg: 'data not found'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}