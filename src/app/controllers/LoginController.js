const express = require("express");
const res = require("express/lib/response");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
var secret_password = process.env.secret_password;

express.urlencoded({
  extended: true,
});

express.json();

class loginController {
  async login(req, res, next) {
    var userid = req.headers.useridlogin;
    var password = req.headers.passwordlogin;
    console.log(req.headers.passwordlogin);
    User.findOne({
      userid: userid,
      password: password,
    })
      .then((data) => {
        var token = jwt.sign(
          {
            useridlogin: data.userid,
          },
          secret_password
        );
        if (data) {
          res.json({
            messenge: "Đăng nhập thành công",
            token: token,
            role: data.role,
          });
        } else {
          res.json("Đăng nhập thất bại");
        }
      })
      .catch((err) => {
        res.status(500).json({ messenge: "Lỗi Server", err: err });
      });
  }
}
module.exports = new loginController();
