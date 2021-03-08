const jwt = require('jsonwebtoken');

function validateUser(token) {
    let decoded;
    if (token === undefined || token === null) {
        return false;
    }

    try {
        decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (e) {
        return false;
    }

}

module.exports = validateUser;