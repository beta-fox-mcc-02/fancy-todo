const bcrypt = require('bcryptjs');

module.exports = {
   encryptPassword : password => { return bcrypt.hashSync(password, +process.env.SALT) },
   decryptPassword : (inputPassword, userPassword) => { return bcrypt.compareSync(inputPassword, userPassword) }
}