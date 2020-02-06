const bcrypt  = require('bcryptjs')

module.exports = {
  hashPassword: function(password){
    const salt = Number(process.env.SALT)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  },
  comparePassword: function(password, hash) {
    const verify = bcrypt.compareSync(password, hash)
    return verify
  }
}