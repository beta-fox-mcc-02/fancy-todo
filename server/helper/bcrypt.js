const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)

class CreateBcrypt {
    static hashPassword(password){
        let hash = bcrypt.hashSync(password,salt)
        return hash
    }
    static checkPassword(password){
        let hash = bcrypt.hashSync(password,salt)
        let compare = bcrypt.compareSync(password,hash)
        return compare
    }
}

module.exports = CreateBcrypt