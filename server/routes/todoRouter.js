const express = require('express')
const router = express.Router()
const { todoController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, todoController.showAll)
router.get('/:id', authentication, todoController.showOne)
router.post('/', authentication, todoController.addTodo)
router.put('/:id', todoController.put)
router.delete('/:id', authentication, authorization, todoController.delete)

module.exports = router