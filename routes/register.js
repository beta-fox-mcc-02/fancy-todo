const router = require('express').Router();
const RegisterController = require('../controllers/RegisterController');
router.post('/', RegisterController.register);

module.exports = router;