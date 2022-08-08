const { mongo } = require("mongoose");
const mongoose = require("mongoose");

//connection
mongoose
  .connect("mongodb://localhost/mongo-exercise")
  .then(() => console.log("Connected to MongoDB Exercise Database"))
  .catch((err) => console.log("COuld not connect with the database", err));

//create schema
const courseSchema = new mongoose.Schema({
  name: String,
  tags: [Array],
  author: String,
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

//create a collection
const Course = mongoose.model("Course", courseSchema); // returning a class

async function getCourse() {
  //creating a course
  const course = new Course({
    name: "VueJS",
    tags: ["vuejs", "frontend"],
    author: "Arafat",
    isPublished: true,
    price: 30,
  });
  const result = await course.save(); //return a promise
  console.log(result);
}

// getCourse();

//! function to fetch the data from the database
// get all course
async function getCourse() {
  const courses = await Course.find() //return a promise
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}

getCourse();
