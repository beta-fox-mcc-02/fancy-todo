const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { checkAuth, checkOwner } = require('../middlewares/auth')

router.use(checkAuth)
router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.get('/:id', checkOwner, TodoController.findOne)
router.put('/:id', checkOwner, TodoController.update)
router.delete('/:id', checkOwner, TodoController.delete)

module.exports = router
