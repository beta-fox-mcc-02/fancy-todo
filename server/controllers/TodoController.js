const { Todo } = require('../models')
 class TodoController {
  static findAll (req, res, next) {
    Todo.findAll()
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne (req, res, next) {
    Todo.findByPk(req.params.id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        next(err)
      })
  }

  static create (req, res, next) {
    const { title, description, status, due_date } = req.body
    Todo.create({ title, description, status, due_date, UserId: req.currentUserId })
      .then(todo => {
        res.status(201).json({
          todo,
          msg: 'Create todo success'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static update (req, res, next) {
    const { title, description, due_date } = req.body
    Todo.update({ title, description, due_date }, {
      where: { 
        id: Number(req.params.id)
      },
      returning: true
    })
      .then(todo => {
        res.status(200).json({
          todo,
          msg: 'update todo success'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatus (req, res, next) {
    const { status } = req.body
    Todo.update({ status }, { where: { id: Number(req.params.id) }})
      .then(todo => {
        res.status(200).json({
          todo,
          msg: 'update status success'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static delete (req, res, next) {
    Todo.destroy({ where: { id: Number(req.params.id) }})
      .then(todo => {
        res.status(200).json({
          todo,
          msg: 'Delete success'
        })
      })
      .catch(err => {
        next(err)
      })
  }
 }

 module.exports = TodoController