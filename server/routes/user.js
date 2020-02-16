const router = require('express').Router()
const UserController = require('../controllers/userController.js')

router.post('/register', UserController.register)
router.post('/login', UserController.logIn)

router.post('/gSignIn', UserController.gSignIn)

module.exports = router