const { Todo } = require('../models')
const axios = require('axios')

class TodoController {
   static search(req, res) {
      // console.log('masuk ke settingan API', '================')
      axios({
         method: 'get',
         url: 'https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city',
         headers: {'user-key' : process.env.API_KEY},
         responseType: 'json'
       })
         .then((response) => {
            res.status(200).json(response.data)
         })
         .catch(err => {
            res.status(500).json({err})
         })
   }

   static findAll(req, res, next) {
      console.log(req.decoded)
      // console.log('testing 1234567890')
      Todo.findAll({
         where : {
            UserId : +req.decoded
         }
      })
         .then(task => {
            res.status(200).json(task)
         })
         .catch(next)
   }

   static create(req, res, next) {
      let UserId = req.decoded
      let { title, description, status, due_date} = req.body
      let input = { title, description, status, due_date, UserId }
      Todo.create(input)
         .then(task => {
            res.status(200).json({
               data: task,
               msg: 'success create todo list'
            })
         })
         .catch(err => {
            next({
               status : 401,
               msg : 'wrong format, date must be after now'
            })
         })
   }

   static findByPk(req, res, next) {
      let id = +req.params.id
      Todo.findByPk(id)
         .then(task => {
            // console.log(task, '^^^^')
            if(!task) {
               const error = {
                  status : 401,
                  msg : 'Page not found'
               }
               next(error)
               // next('notFound')
            } else {
               res.status(200).json({
                  data: task,
                  msg: 'success get todo list by id'
               })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      let id = +req.params.id
      let { title, description, status, due_date } = req.body
      let input = { title, description, status, due_date }
      Todo.update(input, {
         where: {
            id
         },
         returning : true
      })
         .then(task => {
            res.status(200).json({
               data: task, 
               msg: 'success edit todo'
            })
         })
         .catch(err => {
            next(err)
         })
   }

   static delete (req, res, next) {
      let id = +req.params.id
      Todo.destroy({
         where : {
            id
         }
      })
         .then(task => {
            if(!task) {
               const error = {
                  status : 401,
                  msg : 'Page not found'
               }
               next(error)
            } else {
               res.status(200).json({
                  data: task,
                  msg: 'success delete todo'
               })
            }
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = TodoController