const os = require("os");

const freespace = os.freemem();
const totalMem = os.totalmem();
const version = os.version();

console.log(freespace);
console.log(totalMem);
console.log(version);

exports = freespace; //6580178944
exports = totalMem; //12843954176
exports = version; //Windows 10 Pro
