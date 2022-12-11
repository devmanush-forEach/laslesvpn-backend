const paymentController = require("../controllers/payment.controller");
const Authenticate = require("../middlewares/authenticate");
require("dotenv").config();

const router = require("express").Router();

router.post("/setOrder", paymentController.setOrder);
router.post("/getkey", async (req, res) => {
  return res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
});
router.post(
  "/paymentVerification",
  Authenticate,
  paymentController.paymentVerification
);

module.exports = router;
