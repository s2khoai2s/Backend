const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Ethnic = new Schema({
  ethnicid: { type: String, required: true, unique: true },
  ethnic_name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Ethnic", Ethnic);
