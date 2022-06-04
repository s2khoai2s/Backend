const res = require("express/lib/response");
const User = require("../models/User");

class homeController {
  home(req, res) {
    // User.find({}, function (err, users) {
    //     if(!err) res.json(users);
    //     res.status(400)
    //   });
    res.render("home");
  }

  show(req, res) {
    res.send("Home detail");
  }
}
module.exports = new homeController();
