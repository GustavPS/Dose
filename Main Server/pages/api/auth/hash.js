const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { serverRuntimeConfig } = require('next/config').default();

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

/**
 * hash password with sha512.
 * @function
 * @param {string} string - String to be encrypted
 */
 var sha512NoSalt = function(string){
    var hash = crypto.createHmac('sha512', string); /** Hashing algorithm sha512 */
    var value = hash.digest('hex');
    return value;
}

function decodeJWT(token, ignoreExpiration=false) {
    let decoded;
    if (token === undefined || token === null) {
        return false;
    }

    try {
        decoded = jwt.verify(token, getSecret(), {
            ignoreExpiration: ignoreExpiration
        });
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
    return serverRuntimeConfig.secret;
}

function generateRefreshToken() {
    let token           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let length = 200;
    for (let i = 0; i < length; i++ ) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
}

function generateConnectCode(length=4) {
    let token           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return token;
}

exports.getHash = sha512;
exports.getSalt = genRandomString;
exports.decodeJWT = decodeJWT;
exports.getJWTSecret = getSecret;
exports.generateRefreshToken = generateRefreshToken;
exports.getHashWithoutSalt = sha512NoSalt;
exports.generateConnectCode = generateConnectCode;