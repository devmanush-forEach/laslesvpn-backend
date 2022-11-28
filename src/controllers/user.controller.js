const userModel = require("../models/user.model");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await userModel.find();
      return res.status(201).send(user);
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
