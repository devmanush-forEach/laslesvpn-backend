const mongoose = require("mongoose");
require("dotenv").config();

const dburl = process.env.MONGO_URL;

module.exports = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
