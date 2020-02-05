const express = require('express');
const router = express.Router();
const todoRoutes = require('./todos');
const apiRoutes = require('./api');
const UserController = require('../controllers/userController');

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(apiRoutes)
router.use('/todos', todoRoutes);

module.exports = router;