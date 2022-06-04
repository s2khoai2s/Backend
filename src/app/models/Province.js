const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Province = new Schema({
  provinceid: { type: String, required: true, unique: true },
  province_name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Province", Province);
