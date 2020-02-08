const router = require('express').Router()
const Controller = require('../controllers/todoController')
const User = require('../controllers/userController')
const {auth} = require('../middlewares/authentification')
const {author} = require('../middlewares/authorization')
const userController = require('../controllers/userController')

router.get('/currencys', Controller.currencyApi)
router.use(auth)
router.get('/', Controller.readAll)
router.post('/', Controller.insert)
router.get('/teams', author, User.findFriend)
router.post('/teams', author, User.addFriend)
router.get('/:id', author, Controller.readByPk)
router.put('/:id',  author, Controller.update)
router.delete('/:id',  author, Controller.delete)

module.exports = router