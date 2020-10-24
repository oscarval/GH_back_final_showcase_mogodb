const mongoose = require("mongoose");
const Product = require("../models/product").Product;
const products = require("./init-products.js");
mongoose
  .connect("mongodb://localhost:27018/db-showcase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection to mongodb sucessfull");
    insertProducts();
  })
  .catch(console.error.bind(console, "connection error:"));

const insertProducts = async () => {
  await mongoose.connection.db.dropCollection("products");
  for (let product of products) {
    Product.create(product);
  }
};

module.exports = mongoose;
