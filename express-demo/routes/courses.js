const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});
//! Get all items
router.get("/", (req, res) => {
  res.send();
});

//! handling GET request
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given ID is not found");
  res.send(course);
});

//! handling POST Request
router.post("/", (req, res) => {
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

//! Handling Updating the course
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
