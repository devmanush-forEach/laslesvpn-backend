const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).send({ error: "forbidden user, Please Login" });
    }
    let data;
    try {
      data = await verifyToken(token);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    req.user = data.data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authenticate;
