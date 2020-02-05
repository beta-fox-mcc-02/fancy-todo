const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || false,
            due_date: req.body.due_date,
            UserId: req.decoded.id
        }
        console.log(payload)
        Todo.create(payload) 
            .then((todos) => {
                console.log(todos)
                res.status(201).json({
                    data: todos
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Todo.findAll()
            .then((todos) => {
                res.status(200).json({
                    data: todos
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        let id = req.params.id
        Todo.findByPk(id)
            .then((todos) => {
                if (!todos) {
                    let errObj = {
                        name: 'NOT FOUND',
                        errors: [{
                            message: 'ID does not exists'
                        }]
                    }
                    next(errObj)
                } else {
                    res.status(200).json({
                        data: todos
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }


    static update(req, res, next) {
        let id = req.params.id
        let payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.decoded.id
        }

        Todo.update(payload, {
            where: {id}, 
            returning:true
        })
            .then((todos) => {
                if (!todos) {
                    let errObj = {
                        name: 'NOT FOUND',
                        errors: [{
                            message: 'ID NOT FOUND'
                        }]
                    }
                    next(errObj)
                } else {
                    res.status(200).json({
                        data: todos
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id

        Todo.destroy({where: {id}})
            .then((todos) => {
                if (!todos) {
                    let errObj = {
                        name: 'NOT FOUND',
                        errors: [{
                            message: 'ID NOT FOUND'
                        }]
                    }
                    next(errObj)
                } else {
                    res.status(200).json({
                        data: todos
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = TodoController