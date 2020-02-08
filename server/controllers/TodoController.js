const { Todo } = require('../models')

class TodoController {
    static addTodo (req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = req.currentUserId
        Todo.create({ UserId, title, description, status, due_date })
            .then(todo => {
                res.status(201).json({
                    data: todo,
                    msg: 'Todo has been successfully created'
                })
            })
            .catch(next)
    }

    static getTodos (req, res, next) {
        const UserId = req.currentUserId
        Todo.findAll({ where: { UserId } })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }

    static getOneTodo (req, res, next) {
        Todo.findByPk(req.params.id)
            .then(todo => {
                if(!todo) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json(todo)
                }
            })
            .catch(next)
    }

    static editTodo (req, res, next) {
        const id = req.params.id
        const { title, description, due_date } = req.body
        Todo.update({ title, description, due_date }, {
            where: { id },
            returning: true
        })
            .then(todo => {
                if(!todo[0]) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json(todo[1])
                }
            })
            .catch(next)
    }
    
    static doneTodo (req, res, next) {
        const id = req.params.id
        Todo.update({ status: true }, {
            where: { id },
            returning: true
        })
            .then(todo => {
                if(!todo[0]) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json(todo[1])
                }
            })
            .catch(next)
    }

    static deleteTodo (req, res, next) {
        const id = req.params.id
        Todo.destroy({ where: { id } })
            .then(deleted => {
                if(!deleted) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Todo has been successfully deleted'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = TodoController
