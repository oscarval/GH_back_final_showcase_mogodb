const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/db-showcase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Connection to mongodb sucessfull"))
  .catch(console.error.bind(console, "connection error:"));

module.exports = mongoose;
