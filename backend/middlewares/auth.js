const jwt = require('jsonwebtoken')
const { User, Todo } = require('../models')

const checkAuth = (req, res, next) => {
    let token = req.headers['authorization'] || ''
    if (token.substr(0, 7) === 'Bearer ') {
        token = token.slice(7, token.length).trimLeft()
    }

    let jwtPayload
    try {
        jwtPayload = jwt.verify(token, process.env.JWT_TOKEN)
        User.findOne({ where: { id: jwtPayload.id } })
            .then(result => {
                if (result) {
                    req.jwtPayload = jwtPayload
                    next()
                } else {
                    next({ name: 'unauthorized', error: 'Unauthorized' })
                }
            })
            .catch(next)
    } catch (error) {
        next({ name: 'unauthorized', error: 'Unauthorized' })
    }
}

const checkOwner = (req, res, next) => {
    const { id } = req.params

    Todo.findByPk(id)
        .then(result => {
            if (result) {
                if (result.UserId === req.jwtPayload.id) {
                    next()
                } else {
                    next({ name: 'unauthorized', error: 'Unauthorized' })
                }
            } else {
                next({ name: 'DataNotFound' })
            }
        })
        .catch(next)
}

module.exports = { checkAuth, checkOwner }
