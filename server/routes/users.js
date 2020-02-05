const router = require('express').Router()
const UserController = require('../controllers/UserController')

//findall
router.get('/findAll', UserController.findAll)

//register
router.post('/register', UserController.register)

//login
router.post('/login', UserController.login)

//google sign in
router.post('/gsignin', UserController.gsignin)

module.exports = router