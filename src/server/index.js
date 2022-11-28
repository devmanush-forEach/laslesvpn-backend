const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("../configs/db");
const SigninController = require("../controllers/signin.controller");
const SignupController = require("../controllers/signup.controller");
const UserRoutes = require("../routes/user.routes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT;

const app = express();
app.options("*", cors({ origin: "*", credentials: true }));

app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/signin", SigninController);
app.use("/signup", SignupController);

app.use("/", (req, res) => {
  res.status(200).send("WORKING FINE");
});

app.listen(port, () => {
  connectToDB();
  console.log(`Server is listening on port ${port}`);
});
