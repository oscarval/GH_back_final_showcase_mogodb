const User = require("../models/user/user");
const Utils = require("../utils");

const UserController = {
  async register(req, res) {
    try {
      await User.create(req.body);
      res.send(Utils.responseOK(null, "Register successful"));
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO(error.message));
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.params.email,
        password: req.params.password,
      });
      if (!user) {
        res.send(Utils.responseOK(false, "Email or Password incorrect"));
        return;
      }
      const token = await user.generateAuthToken();
      const resp = Utils.responseOK(true);
      res.send({ resp, token: null });
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO("Error to login"));
    }
  },
  async getById(req, res) {
    try {
      const user = User.findById(req.params.id);
      if (!user) {
        res.status(204);
        res.send(
          Utils.responseKO(null, `Doc no exists by id: ${req.paramas.id}`)
        );
      }
      const resp = Utils.responseOK(user);
      res.send({ resp });
    } catch (error) {
      console.error(error);
      res.status(500).send(Utils.responseKO("Error to login"));
    }
  },
};

module.exports = UserController;
