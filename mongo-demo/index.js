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
  const courses = await Course.find()
    .limit(10)
    .sort({ name: 1 }) // +1 indicated ascending order, -1 inditcate descending order
    .select({ name: 1, tags: 1 }); //showing the properties
  console.log(courses);
}

// createCourse();
getCourses();
