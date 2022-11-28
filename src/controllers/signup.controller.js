const userModel = require("../models/user.model");

const SignupController = async (req, res) => {
  try {
    const toRegister = req.body;
    // check if there any user present with the same mail in our batasabe or not
    const isMailRegistered = await userModel.findOne({
      email: toRegister?.email,
    });
    if (isMailRegistered) {
      return res.status(400).send(`This email address is already registered`);
    }

    // check if the mobile number is registered or not
    const isPhoneRegistered = await userModel.findOne({
      phone: toRegister?.phone,
    });
    if (isPhoneRegistered) {
      return res.status(400).send(`This mobile number is already registered`);
    }

    const user = await userModel.create(toRegister);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = SignupController;
