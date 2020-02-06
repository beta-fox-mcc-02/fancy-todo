const jwt = require('jsonwebtoken')
const errHandler = require('../middlewares/errorHandler')

module.exports = {
   generateToken : payload => { return jwt.sign(payload, process.env.SECRET)},
   checkToken : token => { return jwt.verify(token, process.env.SECRET) }
}
