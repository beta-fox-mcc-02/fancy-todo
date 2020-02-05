const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const APIController = require('../controllers/APIController')
const { authenticate, authorize } = require('../middlewares/auth')

//check authenticate
router.use(authenticate)

//find all todo
router.get('/', TodoController.findAll)

//create new todo
router.post('/', TodoController.createTodo)

//show API
router.get('/currency', TodoController.currencyAPI)

//find specific todo based on Primary Key
router.get('/:id', TodoController.findByPk)

//update one specific todo
router.put('/:id', authorize, TodoController.update)

//delete one todo
router.delete('/:id', authorize, TodoController.destroy)

module.exports = router