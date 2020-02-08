const { Todo } = require('../models')
const { Op } = require('Sequelize')

class TodoController {

  static getTodos(req, res, next) {
    Todo.findAll({
      where: {
        user_id: req.decoded
      },
      order: [
        ['status', 'DESC'],
        ['due_date', 'ASC']
      ]
    })
      .then(todos => {
        res.status(200).json({
          data: todos,
          message: 'Successfully fetch todos'
        })
      })
      .catch(error => {
        next(error)
      })
  }

  static addTodo(req, res, next) {
    const parameters = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      user_id: req.decoded
    }

    Todo.create(parameters)
      .then((newTodo) => {
        res.status(201).json({
          data: newTodo,
          message: 'Todo is successfully created'
        })
      }).catch((error) => {
        next(error)
      });
  }

  static getTodo(req, res, next) {
    const id = +req.params.id
    Todo.findOne({
      where: {
        [Op.and]: [
          {
            id
          },
          {
            user_id: req.decoded
          }
        ]
      }
    })
      .then(todo => {
        if (todo) {
          res.status(200).json({
            data: todo,
            message: 'Successfully get todo with id ' + id
          })
        } else {
          const error = {
            name: 'NOT FOUND',
            message: 'Todo is not found with id ' + id
          }
          next(error)
        }
      })
      .catch(error => {
        next(error)
      })
  }

  static updateTodo(req, res, next) {
    const id = +req.params.id
    const parameters = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.update(parameters, {
      where: {
        id
      },
      returning: true
    })
      .then(updatedTodo => {
        if (updatedTodo[0]) {
          res.status(200).json({
            data: updatedTodo[1],
            message: 'Update todo successfully'
          })
        } else {
          const error = {
            name: 'NOT FOUND',
            message: 'Todo is not found with id ' + id
          }
          next(error)
        }
      })
      .catch(error => {
        next(error)
      })
  }

  static deleteTodo(req, res, next) {
    const id = +req.params.id
    Todo.destroy({
      where: {
        id
      }
    })
      .then(deleted => {
        if (deleted) {
          res.status(200).json({
            message: 'Delete todo with ' + id + ' successfully'
          })
        } else {
          const error = {
            name: 'NOT FOUND',
            message: 'Todo is not found with id ' + id
          }
          next(error)
        }
      })
      .catch(error => {
        next(error)
      })
  }
}

module.exports = TodoController;
