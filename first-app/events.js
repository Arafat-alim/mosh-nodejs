const EventEmitter = require("events");
//! Here EventEmitter  is a class, so we have to create an instance of a class
const event = new EventEmitter();

//! Registering a listener
event.on("eventName", function () {
  console.log("Listener is listening");
});

//! creating an emitter
event.emit("eventName");
