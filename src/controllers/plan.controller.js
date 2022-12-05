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

      const plan = { title, features, price, quality, icon: req.file.path };
      const created = await planModel.create(plan);
      res.status(201).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = PlanController;
