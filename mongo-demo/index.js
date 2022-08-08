const mongoose = require("mongoose");
//! mongoose gives an object
// ! playground is my database name - it return a promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database cannot be connected.", err));
