const bcryptjs = require('bcryptjs')

module.exports = {
  hashpwd: (password) => {
    const salt = bcryptjs.genSaltSync(Number(process.env.SALT));
    const hashed = bcryptjs.hashSync(password, salt)
    return hashed
  },

  dehashpwd: (inputPassword, hashedPassword) => {
    return bcryptjs.compareSync(inputPassword, hashedPassword)
  }
}