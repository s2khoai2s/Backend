const homeRouter = require("./home");
const loginRouter = require("./login");
const checkrole = require("../app/controllers/helper/CheckRole");
const adminrole = require("./adminrole");
const studentrole = require("./studentrole");

function route(app) {
  // app.use("/admin", checkrole.CheckLogin(["admin"]), adminrole);
  app.use("/admin", adminrole);
  app.use("/student", checkrole.CheckLogin(["student"]), studentrole);
  app.use("/login", loginRouter);
  app.use("/", homeRouter);
}

module.exports = route;
