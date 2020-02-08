const express           = require('express');
const router            = express.Router();
const UserController    = require('../controllers/UserController.js');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/getId', UserController.getUserId);

module.exports = router;