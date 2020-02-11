const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return hash = bcrypt.hashSync(password, salt)
}

function comparePassword(inputPw, hashPw) {
    return bcrypt.compareSync(inputPw, hashPw)
}

module.exports = { hashPassword, comparePassword }