const express = require('express');
const router = express.Router();
const app = express();
const todoController = require('../controllers/todoController');
const verifyToken = require('../middlewares/VerifyToken');

router.use(verifyToken.authentication);
router.get('/', todoController.findAll);
router.post('/',todoController.create);
router.get('/:id', verifyToken.authorization, todoController.findById);
router.put('/:id', verifyToken.authorization, todoController.update);
router.delete('/:id', verifyToken.authorization, todoController.delete);
router.get('/weather', todoController.weatherForecast);

module.exports = router;