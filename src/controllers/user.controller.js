const userModel = require("../models/user.model");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).send({ user: user });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};

module.exports = userController;
