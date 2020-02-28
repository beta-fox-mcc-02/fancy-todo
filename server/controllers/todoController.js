const {Todo, User, TeamUser} = require('../models')
const axios = require('axios').default
const currency = {}

class Controller{
    static currency(req, res, next){
        axios({
            method : 'get',
            url : 'https://api.exchangeratesapi.io/latest',
            responseType : 'json'
        })
        .then(result => {
            return result
        })
    }
    static insert(req, res, next){
        console.log(req.body)
        const newTodo = {
            title : req.body.title,
            description : req.body.description,
            status : false,
            due_date : req.body.due_date
        }
        Todo.create(newTodo)
            .then(todo => {
                newTodo.id = todo.id
            })
            .then(todo =>{
               return TeamUser.create({
                    UserId : req.decode.id,
                    TodoId : newTodo.id
                })
            })
            .then(result => {
                res.status(201).json({
                    data : result,
                    msg : 'succesfully add new todo',
                })
            })
            .catch(next)
    }
    static readAll(req, res, next){
        Todo.findAll({
                include : User,
                order : [['id']]
            })
            .then(todos => {
                // console.log(todos)
                let find = []
                const currency = Controller.currency()
                for(let i = 0; i < todos.length; i++){
                    for(let j = 0; j < todos[i].Users.length; j++){
                        if(todos[i].Users[j].id === req.decode.id){
                            find.push(todos[i])
                        }
                    }
                }
                res.status(200).json({
                    data : find,
                    // friend,
                    currency
                })
            })
            .catch(next)
    }
    static readByPk(req, res, next){
        const id = req.params.id
        Todo.findOne({
            include : User,
            where : {
                id
            }
            })
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
                if(!data) throw new Error()
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
            res.status(200).json(response.data.rates)
        })
        .catch(next)
    }
}

module.exports = Controller