const mongoose = require("mongoose");

//! database connection
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Database is connected with MONGODB"))
  .catch((err) => console.error(err));

//! create an authorSchema
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
//! creating a model
const Authors = mongoose.model("Authors", authorSchema);

//! create an author
async function createAuthor(name, bio, website) {
  const author = new Authors({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

//! create a course schema
const courseSchema = new mongoose.Schema({
  name: String,
  //   author: {
  //     type: authorSchema,
  //     required: true,
  //   },
  authors: [authorSchema],
});

//! create a model
const Courses = mongoose.model("Courses", courseSchema);

//! function to create a courses
async function createCourse(name, author) {
  const course = new Courses({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse("NodeJs", new Authors({ name: "Arafat" }));
/*
//! Create Multiple Author added as a sub document
async function arraySubDoc(name, authors) {
  const course = new Courses({
    name,
    authors,
  });
  const result = await course.save();
  console.log(result.lean());
}

arraySubDoc("ReactJS", [
  new Courses({ name: "Arafat" }),
  new Courses({ name: "Ahemed" }),
  new Courses({ name: "Javed Ali" }),
]);
*/

//! Add sub document
async function addAuthor(courseId, author) {
  const course = await Courses.findById(courseId);
  course.authors.push(author);
  course.save();
}

// addAuthor("62f6776640ca6a32844019d2", new Authors({ name: "Rocky" }));

//! remove sub document
async function removeAuthor(courseId, authorId) {
  const course = await Courses.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor("62f6776640ca6a32844019d2", "62f677ed757afc396c9e8e2c");

//! update the sub document
/*
async function updateSubDoc(courseId) {
  const course = await Courses.findById(courseId);
  course.author.name = "Aquib Javed";
  const result = await course.save();
  console.log(result);
} */
/*
async function updateSubDoc(courseId) {
  const course = await Courses.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "john Smith",
      },
    }
  );
}
updateSubDoc("62f653831776020820f65f94");
*/
/*
async function deleteSubDoc(courseId) {
  const course = await Courses.update(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}
deleteSubDoc("62f653831776020820f65f94");
*/
//! geting the author
async function getAuthor() {
  const author = await Authors.find().select("name").lean();
  console.log(author);
}

//! getting the course
async function getCourse() {
  const course = await Courses.find().select("name");
  console.log(course);
}
