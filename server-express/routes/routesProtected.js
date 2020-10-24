const Credentials = require("../config/credentials");
const jwt = require("jsonwebtoken");
const Utils = require("../utils");

var express = require("express");
const RoutesProtected = express.Router();

RoutesProtected.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, Credentials.key, (err, decoded) => {
      if (err) {
        return res.json(Utils.responseKOToken("invalid token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send(Utils.responseKOToken("Token no exists"));
  }
});

module.exports = RoutesProtected;
