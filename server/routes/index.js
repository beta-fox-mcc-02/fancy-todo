const express = require('express');
const router = express.Router();
const todoRoutes = require('./todos');
const apiRoutes = require('./api');
const UserController = require('../controllers/userController');

router.post('/login', UserController.login)
//? routing untuk google sign in belum berfungsi dengan baik
// router.post('/gLogin', UserController.gLogin)
router.post('/register', UserController.register)

router.use(apiRoutes)
router.use('/todos', todoRoutes);

module.exports = router;