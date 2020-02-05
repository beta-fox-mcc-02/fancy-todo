const bcrypt = require('bcryptjs')

class BcryptPassword {
    static hash (password) {
        let salt = bcrypt.genSaltSync(+process.env.SALT)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    }

    static compare (inputPw, hashPw) {
        return bcrypt.compareSync(inputPw, hashPw)
    }
}

module.exports = BcryptPassword