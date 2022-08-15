const mongoose = require("mongoose");
const joi = require("joi");
const { genreSchema } = require("./genre");

//! Create a movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },

  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalsRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

//! Create a model
const Movies = mongoose.model("Movies", movieSchema);

//! valiidate Movies
function validateMovies(movies) {
  const schema = {
    title: joi.string().min(5).max(50).required(),
    genreId: joi.string().required(),
    numberInStock: joi.number().default(0),
    dailyRentalsRate: joi.number().default(0),
  };
  return joi.validate(movies, schema);
}

module.exports.validate = validateMovies;
module.exports.Movies = Movies;
