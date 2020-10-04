var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Routes
var usersRouter = require("./routes/users");

// Moongose
require("./config/mongoose");

// Express
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Routes
app.use("/users", usersRouter);

module.exports = app;
