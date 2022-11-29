const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("../configs/db");
const SigninController = require("../controllers/signin.controller");
const SignupController = require("../controllers/signup.controller");
const UserRoutes = require("../routes/user.routes");
const cookieParser = require("cookie-parser");
const SignoutController = require("../controllers/signout.controller");
const Authenticate = require("../middlewares/authenticate");

const port = process.env.PORT;

const app = express();
app.options(
  "http://localhost:3000",
  cors({ origin: "http://localhost:3000", credentials: true })
);

app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/signin", SigninController);
app.use("/signup", SignupController);
app.use("/signout", Authenticate, SignoutController);

app.use("/", (req, res) => {
  res.status(200).send("WORKING FINE");
});

app.listen(port, () => {
  connectToDB();
  console.log(`Server is listening on port ${port}`);
});
