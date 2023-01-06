const PlanController = require("../controllers/plan.controller");
const Authenticate = require("../middlewares/authenticate");

const route = require("express").Router();

route.get("/", PlanController.getPlans);
route.post("/", Authenticate, PlanController.addPlan);
route.post("/update", Authenticate, PlanController.updatePlan);

module.exports = route;
