const router = require('express').Router()
const todoRoutes = require('./todo')
const authRoutes = require('./auth')
const zomato = require('./zomato')
const GoogleController = require('../controllers/GoogleController')


router.get('/', (req, res) => {
   res.status(200)
      .json({
         msg: 'success to home'
      })
})

router.post('/googleSignIn', GoogleController.signIn)
router.use('/users', authRoutes)
router.use('/todos', todoRoutes)
router.use('/search', zomato)

router.get('/*', (req, res, next) => {
   next({
      status : 404,
      msg : "Page Not Found"
   })
})

module.exports = router