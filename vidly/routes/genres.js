const express = require("express");
const router = express.Router();
const Joi = require("joi");
//Adding dummy database
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "action" },
];

//get all genres
router.get("/", (req, res) => {
  res.send(genres);
});

//find particular genres
router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

//create a new genres
router.post("/", (req, res) => {
  //! creating schema
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = Joi.validate(req.body, schema);
  const { error } = validateGenres(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = { id: genres.length + 1, name: req.body.name };

  genres.push(genre);
  res.send(genres);
});

//! Updating Request PUT
router.put("/:id", (req, res) => {
  // look up the id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The Particular Genre Not Found");
  }
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  // input validate
  //   const result = Joi.validate(req.body, schema);
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update
  genre.name = req.body.name;
  res.send(genres);
});

//! Deteling Request
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The Particular Genre is not Found");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

// ! Validate function
function validateGenres(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
