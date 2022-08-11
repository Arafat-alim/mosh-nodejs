//define a schema
const mongoose = require("mongoose");
const Joi = require("joi");

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
// ! Validate function
function validateGenres(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports.Genres = Genres;
module.exports.validate = validateGenres;
