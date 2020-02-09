const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(+process.env.SALT || 10)
        return bcrypt.hashSync(password, salt)
    }, 
    comparePassword : (inputPassword, passwordHash) => {
        return bcrypt.compareSync(inputPassword, passwordHash)
    }
}