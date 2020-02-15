const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/gLogin', UserController.googleLogin)

router.use(isAuthenticated)
router.get('/find', UserController.findUser)

module.exports = router