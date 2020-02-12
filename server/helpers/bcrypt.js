const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: function (password) {
        const salt = bcrypt.genSaltSync(process.env.SALT);
        return bcrypt.hashSync(password, salt);
    },

    compareSync: function (password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}