const { Todo } = require('../models');
const axios = require('axios');

class TodoController {
  // findAll
  static findAll(req, res, next) {
    let tmpTodos;
    Todo.findAll({
      where: { UserId: req.currentUserId },
      order: [['id', 'ASC']]
    })
      .then(todos => {
        // axios
        tmpTodos = todos;
        return axios.get(`https://api.weatherbit.io/v2.0/current?city=Jakarta&country=Indonesia&lang=id&key=${process.env.TOKEN}`)
      })
      .then(weather => {
        tmpTodos.forEach(el => {
          el.dataValues.currentWeather = weather.data.data[0].weather.description;
        })
        res.status(200).json({ data: tmpTodos });
      })
      .catch(next)
  }

  // create
  static create(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.currentUserId
    }
    console.log('INI TODO =>>', todo);
    console.log('INI REQ BODY=>>', req.body);
    // console.log('INI REQ SAJA=>>', req);

    Todo.create(todo)
      .then(data => {
        console.log('TODO DI DALAM=>>>', todo);
        res.status(201).json({ data: data })
      })
      .catch(next)
  }

  // findOne
  static findOne(req, res, next) {
    let tmpTodo;
    Todo.findByPk(req.params.id)
      .then(todo => {
        tmpTodo = todo;
        return axios.get(`https://api.weatherbit.io/v2.0/current?city=Jakarta&country=Indonesia&lang=id&key=${process.env.TOKEN}`)
      })
      .then(weather => {
        if (tmpTodo) {
          tmpTodo.dataValues.currentWeather = weather.data.data[0].weather.description;
          res.status(200).json({ data: tmpTodo })
        } else {
          next({ message: 'Bad Request', status: 400 })
        }
      })
      .catch(next)
  }

  // update
  static update(req, res, next) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(todo, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then(todo => {
        res.status(200).json({
          data: todo[1][0]
        })
      })
      .catch(next)
  }

  // delete
  static destroy(req, res, next) {
    Todo.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.status(200).json({
          message: `Success delete data with id: ${req.params.id}`
        })
      })
      .catch(next)
  }
}

module.exports = TodoController;