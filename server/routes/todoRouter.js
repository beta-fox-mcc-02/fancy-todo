const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authenticated = require('../middlewares/authenticated')
const authorized = require('../middlewares/authorized')

router.post('/', authenticated, todoController.add)
router.get('/', todoController.getAll)
router.get('/user/:id', authenticated, todoController.getThem)
router.get('/:id', todoController.getOne)
router.put('/:id', authenticated, authorized, todoController.update)
router.delete('/:id', authenticated, authorized,todoController.remove)

module.exports = router
