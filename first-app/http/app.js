const http = require("http");

//! server is the EventEmitter
const server = http.createServer();
server.on("connection", (socket) => {
  console.log("Hurrah I am created successfully");
});

server.listen(3100);
console.log("Listening on port 3000 ....");

//! Ouput
// Listening on port 3000 ....
// Hurrah I am created successfully
