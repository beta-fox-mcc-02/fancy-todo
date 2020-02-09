const { Todo, User } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Todo.findOne({ where: { id }, include: User })
    .then(todo => {
      if (!todo) {
        next({ msg: 'Not Found' })
      } else {
        let author = false
        todo.Users.forEach(user => {
          if (user.id === req.currentUserId) {
            author = true
          }
        });
        author ? next() : next({ msg: 'Not authorized' })
      }
    })
    .catch(err => next(err))
}