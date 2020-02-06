"use strict"
const { Todo } = require('../models')

class TodoController {
    static list(req, res, next){
        Todo.findAll({
            where : {
                UserId : req.currentUserId
            }
        })
            .then(todos => {
                res.status(200).json({
                    msg : 'success read all data!',
                    data : todos
                })
            })
            .catch(next)
    }

    static create(req, res, next){
        let { title, description, status, due_date} = req.body
        let input = {title, description, status, due_date}
        input.UserId = req.currentUserId
        console.log(input)
        Todo.create(input)
            .then(todo => {
                res.status(200).json({
                    msg : 'SUCCESS ENTRY DATA',
                    data : todo
                })
            })
            .catch(next)
    }

    static findTodo(req, res, next){
        let id = Number(req.params.id)
        Todo.findByPk(id)
            .then(todo => {
                if(todo !== null){
                    res.status(200).json({
                        data : todo,
                        msg : 'Success read user'
                    })
                } else {
                    next({
                        name : 'Data Not Found',
                        error : 'Data Not Found'
                    })
                }
            })
            .catch(next)
    }

    static updateData(req, res, next){
        let { title, description, status, due_date} = req.body
        let input = {title, description, status, due_date}
        input.UserId = req.currentUserId
        
        let id = Number(req.params.id)

        Todo.update(input, {where : {
            id : id
        }, returning: true})
            .then( todo => {
                if(todo !== 0){
                    res.status(200).json({
                        msg : 'Succes update data!',
                        data : todo[1][0]
                    })
                } else {
                    next({
                        name : 'Data Not Found',
                        error : 'Data Not Found'
                    })
                }
            })
            .catch(next)
    }

    static deleteData(req, res, next){
        let id = Number(req.params.id)
        Todo.destroy({where : {
            id : id
        }})
            .then( todo => {
                if(todo !== 0){
                    res.status(200).json({
                        msg : 'succes delete data!',
                        data : todo
                    })
                } else {
                    next({
                        name : 'Data Not Found',
                        error : 'Data Not Found'
                    })
                }
            })
            .catch(next)
    }

    
}

module.exports = TodoController