const Studyresult = require("./../models/Studyresult");
const convert = require("./helper/Convert");

class StudyresultController {
  updateOne(req, res, next) {
    convert
      .ConvertUser(req.body.userid)
      .then((user_id) => {
        convert
          .ConvertUser(req.body.courseid)
          .then((courseid) => {
            Studyresult.findOneAndUpdate(
              {
                user_id: user_id,
                course_id: course_id,
              },
              {
                Diem_ren_luyen: req.body.Diem_ren_luyen,
                " Diem_qua_trinh.Kiem_tra_lan_1": req.body.Kiem_tra_lan_1,
                " Diem_qua_trinh.Kiem_tra_lan_2": req.body.Kiem_tra_lan_2,
                " Diem_qua_trinh.Kiem_tra_lan_3": req.body.Kiem_tra_lan_3,
                " Diem_qua_trinh.Kiem_tra_lan_4": req.body.Kiem_tra_lan_4,
                Diem_cuoi_ky: req.body.Diem_cuoi_ky,
              }
            );
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })

      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getResultbyCourse(req, res, next) {
    convert
      .ConvertCourse(req.params.id)
      .then((course_id) => {
        Studyresult.find({ course_id: course_id })
          .populate("user_id")
          .populate({ path: "course_id", populate: "subject_id" })
          .then((data) => {
            console.log(data[0].course_id);
            var dataobj = [];
            data.forEach((element) => {
              dataobj.push({
                userid: element.user_id.userid,
                name: element.user_id.name,
                Diem_ren_luyen: element.Diem_ren_luyen,
                Kiem_tra_lan_1: element.Diem_qua_trinh.Kiem_tra_lan_1,
                Kiem_tra_lan_2: element.Diem_qua_trinh.Kiem_tra_lan_2,
                Kiem_tra_lan_3: element.Diem_qua_trinh.Kiem_tra_lan_3,
                Kiem_tra_lan_4: element.Diem_qua_trinh.Kiem_tra_lan_4,
                Diem_cuoi_ky: element.Diem_cuoi_ky,
              });
            });
            res.json(dataobj);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getResultbyUser(req, res, next) {
    convert
      .ConvertUser(req.params.id)
      .then((user_id) => {
        Studyresult.find({ user_id: user_id })
          .populate("user_id")
          .populate({ path: "course_id", populate: "subject_id" })
          .then((data) => {
            var dataobj = [];
            data.forEach((element) => {
              dataobj.push({
                courseid: element.course_id.courseid,
                subjectname: element.course_id.subject_id.subjectname,
                Diem_ren_luyen: element.Diem_ren_luyen,
                Kiem_tra_lan_1: element.Diem_qua_trinh.Kiem_tra_lan_1,
                Kiem_tra_lan_2: element.Diem_qua_trinh.Kiem_tra_lan_2,
                Kiem_tra_lan_3: element.Diem_qua_trinh.Kiem_tra_lan_3,
                Kiem_tra_lan_4: element.Diem_qua_trinh.Kiem_tra_lan_4,
                Diem_cuoi_ky: element.Diem_cuoi_ky,
              });
            });
            res.json(dataobj);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  ChangeResult(req, res, next) {
    convert
      .ConvertUser(req.params.id)
      .then((user_id) => {
        convert
          .ConvertCourse(req.body.courseid)
          .then((course_id) => {
            Studyresult.findOneAndUpdate(
              {
                user_id: user_id,
                course_id: course_id,
              },
              {
                Diem_ren_luyen: req.body.Diem_ren_luyen,
                Kiem_tra_lan_1: req.body.Diem_qua_trinh.Kiem_tra_lan_1,
                Kiem_tra_lan_2: req.body.Diem_qua_trinh.Kiem_tra_lan_2,
                Kiem_tra_lan_3: req.body.Diem_qua_trinh.Kiem_tra_lan_3,
                Kiem_tra_lan_4: req.body.Diem_qua_trinh.Kiem_tra_lan_4,
                Diem_cuoi_ky: req.body.Diem_cuoi_ky,
              }
            );
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}
module.exports = new StudyresultController();
