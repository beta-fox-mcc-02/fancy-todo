const { Todo } = require('../models')

class TodoController{
    static findAll (req, res, next) {
        Todo.findAll({
            where:{
                UserId: req.query.UserId
            },
            order: [['due_date', 'ASC']]
        })
            .then((data) => {
                res.status(200).json({
                    data,
                    msg: `success find all the data`
                })
            })
            .catch((err) => { next(err) })
    }

    static create(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.body.UserId
        })
            .then((data) => {
                res.status(201).json({
                    data,
                    msg: `Success adding new task`
                })
            })
            .catch((err) => {next(err)})
    }

    static findById (req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                res.status(200).json({
                    data,
                    msg: `Success looking for data based on id ${req.params.id}`
                })
            })
            .catch((err) => { next(err) })
    }

    static setToCompleted (req, res, next) {
        let todoId = req.params.id
        let UserId = req.body.UserId
        Todo.findByPk(todoId)
            .then((data) => {
                if(data.UserId === UserId) {
                    return Todo.update({
                        status: true
                    }, {
                        where: {
                            id: todoId,
                            UserId
                        },
                        returning: true
                    })
                }
                else throw new Error()
            })
            .then((data) => {
                res.status(200).json({
                    data: data,
                    msg: `Success update task on id ${todoId}`
                })
            })
            .catch((err) => { next(err) })
    }

    static deleteById (req, res, next) {
        let todoId = req.params.id
        let UserId = req.body.UserId
        Todo.findByPk(todoId)
            .then((data) => {
                if(data.UserId === UserId) {
                    return Todo.destroy({
                        where: {
                            id: data.id
                        }
                    })
                }
                else throw new Error()
            })
            .then(() => {
                res.status(200).json({
                    msg: `Success delete task on id ${req.params.id}`
                })
            })
            .catch((err) => next(err))
    }
}

module.exports = TodoController