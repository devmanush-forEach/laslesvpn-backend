const planModel = require("../models/plan.model");

const PlanController = {
  getPlans: async (req, res) => {
    try {
      const plans = await planModel.find().lean().exec();
      req.status(200).send(plans);
    } catch (error) {}
  },
  addPlan: async (req, res) => {
    try {
      const { title, features, price, quality } = req.body;

      const plan = {
        title,
        features,
        price,
        quality,
        icon: req.file.path || null,
      };
      const created = await planModel.create(plan);
      res.status(201).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updatePlan: async (req, res) => {
    try {
      const { _id, title, icon, features, price, quality } = req.body;
      const toUpdate = {
        title,
        features,
        price,
        quality,
        icon: req.file.path ? req.file.path : icon,
      };

      const updated = await planModel.findByIdAndUpdate(_id, toUpdate, {
        new: true,
      });
      res.status(202).send(updated);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updatePlan: async (req, res) => {
    try {
      const { _id, title, icon, features, price, quality } = req.body;

      const daletd = await planModel.findByIdAndDelete(_id);
      res.status(201).send(daletd);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = PlanController;
