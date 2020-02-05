const { Todo } = require('../models/index');

class Controller {
    static insertData(req, res, next) {
        let input = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status ? req.body.status : false,
            due_date: req.body.due_date,
            user_id: req.decoded.id
        }
        Todo.create(input)
            .then(todo => {
                res.status(201).json({
                    message: 'Insert data success',
                    data: todo
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static findAll(req, res, next) {
        Todo.findAll({
            where: {
                user_id: req.decoded.id
            }
        })
            .then(todos => {
                res.status(200).json({
                    message: 'Load data success',
                    data: todos
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(todo => {
                if (todo) {
                    res.status(200).json({
                        message: 'Load data success',
                        data: todo
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Not found',
                        type: 'Data not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static update(req, res, next) {
        let update = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(update, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(data => {
                if (data[0]) {
                    res.status(200).json({
                        message: 'Update success',
                        data
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Not found',
                        type: 'Data not found'
                    })
                }
            })
            .catch(err => {
                next(err);
            })
    }
    static delete(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    res.status(200).json({
                        data,
                        message: 'Deleted'
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Not found',
                        type: 'Data not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;