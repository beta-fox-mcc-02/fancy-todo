const {Todo, User} = require('../models/');
const axios = require('axios');
const unixTime = require('../helpers/unixtime');

class Controller {
    static create(req, res, next) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.decoded
        }
 
        Todo.create(data)
            .then(task => {
                res.status(201).json({
                    data: task,
                    message: 'success creating task'
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static findAll(req, res) {
        Todo.findAll({
            where: {
                UserId: req.decoded
            }
        })
            .then(tasks => {
                if(tasks) {
                    res.status(200).json({
                        data: tasks,
                        message: 'Success find all'
                    })
                } else {
                    res.status(500).json({
                        data: tasks,
                        message: 'Database is empty'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    err,
                    message: 'Error find all'
                })
            })
    }

    static findById(req, res, next) {
        Todo.findOne({
            where: {id: req.params.id},
            include: ['User']
        })
            .then(task => {
                if(task) {
                    res.status(200).json({
                        data: task,
                        message: 'success findById'
                    })
                } else {
                    const error = {
                        name: 'Not found',
                        message: `Task with id ${req.params.id} not found`
                    }
                    next(error);
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },
        {
            where: {id: req.params.id},
            returning: true
        })
            .then(task => {
                if(!task[0]) {
                    const error = {
                        name: 'Not found',
                        message: `Task with id ${req.params.id} not found`
                    }
                    next(error);
                } else {
                    res.status(200).json({
                        data: task,
                        message: 'Succes updating'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Todo.destroy({
            where: {id: req.params.id}
        })
            .then(task => {
                if(!task) {
                    const error = {
                        name: 'Not found',
                        message: `Task with id ${req.params.id} not found`
                    }
                    next(error);
                } else {
                    res.status(200).json({
                        data: task,
                        message: 'success deleting task'
                    })
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static weatherForecast(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(task => {
                console.log(task.due_date);
                const date = unixTime.unixTime(task.due_date);
                axios.get(`https://api.darksky.net/forecast/1a39dde7473f0ada56cd3fcef07cd1c2/-6.213021,106.8214201580860800,${date}/`)
                    .then( response => {
                        // console.log(response.data.currently.temperature)
                        res.status(response.status).json(response.data.currently.temperature)
                    })
                    .catch( err => {
                        next(err);
                    })
            })
            .catch(err => {
                next(err);
            })
    }

}

module.exports = Controller;