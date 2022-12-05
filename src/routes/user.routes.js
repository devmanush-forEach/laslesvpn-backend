const userController = require("../controllers/user.controller");
const Authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");
const userModel = require("../models/user.model");

const router = require("express").Router();

router.get("/", Authenticate, userController.getUser);
router.get("/", userController.getUserById);
router.post(
  "/update",
  upload.single("profile"),
  Authenticate,
  userController.updateUser
);
router.delete("/", userController.deleteUser);

module.exports = router;
