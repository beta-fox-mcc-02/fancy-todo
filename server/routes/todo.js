const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findById)
router.post('/', TodoController.create)


router.put('/:id', authorization, TodoController.updateTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router