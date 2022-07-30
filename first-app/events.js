const EventEmitter = require("events");
//! Here EventEmitter  is a class, so we have to create an instance of a class
const emitter = new EventEmitter();

//! Registering a listener
emitter.on("eventName", (arg) => {
  console.log("Listener is listening", arg);
});

//! creating an emitter
emitter.emit("eventName", { id: 1, url: "http://" });
