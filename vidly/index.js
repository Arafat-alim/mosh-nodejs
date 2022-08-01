const express = require("express");
const app = express();

//Adding Middleeare
app.use(express.json());

//Create a home ENd point
app.get("/api/genres", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening At ${port}`));
