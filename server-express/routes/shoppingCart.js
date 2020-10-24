var express = require("express");
var router = express.Router();
const RoutesProtected = require("./routesProtected");
const ShoppingCartController = require("../controllers/shoppingCartController");

router.get("/", RoutesProtected, ShoppingCartController.getAllProductsCart);

router.put("/update", RoutesProtected, ShoppingCartController.updateCart);

module.exports = router;
