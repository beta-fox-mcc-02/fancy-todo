const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || false,
            due_date: new Date(req.body.due_date),
            UserId: req.currentUserId
        })
            .then(todo => {
                res.status(201).json({
                    data: todo,
                    msg: 'create success'
                })
            })
            .catch(err => {
                next(err)
            })
    }
l
    static read(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.currentUserId
            }
        })
            .then(todos => {
                res.status(200).json({
                    data: todos,
                    msg: 'read data success'
                })
            })
            .catch(() => {
                next({
                    status: 400,
                    msg: 'validations errors'
                })
            })
    }

    static findByPk(req, res, next) {
        Todo.findByPk(req.params.id)
            .then(todo => {
                if (todo === null) {
                    next({
                        status: 404,
                        msg: "Data not found"
                    })
                } else {
                    res.status(200).json({
                        data: todo,
                        msg: `todo with id ${req.params.id} founded`
                    })
                }
            })
            .catch(() => {
                next({
                    status: 400,
                    msg: 'validations errors'
                })
            })
    }

    static update(req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || false,
            due_date: req.body.due_date
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(todo => {
                if (todo[0] === 0) {
                    next({
                        status: 404,
                        msg: "Data not found"
                    })
                } else {
                    res.status(200).json({
                        data: todo,
                        msg: 'Succesfully updated'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        const pk = req.params.id
        Todo.destroy({
            where: {
                id: pk
            }
        })
            .then(todo => {
                res.status(200).json()
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodoController