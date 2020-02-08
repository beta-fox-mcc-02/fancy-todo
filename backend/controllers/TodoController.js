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
        const UserId = req.jwtPayload.id

        Todo.findAll({
            where: { UserId },
            order: [
                ['status', 'ASC'],
                ['due_date', 'ASC']
            ]
        })
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
        const { title, description, location, due_date } = req.body
        const { id } = req.params

        const todo = {
            title,
            description,
            location,
            due_date
        }

        console.log(todo)

        Todo.update(todo, { where: { id }, returning: true })
            .then(result => {
                console.log(result)
                res.status(200).json({
                    data: result[1]
                })
            })
            .catch(err=> {
                console.log(err)
                next(err)
            })
    }
    static setStatus(req, res, next) {
        const { status } = req.body
        const { id } = req.params

        const todo = {
            status
        }

        Todo.update(todo, { where: { id }, returning: true })
            .then(result => {
                res.status(200).json({
                    data: result[1]
                })
            })
            .catch(next)
    }
    static delete(req, res, next) {
        const { id } = req.params
        Todo.destroy({ where: { id } })
            .then(result => {
                res.status(200).json({
                    data: result
                })
            })
            .catch(next)
    }
}

module.exports = TodoController
