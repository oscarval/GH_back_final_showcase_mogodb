var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Routes
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

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
app.use("/products", productsRouter);

module.exports = app;
