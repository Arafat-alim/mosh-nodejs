//! All codes are wrapped into a IIFE, this is a way a node module executed first

// (function (exports, module, require, __dirname, __filename) {
var url = "http://www.arafat-alim/log";

function log(message) {
  console.log(message); //Arafat
}

console.log(__dirname); //E:\ARAFAT\Learning\Grinding\NodeJS\mosh-nodejs\first-app
console.log(__filename); // E:\ARAFAT\Learning\Grinding\NodeJS\mosh-nodejs\first-app\logger.js
// export import facilities
module.exports = log;
// module.exports.endPoints = url;
// });
