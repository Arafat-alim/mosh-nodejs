const mongoose = require("mongoose");
//! mongoose gives an object
// ! playground is my database name - it return a promise
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database cannot be connected.", err));
