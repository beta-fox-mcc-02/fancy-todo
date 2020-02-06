const { verifyToken } = require('../helpers/jwt')
const { Todo } = require('../models')

module.exports = (req, res, next) => {
    Todo.findOne({
        where : {
            UserId : Number(req.params.id)
        }
    })
        .then(todo => {
            next()
        })
        .catch(next)
}