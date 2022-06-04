const express = require("express");
const res = require("express/lib/response");
const Course = require("../models/Course");
const AddToCourse = require(".././controllers/helper/AddToCourse");
const convert = require("./helper/Convert");
const { json } = require("express/lib/response");
const { path } = require("express/lib/application");
const Studyresult = require("../models/Studyresult");

class CourseController {
  addcourse(req, res, next) {
    convert
      .ConvertSubject(req.body.subjectid)
      .then((subject_id) => {
        Course.findOne({
          courseid: req.body.courseid,
        })
          .then((data) => {
            if (data) {
              res.status(300).json("Khoá học đã tồn tại");
            } else {
              Course.syncIndexes();

              Course.create({
                courseid: req.body.courseid,
                subject_id: subject_id,
                total_lesson: req.body.total_lesson,
              })
                .then((data) => {
                  AddToCourse.AddStudentToCourse(
                    req.body.courseid,
                    req.body.studentsid
                  )
                    .then((data) => {
                      AddToCourse.AddScheduleToCourse(
                        req.body.courseid,
                        req.body.schedule
                      ).then(res.json("Thành công"));
                    })
                    .catch((err) => {
                      res.status(500).json("Lỗi Server");
                    });
                })
                .catch((err) => {
                  res.status(500).json("Lỗi Server");
                })
                .then((data) => {
                  res.json("Tạo lớp học thành công");
                })
                .catch((err) => {
                  res.status(500).json(err);
                });
            }
          })
          .catch((err) => {
            res.status(300).json("Tạo lớp học thất bại");
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getall(req, res, next) {
    Course.find(req.query)
      .populate({
        path: "studentsdetail",
        populate: { path: "user_id", populate: "class_id" },
      })
      .populate({
        path: "subject_id",
        populate: "department_id",
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  student_resign(req, res, next) {
    convert
      .ConvertUser(req.headers.useridlogin)
      .then((user_id) => {
        convert
          .ConvertCourse(req.body.courseid)
          .then((course_id) => {
            Course.findById(course_id).then((data) => {
              function check(studentsdetail) {
                var studentsdetailString = studentsdetail.toString();
                var uidString = user_id.toString();
                if (studentsdetailString.includes(uidString)) {
                  return true;
                } else return false;
              }
              if (check(data.studentsdetail)) {
                res.status(300).json("Bạn đã đăng ký lớp này rồi");
              } else {
                var today = new Date();
                if (data.resign_exp < today) {
                  res.status(300).json("Đã quá hạn đăng ký");
                } else {
                  Course.findByIdAndUpdate(data._id, {
                    $push: {
                      studentsdetail: {
                        user_id: user_id,
                        check_point: 0,
                      },
                    },
                  })
                    .then((data) => {
                      Studyresult.create({
                        user_id: user_id,
                        course_id: data._id,
                      })
                        .then(res.json("Bạn đã đăng ký thành công"))
                        .catch((err) => {
                          res.status(500).json(err);
                        });
                    })
                    .catch((err) => {
                      res.status(500).json(err);
                    });
                }
              }
            });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  updateadmin(req, res, next) {
    convert
      .ConvertSubject(subjectid)
      .then((subject_id) => {
        var courseid = req.params.id;
        Course.findOneAndUpdate(
          { courseid: courseid },
          {
            courseid: req.body.courseid,
            subject_id: subject_id,
            schedule: req.body.schedule,
            studentsdetail: req.body.studentsdetail,
          }
        )
          .then((data) => {
            res.json("Cập nhật thành công");
          })
          .catch((err) => {
            res.status(500).json("Cập nhật thất bại");
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  delete(req, res, next) {
    var courseid = req.params.id;
    Course.findOneAndDelete({ courseid: courseid })
      .then((data) => {
        res.json("Xoá thành công");
      })
      .catch((err) => {
        res.status(500).json("Xoá thất bại");
      });
  }

  findSchedulebyUser(req, res, next) {
    convert.ConvertUser(req.params.id).then((user_id) => {
      Course.find({
        "studentsdetail.user_id": user_id,
      })
        .populate({ path: "studentsdetail", populate: "user_id" })
        .populate({ path: "subject_id", populate: "department_id" })
        .then((data) => {
          var objdata = [];
          data.forEach((element) => {
            var newobj = [];
            element.schedule.forEach((elm) => {
              var check = false;
              if (elm.Checked_in.includes(user_id)) {
                check = true;
              }
              newobj.push({
                start: elm.start,
                end: elm.end,
                Date: elm.Date,
                Checked_in: check,
              });
            });
            objdata.push({
              _id: element._id,
              courseid: element.courseid,
              subjectname: element.subject_id.subjectname,
              schedule: newobj,
            });
          });
          res.json(objdata);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }

  findSchedulebyCourse(req, res, next) {
    Course.find({
      courseid: req.params.id,
    })
      .populate({ path: "studentsdetail", populate: "user_id" })
      .populate({ path: "subject_id", populate: "department_id" })
      .then((data) => {
        var dataobj = [];

        data.forEach((element) => {
          var newobj = [];
          element.schedule.forEach((element) => {
            newobj.push({
              start: element.start,
              end: element.end,
              Date: element.Date,
            });
          });
          dataobj.push({
            courseid: element.courseid,
            subjectname: element.subject_id.subjectname,
            schedule: newobj,
          });
        });
        res.json(dataobj);
      })
      .catch((err) => res.status(500).json(err));
  }
}
module.exports = new CourseController();
