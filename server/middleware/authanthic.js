const { User } = require('../models')
const { vertify } = require('../helper/jwt')

module.exports = (req,res,next) => {
    try{
        console.log(req.headers)
        let decoded = vertify(req.headers.token)
        req.currentUserId = decoded.id
        User.findByPk(req.currentUserId)
            .then(data => {
                if(data){
                    console.log(data)
                    next()
                }else{
                    next("not found")
                }
            })
            .catch(next)
    }
    catch(err){
        next(err)
    }
}