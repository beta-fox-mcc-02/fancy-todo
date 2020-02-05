const axios = require('axios')
const { Todo } = require('../models')
// const seqeulize = require('sequelize')

class TodoControler {
  static findAll(req, res, next) {
    Todo.findAll({
      order: [['id']]
    })
      .then(todos => res.status(200).json(todos))
      .catch(next)
  }

  static createTodo(req, res, next) {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.create(newTodo)
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(next)
  }

  static findByPk(req, res, next) {
    let id = req.params.id
    Todo.findByPk(id)
      .then(todo => res.status(200).json(todo))
      .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let updateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(updateTodo, {
      where: {id},
      returning: true
    })
      .then(todo => res.status(201).json(todo))
      .catch(next)
  }

  static destroy(req, res, next) {
    let id = req.params.id
    Todo.destroy({
      where: {
        id: id
      }
    })
      .then(todo => res.status(200).json(todo))
      .catch(next)
  }

  static currencyAPI (req, res, next) {
    axios({
      method: 'get',
      url: "https://api.exchangeratesapi.io/latest"
      ,
      responseType: 'json'
    })
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(next)
  }
}


module.exports = TodoControler