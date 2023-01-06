const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user) => {
  return jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 60 * 60 * 60 }
  );
};

module.exports = generateToken;
