const router = require("express").Router();
const postsController = require("../controller/postsController");
const { authLogin } = require("../middlewares/auth");

router.get("/posts",postsController.getAll)
router.post("/posts", authLogin, postsController.create)

module.exports = router