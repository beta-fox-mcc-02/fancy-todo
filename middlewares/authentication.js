const { validateToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.access_token;
    const decoded = validateToken(token);
    req.currentUserId = decoded.id;

    User.findByPk(req.currentUserId).then((user) => {
      if (user) {
        next();
      } else {
        next({
          status: 401,
          message: "You must login first",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
