const User = require("../models/user");
const Utils = require("../utils");
const bcrypt = require("bcryptjs");

const UserController = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(Utils.responseOK(user, "Register successful"));
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO(error.message));
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user || (user && !user.validatePassword(req.body.password))) {
        res.send(Utils.responseOK(false, "Email or Password incorrect"));
      }
      const token = await user.generateAuthToken();
      const resp = Utils.responseOK(true);
      res.send({ ...resp, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO("Error to login"));
    }
  },
  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(204);
        res.send(
          Utils.responseKO(null, `Doc no exists by id: ${req.paramas.id}`)
        );
      }
      const resp = Utils.responseOK(user);
      res.send(resp);
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO());
    }
  },
};

module.exports = UserController;
