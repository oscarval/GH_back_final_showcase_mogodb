var express = require("express");
var router = express.Router();
const RoutesProtected = require("./routesProtected");
const UserController = require("../controllers/userController");

router.post("/login", UserController.login);

router.post("/logout", RoutesProtected, UserController.logout);

router.post("/register", UserController.register);

router.get("/:id", RoutesProtected, UserController.getById);

module.exports = router;
