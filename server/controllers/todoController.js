const {Todo, User} = require('../models')
const axios = require('axios').default

class Controller{
    static insert(req, res, next){
        const newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            UserId : req.decode.id,
            due_date : req.body.due_date
        }
        Todo.create(newTodo)
            .then(todo => {
                newTodo.id = todo.id
                return axios({
                    method : 'get',
                    url : 'https://api.exchangeratesapi.io/latest',
                    responseType : 'json'
                })
            })
            .then(({data}) => {
                res.status(201).json({
                    data : newTodo,
                    msg : 'insert new data succes',
                    currency : data
                })
            })
            .catch(next)
    }
    static readAll(req, res, next){
        Todo.findAll({
                include : User,
                where : {
                    UserId : req.decode.id
                },
                order : [['id']]
            })
            .then(todos => {
                res.status(200).json({
                    data : todos
                })
            })
            .catch(next)
    }
    static readByPk(req, res, next){
        const id = req.params.id
        Todo.findByPk(id)
            .then(todo => {
                if(!todo) throw new Error()
                else{
                todo = {
                    title : todo.title,
                    description : todo.description,
                    status : todo.status,
                    due_date : todo.due_date
                }
                    res.status(200).json({
                        data : todo
                    })
                }
            })
            .catch(next)
    }
    static update(req, res, next){
        const id = req.params.id
        const updateTodo = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            UserId : req.body.UserId,
            due_date : req.body.due_date
        }
        Todo.update(updateTodo, {
                where : {
                    id : id
                }
            })
            .then(todo => {
                if(!todo) throw new Error()
                todo = {
                    title : todo.title,
                    description : todo.description,
                    status : todo.status,
                    UserId : todo.UserId,
                    due_date : todo.due_date
                }
                res.status(200).json({
                    data : todo,
                    msg : `todo Id ${id} successfuly updated`
                })
            })
            .catch(next)
    }
    static delete(req, res, next){
        const id = req.params.id
        Todo.destroy({
                where : {
                    id : id
                }
            })
            .then(data => {
                if(!todo) throw new Error()
                res.status(200).json({
                    data,
                    msg : `Todos Id ${id} has been succesfuly deleted`
                })
            })
            .catch(next)
    }
    static currencyApi(req, res, next){
        axios({
            method : 'get',
            url : 'https://api.exchangeratesapi.io/latest',
            responseType : 'json'
        })
        .then(response => {
            console.log("masuk")
            res.status(200).json(response.data)
        })
        .catch(next)
    }
}

module.exports = Controller