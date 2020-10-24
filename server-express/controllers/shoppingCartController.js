const ShoppingCart = require("../models/shoppingCart");
const Utils = require("../utils");

const ShoppingCartController = {
  async getAllProductsCart(req, res) {
    const userid = req.decoded._id;
    const cart = await ShoppingCart.findOne({ userid: userid });
    res.send(Utils.responseOK(cart));
  },
  async updateCart(req, res) {
    try {
      const userid = req.decoded._id;
      let cart = await ShoppingCart.findOneAndUpdate(
        { userid: userid },
        req.body,
        {
          new: true,
        }
      );
      if (!cart) {
        const cartNew = await ShoppingCart.create(req.body);
        cart = cartNew;
        if (!cartNew) {
          res.status(500).send(Utils.responseKO());
        }
      }
      res.send(Utils.responseOK(cart));
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO());
    }
  },
};

module.exports = ShoppingCartController;
