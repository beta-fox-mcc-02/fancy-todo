const bcrypt = require('bcryptjs');
class Bcryptjs {
    static hiddenPass (password){
        var salt = bcrypt.genSaltSync(+process.env.DB_SALT);
        var hash = bcrypt.hashSync(password, salt);
        return hash
    }
    static compare (password,hash){
        var compare = bcrypt.compareSync(password, hash);
        return compare
    }
}

module.exports = Bcryptjs


 