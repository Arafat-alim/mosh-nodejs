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

//Create a home ENd point
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening At ${port}`));
