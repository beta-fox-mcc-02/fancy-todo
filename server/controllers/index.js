const { Todo, User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { checkPassword } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class Controller {
    static create(req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = req.decoded.id
        const input = {
            title,
            description,
            status,
            due_date,
            UserId
        }
        Todo.create(input)
            .then(data => {
                res.status(201).json({
                    data,
                    msg: 'success create todo'
                })
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.decoded.id
            },
            order: [['id', 'ASC']],
            include: [User]
        })
            .then(data => {
                res.status(200).json({
                    data,
                    msg: "success find all"
                })
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if (data == null) {
                    next({
                        name: "notfound",
                        id
                    })
                } else {
                    res.status(200).json({
                        data,
                        msg: "success find by id"
                    })
                }
            })
            .catch(next)
    }
    static update(req, res, next) {
        const id = req.params.id
        const title = req.body.title
        const description = req.body.description
        const status = req.body.status
        const due_date = req.body.due_date
        const input = {
            title,
            description,
            status,
            due_date
        }
        Todo.findByPk(id)
            .then(data => {
                if (data == null) {
                    next({
                        name: "notfound",
                        id
                    })
                } else {
                    return Todo.update(input,
                        {
                            where: {
                                id
                            },
                            returning: true,
                            plain: true
                        }
                    )
                }
            })
            .then(data => {
                res.status(200).json({
                    data,
                    msg: "success update"
                })
            })
            .catch(next)
    }
    static delete(req, res, next) {
        const id = req.params.id
        let result = null
        Todo.findByPk(id)
            .then(data => {
                if (data == null) {
                    next({
                        name: "notfound",
                        id
                    })
                } else {
                    result = data
                    return Todo.destroy({
                        where: {
                            id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({
                    "deleted file": result,
                    msg: "success delete data"
                })
            })
            .catch(next)
    }
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({ email, password })
            .then(data => {
                res.status(201).json({
                    data: { id: data.id, email },
                    msg: 'success register'
                })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body
        const token = generateToken(email)
        User.findOne({ where: { email } })
            .then(data => {
                const hash = data.password
                if (data) {
                    if (checkPassword(password, hash)) {
                        res.status(200).json({
                            data: {
                                id: data.id,
                                email: data.email,
                                token
                            },
                            msg: 'login successfully'
                        })
                    } else {
                        next({
                            name: 'SequelizeValidationError',
                            errors: [{
                                message: 'Invalid username / password'
                            }]
                        })
                    }
                } else {
                    next({
                        name: 'SequelizeValidationError',
                        errors: [{
                            message: 'Invalid username / password'
                        }]
                    })
                }
            })
            .catch(next)
    }
    static googleSignIn(req, res, next) {
        let email = ''

        client.verifyIdToken({
            idToken: req.headers.token,
            audience: process.env.CLIENT_ID
        })
            .then(data => {
                email = data.payload.email
                return User.findOne({ where: { email } })
            })
            .then(data => {
                // console.log(data,'data user tod')
                if (!data) {
                    return User.create({
                        email,
                        password: process.env.PASSWORD
                    })
                } else {
                    return data
                }
            })
            .then(data => {
                const token = generateToken(email)
                res.status(200).json({
                    id: data.dataValues.id,
                    token
                })
            })
            .catch(err => console.log(err, 'error gobloog'))
    }
}

module.exports = Controller