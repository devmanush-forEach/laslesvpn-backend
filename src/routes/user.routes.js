const userController = require("../controllers/user.controller");
const Authenticate = require("../middlewares/authenticate");
const userModel = require("../models/user.model");

const router = require("express").Router();

router.get("/", Authenticate, userController.getUser);
router.get("/", userController.getUserById);
router.post("/update", Authenticate, userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
