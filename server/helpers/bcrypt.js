const bcrypt = require("bcryptjs")

class hashBcrypt {
    static hash(password) {
        const saltRounds = 8
        let salt = bcrypt.genSaltSync(saltRounds)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    }

    static check(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = hashBcrypt