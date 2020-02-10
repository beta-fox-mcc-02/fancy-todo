const {Todo} = require('../models');

module.exports = (req, res, next) => {
    Todo.findOne({
        where: {
            id: req.params.id,
            UserId: req.decoded.id
        }
    })
        .then(todo => {
            if(todo.UserId === req.decoded.id) {
                next()
            } else {
                next({
                    name: "DataNotFound",
                    errors: `Todo with id ${req.params.id} in user id ${req.decoded.id} not found`
                })
            }
        })
        .catch(err => {
            next({
                name: "DataNotFound",
                errors: `Todo with id ${req.params.id} in user id ${req.decoded.id} not found`
            })
        })
}