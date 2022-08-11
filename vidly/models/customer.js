const joi = require("joi");
const mongoose = require("mongoose");

//creating schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

//create a model
const Customers = mongoose.model("Customer", customerSchema);

//! validate function
function validateCustomer(customer) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    phone: joi.string().min(5).max(50).required(),
    isGold: joi.boolean(),
  };
  return joi.validate(customer, schema);
}

module.exports.Customers = Customers;
module.exports.validate = validateCustomer;
