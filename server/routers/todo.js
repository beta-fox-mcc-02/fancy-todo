const express = require('express')
const TodoController = require('../controllers/todoController')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.read)
router.post('/', TodoController.create)
router.get('/:id', TodoController.findByPk)
router.put('/:id', authorization, TodoController.update)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router