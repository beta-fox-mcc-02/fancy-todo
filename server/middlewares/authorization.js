const { Todo } = require('../models/index')

const authorization = (req, res, next) => {
    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(todo => {
            if (todo) {
                if (+todo.user_id === +req.decoded.id) {
                    next();
                } else {
                    next({
                        status: 401,
                        message: 'Unauthorized',
                        type: 'You are not authorized'
                    })
                }
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization;