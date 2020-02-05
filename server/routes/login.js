const router = require('express').Router();
const LoginController = require('../controllers/LoginController');

router.post('/', LoginController.login);

module.exports = router;