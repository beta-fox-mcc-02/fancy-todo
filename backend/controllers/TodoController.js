const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        const { title, description, status, location, due_date } = req.body

        const todo = {
            UserId: req.jwtPayload.id,
            title,
            description,
            status,
            location,
            due_date
        }

        Todo.create(todo)
            .then(result => {
                res.status(201).json({
                    data: result
                })
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Todo.findAll()
            .then(result => {
                res.status(200).json({
                    data: result
                })
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        const { id } = req.params
        Todo.findByPk(id)
            .then(result => {
                if (result) {
                    res.status(200).json({
                        data: result
                    })
                } else {
                    next({ name: 'DataNotFound' })
                }
            })
            .catch(next)
    }
    static update(req, res, next) {
        const { title, status, description, location, due_date } = req.body
        const { id } = req.params

        const todo = {
            title,
            status,
            description,
            location,
            due_date
        }

        Todo.findByPk(id).then(result => {
            if (result) {
                Todo.update(todo, { where: { id }, returning: true })
                    .then(result => {
                        res.status(200).json({
                            data: result[1]
                        })
                    })
                    .catch(next)
            } else {
                next({ name: 'DataNotFound' })
            }
        })
    }
    static delete(req, res, next) {
        const { id } = req.params
        Todo.findByPk(id).then(result => {
            const todo = result
            if (result) {
                Todo.destroy({ where: { id } })
                    .then(result => {
                        res.status(200).json({
                            data: todo
                        })
                    })
                    .catch(next)
            } else {
                next({ name: 'DataNotFound' })
            }
        })
    }
}

module.exports = TodoController
