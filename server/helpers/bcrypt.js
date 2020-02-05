const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword: (password) => {
        let salt = bcrypt.genSaltSync(+process.env.SALT);
        return bcrypt.hashSync(password, salt)
    },
    comparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}