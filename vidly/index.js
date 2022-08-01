const express = require("express");
const app = express();
//Adding JOI
const Joi = require("joi");
const { validate } = require("joi/lib/types/object");

//Adding Middleeare
app.use(express.json());
//Adding dummy database
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "action" },
];

//get all genres
app.get("/api/genres/", (req, res) => {
  res.send(genres);
});

//find particular genres
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genres) res.status(404).send("No Genre Found");
  res.send(genre);
});

//create a new genres
app.post("/api/genres/", (req, res) => {
  //! creating schema
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const genre = { id: genres.length + 1, name: req.body.name };

  genres.push(genre);
  res.send(genres);
});

//! Updating Request PUT
app.put("/api/genres/:id", (req, res) => {
  // look up the id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The Particular Genre Not Found");
  }
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // inout validate
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  // update
  genre.name = req.body.name;
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening At ${port}`));
