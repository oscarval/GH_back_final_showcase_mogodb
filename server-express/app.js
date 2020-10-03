var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Moongose
var mongoose = require("./config/mongoose");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

// Express
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Routes
app.use("/users", usersRouter);

module.exports = app;
