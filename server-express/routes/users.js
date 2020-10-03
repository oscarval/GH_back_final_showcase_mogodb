var express = require("express");
var router = express.Router();
const User = require("../models/user/user");

router.get("/login", function (req, res, next) {
  const user = User.findOne({ email: "req.email", password: req.password });
  // TODO: Control errors
  res.send({ prueba: user });
});

router.get("/register", function (req, res, next) {
  const user = new User({
    name: req.name,
    email: req.email,
    password: req.password,
  });

  user
    .save()
    .then(async () => {
      await user.generateAuthToken();
      await user.save();
      res.send({ prueba: "saved" });
    })
    .catch((error) => {
      res.send({ prueba: error });
    });
});

module.exports = router;
