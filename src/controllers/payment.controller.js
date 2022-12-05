const instance = require("../configs/razorpay");
const crypto = require("crypto");

const paymentController = {
  setOrder: async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: 100,
        currency: "INR",
        receipt: "receipt#1",
        partial_payment: false,
        notes: {
          key1: "value3",
          key2: "value2",
        },
      };
      const order = await instance.orders.create(options);
      return res.status(200).send({ success: true, order: order });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  paymentVerification: async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        return res
          .status(200)
          .send({ success: true, payment_id: razorpay_payment_id });
      }

      return res.status(400).send({ success: false, payment_id: null });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};

module.exports = paymentController;
