const planModel = require("../models/plan.model");

const PlanController = {
  getPlans: async (req, res) => {
    try {
      const plans = await planModel.find().lean().exec();
      res.status(200).send({ plans });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  addPlan: async (req, res) => {
    try {
      const plan = req.body;
      const created = await planModel.create(plan);
      res.status(201).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updatePlan: async (req, res) => {
    try {
      const toUpdate = req.body;

      const updated = await planModel.findByIdAndUpdate(_id, toUpdate, {
        new: true,
      });
      res.status(202).send(updated);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deletePlan: async (req, res) => {
    try {
      const { _id } = req.body;

      const daletd = await planModel.findByIdAndDelete(_id);
      res.status(201).send(daletd);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = PlanController;
