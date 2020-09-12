const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const isAuthenticated = require('../middlewares/authentication')
const isAuthorized = require('../middlewares/authorization')

router.use(isAuthenticated)
router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.use('/:id', isAuthorized)
router.get('/:id', TodoController.findByPk)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router