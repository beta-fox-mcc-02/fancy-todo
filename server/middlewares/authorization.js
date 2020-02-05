const { Todo } = require('../models')

module.exports = {
    authorization: (req, res, next) => {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            if(data) {
                if(data.UserId === req.currentUserId) next()
                else next({ err: `Unauthorized User` })
            }
            else {
                next({ err: `Data not found` })
            }
        })
        .catch((err) => { next(err) })
    }
}