const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const role = ["admin", "student"];
const sex = ["man", "woman"];

const User = new Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sex: { type: String, enum: sex, required: true, default: "man" },
  telephone: { type: Number },
  name: { type: String, required: true },
  role: { type: String, enum: role, required: true },
  dob: { type: Date },
  address: { type: String, default: "" },
  class_id: { type: ObjectId, ref: "Class" },
  ethnic_id: { type: ObjectId, ref: "Ethnic" },
  province_id: { type: ObjectId, ref: "Province" },
});

module.exports = mongoose.model("User", User);
