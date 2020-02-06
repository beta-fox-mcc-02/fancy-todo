const bcrypt = require('bcryptjs')
const genSalt = Number(process.env.SALT)

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(genSalt);
        console.log(salt, 'SALLLLLLLLLTTTTTTTT')
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compareSync(inputPassword, hashedPassword)
    }
}