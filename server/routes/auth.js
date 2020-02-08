const router = require("express").Router()
const userController = require("../controllers/user")

router.post("/register", userController.register)

router.post("/login", userController.login)

router.post("/googleLogin", userController.googleLogin)

module.exports = router