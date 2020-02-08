const router = require('express').Router();
const Controller = require('../controllers/todos');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication)
router.post('/', Controller.insertData);
router.get('/', Controller.findAll);
router.get('/:id', authorization, Controller.findOne);
router.put('/:id', authorization, Controller.update);
router.put('/:id/status', authorization, Controller.updateStatus);
router.delete('/:id', authorization, Controller.delete);

module.exports = router;