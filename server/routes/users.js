const router = require('express').Router()
const UserController = require('../controllers/UserController')

//register
router.post('/register', UserController.register)

//login
router.post('/login', UserController.login)

//google sign in
router.post('/gsignin', UserController.gsignin)

module.exports = router