const { Todo } = require('../models')

class TodoController {
  static create (req, res, next) {
    let data = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      UserId: req.decoded.id
    }
    
    Todo
      .create(data)
      .then(todo => {
        res.status(201).json({
          data: todo
        })
      })
      .catch(next)
  }

  static findAll (req, res, next) {
    Todo
      .findAll({
        where: {
          UserId: req.decoded.id
        }
      })
      .then(todos => {
        res.status(200).json({
          data: todos
        })
      })
      .catch(next)
  }

  static findById (req, res, next) {
    Todo
      .findByPk(req.params.id)
      .then(todo => {
        if(todo){
          res.status(200).json({
            data: todo
          })
        }else {
          next({
            name: 'Find Error',
            status: 404,
            msg: `Data with id ${req.params.id} Not Found`
          })
        }
      })
      .catch(next)
  }

  static updateTodo (req, res, next) {
    let data = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      status: req.body.status
    }
    Todo
      .update(data, {
        where: {
          id: req.params.id
        },
        returning: true
      })
      .then(todo => {
        if( todo[0] > 0) {
          res.status(201).json({
            data: todo[1][0],
            msg: 'Update success'
          })
        } else {
          next({
            name: 'Find Error',
            status: 404,
            msg: `Data with id ${req.params.id} Not Found`
          })
        }
      })
      .catch(next)
  }

  static deleteTodo (req, res, next) {
    Todo
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if(result > 0){
          res.status(200).json({
            data: result,
            msg: 'Delete Success'
          })
        } else {
          next({
            name: 'Find Error',
            status: 404,
            msg: `Data with id ${req.params.id} Not Found`
          })
        }
      })
      .catch(next)
  }
}

module.exports = TodoController
