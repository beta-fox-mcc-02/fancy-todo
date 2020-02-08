const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword : (password) => {
        var salt = bcrypt.genSaltSync(+process.env.SALT)
        return bcrypt.hashSync(password, salt)
    },
    comparePassword : (inputPassword, hashPassword) => {
        return bcrypt.compareSync(inputPassword, hashPassword)
    }
}