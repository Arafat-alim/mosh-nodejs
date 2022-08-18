const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Rentals, validate } = require("../models/rental");
const { Movies } = require("../models/movie");
const { Customers } = require("../models/customer");
const Fawn = require("fawn");

Fawn.init(mongoose);
//!Create a get request
router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-date");
  res.send(rentals);
});
//! Find rental by using ID
router.get("/:id", async (req, res) => {
  const rental = await Rentals.findById({ _id: req.params.id });
  if (!rental) return res.status(400).status("Rental ID was not Found");
  res.send(rental);
});
//! Create a rentals
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).res(error.details[0].message);

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in Stock");

  let rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  //   await rental.save();
  //   movie.numberInStock--;
  //   movie.save();
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      // .remove()
      .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something Failed", ex);
  }
});
//! update a rentals
// router.put("", async (req, res) => {});
//! Delete a rentals
// router.delete("", async (req, res) => {});

module.exports = router;
