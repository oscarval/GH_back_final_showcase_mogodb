const User = require("../models/user");
const Utils = require("../utils");

const UserController = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(Utils.responseOK(user, "Register successful"));
    } catch (error) {
      console.error(error);
      res.send(Utils.responseKO(error.message));
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user || (user && !user.validatePassword(req.body.password))) {
        res.send(Utils.responseKO("Email or Password incorrect"));
        return;
      }
      const token = await user.generateAuthToken();
      const resp = Utils.responseOK(user);
      res.send({ ...resp, token: token });
    } catch (error) {
      console.error(error);
      res.send(Utils.responseKO(error.message));
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
      res.send(Utils.responseKO());
    }
  },
  async logout(req, res) {
    try {
      const userid = req.decoded._id;
      const user = await User.findById(userid);
      if (!user) {
        res.status(204);
        res.send(Utils.responseKO(null, `Doc no exists by id: ${userid}`));
      }
      await user.removeAuthToken();
      const resp = Utils.responseOK(true);
      res.send(resp);
    } catch (error) {
      console.error(error);
      res.send(Utils.responseKO());
    }
  },
};

module.exports = UserController;
