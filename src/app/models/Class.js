const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Class = new Schema({
  classid: { type: String, required: true, unique: true },
  classname: { type: String, required: true, unique: true },
  department_id: { type: ObjectId, required: true, ref: "Department" },
});

module.exports = mongoose.model("Class", Class);
