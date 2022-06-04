var express = require("express");
var router = express.Router();
const loginController = require("../app/controllers/LoginController");

router.use("/", loginController.login);

module.exports = router;
