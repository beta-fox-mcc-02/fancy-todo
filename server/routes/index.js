const express = require('express')
const router = express.Router()

const todoRoutes = require('./todos')
const apiRoutes = require('./apiRoute')

const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

//connect first
router.use((req, res, next) => {
    next()
})

//register & login
router.post('/googleSignIn', UserController.gSign)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//api
router.use('/api', apiRoutes)

//authentication
router.use(authentication)

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'connection ok'
    })
})

//todos
router.use('/todos', todoRoutes)


module.exports = router