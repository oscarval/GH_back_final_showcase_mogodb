var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

// Routes
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var shoppingCartRouter = require("./routes/shoppingCart");

// Moongose
require("./config/mongoose");

// Express
var app = express();
// enabled cors
app.use(cors())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Routes
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", shoppingCartRouter);

module.exports = app;
