const mongoose = require("mongoose");
const joi = require("joi");

//! Create a movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  numberInStock: {
    type: Number,
    default: 0,
  },
  dailyRentalsRate: {
    type: Number,
    default: 0,
  },
});

//! Create a model
const Movies = mongoose.model("Movies", movieSchema);

//! valiidate Movies
function validateMovies(movies) {
  const schema = {
    title: joi.string().min(5).max(50).required(),
    genre: joi.string().required(),
    numberInStock: joi.number().default(0),
    dailyRentalsRate: joi.number().default(0),
  };
  return joi.validate(movies, schema);
}

module.exports.validate = validateMovies;
module.exports.Movies = Movies;
