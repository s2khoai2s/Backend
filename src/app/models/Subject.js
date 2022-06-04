const mongoose = require("mongoose");
const { options } = require("nodemon/lib/config");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Subject = new Schema({
  subjectid: { type: String, required: true, unique: true },
  subjectname: { type: String, required: true },
  credit: { type: Number, required: true },
  department_id: { type: ObjectId, required: true, ref: "Department" },
  general: { type: Boolean, default: true },
  optional: { type: Boolean, default: false },
});

module.exports = mongoose.model("Subject", Subject);
