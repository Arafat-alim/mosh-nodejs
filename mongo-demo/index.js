const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Database could not connected", err));
