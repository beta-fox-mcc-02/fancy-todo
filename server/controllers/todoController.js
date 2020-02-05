const { Todo, UserTodo, User } = require('../models')
const { getLatLon } = require('../helpers/geocode')

module.exports = {
  showAll(req, res, next) {
    Todo.findAll({ include: User })
      .then(results => {
        const filtered = []
        results.forEach(todo => {
          todo.Users.forEach(user => {
            if (user.id === req.currentUserId) {
              filtered.push(todo)
            }
          })
        })
        res
          .status(200)
          .json(filtered.reverse())
      })
      .catch(err => {
        next(err)
      })
  },

  addTodo(req, res, next) {
    const { title, description, address, priority, due_date } = req.body
    const UserId = req.currentUserId
    const today = new Date()
    const created = new Date(due_date)
    let status;

    created > today ? status = false : status = true

    getLatLon(address)
      .then(({ data }) => {
        const location = data.results[0].geometry.location

        Todo.create({
          title,
          description,
          status,
          priority,
          location,
          due_date
        })
          .then(created => {

            UserTodo.create({
              UserId,
              TodoId: created.id
            })
              .then(() => {
                res
                  .status(201)
                  .json(created)
              })
              .catch(next)
          })
          .catch(next)
      })
      .catch(next)
  },

  showOne(req, res, next) {
    Todo.findOne({ where: { id: req.params.id }, include: User })
      .then(result => {
        if (!result) {
          next({ msg: "Not Found" })
        } else {
          res
            .status(200)
            .json(result)
        }
      })
      .catch(next)
  },

  put(req, res) {
    const { title, description, address, priority, due_date } = req.body
    const UserId = req.currentUserId
    const today = new Date()
    const created = new Date(due_date)
    let status;

    created > today ? status = false : status = true

    getLatLon(address)
      .then(({ data }) => {
        const location = data.results[0].geometry.location

        Todo.update({
          title,
          description,
          status,
          priority,
          location,
          due_date
        }, { where: { id: req.params.id } })
          .then(result => {
            if (result[0]) {
              res
                .status(200)
                .json({ title, description, status, priority, due_date })
            } else {
              next({ msg: "Not Found" })
            }
          })
          .catch(next)
      })
      .catch(next)
  },

  delete(req, res, next) {
    Todo.findOne({ where: { id: req.params.id } })
      .then(exist => {
        if (exist) {
          Todo.destroy({ where: { id: req.params.id } })
            .then(() => {
              UserTodo.destroy({ where: { TodoId: req.params.id } })
              res
                .status(200)
                .json({ msg: "Todo Deleted Successfully" })
            })
            .catch(next)
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  }
}