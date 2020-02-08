const { Todo, Location } = require('../models')
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
        console.log(error)
        next(error)
      })
  }

  static addTodo(req, res, next) {
    const parameters = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      user_id: req.decoded,
    }

    Todo.create(parameters)
      .then((newTodo) => {
        if (!req.body.location) {
          res.status(201).json({
            data: newTodo,
            message: 'Todo is successfully created'
          })
        } else {
          const paramsLocation = JSON.parse(req.body.location)[0]
          const todo_id = newTodo.id
          Location.findOrCreate({ where: paramsLocation })
            .then(([location, created]) => {
              const data = location.get({
                plain: true
              })
              Todo.update({ location_id: data.id },
                {
                  where: {
                    id: todo_id
                  },
                  returning: true
                })
                .then(todo => {
                  res.status(201).json({
                    data: todo,
                    message: 'Todo is successfully created'
                  })
                })
                .catch(err => {
                  console.log(err)
                  next(err)
                })
            })
            .catch(err => {
              console.log(err)
              next(err)
            })
        }
      }).catch((err) => {
        console.log(err)
        next(err)
      });
  }

  static getTodo(req, res, next) {
    const id = +req.params.id
    Todo.findOne({
      include: [Location],
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
      due_date: req.body.due_date,
      location_id: req.body.location ? req.body.location : null
    }

    const location = req.body.location
    if (location) {
      const paramsLocation = JSON.parse(req.body.location)[0]
      Location.findOrCreate({ where: paramsLocation })
        .then(([location, created]) => {
          const data = location.get({
            plain: true
          })
          parameters.location_id = data.id
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
            .catch(err => next(err))
        })
        .catch(err => next(err))
    } else {
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
