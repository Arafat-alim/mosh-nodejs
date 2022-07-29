//creating a path module
const path = require("path");

const pathObj = path.parse(__dirname);
console.log(pathObj);

exports = pathObj;
