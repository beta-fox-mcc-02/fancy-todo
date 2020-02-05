const router = require('express').Router()
const Controller = require('../controllers/todoController')
const {auth} = require('../middlewares/authentification')
const {author} = require('../middlewares/authorization')

router.use(auth)
router.get('/', Controller.readAll)
router.post('/', Controller.insert)
router.get('/currencys', Controller.currencyApi)
router.get('/:id', author, Controller.readByPk)
router.put('/:id',  author, Controller.update)
router.delete('/:id',  author, Controller.delete)

module.exports = router