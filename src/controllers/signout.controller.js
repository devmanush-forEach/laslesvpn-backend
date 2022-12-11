const SignoutController = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).send({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = SignoutController;
