const instance = require("../configs/razorpay");
const crypto = require("crypto");
const planModel = require("../models/plan.model");
const userModel = require("../models/user.model");

const paymentController = {
  setOrder: async (req, res) => {
    try {
      const { amount } = req.body;
      amount = amount * 100;
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
      const {
        ids: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
        amount,
        planType,
      } = req.body;
      const user_id = req.userid;
      console.log(req.body);

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      let plan;
      if (isAuthentic) {
        try {
          plan = await planModel
            .findOne({ price: amount, title: planType })
            .lean()
            .exec();
        } catch (error) {
          return res.status(400).send(error.message);
        }

        try {
          const updatedUser = await userModel.findByIdAndUpdate(
            user_id,
            {
              subscibedPlan: plan._id,
            },
            { new: true }
          );
        } catch (error) {
          return res.status(400).send(error.message);
        }

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
