const express = require("express");
const res = require("express/lib/response");
const Ethnic = require("../models/Ethnic");
const Province = require("../models/Province");

class EthnicAndProvinceController {
  addEthnic(req, res, next) {
    Ethnic.findOne({
      ethnicid: req.body.ethnicid,
    })
      .then((data) => {
        if (data) {
          res.status(300).json("Dân tộc đã tồn tại");
        } else {
          Ethnic.create({
            ethnicid: req.body.ethnicid,
            ethnic_name: req.body.ethnic_name,
          })
            .then(res.json("Thêm dân tộc thành công"))
            .catch((err) => {
              res.status(500).json("Lỗi Server");
            });
        }
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  updateEthnic(req, res, next) {
    Ethnic.findOneAndUpdate(
      {
        ethnicid: req.params.id,
      },
      {
        ethnicid: req.body.ethnicid,
        ethnic_name: req.body.ethnic_name,
      }
    )
      .then((data) => {
        res.json(`Sửa thành công`);
      })
      .catch((err) => {
        res.status(500).json({ messenge: "Lỗi Server", err: err });
      });
  }

  removeEthnic(req, res, next) {
    Ethnic.findOneAndDelete({
      ethnicid: req.params.id,
    }).then((data) => {
      res.json(`Xoá dân tộc ${data.ethnic_name} thành công`);
    });
  }

  addProvince(req, res, next) {
    Province.findOne({
      provinceid: req.body.provinceid,
    })
      .then((data) => {
        if (data) {
          res.status(300).json("Dân tộc đã tồn tại");
        } else {
          Province.create({
            provinceid: req.body.provinceid,
            province_name: req.body.province_name,
          })
            .then(res.json("Thêm dân tộc thành công"))
            .catch((err) => {
              res.status(500).json("Lỗi Server");
            });
        }
      })
      .catch((err) => {
        res.status(500).json("Lỗi Server");
      });
  }

  removeProvince(req, res, next) {
    Province.findOneAndDelete({
      provinceid: req.params.id,
    }).then((data) => {
      res.json(`Xoá dân tộc ${data.province_name} thành công`);
    });
  }
  updateProvince(req, res, next) {
    Province.findOneAndUpdate(
      {
        provinceid: req.params.id,
      },
      {
        provinceid: req.body.provinceid,
        province_name: req.body.province_name,
      }
    )
      .then((data) => {
        res.json(`Sửa thành công`);
      })
      .catch((err) => {
        res.status(500).json({ messenge: "Lỗi Server", err: err });
      });
  }
}
module.exports = new EthnicAndProvinceController();
