const mongoose = require("mongoose");
const { NULL } = require("node-sass");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const Course = new Schema({
  courseid: { type: String, required: true, unique: true },
  subject_id: { type: ObjectId, ref: "Subject", required: true },
  total_lesson: String,
  resign_exp: Date,
  schedule: [
    {
      start: String,
      end: String,
      Date: Date,
      Checked_in: [{ type: ObjectId, ref: "User" }],
    },
  ],
  studentsdetail: [
    {
      user_id: { type: ObjectId, ref: "User" },
      check_point: { type: Number, default: 0 },
    },
  ],
});
Course.plugin(beautifyUnique);

module.exports = mongoose.model("Course", Course);
