const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const planModel = require("./plan.model");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String, required: false },
  isAdmin: { type: String, required: true, default: false },
  subscibedPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: planModel,
    default: null,
    required: false,
  },
  roles: { type: [String], required: false, default: ["user"] },
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
