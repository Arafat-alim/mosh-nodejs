const mongoose = require("mongoose");
const express = require("express");
const app = express();
//Adding JOI

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected with MongoDB"))
  .catch((err) => console.error("Could not connected wtih MongoDB", err));

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
//Adding Middleeare
app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rental", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening At Port ${port}`);
});
