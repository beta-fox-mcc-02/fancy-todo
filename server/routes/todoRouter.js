const express = require('express')
const router = express.Router()
const { todoController, collaboratorController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', todoController.showAll)
router.post('/search', todoController.showFiltered)
router.get('/collaborator', collaboratorController.showCollaborator)
router.post('/collaborator', collaboratorController.addCollaborator)
router.get('/collaborator/:id', collaboratorController.showEmail)
router.delete('/collaborator/:id', collaboratorController.deleteCollaborator)
router.get('/:id', todoController.showOne)
router.post('/', todoController.addTodo)
router.put('/:id', todoController.put)
router.delete('/:id', authorization, todoController.delete)

module.exports = router