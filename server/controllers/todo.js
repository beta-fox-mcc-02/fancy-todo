const {
  Todo,
  User
} = require("../models/");
const axios = require("axios");

class TodoController {
  static findAll(req, res, next) {
    console.log(req.UserId, "==========ini req.UserId")
    Todo.findAll({
        where: {
          UserId: req.UserId
        }
      })
      .then(data => {
        res.status(200).json({
          data,
          msg: "DISPLAYING ALL DATA"
        });
      })
      .catch(err => {
        console.log(err, "====Error findAll")
        next(err);
      });
  }

  static create(req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const due_date = req.body.due_date;
    Todo.create({
        title: title,
        description: description,
        status: status || false,
        due_date: due_date || new Date(),
        UserId: req.UserId
      })
      .then(data => {
        res.status(201).json({
          data,
          msg: "DATA CREATED SUCCESSFULLY"
        });
        console.log(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    const id = req.params.id;
    Todo.findOne({
        where: {
          id: id
        }
      })
      .then(data => {
        res.status(200).json({
          data,
          msg: "DATA FOUND"
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const due_date = req.body.due_date;
    Todo.update({
        title,
        description,
        status,
        due_date
      }, {
        where: {
          id: id
        },
        returning: true
      })
      .then(data => {
        res.status(200).json({
          data,
          msg: "DATA UPDATED SUCCESSFULLY"
        });
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }

  static delete(req, res, next) {
    const id = req.params.id;
    Todo.destroy({
        where: {
          id: id
        }
      })
      .then(data => {
        if (data) {
          // console.log(data, "dari IF");
          res.status(200).json({
            data,
            msg: "DATA DELETED SUCCESSFULLY"
          });
        } else {
          // console.log(data, "dari ELSE");
          let err = {
            err: "NOT FOUND",
            msg: "DATA NOT FOUND"
          };
          next(err);
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static weather(req, res, next) {
    // let city = req.query.query;
    axios({
        method: "get",
        url: `https://www.metaweather.com/api/location/1047378`
      })
      .then(response => {
        res.status(200).json({
          data: response.data
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = TodoController;