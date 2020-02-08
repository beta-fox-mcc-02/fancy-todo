const bcrypt = require('bcryptjs')

module.exports = {
    hassPassword: function(password) {
        const salt = bcrypt.genSaltSync(+process.env.SALT)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    comparePassword: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}