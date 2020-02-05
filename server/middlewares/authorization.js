const { Todo } = require('../models')

module.exports = function(req, res, next) {
    const { id } = req.decoded
    console.log(req.decoded, 'decoded=======')

    Todo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(response => {
            if (response.UserId === id) {
                next()
            } else {
                res.status(401).json({
                    message: 'not authorized'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}