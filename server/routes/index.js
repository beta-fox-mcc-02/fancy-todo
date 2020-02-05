const router = require('express').Router();
const todosRouter = require('./todos');
const registerRouter = require('./register');
const loginRouter = require('./login');
const googleSignInRouter = require('./googleSignIn');

router.use('/todos', todosRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/googleSignIn', googleSignInRouter);
module.exports = router;