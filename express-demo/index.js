const express = require("express");
const app = express();

//! Methods
// app.post(); //Create
// app.put(); //update
// app.delete(); //delete
app.get("/", (req, res) => {
  res.send("Welcome to my API");
}); //Read

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});
//! Get all items
app.get("/api/courses/", (req, res) => {
  res.send();
});
//! Params
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});

//! Query strings
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;
//PORT listen

app.listen(port, () => console.log(`Listening on port ${port}`));
