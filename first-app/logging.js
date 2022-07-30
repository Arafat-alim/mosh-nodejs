const EmitterEvent = require("events");
//! create an instance of a class, instance named = logger

const event = new EmitterEvent();

//! Registering a listener
event.on("logging", (arg) => {
  console.log(arg);
});

//! creating an emitter
event.emit("logging", { message: "Hello Buddies" }); //{ message: 'Hello Buddies' }
