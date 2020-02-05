const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const createToken = data => {
    return jwt.sign(data, process.env.JWT_TOKEN)
}

module.exports = { hashPassword, comparePassword, createToken }
