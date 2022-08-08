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

async function createCourse() {
  //creating an object
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  //saving out docuemnt in database
  const result = await course.save();
  console.log(result); // it shows us a unique Indentifier
}

//Querying Documents
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    // .find({author: "Mosh", isPublished: true})
    // .find({price: 10}) //price = 10
    // .find({price: {$gte: 10, $lte: 20}}) // greater and equal to 10 and less than or equal to 20
    //.find({ price: { $in: [10, 15, 20] } }) // price equals to 10, 20 , 30
    .find()
    // .or([{ author: "Mosh" }, { isPublished: true }])
    // .and([{ author: "Arafat" }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // +1 indicated ascending order, -1 inditcate descending order
    .select({ name: 1, tags: 1 }) //showing the properties
    .count();
  console.log(courses);
}

// createCourse();
getCourses();

//! RegEx
// async function getCourses() {
//   const courses = await Course.find({ author: /^Mosh/i }) //starts with, case insensitive
//     .find({ author: /Mosh$/i }) // ends with, case insensitive
//     .find({ author: /.*Mosh.*/i }) // contain mosh
//     .find({ author: /.*Mosh.*/i }); // contain mosh,
//   console.log(courses);
// }
