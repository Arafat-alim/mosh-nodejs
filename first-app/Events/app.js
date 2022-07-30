//! custom class
const Logger = require("./logger");
const event = new Logger();

//! register a listener
event.on("logger", (arg) => {
  console.log("Listener is listening", arg);
});

event.log("Rahul");
