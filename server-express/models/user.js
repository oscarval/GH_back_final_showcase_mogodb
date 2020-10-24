const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Credentials = require("../config/credentials");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "name",
      required: false,
    },
    lastname: {
      type: String,
      trim: true,
      default: "last_name",
      required: false,
    },
    phone: {
      type: Number,
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
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.tokens;
        return ret;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 9);
  next();
});

UserSchema.methods.validatePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, Credentials.key, {
    expiresIn: "24h",
  });

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
