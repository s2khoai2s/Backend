const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Studyresult = new Schema({
  user_id: { type: ObjectId, ref: "User", required: true },
  course_id: { type: ObjectId, ref: "Course", required: true },
  Diem_ren_luyen: { type: Number, default: 0 },
  Diem_qua_trinh: {
    Kiem_tra_lan_1: { type: Number, default: 0, required: true },
    Kiem_tra_lan_2: { type: Number, default: 0, required: true },
    Kiem_tra_lan_3: { type: Number, default: 0, required: true },
    Kiem_tra_lan_4: { type: Number, default: 0, required: true },
  },
  Diem_cuoi_ky: { type: Number, default: 0 },
});
module.exports = mongoose.model("Studyresult", Studyresult);
