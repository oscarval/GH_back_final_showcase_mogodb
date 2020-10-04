const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  quantity: {
    type: Number,
    default: 0,
    required: false,
  },
  price: {
    type: Number,
    default: 0,
    required: false,
  },
  datecreated: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    trim: true,
    default: "no_image.png",
    required: false,
  },
});

ProductSchema.virtual("imgpath").get(function () {
  const product = this;
  return `../assets/img/${product.img}`;
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
