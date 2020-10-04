const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user_name",
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [String],
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "secretJsonwebtokens");

  return this.update({
    $push: {
      tokens: token,
    },
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
