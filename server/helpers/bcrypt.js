const bcrypt = require('bcryptjs');

function hash (password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function compare (pass, hashedPass) {
    return bcrypt.compareSync(pass, hashedPass);
}

module.exports = {
    hash,
    compare
}
