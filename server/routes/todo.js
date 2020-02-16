const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')
const { authentication } = require('../middlewares/authentication.js')
const { authorization } = require('../middlewares/authorization.js')

router.get('/', authentication, TodoController.findAll)
router.post('/', authentication, TodoController.create)

router.get('/:id', authentication, authorization, TodoController.findById)
router.put('/:id', authentication, authorization, TodoController.setToCompleted)

router.delete('/:id', authentication, authorization, TodoController.deleteById)

module.exports = router