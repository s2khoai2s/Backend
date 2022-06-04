const express = require("express");
const res = require("express/lib/response");
const Class = require("../models/Class");
const Course = require("../models/Course");
const Department = require("../models/Department");
const User = require("../models/User");
const convert = require("./helper/Convert");

express.urlencoded({
  extended: true,
});

express.json();

class studentController {
  finduser(req, res, next) {
    convert
      .ConvertClass(req.body.classid)
      .then((class_id) => {
        convert.ConvertEthnic(req.body.ethnicid).then((ethnic_id) => {
          convert.ConvertEthnic(req.body.provinceid).then((province_id) => {
            var objdata = req.body;
            console.log(typeof objdata);
            if (class_id) {
              objdata.class_id = class_id;
            }
            if (ethnic_id) {
              objdata.ethnic_id = ethnic_id;
            }
            if (province_id) {
              objdata.province_id = province_id;
            }

            User.find({
              objdata,
            })
              .populate({
                path: "class_id",
                populate: {
                  path: "department_id",
                },
              })
              .populate("ethnic_id")
              .populate("province_id")
              .then((data) => {
                res.json(data);
              });
          });
        });
      })
      .catch((err) => {
        res.json(500).json({ messange: "Lỗi server", err: err });
      });
  }

  adduser(req, res, next) {
    User.findOne({
      userid: req.body.userid,
    })
      .then((data) => {
        if (data) {
          res.status(300).json("Tài khoản đã tồn tại");
        } else {
          convert.ConvertClass(req.body.classid).then((class_id) => {
            convert.ConvertEthnic(req.body.ethnicid).then((ethnic_id) => {
              convert.ConvertEthnic(req.body.provinceid).then((province_id) => {
                User.create({
                  userid: req.body.userid,
                  password: req.body.password,
                  name: req.body.name,
                  role: req.body.role,
                  dob: req.body.dob,
                  sex: req.body.sex,
                  telephone: req.body.telephone,
                  address: req.body.address,
                  class_id: class_id,
                  ethnic_id: ethnic_id,
                  province_id: province_id,
                })
                  .then((data) => {
                    res.json("Tạo tài khoản thành công");
                  })
                  .catch((err) => {
                    res.status(300).json("Tạo tài khoản thất bại");
                  });
              });
            });
          });
        }
      })

      .catch((err) => {
        res.json("Tạo tài khoản thất bại");
      });
  }

  getuser(req, res, next) {
    User.find()
      .populate({
        path: "class_id",
        populate: {
          path: "department_id",
        },
      })
      .populate("ethnic_id")
      .populate("province_id")

      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  updateadmin(req, res, next) {
    convert.ConvertClass(req.body.classid).then((class_id) => {
      convert.ConvertEthnic(req.body.ethnicid).then((ethnic_id) => {
        convert.ConvertEthnic(req.body.provinceid).then((province_id) => {
          User.findOneAndUpdate(
            { userid: req.params.id },
            {
              password: req.body.password,
              name: req.body.name,
              role: req.body.role,
              dob: req.body.dob,
              address: req.body.address,
              sex: req.body.sex,
              telephone: req.body.telephone,
              class_id: class_id,
              ethnic_id: ethnic_id,
              province_id: province_id,
            }
          )
            .then((data) => {
              res.json("Cập nhật thành công");
              console.log(data);
            })
            .catch((err) => {
              res.status(500).json("Cập nhật thất bại");
            });
        });
      });
    });
  }

  updatestudent(req, res, next) {
    var userid = req.headers.useridlogin;
    convert.ConvertProvince(req.body.provinceid).then((province_id) => {
      convert.ConvertEthnic(req.body.ethnicid).then((ethnic_id) => {
        User.findOneAndUpdate(
          { userid: userid },
          {
            password: req.body.password,
            name: req.body.name,
            dob: req.body.dob,
            address: req.body.address,
            ethnic_id: ethnic_id,
            province_id: province_id,
            sex: req.body.sex,
            telephone: req.body.telephone,
          }
        )
          .then((data) => {
            res.json("Cập nhật thành công");
          })
          .catch((err) => {
            res.status(500).json("Cập nhật thất bại");
          });
      });
    });
  }

  myaccount(req, res, next) {
    var userid = req.headers.useridlogin;
    User.find({
      userid: userid,
    })
      .populate({
        path: "class_id",
        populate: {
          path: "department_id",
        },
      })
      .populate("ethnic_id")
      .populate("province_id")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  user(req, res, next) {
    var userid = req.params.id;
    User.findOne({ userid: userid })
      .populate({
        path: "class_id",
        populate: {
          path: "department_id",
        },
      })
      .populate("ethnic_id")
      .populate("province_id")
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(500).json("Sinh viên không tồn tại");
        }
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  delete(req, res, next) {
    var userid = req.params.id;
    User.findOneAndDelete({ userid: userid })
      .then((data) => {
        res.json("Xoá thành công");
      })
      .catch((err) => {
        res.status(500).json("Xoá thất bại");
      });
  }
}
module.exports = new studentController();
