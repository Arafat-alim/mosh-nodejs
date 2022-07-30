const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    //send an http request
    console.log(message);
    //! creating an emitter -- raise an event
    this.emit("logger", { id: 1, message: "Hello Miya Ky Haal" });
  }
}

module.exports = Logger;
