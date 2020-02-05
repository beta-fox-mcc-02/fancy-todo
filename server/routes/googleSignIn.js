const router = require('express').Router();
const GoogleSignInController = require('../controllers/GoogleSignInController');

router.post('/', GoogleSignInController.signIn);

module.exports = router;