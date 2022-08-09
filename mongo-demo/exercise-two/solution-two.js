const mongoose = require("mongoose");
//connection with database
mongoose
  .connect("mongodb://localhost/mongo-ex-two")
  .then(() => console.log("Database connected to Mongodb"))
  .catch((err) => console.error("Could not connect with Database", err));

//create a schema
const courseSchema = new mongoose.Schema({
  name: String,
  tags: [Array],
  date: { type: Date, default: Date.now },
  author: String,
  isPublished: Boolean,
  price: Number,
});

//create a collection using model --> class
const Course = mongoose.model("Course", courseSchema);
async function getCourse() {
  const course = new Course({
    name: "Java",
    tags: ["sde", "developer"],
    author: "Arafat",
    isPublished: true,
    price: 40,
  });

  //saving a document
  const result = await course.save();
  console.log(result);
}

getCourse();
