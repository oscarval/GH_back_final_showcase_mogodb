const mongoose = require("mongoose");
const ProductSchema = require("./product").ProductSchema;

const ShoppingCartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  products: {
    type: [ProductSchema],
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
});

ShoppingCartSchema.virtual("total").get(function () {
  const cart = this;
  const total = cart.products.reduce(
    (product, total) => (total += product.price),
    0
  );
  return total;
});

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);

module.exports = ShoppingCart;
