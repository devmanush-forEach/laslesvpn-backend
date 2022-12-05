const paymentController = require("../controllers/payment.controller");
require("dotenv").config();

const router = require("express").Router();

router.post("/setOrder", paymentController.setOrder);
router.post("/getkey", async (req, res) => {
  return res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
});
router.post("/paymentVerification", paymentController.paymentVerification);

module.exports = router;
