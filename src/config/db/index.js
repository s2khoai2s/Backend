const mongoose = require("mongoose");
require("dotenv").config();
const mongodb_url = process.env.mongodb_url;

async function connect() {
  try {
    await mongoose.connect(mongodb_url);
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log("Kết nối database thát bại");
  }
}

module.exports = { connect };
