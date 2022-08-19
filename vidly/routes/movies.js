const express = require("express");
const router = express.Router();
const { Genres } = require("../models/genre");

//import Movies Class and validate function from model folder
const { Movies, validate } = require("../models/movie");

//! FInd all the movies
router.get("/", async (req, res) => {
  const movies = await Movies.find().sort("name");
  res.send(movies);
});

//! Find movies by it ID
router.get("/:id", async (req, res) => {
  const movie = await Movies.findById({ _id: req.params.id });
  if (!movie)
    return res.status(400).status("The Movie with the given ID was not found.");

  res.send(movie);
});

//! Create a movie
router.post("/", async (req, res) => {
  //! Validate input - body
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  //}
process is going on!
  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre.");
  console.log(genre);
  let movie = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalsRate: req.body.dailyRentalsRate,
  });

  movie = await movie.save();
  res.send(movie);
});

//! Update a movie by its ID
router.put("/:id", async (req, res) => {
  //! Validate the input
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalsRate: req.body.dailyRentalsRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");

  res.send(movie);
});

//! Delete a movie by its ID
router.delete("/id", async (req, res) => {
  const movie = await Movies.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("The Movie ID was not found");
  }
  res.send(movie);
});

module.exports = router;
