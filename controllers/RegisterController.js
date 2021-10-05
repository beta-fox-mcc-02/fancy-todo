const { User } = require('../models');

class RegisterController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email,
        });
      })
      .catch(next)
  }
}

module.exports = RegisterController;