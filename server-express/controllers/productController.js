const Product = require("../models/product");
const Utils = require("../utils");

const ProductController = {
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(204);
        res.send(
          Utils.responseKO(null, `Product no exists by id: ${req.paramas.id}`)
        );
      }
      const resp = Utils.responseOK(product);
      res.send(resp);
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO());
    }
  },
  async getByName(req, res) {
    try {
      const product = await Product.find({
        name: { $regex: req.params.query, $options: "i" },
      });
      if (!product) {
        res.status(204);
        res.send(
          Utils.responseKO(null, `No exists products to: ${req.params.query}`)
        );
      }
      const resp = Utils.responseOK(product);
      res.send(resp);
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO());
    }
  },
  async getAll(req, res) {
    try {
      const product = await Product.find({});
      if (!product) {
        res.status(204);
        res.send(
          Utils.responseKO(null, `No exists products to: ${req.params.query}`)
        );
      }
      const resp = Utils.responseOK(product);
      res.send(resp);
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO());
    }
  },
};

module.exports = ProductController;
