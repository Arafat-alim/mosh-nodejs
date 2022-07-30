const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to the home page");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4]));
    res.end();
  }
});

//emitter
server.listen(8000);

console.log("Port listening 8000 . . .");
