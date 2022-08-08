const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Database could not connected", err));

//creating a schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//creting a model
const Course = mongoose.model("Course", courseSchema);
//creating an object
const course = new Course({
  name: "Node.js Course",
  author: "Arafat",
  tags: ["node", "backend"],
  isPublished: true,
});
