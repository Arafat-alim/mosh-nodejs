const express = require("express");
const app = express();

//Adding Middleeare
app.use(express.json());
//Adding dummy database
const genres = [
  { id: 1, name: "Horror" },
  { id: 1, name: "Comedy" },
  { id: 1, name: "action" },
];

//get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//find particular genres
app.get("/api/genres/:id", (req, res) => {
  //look into the database
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genres) res.status(404).send("No Genre Found");
  res.send(genre);
});

//create a new genres
app.post("/api/genres", (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening At ${port}`));
