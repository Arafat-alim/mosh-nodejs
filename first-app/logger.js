var url = "http://www.arafat-alim/log";

function log(message) {
  console.log(message);
}
// export import facilities
module.exports.log = log;
module.exports.endPoints = url;
