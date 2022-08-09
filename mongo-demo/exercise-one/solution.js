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
// lists of aall courses
async function getCourse() {
  return await Course.find({ isPublished: true, tags: "backend" }) //return a promise
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}
run();
