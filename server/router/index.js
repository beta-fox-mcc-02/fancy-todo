const router = require('express').Router();
const todos = require('./todos')
const Controllers = require('../controllers');
const ControllersApi = require('../controllers/api')

router.use('/todos',todos)

router.post('/register', Controllers.register)
router.post('/login', Controllers.login)
router.get('/news', ControllersApi.news)

module.exports = router