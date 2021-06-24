var AsyncLock = require('node-async-locks').AsyncLock;
const lock = new AsyncLock();
module.exports = lock;