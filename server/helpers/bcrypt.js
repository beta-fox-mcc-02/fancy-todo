const bcrypt = require('bcryptjs');
const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
const comparePass = (input, fromDb) => {
    return bcrypt.compareSync(input, fromDb);
}

module.exports = { hashPass, comparePass }