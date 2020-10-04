var express = require("express");
var router = express.Router();
const RoutesProtected = require("./routesProtected");
const ProductController = require("../controllers/productController");

router.get("/", RoutesProtected, ProductController.getAll);

router.get("/:id", RoutesProtected, ProductController.getById);

router.get("/search/:query", RoutesProtected, ProductController.getByName);

module.exports = router;
