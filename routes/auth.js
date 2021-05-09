const router = require("express").Router();
const authController = require("../controller/authController");

router.post("/login", authController.login)
router.get("/login", authController.getLogin)
router.post("/register", authController.register)
router.get("/register", authController.getRegister)

module.exports = router