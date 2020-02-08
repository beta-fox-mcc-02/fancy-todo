const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSign', UserController.googleSign)

module.exports = router