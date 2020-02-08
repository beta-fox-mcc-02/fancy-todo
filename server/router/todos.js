const router = require('express').Router();
const Controllers = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorized = require('../middlewares/authorized')

router.use(authentication)

router.post('/', Controllers.create);
router.get('/', Controllers.findAll);
router.get('/:id', authorized, Controllers.findOne);
router.put('/:id', authorized, Controllers.update);
router.delete('/:id', authorized, Controllers.delete);

module.exports = router