const express = require("express");
const router = express.Router();
//importing model and validate function
const { Customers, validate } = require("../models/customer");

//get all customer
router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  res.send(customers);
});
//get single customer
router.get("/:id", async (req, res) => {
  const customer = await Customers.find({ _id: req.params.id });
  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }
  res.send(customer);
});
//create a customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});
//update  customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send("The Particular Customer Not Found");
  }

  res.send(customer);
});
//delete customer
router.delete("/:id", async (req, res) => {
  const customer = await Customers.findByIdAndRemove({ _id: req.params.id });
  if (!customer) return res.status(404).send("Particular Customer not found");
  res.send(customer);
});

module.exports = router;
