const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function (payload) {
        const secretKey = 'abcdefg';
        return jwt.sign(payload, secretKey);
    },

    verifyToken: function(token, callback) {
        const secretKey = 'abcdefg'
        return jwt.verify(token, secretKey, callback);
    }
}