const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use(Authentication)
router.get('/', todoController.todoFindAll)
router.post('/', todoController.todoCreate)
router.get('/:id', Authorization, todoController.todoFindById)
router.put('/:id', Authorization, todoController.todoUpdate)
router.delete('/:id', Authorization, todoController.todoDelete)

module.exports = router