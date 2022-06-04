const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { decode } = require("jsonwebtoken");
const User = require("../../models/User");
var secret_password = process.env.secret_password;

class CheckRole {
  CheckLogin = (permission) => {
    return (req, res, next) => {
      if (req.headers.token === null) {
        res.json("Bạn chưa đăng nhập");
      } 
      else {
        jwt.verify(token, secret_password, function (err, decode) {
          if (!err) {
            User.findOne({
              userid: decode.useridlogin,
            }).then((data) => {
              if (data) {
                if (!permission.includes(data.role)) {
                  res.status(400).json("Lỗi : không được phép truy cập");
                } else {
                  next();
                }
              } else {
                res.json("Tài khoản hoặc mật khẩu sai");
              }
            });
          } 
          else {
            res.json("Mã token không đúng");
          }
        });
      }
    };
  };
}

module.exports = new CheckRole();
