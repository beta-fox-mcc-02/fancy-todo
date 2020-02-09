const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  generateToken: (userObj) => {
    return jwt.sign(userObj, secret)
  },

  verifyToken: (token) => {
    try {
      const decoded =  jwt.verify(token, secret)
      return decoded
    } catch (err) {
      return err
    }
  }
}

