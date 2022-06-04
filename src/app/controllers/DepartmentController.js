const express = require("express");
const res = require("express/lib/response");
const Department = require("../models/Department");

express.urlencoded({
  extended: true,
});

express.json();

class departmentController {
  adddepartment(req, res, next) {
    Department.findOne({
      departmentid: req.body.departmentid,
    })
      .then((data) => {
        if (data) {
          res.status(300).json("Khoa đã tồn tại");
        } else {
          Department.create({
            departmentid: req.body.departmentid,
            departmentname: req.body.departmentname,
          }).then((data) => {
            res.json("Tạo khoa thành công");
          });
        }
      })
      .catch((err) => {
        res.status(300).json("Tạo khoa thất bại");
      });
  }

  find(req, res, next) {
    Department.find(req.query)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  updateadmin(req, res, next) {
    var departmentid = req.params.id;
    department
      .findOneAndUpdate(
        { departmentid: departmentid },
        {
          departmentid: req.body.departmentid,
          departmentname: req.body.departmentname,
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
    var departmentid = req.params.id;
    Department.delete({ departmentid: departmentid })
      .then((data) => {
        res.json("Xoá thành công");
      })
      .catch((err) => {
        res.status(500).json("Xoá thất bại");
      });
  }
}
module.exports = new departmentController();
