const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        let payload = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId: req.currentUserId
        }
        Todo.create(payload)
            .then(function(todo) {
                res.status(201).json({
                    msg : 'Create data Success',
                    data: todo
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        let userId = req.currentUserId
        Todo.findAll({
            where : {
                UserId : userId
            },
            order : [['id']]
        })
            .then(function(todos) {
                res.status(200).json({
                    msg : 'Find All Data Success',
                    data : todos
                })
            })
            .catch(next)
    }

    static findById(req, res, next) {
        let id = req.params.id
        Todo.findByPk(id)
            .then(function(todo) {
                if (todo === null) {
                    next({err : 'Todo Is Not found'})
                } else {
                    res.status(200).json({
                        msg : 'Find Data By Id Success',
                        data : todo
                    })
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id
        let payload = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        Todo.update(payload, {
            where : {id : id},
            returning : true
        })
        .then(function(todo) {
            if (todo[0] === 0) {
                next({err : 'Todo Is Not found'})
            } else {
                res.status(200).json({
                    msg : 'Update data success',
                    data : todo
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = {id : req.params.id}
        Todo.destroy({where : id})
            .then(function(todo) {
                if (todo === 0) {
                    next({err : 'Todo Is Not found'})
                } else {
                    res.status(200).json({
                        msg : 'Delete data success',
                        data : todo
                    })
                }
            })
            .catch(next)
    }
}

module.exports = TodoController