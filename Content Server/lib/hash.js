const crypto = require('crypto');
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

const decodeJWT = (token, ignoreExpiration=false, secret=process.env.SECRET) => {
    return new Promise((resolve, reject) => {
        if (token === undefined || token === null) {
            reject(false);
        } else {
            jwt.verify(token, secret, {
                ignoreExpiration: ignoreExpiration
            }, (err, decoded) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(decoded);
                }
            });
        }
    });
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

exports.getHash = sha512;
exports.getSalt = genRandomString;
exports.decodeJWT = decodeJWT;
exports.generateRefreshToken = generateRefreshToken;
exports.getHashWithoutSalt = sha512NoSalt;