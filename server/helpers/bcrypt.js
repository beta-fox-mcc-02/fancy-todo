const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: function (password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },

    compareSync: function (password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}