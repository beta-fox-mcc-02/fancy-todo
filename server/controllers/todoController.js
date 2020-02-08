const {Todo} = require('../models')
const thirdPartyApiController = require('../controllers/thirdPartyApiController')

class TodoController {
    static todoFindAll(req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.decoded.id
            },
            order: [['id', 'ASC']]
        })
            .then(todos => {
                console.log(todos)
                res.status(200).json({
                    data: todos,
                    msg: 'success fetch all todos'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static todoCreate(req, res, next) {
        let input = req.body

        Todo.create({
            title: input.title,
            description: input.description,
            due_date: input.due_date,
            UserId: req.decoded.id
        })
            .then(data => {
                console.log(data)
                res.status(201).json({
                    data: data,
                    msg: "success create todo"
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static todoFindById(req, res, next) {
        let id = req.params.id

        Todo.findOne({
            where: {
                id: id
            }
        })
            .then(todo => {
                if (!todo) {
                    next('not found')
                } else {
                    res.status(200).json({
                    data: todo,
                    msg: `success fetch todo id: ${id}`
                })
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static todoUpdate(req, res, next) {
        let id = req.params.id
        let updated = req.body
        let status = false
        if (updated.status) {
            status = true
        }
        
        Todo.update(
            {
                title: updated.title,
                description: updated.description,
                due_date: updated.due_date,
                status: status
            },
            {
                where: {
                    id: id
                },
                returning: true
            }
        )
            .then((result) => {
                if (!result[0]) {
                    next('not found')
                } else {
                    res.status(200).json({
                        data: result,
                        msg: 'success update todo'
                    })
                }
            })
            .catch(err => {
                console.log('error update =========', err)
                next(err)
            })
    }

    static todoDelete(req, res, next) {
        let id = req.params.id

        Todo.destroy({
            where: {
                id: id
            }
        })
            .then(result => {
                if (!result) {
                    next('not found')
                } else {
                    res.status(200).json({
                        data: result,
                        msg: `success delete todo id: ${id}`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController