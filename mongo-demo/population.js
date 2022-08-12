const mongoose = require("mongoose");
//create a connection with mongodb
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could Not connect with MongoDB", err));

// create schema of author
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

//create a model
const Authors = mongoose.model("Authors", authorSchema);

//create an author
async function createAuthor(name, bio, website) {
  const author = new Authors({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

//creating a schema for course
const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authors",
  },
});

//creating a model
const Courses = mongoose.model("Courses", courseSchema);

//creating a function to create a coursea
async function createCourse(name, author) {
  const course = new Courses({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}

// createAuthor("Arafat", "I am a good boy", "hhtps://www.arafat.com");
createCourse("NODE JS", "62f641af98934c1018720a89");

//fetch the data from the MongoDB
async function listAuthor() {
  const author = await Authors.find().sort("name").select("name");
  console.log(author);
}

async function listCourse() {
  const course = await Courses.find().sort("name").select("name");
  console.log(course);
}

// listAuthor();
// listCourse();
