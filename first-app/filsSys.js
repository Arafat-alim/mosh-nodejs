const fs = require("fs");

const files = fs.readdirSync("./"); //! synchronous

//! Asynchronous
const synFiles = fs.readdir("$", function (err, files) {
  if (err) console.log("Error", err);
  else console.log(files);
});

console.log(files);
exports = files;
exports = synFiles;
