const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function (payload) {
        return jwt.sign(payload, process.env.SECRET_KEY);
    },

    verifyToken: function(token, callback) {
        return jwt.verify(token, process.env.SECRET_KEY, callback);
    }
}