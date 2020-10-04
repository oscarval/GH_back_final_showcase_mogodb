const Credentials = require("../config/credentials");
const jwt = require("jsonwebtoken");

var express = require("express");
const RoutesProtected = express.Router();

RoutesProtected.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, Credentials.key, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no exists.",
    });
  }
});

module.exports = RoutesProtected;
