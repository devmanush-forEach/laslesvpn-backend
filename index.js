const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./src/configs/db");
const SigninController = require("./src/controllers/signin.controller");
const SignupController = require("./src/controllers/signup.controller");
const UserRoutes = require("./src/routes/user.routes");
const PlanRoutes = require("./src/routes/plan.routes");
const PaymentRoutes = require("./src/routes/payment.routes");
const cookieParser = require("cookie-parser");
const SignoutController = require("./src/controllers/signout.controller");
const Authenticate = require("./src/middlewares/authenticate");
const multer = require("multer");

const port = process.env.PORT;
const origin = process.env.ORIGIN;

const app = express();
app.options(origin, cors({ origin: origin, credentials: true }));

app.use(express.static("public"));
app.use(function (req, res, next) {
  console.log(req.originalUrl);
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next();
});
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/signin", SigninController);
app.use("/signup", SignupController);
app.use("/signout", Authenticate, SignoutController);
app.use("/plan", PlanRoutes);
app.use("/payment", PaymentRoutes);

app.use("/", (req, res) => {
  res.status(200).send("WORKING FINE");
});

app.listen(port, () => {
  connectToDB();
  console.log(`Server is listening on port ${port}`);
});
