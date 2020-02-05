const {Todo} = require('../models')

module.exports = {
    author : (req, res, next) => {
        Todo.findByPk(req.params.id)
            .then(result => {
                console.log(req.decode.id, result.UserId)
                if(req.decode.id === result.UserId) next()
                else{
                    const err = {
                        name : 'SequelizeValidationError',
                        message : 'you not authorized'
                    }
                    next(err)
                }
            })
            .catch(next)
    }
}