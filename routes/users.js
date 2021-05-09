const router = require("express").Router();
const usersController = require("../controller/usersController");

router.get("/users/category/:categoryId", usersController.getByCategory)
router.get("/users", usersController.search)
router.get("/user/:id", usersController.getSingle)
router.get("/users/all", usersController.getAll)

module.exports = router;