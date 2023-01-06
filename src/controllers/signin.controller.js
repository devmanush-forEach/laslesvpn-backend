const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../middlewares/tokenGenerater");

const SigninController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if there any user present with the same mail in our batasabe or not
    const user = await userModel.findOne({
      email: email,
    });
    if (!user) {
      return res
        .status(400)
        .send(`No user is present with entered email address.`);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).send("Entered password is incorrect!!");
    }

    const token = await generateToken(user._id);
    // res.cookie("jwt", token, {
    //   sameSite: "none",
    //   secure: true,
    // });

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = SigninController;
