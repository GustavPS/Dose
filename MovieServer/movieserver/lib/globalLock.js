var AsyncLock = require('async-lock');

const lock = new AsyncLock();
module.exports = lock;