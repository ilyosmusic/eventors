const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.get("/categories",categoryController.getAllCategory)

module.exports = router