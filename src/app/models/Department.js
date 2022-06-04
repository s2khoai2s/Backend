const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Department = new Schema({
  departmentid: { type: String, required: true, unique: true },
  departmentname: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Department", Department);
