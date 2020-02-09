const express = require('express')
const router = express.Router()
const todos = require('./todos')
const UserController = require('../controllers/user')
const ApiController = require('../controllers/quoteApi')

router.post('/register', UserController.signUp)
router.post('/googleSignIn', UserController.googleSignIn)
router.post('/login', UserController.signIn)
router.get('/quotes', ApiController.getQuotes)
router.use('/todos', todos)

module.exports = router