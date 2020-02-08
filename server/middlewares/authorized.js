const { Todo, User } = require('../models')

module.exports = (req, res, next) => {
    const id = +req.params.id
    Todo.findByPk(id)
        .then(data => {
            if (data.UserId== req.decoded.id) {
                next()
            } else {
                next({
                    name: "notfound",
                    id: "you haven't access to this todo list"
                })
            }
        })
        .catch(next)
}