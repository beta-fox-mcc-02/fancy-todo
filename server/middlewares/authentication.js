const jwt = require('../helpers/jwt');
const {User} = require('../models')
const secret = process.env.SECRET


module.exports = function(req,res,next){
  try {
    let token = req.headers.token
    let decoded = jwt.verifyUser(token,secret);
    let id = decoded.id
    User.findOne({
      where : {
        id
      }
    })
      .then(user=>{
        if (user){
          req.decoded = decoded
          next()
        } else {
          next({
            status : 403,
            message : "You Must Login First"
          })
        }
      })
  } catch(err) {
    next(err)
  }
}