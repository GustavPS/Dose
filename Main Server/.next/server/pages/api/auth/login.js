module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const pgp = __webpack_require__(/*! pg-promise */ "pg-promise")();

const user = "postgres";
const password = "admin";
const host = "127.0.0.1";
const port = 5432;
const database = "dose";
const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);
/* harmony default export */ __webpack_exports__["default"] = (db);

/***/ }),

/***/ "./pages/api/auth/hash.js":
/*!********************************!*\
  !*** ./pages/api/auth/hash.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const crypto = __webpack_require__(/*! crypto */ "crypto");

const jwtSecret = 'SUPERSECRETE20220';

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */


var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex')
  /** convert to hexadecimal format */
  .slice(0, length);
  /** return required number of characters */
};
/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */


var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  /** Hashing algorithm sha512 */

  hash.update(password);
  var value = hash.digest('hex');
  return value;
};
/**
 * hash password with sha512.
 * @function
 * @param {string} string - String to be encrypted
 */


var sha512NoSalt = function (string) {
  var hash = crypto.createHmac('sha512', string);
  /** Hashing algorithm sha512 */

  var value = hash.digest('hex');
  return value;
};

function decodeJWT(token, ignoreExpiration = false) {
  let decoded;

  if (token === undefined || token === null) {
    return false;
  }

  try {
    decoded = jwt.verify(token, jwtSecret, {
      ignoreExpiration: ignoreExpiration
    });
  } catch (e) {
    console.log("error, token gammal? hash.js");
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

function generateRefreshToken() {
  let token = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  let length = 200;

  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
}

function generateConnectCode(length = 4) {
  let token = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
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

/***/ }),

/***/ "./pages/api/auth/login.js":
/*!*********************************!*\
  !*** ./pages/api/auth/login.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handle; });
/* harmony import */ var next_dist_next_server_lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/next-server/lib/utils */ "next/dist/next-server/lib/utils");
/* harmony import */ var next_dist_next_server_lib_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_lib_utils__WEBPACK_IMPORTED_MODULE_0__);


const db = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js").default;

const hash = __webpack_require__(/*! ./hash */ "./pages/api/auth/hash.js");

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

async function handle(req, res) {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  let username = req.body.username;
  let password = req.body.password;

  try {
    let user = await db.any('SELECT password, salt FROM users WHERE username = $1', [username]);

    if (user.length === 0) {
      res.status(200).json({
        status: 'error',
        message: 'Wrong username/password'
      });
      return;
    }

    user = user[0];
    let salt = user.salt;
    let hashed = hash.getHash(password, salt);
    user = await db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [username, hashed]);

    if (user.length === 0) {
      res.status(200).json({
        status: 'error',
        message: 'Wrong username/password'
      });
      return;
    }

    user = user[0];
    const expiresIn = parseInt(process.env.ACCESS_TOKEN_VALID_TIME);
    const token = jwt.sign({
      userId: user.id,
      email: user.email,
      username: user.username
    }, hash.getJWTSecret(), {
      expiresIn: expiresIn
    });
    const validTo = Math.round(Date.now() / 1000 + expiresIn);
    const refreshToken = hash.generateRefreshToken();
    const encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);
    const encryptedAccessToken = hash.getHashWithoutSalt(token);
    db.none('INSERT into user_access_token (user_id, access_token, refresh_token) VALUES($1, $2, $3)', [user.id, encryptedAccessToken, encryptedRefreshToken]).then(() => {
      res.status(200).json({
        status: 'success',
        message: 'success',
        token: token,
        refreshToken: refreshToken,
        validTo: validTo
      });
    });
  } catch (e) {
    console.error(e);
    res.status(200).json({
      status: 'error',
      message: 'Database error'
    });
  }
}
;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "next/dist/next-server/lib/utils":
/*!**************************************************!*\
  !*** external "next/dist/next-server/lib/utils" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2RiLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2F1dGgvbG9naW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlsc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBnLXByb21pc2VcIiJdLCJuYW1lcyI6WyJwZ3AiLCJyZXF1aXJlIiwidXNlciIsInBhc3N3b3JkIiwiaG9zdCIsInBvcnQiLCJkYXRhYmFzZSIsImRiIiwiY3J5cHRvIiwiand0U2VjcmV0Iiwiand0IiwiZ2VuUmFuZG9tU3RyaW5nIiwibGVuZ3RoIiwicmFuZG9tQnl0ZXMiLCJNYXRoIiwiY2VpbCIsInRvU3RyaW5nIiwic2xpY2UiLCJzaGE1MTIiLCJzYWx0IiwiaGFzaCIsImNyZWF0ZUhtYWMiLCJ1cGRhdGUiLCJ2YWx1ZSIsImRpZ2VzdCIsInNoYTUxMk5vU2FsdCIsInN0cmluZyIsImRlY29kZUpXVCIsInRva2VuIiwiaWdub3JlRXhwaXJhdGlvbiIsImRlY29kZWQiLCJ1bmRlZmluZWQiLCJ2ZXJpZnkiLCJlIiwiY29uc29sZSIsImxvZyIsImdldFNlY3JldCIsImdlbmVyYXRlUmVmcmVzaFRva2VuIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNMZW5ndGgiLCJpIiwiY2hhckF0IiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZUNvbm5lY3RDb2RlIiwiZXhwb3J0cyIsImdldEhhc2giLCJnZXRTYWx0IiwiZ2V0SldUU2VjcmV0IiwiZ2V0SGFzaFdpdGhvdXRTYWx0IiwiZGVmYXVsdCIsImhhbmRsZSIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImVuZCIsInVzZXJuYW1lIiwiYm9keSIsImFueSIsImpzb24iLCJtZXNzYWdlIiwiaGFzaGVkIiwiZXhwaXJlc0luIiwicGFyc2VJbnQiLCJwcm9jZXNzIiwiZW52IiwiQUNDRVNTX1RPS0VOX1ZBTElEX1RJTUUiLCJzaWduIiwidXNlcklkIiwiaWQiLCJlbWFpbCIsInZhbGlkVG8iLCJyb3VuZCIsIkRhdGUiLCJub3ciLCJyZWZyZXNoVG9rZW4iLCJlbmNyeXB0ZWRSZWZyZXNoVG9rZW4iLCJlbmNyeXB0ZWRBY2Nlc3NUb2tlbiIsIm5vbmUiLCJ0aGVuIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RkE7QUFBQSxNQUFNQSxHQUFHLEdBQUdDLG1CQUFPLENBQUMsOEJBQUQsQ0FBUCxFQUFaOztBQUVBLE1BQU1DLElBQUksR0FBRyxVQUFiO0FBQ0Es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akJKLGVBQU8sRUFBRUE7QUFMUSxPQUFyQjtBQU9ILEtBUkQ7QUFTSCxHQWxERCxDQWtERSxPQUFPdkMsQ0FBUCxFQUFVO0FBQ1JDLFdBQU8sQ0FBQytDLEtBQVIsQ0FBY2hELENBQWQ7QUFDQW9CLE9BQUcsQ0FBQ0UsTUFBSixDQUFXLEdBQVgsRUFBZ0JLLElBQWhCLENBQXFCO0FBQ2pCTCxZQUFNLEVBQUUsT0FEUztBQUVqQk0sYUFBTyxFQUFFO0FBRlEsS0FBckI7QUFJSDtBQUNKO0FBQUEsQzs7Ozs7Ozs7Ozs7QUN4RUQsbUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoicGFnZXMvYXBpL2F1dGgvbG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2FwaS9hdXRoL2xvZ2luLmpzXCIpO1xuIiwiY29uc3QgcGdwID0gcmVxdWlyZSgncGctcHJvbWlzZScpKCk7XHJcblxyXG5jb25zdCB1c2VyID0gXCJwb3N0Z3Jlc1wiO1xyXG5jb25zdCBwYXNzd29yZCA9IFwiYWRtaW5cIjtcclxuY29uc3QgaG9zdCA9IFwiMTI3LjAuMC4xXCI7XHJcbmNvbnN0IHBvcnQgPSA1NDMyO1xyXG5jb25zdCBkYXRhYmFzZSA9IFwiZG9zZVwiO1xyXG5cclxuY29uc3QgZGIgPSBwZ3AoYHBvc3RncmVzOi8vJHt1c2VyfToke3Bhc3N3b3JkfUAke2hvc3R9OiR7cG9ydH0vJHtkYXRhYmFzZX1gKTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGI7IiwiY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XHJcbmNvbnN0IGp3dFNlY3JldCA9ICdTVVBFUlNFQ1JFVEUyMDIyMCc7XHJcbmNvbnN0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRlcyByYW5kb20gc3RyaW5nIG9mIGNoYXJhY3RlcnMgaS5lIHNhbHRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBMZW5ndGggb2YgdGhlIHJhbmRvbSBzdHJpbmcuXHJcbiAqL1xyXG52YXIgZ2VuUmFuZG9tU3RyaW5nID0gZnVuY3Rpb24obGVuZ3RoKXtcclxuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoTWF0aC5jZWlsKGxlbmd0aC8yKSlcclxuICAgICAgICAgICAgLnRvU3RyaW5nKCdoZXgnKSAvKiogY29udmVydCB0byBoZXhhZGVjaW1hbCBmb3JtYXQgKi9cclxuICAgICAgICAgICAgLnNsaWNlKDAsbGVuZ3RoKTsgICAvKiogcmV0dXJuIHJlcXVpcmVkIG51bWJlciBvZiBjaGFyYWN0ZXJzICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYXNoIHBhc3N3b3JkIHdpdGggc2hhNTEyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gTGlzdCBvZiByZXF1aXJlZCBmaWVsZHMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzYWx0IC0gRGF0YSB0byBiZSB2YWxpZGF0ZWQuXHJcbiAqL1xyXG52YXIgc2hhNTEyID0gZnVuY3Rpb24ocGFzc3dvcmQsIHNhbHQpe1xyXG4gICAgdmFyIGhhc2ggPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhNTEyJywgc2FsdCk7IC8qKiBIYXNoaW5nIGFsZ29yaXRobSBzaGE1MTIgKi9cclxuICAgIGhhc2gudXBkYXRlKHBhc3N3b3JkKTtcclxuICAgIHZhciB2YWx1ZSA9IGhhc2guZGlnZXN0KCdoZXgnKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhc2ggcGFzc3dvcmQgd2l0aCBzaGE1MTIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gU3RyaW5nIHRvIGJlIGVuY3J5cHRlZFxyXG4gKi9cclxuIHZhciBzaGE1MTJOb1NhbHQgPSBmdW5jdGlvbihzdHJpbmcpe1xyXG4gICAgdmFyIGhhc2ggPSBjcnlwdG8uY3JlYXRlSG1hYygnc2hhNTEyJywgc3RyaW5nKTsgLyoqIEhhc2hpbmcgYWxnb3JpdGhtIHNoYTUxMiAqL1xyXG4gICAgdmFyIHZhbHVlID0gaGFzaC5kaWdlc3QoJ2hleCcpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWNvZGVKV1QodG9rZW4sIGlnbm9yZUV4cGlyYXRpb249ZmFsc2UpIHtcclxuICAgIGxldCBkZWNvZGVkO1xyXG4gICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQgfHwgdG9rZW4gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgand0U2VjcmV0LCB7XHJcbiAgICAgICAgICAgIGlnbm9yZUV4cGlyYXRpb246IGlnbm9yZUV4cGlyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yLCB0b2tlbiBnYW1tYWw/IGhhc2guanNcIilcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVjb2RlZCkge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlY3JldCgpIHtcclxuICAgIHJldHVybiBqd3RTZWNyZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlUmVmcmVzaFRva2VuKCkge1xyXG4gICAgbGV0IHRva2VuICAgICAgICAgICA9ICcnO1xyXG4gICAgbGV0IGNoYXJhY3RlcnMgICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgbGV0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuICAgIGxldCBsZW5ndGggPSAyMDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRva2VuICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVDb25uZWN0Q29kZShsZW5ndGg9NCkge1xyXG4gICAgbGV0IHRva2VuICAgICAgICAgICA9ICcnO1xyXG4gICAgbGV0IGNoYXJhY3RlcnMgICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xyXG4gICAgbGV0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdG9rZW4gKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRva2VuO1xyXG59XHJcblxyXG5leHBvcnRzLmdldEhhc2ggPSBzaGE1MTI7XHJcbmV4cG9ydHMuZ2V0U2FsdCA9IGdlblJhbmRvbVN0cmluZztcclxuZXhwb3J0cy5kZWNvZGVKV1QgPSBkZWNvZGVKV1Q7XHJcbmV4cG9ydHMuZ2V0SldUU2VjcmV0ID0gZ2V0U2VjcmV0O1xyXG5leHBvcnRzLmdlbmVyYXRlUmVmcmVzaFRva2VuID0gZ2VuZXJhdGVSZWZyZXNoVG9rZW47XHJcbmV4cG9ydHMuZ2V0SGFzaFdpdGhvdXRTYWx0ID0gc2hhNTEyTm9TYWx0O1xyXG5leHBvcnRzLmdlbmVyYXRlQ29ubmVjdENvZGUgPSBnZW5lcmF0ZUNvbm5lY3RDb2RlOyIsImltcG9ydCB7IGdldExvY2F0aW9uT3JpZ2luIH0gZnJvbSAnbmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscyc7XHJcblxyXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpYi9kYicpLmRlZmF1bHQ7XHJcbmNvbnN0IGhhc2ggPSByZXF1aXJlKCcuL2hhc2gnKTtcclxuY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUocmVxLCByZXMpIHtcclxuICAgIGlmIChyZXEubWV0aG9kICE9PSAnUE9TVCcpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2VybmFtZSA9IHJlcS5ib2R5LnVzZXJuYW1lO1xyXG4gICAgbGV0IHBhc3N3b3JkID0gcmVxLmJvZHkucGFzc3dvcmQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IGRiLmFueSgnU0VMRUNUIHBhc3N3b3JkLCBzYWx0IEZST00gdXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAkMScsIFt1c2VybmFtZV0pO1xyXG4gICAgICAgIGlmICh1c2VyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnV3JvbmcgdXNlcm5hbWUvcGFzc3dvcmQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVzZXIgPSB1c2VyWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzYWx0ID0gdXNlci5zYWx0O1xyXG4gICAgICAgIGxldCBoYXNoZWQgPSBoYXNoLmdldEhhc2gocGFzc3dvcmQsIHNhbHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHVzZXIgPSBhd2FpdCBkYi5hbnkoJ1NFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgdXNlcm5hbWUgPSAkMSBBTkQgcGFzc3dvcmQgPSAkMicsIFt1c2VybmFtZSwgaGFzaGVkXSk7XHJcbiAgICAgICAgaWYgKHVzZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdXcm9uZyB1c2VybmFtZS9wYXNzd29yZCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXNlciA9IHVzZXJbMF07XHJcbiAgICAgICAgY29uc3QgZXhwaXJlc0luID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuQUNDRVNTX1RPS0VOX1ZBTElEX1RJTUUpO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFzaC5nZXRKV1RTZWNyZXQoKSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXhwaXJlc0luOiBleHBpcmVzSW4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB2YWxpZFRvID0gTWF0aC5yb3VuZCgoRGF0ZS5ub3coKSAvIDEwMDApICsgZXhwaXJlc0luKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuICAgICAgICAgID0gaGFzaC5nZW5lcmF0ZVJlZnJlc2hUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFJlZnJlc2hUb2tlbiA9IGhhc2guZ2V0SGFzaFdpdGhvdXRTYWx0KHJlZnJlc2hUb2tlbik7XHJcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkQWNjZXNzVG9rZW4gID0gaGFzaC5nZXRIYXNoV2l0aG91dFNhbHQodG9rZW4pO1xyXG5cclxuICAgICAgICBkYi5ub25lKCdJTlNFUlQgaW50byB1c2VyX2FjY2Vzc190b2tlbiAodXNlcl9pZCwgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuKSBWQUxVRVMoJDEsICQyLCAkMyknLFt1c2VyLmlkLCBlbmNyeXB0ZWRBY2Nlc3NUb2tlbiwgZW5jcnlwdGVkUmVmcmVzaFRva2VuXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW4sXHJcbiAgICAgICAgICAgICAgICB2YWxpZFRvOiB2YWxpZFRvXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdGF0dXM6ICdlcnJvcicsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEYXRhYmFzZSBlcnJvcidcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZy1wcm9taXNlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=