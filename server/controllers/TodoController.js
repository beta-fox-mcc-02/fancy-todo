const { Todo } = require('../models');
const axios = require('axios');

class TodoController{
    static findAll(req, res, next) {
        console.log(1);
        
        Todo.findAll()
        // ({
        //     include: [{ model: User }]
        // })
            .then(data => {
                // console.log(data);
                
                res.status(200).json({
                    data,
                    msg: 'Read Data success'
                })
            })
            .catch(next);
    }

    static create(req, res, next) {
        const data = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        
        Todo.create(data)
            .then( _ => {
                res.status(201).json({
                    data,
                    msg: 'Input Data success'
                })
            })
            .catch(err => {
                next({
                    name : err.name,
                    msg: err.errors[0].message,
                    process : 'Create Process'
                })
            });
    }

    static update(req, res, next) {
        const { id } = req.params;

        const data = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update(data, { where : { id }, returning : true} )
            .then(result => {
                if (result[0] > 0) {
                    res.status(200).json({
                        data: result[0][1],
                        msg: 'update Data success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No updated data rows',
                        process: 'Updating Data'
                    })
                }
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const { id } = req.params;

        Todo.destroy({ where : { id }})
            .then( data => {
                if (data) {
                    res.status(200).json({
                        data,
                        msg: 'Delete Data success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No deleted data rows',
                        process: 'Deleting Data'
                    })
                }
            })
            .catch( next );
    }

    static findById(req, res, next) {
        const { id } = req.params;

        Todo.findByPk(id)
        .then( data => {
                if (data) {
                    res.status(200).json({
                        data,
                        msg: 'Read Data success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No result data rows',
                        process: 'Find One Row Data'
                    })
                }
            })
            .catch(next);
    }

    static goHome(req, res, next) { 
        axios({
            method: 'get',    
            url: 'https://programming-quotes-api.herokuapp.com/quotes',
            responType: 'json'
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(next);
    }
}

module.exports = TodoController;