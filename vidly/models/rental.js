const mongoose = require("mongoose");
const joi = require("joi");
const date = require("joi/lib/types/date");

//! creating a schema
// const rentalSchema = new mongoose.Schema({});

//! Create a model
const Rentals = mongoose.model(
  "Rentals",
  new mongoose.Schema({
    customer: {
      type: new mongoose.schema({
        name: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: Number,
          required: true,
          minlength: 10,
          maxlength: 15,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.schema({
        title: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
          trim: true,
        },
        dailyRentals: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    dateReturned: {
      type: Date,
    },
    rentalFees: {
      type: Number,
      min: 0,
    },
  })
);

//! validate function
function validateSchema(rentals) {
  const schema = {
    customerId: joi.string().require(),
    movieId: joi.string().require(),
  };

  return joi.validate(rentals, schema);
}

module.exports.validate = validateSchema;
module.exports.Rentals = Rentals;
