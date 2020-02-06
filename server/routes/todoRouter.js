const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.addTodo)
router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getOneTodo)
router.put('/:id', authorization, TodoController.editTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router

