const express = require('express')
const todoRouter = require('./todo')
const UserController = require('../controllers/userController')
const ApiController = require('../controllers/apiController')
const router = express.Router()

router.post('/googlelogin', UserController.googleLogIn)
router.use('/todos', todoRouter)
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.get('/news', ApiController.getNews)


module.exports = router