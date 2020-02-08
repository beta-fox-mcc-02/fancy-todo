const router = require('express').Router()
const Todo = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', Todo.findAll)

router.use(authentication)
router.post('/', Todo.create)

router.use('/:id', authorization)
router.get('/:id', Todo.findOne)
router.put('/:id', Todo.update)
router.patch('/:id', Todo.updateStatus)
router.delete('/:id', Todo.delete)

module.exports = router