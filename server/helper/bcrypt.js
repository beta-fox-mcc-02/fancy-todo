const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)

class CreateBcrypt {
    static hashPassword(password) {
        let hash = bcrypt.hashSync(password, salt)
        return hash
    }
    static checkPassword(password, hash) {
        let compare = bcrypt.compareSync(password, hash)
        console.log(password, 'pass')
        console.log(hash, 'hash');
        console.log(compare, 'compare')
        return compare
    }
}

module.exports = CreateBcrypt