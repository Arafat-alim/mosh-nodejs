const express = require("express");
const app = express();

const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
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

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given ID is not found");
  res.send(course);
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

//! Query strings
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query); //jo first rahega wahi display hoga
  res.send(req.params);
});

//PORT
const port = process.env.PORT || 3000;
//PORT listen

app.listen(port, () => console.log(`Listening on port ${port}`));
