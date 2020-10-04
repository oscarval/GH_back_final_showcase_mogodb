var express = require("express");
var router = express.Router();
const User = require("../models/user/user");

router.get("/login", function (req, res, next) {
  res.send("login");
});

module.exports = router;
