const express = require("express");
const app = express();
//Adding Middleware
app.use(express.json());

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

//PORT
const port = process.env.PORT || 3000;
//PORT listen

app.listen(port, () => console.log(`Listening on port ${port}`));
