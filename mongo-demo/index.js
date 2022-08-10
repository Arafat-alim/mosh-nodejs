const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Database could not connected", err));

//creating a schema
const courseSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlenght: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "gamepad"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have atleast one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
  },
});
//creting a model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //creating an object
  const course = new Course({
    name: "Moral Science",
    author: "Fahad",
    tags: [],
    isPublished: true,
    category: "web",
    price: 15,
  });

  try {
    //saving out docuemnt in database
    const result = await course.save();
    console.log(result); // it shows us a unique Indentifier
    // await course.validate();
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();

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
// getCourses();

//! RegEx
// async function getCourses() {
//   const courses = await Course.find({ author: /^Mosh/i }) //starts with, case insensitive
//     .find({ author: /Mosh$/i }) // ends with, case insensitive
//     .find({ author: /.*Mosh.*/i }) // contain mosh
//     .find({ author: /.*Mosh.*/i }); // contain mosh,
//   console.log(courses);
// }

//! updating --> query first
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);
}

// updateCourse("62f2d012c55f0433dc7a990f");

//! updating the document using direct query
async function updateCourse2(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );
  console.log(result); //here no need to save explicit
}
// updateCourse2("62f2d012c55f0433dc7a990f");

async function updateCourse3(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Rehmat",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

// updateCourse3("62f2d012c55f0433dc7a990f");

//! Delete a single document
async function removeCourse1(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// removeCourse1("62f2d012c55f0433dc7a990f");

//! Delete multiple document
async function removeCourse2(id) {
  const result = await Course.deleteMany({ _id: id });
  console.log(result);
}

// removeCourse2("62f2d012c55f0433dc7a990f");

//! delete a document using findByIdAndRemove()
async function removeCourse3(id) {
  // const course = await Course.findByIdAndRemove({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse3("62f2d012c55f0433dc7a990f");
