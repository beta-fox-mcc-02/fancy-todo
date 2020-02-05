const {Todo, User} = require('../models');

class TodoController {
    static createTodo(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.decoded.id
        })
            .then(todo => {
                res.status(201).json({
                    data: todo,
                    message: 'Adding Todo Success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.decoded.id
            },
            order: [["id", "ASC"]]
        })
            .then(todos => {
                res.status(200).json({
                    data: todos,
                    message: 'Todo data found'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Todo.findByPk(req.params.id)
            .then(todo => {
                if(todo === null) {
                    next({
                        name: "DataNotFound",
                        errors: `Todo with id ${req.params.id} not found`
                    })
                } else {
                    res.status(200).json({
                        data: todo,
                        message: 'One todo found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        })
            .then(todo => {
                if(todo === null || todo === undefined) {
                    next({
                        name: "DataNotFound",
                        errors: `Todo with id ${req.params.id} not found`
                    })
                } else {
                    res.status(200).json({
                        data: todo,
                        message: 'Todo data has updated successfully'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })       
            .then(data => {
                res.status(200).json({
                    data: deleteData,
                    message: 'Todo data has been deleted successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController;