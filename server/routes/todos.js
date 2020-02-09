const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.list)
router.post('/', TodoController.create)
router.get('/:id', authorization, TodoController.findTodo)
router.put('/:id', authorization,TodoController.updateData)
router.delete('/:id', authorization,TodoController.deleteData)


module.exports = router