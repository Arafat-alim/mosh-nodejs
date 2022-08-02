const express = require("express");
const config = require("config");
const app = express();
const Joi = require("joi");
const log = require("./logger");
//third party middleware
const helmet = require("helmet");
const morgan = require("morgan");

// configuration
console.log("Application Name " + config.get("name"));
console.log("Mail Server Name " + config.get("mail.host"));
console.log("Mail Password " + config.get("mail.password"));
//Adding inbuilt Middleware
app.use(express.json());

//THird party middleware
app.use(helmet());

//inbuilt middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//custom middleware
app.use(log);

//knowing our prgram environemnt
console.log(`NODE_ENV ${process.env.NODE_ENV}`);

console.log(`app : ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan is Working");
}
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

//! Methods
// app.post(); //Create
// app.put(); //update
// app.delete(); //delete
app.get("/", (req, res) => {
  res.send("Welcome to my API");
}); //Read

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//! Get all items
app.get("/api/courses/", (req, res) => {
  res.send();
});
//! Params
// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });
//! handling GET request
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given ID is not found");
  res.send(course);
});

//! handling POST Request
app.post("/api/courses", (req, res) => {
  //! Validating  - Wihtout using JOI
  // if (!req.params.name || req.params.name.length < 3) {
  //   res.status(400).send("Please Enter a name which is more than 3 characters");
  //   return;
  // }

  //! Validating - USing JOI
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

//! Query strings
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query); //jo first rahega wahi display hoga
  res.send(req.params);
});

//! Handling Updating the course
app.put("/api/courses/:id", (req, res) => {
  //creating a schema for the input validation
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };
  //Look into the database
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //if not found return status 404
  if (!course) {
    res.status(404).send("The course with given ID is not Found");
    return;
  }
  //validate the input
  // const result = Joi.validate(req.body, schema);
  //Input is invalid return status 400
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) res.status(400).send(error.details[0].message);
  //Update the course
  course.name = req.body.name;
  res.send(course);
});

//! Function for validate
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

//Delete Req
app.delete("/api/courses/:id", (req, res) => {
  //! look up for the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course Id you entered is not Found");
  }
  //Delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //Return the same course
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;
//PORT listen

app.listen(port, () => console.log(`Listening on port ${port}`));
