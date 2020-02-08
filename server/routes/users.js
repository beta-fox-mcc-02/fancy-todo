const router = require('express').Router()
const UserController = require('../controller/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/glogin', UserController.gLogin)
module.exports = router