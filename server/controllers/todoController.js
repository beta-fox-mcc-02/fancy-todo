const { Todo } = require('../models')

class TodoController{
    static findAll (req, res, next) {
        Todo.findAll()
            .then((data) => {
                res.status(200).json({
                    data,
                    msg: `success find all the data`
                })
            })
            .catch((err) => {next(err)})
    }

    static create(req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.currentUserId
        }, {
            individualhooks: true
        })
            .then((data) => {
                res.status(201).json({
                    data,
                    msg: `Success adding new task`
                })
            })
            .catch((err) => next(err))
    }

    static findById (req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            },
            individualhooks: true
        })
            .then((data) => {
                res.status(200).json({
                    data,
                    msg: `Success looking for data based on id ${req.params.id}`
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static updateById (req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }, {
            where: {
                id: req.params.id
            },
            returning: true,
            individualhooks: true
        })
            .then((data) => {
                res.status(200).json({
                    data: data[1],
                    msg: `Success update task on id ${req.params.id}`
                })
            })
            .catch((err) => {
                next(err)})
    }

    static deleteById (req, res, next) {
        let deleted
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                deleted = data.dataValues
                return Todo.destroy({
                    where: {
                        id: data.id
                    },
                    individualhooks: true
                })
            })
            .then(() => {
                res.status(200).json({
                    data: deleted,
                    msg: `Success delete task on id ${req.params.id}`
                })
            })
            .catch((err) => next(err))
    }
}

module.exports = TodoController