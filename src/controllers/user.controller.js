const userModel = require("../models/user.model");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await userModel
        .findOne({ _id: req.userid })
        .populate("subscibedPlan")
        .lean()
        .exec();
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
      const userid = req.userid;
      const toUpdate = req.body;

      const updated = await userModel.findByIdAndUpdate(userid, toUpdate, {
        new: true,
      });

      return res.status(201).send(updated);
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
