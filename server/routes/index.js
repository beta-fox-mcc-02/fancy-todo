const router = require('express').Router()
const todo = require('./todo')
const userController = require('../controllers/userController')

router.use('/todos', todo)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/gLogin', userController.gLogin)

module.exports = router