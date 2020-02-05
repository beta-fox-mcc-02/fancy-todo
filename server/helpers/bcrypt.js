const bcrypt = require('bcryptjs')

class BcryptHelper {
  static encryptPassword(password) {
    const SALT = bcrypt.genSaltSync(+process.env.SALT)
    const encryptedPassword = bcrypt.hashSync(password, SALT)
    return encryptedPassword
  }

  static comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }
}

module.exports = BcryptHelper