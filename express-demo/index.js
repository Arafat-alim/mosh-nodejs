//! adding debugger
// const startupDebugger = require("debug")("app:startup");
// const debDebugger = require("debug")("app:db");
const debug = require("debug")("app:startup");

const express = require("express");
const config = require("config");
const app = express();
const Joi = require("joi");
const log = require("./middleware/logger");
//third party middleware
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");

//template engine
app.set("view engine", "pug");
app.set("views", "./views"); // default -- optional

// configuration
console.log("Application Name " + config.get("name"));
console.log("Mail Server Name " + config.get("mail.host"));
// console.log("Mail Password " + config.get("mail.password"));
//Adding inbuilt Middleware
app.use(express.json());

//THird party middleware
app.use(helmet());

//inbuilt middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//custom middleware
app.use(log);

//
app.use("/api/courses/", courses);
app.use("/", home);

//knowing our prgram environemnt
console.log(`NODE_ENV ${process.env.NODE_ENV}`);
console.log(`app : ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //console.log("Morgan is Working"); //instead of using console.log()
  // startupDebugger("Morgan is running");
  debug("Morgan is Runnning");
}
//! Database work
// debDebugger("Database is connected with ...");

//! Methods
// app.post(); //Create
// app.put(); //update
// app.delete(); //delete

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello World" });
});
/*
app.get("/", (req, res) => {
  res.send("Welcome to my API");
}); //Read */

//! Params Strings -- for practising purposes
// router.get("/api/courses/:year/:month", (req, res) => {
//   res.send(req.params);
// });
// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

//! Query strings -- for practising purposes
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query); //jo first rahega wahi display hoga
  res.send(req.params);
});

//PORT
const port = process.env.PORT || 3000;
//PORT listen

app.listen(port, () => console.log(`Listening on port ${port}`));
