const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

module.exports = {
  createToken(payload){
    return jwt.sign(payload, secretKey);
  },
  validateToken(token){
    return jwt.verify(token, secretKey);
  }
}