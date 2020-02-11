const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.todoFindAll)
router.post('/', TodoController.todoCreate)
router.get('/:id', authorization, TodoController.todoFindById)
router.put('/:id', authorization, TodoController.todoUpdate)
router.delete('/:id', authorization, TodoController.todoDelete)

module.exports = router