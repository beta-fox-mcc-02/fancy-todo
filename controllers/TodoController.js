const { Todo } = require("../models");

class TodoController {
  static findAll(req, res, next) {
    Todo.findAll({
      where: { UserId: req.currentUserId },
      order: [["id", "ASC"]],
    })
      .then((todos) => {
        res.status(200).json({ data: todos });
      })
      .catch(next);
  }

  static create(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.currentUserId,
    };

    Todo.create(todo)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch(next);
  }

  static findOne(req, res, next) {
    Todo.findByPk(req.params.id, { where: { UserId: req.currentUserId } })
      .then((todo) => {
        res.status(200).json({ data: todo });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const todo = { ...req.body };

    Todo.update(todo, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
      .then((todo) => {
        res.status(200).json({
          data: todo[1][0],
        });
      })
      .catch(next);
  }

  static destroy(req, res, next) {
    Todo.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.status(200).json({
          message: `Success delete data with id ${req.params.id}`,
        });
      })
      .catch(next);
  }
}

module.exports = TodoController;
