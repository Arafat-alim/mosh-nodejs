const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

//define a schema
const genreSchema = new mongoose.Schema({
  // id: Number, //! because id will provide by the mongoose and mongoDB
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

//creating a model
const Genres = mongoose.model("Genres", genreSchema);

//creating an object
/*
async function createGenres() {
  const genre = new Genres({
    name: "Horror",
  });
  const result = await genre.save();
  console.log(result);
}
createGenres();
*/
//Adding dummy data
/*
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "action" },
];
*/

//get all genres
router.get("/", async (req, res) => {
  const genres = await Genres.find().sort("name");
  res.send(genres);
});

//find particular genres
router.get("/:id", async (req, res) => {
  const genre = await Genres.find({ _id: req.params.id });
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

//create a new genres
router.post("/", async (req, res) => {
  //! creating schema
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = Joi.validate(req.body, schema);
  const { error } = validateGenres(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // const genre = { id: genres.length + 1, name: req.body.name };
  let genre = new Genres({
    name: req.body.name,
  });
  genre = await genre.save();
  // genres.push(genre);
  res.send(genre);
});

//! Updating Request PUT
router.put("/:id", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //update first approach
  const genre = await Genres.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
  // look up the id
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The Particular Genre Not Found");
  }
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  // input validate
  //   const result = Joi.validate(req.body, schema);

  // update
  // genre.name = req.body.name;
  res.send(genre);
});

//! Deteling Request
router.delete("/:id", async (req, res) => {
  //! Update first approach
  const genre = await Genres.findByIdAndRemove({ _id: req.params.id });
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The Particular Genre is not Found");
  //! Array delete approach
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  res.send(genre);
});

// ! Validate function
function validateGenres(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
