const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Credentials = require("../../config/credentials");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: "user_name",
    required: false,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    trim: true,
    default: "user",
    enum: ["admin", "user", "sudo"],
  },
  tokens: [String],
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, Credentials.key);

  this.update({
    $push: {
      tokens: token,
    },
  });

  return token;
};

UserSchema.methods.removeAuthToken = function (token) {
  const user = this;
  this.update({
    $pull: {
      tokens: token,
    },
  });

  return true;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
