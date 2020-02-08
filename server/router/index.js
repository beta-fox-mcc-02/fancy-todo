const router = require('express').Router();
const todos = require('./todos')
const Controllers = require('../controllers');
const ControllersApi = require('../controllers/api')

// CRUD
router.use('/todos',todos)

// USER
router.post('/gSignIn', Controllers.googleSignIn)
router.post('/register', Controllers.register)
router.post('/login', Controllers.login)
router.get('/weather', ControllersApi.weather)

module.exports = router