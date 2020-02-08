const {Todo} = require('../models/index')
const axios = require('axios')

class TodoController{
  static findAll(req,res,next){
    let todosAll
    let UserId = +req.decoded.id
    Todo.findAll(
      {where : {
      UserId},
    order:[['id', 'ASC']]
    })
      .then(todos=>{
        todosAll = todos
        res.status(200).json({
          data:todosAll,
          msg : "this is todos",
        })
      })
      .catch(err=>{
        next(err)
      })
  }

  static create(req,res,next){
    let payload = {
      title : req.body.title,
      description : req.body.description,
      status : false,
      due_date : req.body.due_date,
      UserId : req.decoded.id
    }
    Todo.create(payload)
      .then(todo=> {
        res.status(201).json({
          data : todo,
          msg : "succes insert new todo"
        })
      })
      .catch(err=>{
        next(err)
      })
  }

  static findOne(req,res,next){
    let id = +req.params.id
    Todo.findByPk(id)
      .then(todo=>{
        if(!todo){
          next({
            status : 404,
            message : "Not Found"
          }) 
        } else {
          res.status(200).json({
            data : todo,
            msg : "these is find by id"
          })
        }
      })
      .catch(err=>{
        console.log(err)
        next(err)
      })
  }

  static update(req,res,next){
    let id = +req.params.id
    let payload = {
      title : req.body.title,
      description : req.body.description,
      status : req.body.status,
      due_date : req.body.due_date,
      UserId : req.decoded.id
    }
    Todo.update(payload, {
      where : {id}, 
      returning: true
    })
      .then(todo=>{
        if (!todo[0]){
          next({
            status : 404,
            message : "Not Found"
          })          
        } else {
          res.status(200).json({
            data : todo[1],
            msg : "succes update"
          })
        }
      })
      .catch(err=>{
        next(err)
      })
  }

  static delete(req,res,next){
    let id = +req.params.id
    Todo.destroy({where:{id}})
    .then(todo=>{
      if(!todo) next({}) 
      else {
        res.status(200).json({
          data : todo,
          msg : 'succes delete data'
        })
      }
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = TodoController