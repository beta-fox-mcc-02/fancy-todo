const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports = {
  generateToken : function(payload){
    return jwt.sign(payload, secret);
  },

  verifyUser : function(token,secret){
    return jwt.verify(token, secret)
  }
}