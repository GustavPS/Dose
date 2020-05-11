const crypto = require('crypto');
const jwtSecret = 'SUPERSECRETE20220';
const jwt = require('jsonwebtoken');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value;
}

function decodeJWT(token) {
    let decoded;
    if (token === undefined || token === null) {
        return false;
    }

    try {
        decoded = jwt.verify(token, jwtSecret);
    } catch (e) {
        console.log("error, token gammal? hash.js")
    }

    if (decoded) {
        return decoded;
    } else {
        return false;
    }
}

function getSecret() {
    return jwtSecret;
}

exports.getHash = sha512;
exports.getSalt = genRandomString;
exports.decodeJWT = decodeJWT;
exports.getJWTSecret = getSecret;