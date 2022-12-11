const { default: mongoose, mongo } = require("mongoose");

const RazorPaymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true },
  order_id: { type: String, required: true },
  signature: { type: String, required: true },
});

module.exports = mongoose.model("razorPayment", RazorPaymentSchema);
