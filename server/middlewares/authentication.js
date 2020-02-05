const {validateToken} = require('../helpers/jwt')
const {User} = require('../models');

module.exports = function(req, res, next){
  try{
    const token = req.headers.access_token;
    const decoded = validateToken(token);
    console.log(decoded);
    req.currentUserId = decoded.id;

    // check if user still exist
    User.findByPk(req.currentUserId)
      .then(user => {
        if(user){
          next();
        }else{
          next({
            status: 401,
            message: "You must login first"
          })
        }
      })
    
  }catch(err){
    next(err);
  }
}