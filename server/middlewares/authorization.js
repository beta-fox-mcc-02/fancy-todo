const {Todo, TeamUser} = require('../models')

module.exports = {
    author : (req, res, next) => {
        Todo.findByPk(req.headers.id)
            .then(result => {
                return TeamUser.findOne({
                    where : {
                        TodoId : result.id
                    }
                })
            })
            .then(result => {
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