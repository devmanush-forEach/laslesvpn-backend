const PlanController = require("../controllers/plan.controller");
const Authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");

const route = require("express").Router();

route.get("/", PlanController.getPlans);
route.post("/", Authenticate, upload.single("icon"), PlanController.addPlan);

module.exports = route;
