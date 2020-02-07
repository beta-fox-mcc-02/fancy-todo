const { UserTodo, User } = require('../models')

module.exports = {
  showCollaborator(req, res, next) {
    UserTodo.findOne({ where: { UserId: req.currentUserId } })
      .then(result => {
        return UserTodo.findAll({ where: { TodoId: result.TodoId } })
      })
      .then(results => {
        const users = []
        results.forEach(user => {
          users.push(user.UserId)
        })
        res
          .status(200)
          .json(users)
      })
      .catch(next)
  },

  addCollaborator(req, res, next) {
    const { email } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          UserTodo.findAll({ where: { UserId: req.currentUserId } })
            .then(results => {
              results.forEach(result => {
                UserTodo.findOne({ where: { UserId: user.id, TodoId: result.TodoId } })
                  .then(found => {
                    if (!found) {
                      UserTodo.create({
                        UserId: user.id,
                        TodoId: result.TodoId
                      })
                      res
                        .status(200)
                        .json({ msg: "Collaborator added successfully" })
                    } else {
                      next({ msg: "Failed. User already registered as a collaborator" })
                    }
                  })
                  .catch(next)
              });
            })
            .catch(next)
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  },

  showEmail(req, res, next) {
    const { id } = req.params
    User.findOne({ where: { id } })
      .then(user => {
        if (user) {
          res
            .status(200)
            .json({ id, email: user.email })
        } else {
          next({ msg: "Not Found" })
        }
      })
      .catch(next)
  }
}