const router = require("express").Router();
const todoController = require("../controllers/todo");
const {
    authorize
} = require("../middlewares/authorize");
const {
    authentication
} = require("../middlewares/jwt");

router.use(authentication);

router.get("/search", todoController.weather);

router.get("/todos", todoController.findAll);

router.post("/todos", todoController.create);

router.get("/todos/:id", todoController.findOne);

router.put("/todos/:id", authorize, todoController.update);

router.delete("/todos/:id", authorize, todoController.delete);

module.exports = router;