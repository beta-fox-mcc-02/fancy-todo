const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(password){
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    return bcrypt.hashSync(password, 10);
  },

  validatePassword(password, hash){
    return bcrypt.compareSync(password, hash);
  }
}