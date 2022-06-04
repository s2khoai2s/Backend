const homeRouter = require("./home");
const loginRouter = require("./login");
const adminroute = require("./admin_route/admin_route");
var express = require("express");
var router = express.Router();

router.use("/qlsv", adminroute);
router.use("/login", loginRouter);
router.use("/", homeRouter);

module.exports = router;
