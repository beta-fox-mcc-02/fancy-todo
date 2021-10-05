const { Todo } = require("../models");
const axios = require("axios");

class TodoController {
  // findAll
  static findAll(req, res, next) {
    let tmpTodos;
    Todo.findAll({
      where: { UserId: req.currentUserId },
      order: [["id", "ASC"]],
    })
      .then((todos) => {
        // axios
        tmpTodos = todos;
        res.status(200).json({ data: tmpTodos });
      })
      .catch(next);
  }

  // create
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
        res.status(201).json({ data: data });
      })
      .catch(next);
  }

  // findOne
  static findOne(req, res, next) {
    let tmpTodo;
    Todo.findByPk(req.params.id)
      .then((todo) => {
        tmpTodo = todo;
        res.status(200).json({ data: tmpTodo });
      })
      .catch(next);
  }

  // update
  static update(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    };
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

  // delete
  static destroy(req, res, next) {
    Todo.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.status(200).json({
          message: `Success delete data with id: ${req.params.id}`,
        });
      })
      .catch(next);
  }
}

module.exports = TodoController;
