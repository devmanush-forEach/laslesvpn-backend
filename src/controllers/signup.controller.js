const e = require("express");
const userModel = require("../models/user.model");

const SignupController = async (req, res) => {
  try {
    const toRegister = req.body;
    console.log(req.body);
    // check if there any user present with the same mail in our batasabe or not
    const isMailRegistered = await userModel.findOne({
      email: toRegister.email,
    });
    console.log(isMailRegistered);
    if (isMailRegistered) {
      return res
        .status(400)
        .send({ error: `This email address is already registered` });
    }

    // check if the mobile number is registered or not
    const isPhoneRegistered = await userModel.findOne({
      phone: toRegister.phone,
    });
    if (isPhoneRegistered) {
      return res
        .status(400)
        .send({ error: `This mobile number is already registered` });
    }

    const { name, email, phone, password } = toRegister;
    const toCreate = {
      name,
      email,
      phone,
      password,
      profile: req.file.path,
    };

    const user = await userModel.create(toCreate);
    const token = await generteToken(user._id);
    // res.cookie("jwt", token, {
    //   sameSite: "none",
    //   secure: true,
    // });
    return res.status(201).send({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = SignupController;
