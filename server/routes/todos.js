const router = require('express').Router()
const TodoController = require('../controller/todoController')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')

router.use(auth)
router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.get('/:id',author, TodoController.findOne)
router.put('/:id',author, TodoController.update)
router.delete('/:id',author, TodoController.delete)
module.exports = router