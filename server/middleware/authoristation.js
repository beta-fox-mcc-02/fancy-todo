const { Todo } = require('../models')
const { vertify } = require('../helper/jwt')

module.exports = (req,res,next) => {
    // console.log(+req.params.id)
    Todo.findOne({where : { id : req.params.id }})
        .then(data => {
            if(data) {
                // console.log(req.currentUserId)
                if(data.UserId === req.currentUserId) next()
                else(next ({err : 'Please login to account'}))
            }
        })
        .catch(next)
}