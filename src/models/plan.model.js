const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  icon: { type: String, required: false },
  quality: { type: String, required: true },
  features: { type: [String], required: true },
});

module.exports = mongoose.model("plan", PlanSchema);
