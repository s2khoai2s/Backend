const express = require("express");
const res = require("express/lib/response");
const Class = require("../models/Class");
const Department = require("../models/Department");
const User = require("../models/User");
const convert = require("./helper/Convert");

class classController {
  addclass(req, res, next) {
    Class.findOne({
      classid: req.body.classid,
    })
      .then((data) => {
        if (data) {
          res.status(300).json("Lớp đã tồn tại");
        } else {
          convert
            .ConvertDepartment(req.body.departmentid)
            .then((department_id) => {
              Class.create({
                classid: req.body.classid,
                classname: req.body.classname,
                department_id: department_id,
              }).then((data) => {
                res.json("Tạo lớp thành công");
              });
            });
        }
      })
      .catch((err) => {
        res.status(300).json("Tạo lớp thất bại");
      });
  }

  find(req, res, next) {
    Class.find(req.query)
      .populate({
        path: "department_id",
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  updateadmin(req, res, next) {
    var classid = req.params.id;
    Class.findOneAndUpdate(
      { classid: classid },
      {
        classid: req.body.classid,
        departmentid: req.body.departmentid,
        classname: req.body.classname,
      }
    )
      .then((data) => {
        res.json("Cập nhật thành công");
      })
      .catch((err) => {
        res.status(500).json("Cập nhật thất bại");
      });
  }

  delete(req, res, next) {
    var classid = req.params.id;
    Class.findOneAndDelete({ classid: classid })
      .then((data) => {
        res.json("Xoá thành công");
      })
      .catch((err) => {
        res.status(500).json("Xoá thất bại");
      });
  }

  findUserbyClass(req, res, next) {
    convert.ConvertClass(req.body.classid).then((class_id) => {
      User.find({
        class_id: class_id,
      })
        .then((data) => {
          var dataobj = [];
          data.forEach((element) => {
            dataobj.push({
              userid: element.userid,
              name: element.name,
            });
          });
          res.json(dataobj);
        })
        .catch((err) => {
          res.status(500).json("Lỗi Server");
        });
    });
  }
}
module.exports = new classController();
