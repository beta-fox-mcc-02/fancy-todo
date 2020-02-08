const { Todo, User } = require('../models')
class TodosController {
    static findall(req,res,next){
        console.log(req.body.id)
        Todo.findAll({
            where : { UserId : req.currentUserId},
            order : [["id"]]
        })
            .then(data => {
                // console.log(data)
                res.status(200).json({
                    data,
                    msg: 'succses'
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static addColumn(req,res,next){
        // console.log(req.decode.id)
        let UserId = req.currentUserId
        // console.log(UserId)
        let input = 
            {   title : req.body.title,
                description : req.body.description,
                status : false,
                due_date : req.body.due_date,
                UserId 
            }
            console.log(input)
        Todo.create(input) 
            .then(data => {
                res.status(201).json({
                    data,
                    msg : 'add succses'
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static findone(req,res,next){
        let cek ;
        let params = req.params.id
        Todo.findByPk(params)
            .then(data => {
                if(data !== null){
                    res.status(200).json(data)
                }else{
                    next({
                        name : 'DATANOTFOUND',
                        errors : {
                            message : `DATA ${params} NOT FOUND`
                        }
                    })
                }
            })
    }
    static update(req,res,next) {
        // console.log(req.params.id)
        // console.log(req.body.title)
        // console.log(req.params.id)
        // console.log(req.body.title)
        let input = 
        {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        let params = req.params.id
        console.log(params)
        Todo.findByPk(params)
            .then(data => {
                if(data !== null){
                    res.status(200).json(data)
                }else{
                    next({
                        name : 'DATANOTFOUND',
                        errors : {
                            message : `DATA ${params} NOT FOUND`
                        }
                    })
                }
                return Todo.update(input,{where : {id : req.params.id},returning: true})
            })
            .then(data => {
                res.status(200).json({
                    data,
                    msg : 'data succses'
                })
            })
            .catch(err => {
                next(err)
            })

    }
    static delete(req,res,next) {
        let deletedData;
        let params = req.params.id
        Todo.findByPk(params)
        .then(data => {
            deletedData = data
            if(data !== null){
                res.status(200).json(data)
            }else{
                next({
                    name : 'DATANOTFOUND',
                    errors : {
                        message : `DATA ${params} NOT FOUND`
                    }
                })
            }
            return Todo.destroy({where : {id : req.params.id},returning: true})
        })
        .then(_ => {
            res.status (200,).json({
                deletedData,
                msh : 'succses'
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodosController