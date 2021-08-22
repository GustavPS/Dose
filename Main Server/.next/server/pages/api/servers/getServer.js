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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/servers/getServer.js");
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

/***/ "./pages/api/servers/getServer.js":
/*!****************************************!*\
  !*** ./pages/api/servers/getServer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handle; });
const hash = __webpack_require__(/*! ../auth/hash */ "./pages/api/auth/hash.js");

const db = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js").default;

async function handle(req, res) {
  let server = await db.any('SELECT server_name, server_ip, server_id FROM server WHERE server_id = $1', [req.body.id]);

  if (server.length === 0) {
    res.status(200).json({
      status: 'error',
      error: 'server_no_exist',
      server: {}
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    server: server[0]
  });
}

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

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2RiLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL3NlcnZlcnMvZ2V0U2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBnLXByb21pc2VcIiJdLCJuYW1lcyI6WyJwZ3AiLCJyZXF1aXJlIiwidXNlciIsInBhc3N3b3JkIiwiaG9zdCIsInBvcnQiLCJkYXRhYmFzZSIsImRiIiwiY3J5cHRvIiwiand0U2VjcmV0Iiwiand0IiwiZ2VuUmFuZG9tU3RyaW5nIiwibGVuZ3RoIiwicmFuZG9tQnl0ZXMiLCJNYXRoIiwiY2VpbCIsInRvU3RyaW5nIiwic2xpY2UiLCJzaGE1MTIiLCJzYWx0IiwiaGFzaCIsImNyZWF0ZUhtYWMiLCJ1cGRhdGUiLCJ2YWx1ZSIsImRpZ2VzdCIsInNoYTUxMk5vU2FsdCIsInN0cmluZyIsImRlY29kZUpXVCIsInRva2VuIiwiaWdub3JlRXhwaXJhdGlvbiIsImRlY29kZWQiLCJ1bmRlZmluZWQiLCJ2ZXJpZnkiLCJlIiwiY29uc29sZSIsImxvZyIsImdldFNlY3JldCIsImdlbmVyYXRlUmVmcmVzaFRva2VuIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNMZW5ndGgiLCJpIiwiY2hhckF0IiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZUNvbm5lY3RDb2RlIiwiZXhwb3J0cyIsImdldEhhc2giLCJnZXRTYWx0IiwiZ2V0SldUU2VjcmV0IiwiZ2V0SGFzaFdpdGhvdXRTYWx0IiwiZGVmYXVsdCIsImhhbmRsZSIsInJlcSIsInJlcyIsInNlcnZlciIsImFueSIsImJvZHkiLCJpZCIsInN0YXR1cyIsImpzb24iLCJlcnJvciJdLCJtYXBwaW5n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QXJCO0FBS0E7QUFDSDs7QUFFREQsS0FBRyxDQUFDSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFDakJELFVBQU0sRUFBRSxTQURTO0FBRWpCSixVQUFNLEVBQUVBLE1BQU0sQ0FBQyxDQUFEO0FBRkcsR0FBckI7QUFLSCxDOzs7Ozs7Ozs7OztBQ25CRCxtQzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx1QyIsImZpbGUiOiJwYWdlcy9hcGkvc2VydmVycy9nZXRTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2FwaS9zZXJ2ZXJzL2dldFNlcnZlci5qc1wiKTtcbiIsImNvbnN0IHBncCA9IHJlcXVpcmUoJ3BnLXByb21pc2UnKSgpO1xyXG5cclxuY29uc3QgdXNlciA9IFwicG9zdGdyZXNcIjtcclxuY29uc3QgcGFzc3dvcmQgPSBcImFkbWluXCI7XHJcbmNvbnN0IGhvc3QgPSBcIjEyNy4wLjAuMVwiO1xyXG5jb25zdCBwb3J0ID0gNTQzMjtcclxuY29uc3QgZGF0YWJhc2UgPSBcImRvc2VcIjtcclxuXHJcbmNvbnN0IGRiID0gcGdwKGBwb3N0Z3JlczovLyR7dXNlcn06JHtwYXNzd29yZH1AJHtob3N0fToke3BvcnR9LyR7ZGF0YWJhc2V9YCk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRiOyIsImNvbnN0IGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xyXG5jb25zdCBqd3RTZWNyZXQgPSAnU1VQRVJTRUNSRVRFMjAyMjAnO1xyXG5jb25zdCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzIGkuZSBzYWx0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gTGVuZ3RoIG9mIHRoZSByYW5kb20gc3RyaW5nLlxyXG4gKi9cclxudmFyIGdlblJhbmRvbVN0cmluZyA9IGZ1bmN0aW9uKGxlbmd0aCl7XHJcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKE1hdGguY2VpbChsZW5ndGgvMikpXHJcbiAgICAgICAgICAgIC50b1N0cmluZygnaGV4JykgLyoqIGNvbnZlcnQgdG8gaGV4YWRlY2ltYWwgZm9ybWF0ICovXHJcbiAgICAgICAgICAgIC5zbGljZSgwLGxlbmd0aCk7ICAgLyoqIHJldHVybiByZXF1aXJlZCBudW1iZXIgb2YgY2hhcmFjdGVycyAqL1xyXG59XHJcblxyXG4vKipcclxuICogaGFzaCBwYXNzd29yZCB3aXRoIHNoYTUxMi5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIExpc3Qgb2YgcmVxdWlyZWQgZmllbGRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2FsdCAtIERhdGEgdG8gYmUgdmFsaWRhdGVkLlxyXG4gKi9cclxudmFyIHNoYTUxMiA9IGZ1bmN0aW9uKHBhc3N3b3JkLCBzYWx0KXtcclxuICAgIHZhciBoYXNoID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHNhbHQpOyAvKiogSGFzaGluZyBhbGdvcml0aG0gc2hhNTEyICovXHJcbiAgICBoYXNoLnVwZGF0ZShwYXNzd29yZCk7XHJcbiAgICB2YXIgdmFsdWUgPSBoYXNoLmRpZ2VzdCgnaGV4Jyk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYXNoIHBhc3N3b3JkIHdpdGggc2hhNTEyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFN0cmluZyB0byBiZSBlbmNyeXB0ZWRcclxuICovXHJcbiB2YXIgc2hhNTEyTm9TYWx0ID0gZnVuY3Rpb24oc3RyaW5nKXtcclxuICAgIHZhciBoYXNoID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHN0cmluZyk7IC8qKiBIYXNoaW5nIGFsZ29yaXRobSBzaGE1MTIgKi9cclxuICAgIHZhciB2YWx1ZSA9IGhhc2guZGlnZXN0KCdoZXgnKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjb2RlSldUKHRva2VuLCBpZ25vcmVFeHBpcmF0aW9uPWZhbHNlKSB7XHJcbiAgICBsZXQgZGVjb2RlZDtcclxuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIGp3dFNlY3JldCwge1xyXG4gICAgICAgICAgICBpZ25vcmVFeHBpcmF0aW9uOiBpZ25vcmVFeHBpcmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciwgdG9rZW4gZ2FtbWFsPyBoYXNoLmpzXCIpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlY29kZWQpIHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWNyZXQoKSB7XHJcbiAgICByZXR1cm4gand0U2VjcmV0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVJlZnJlc2hUb2tlbigpIHtcclxuICAgIGxldCB0b2tlbiAgICAgICAgICAgPSAnJztcclxuICAgIGxldCBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XHJcbiAgICBsZXQgbGVuZ3RoID0gMjAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0b2tlbiArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ29ubmVjdENvZGUobGVuZ3RoPTQpIHtcclxuICAgIGxldCB0b2tlbiAgICAgICAgICAgPSAnJztcclxuICAgIGxldCBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcclxuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRva2VuICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuZXhwb3J0cy5nZXRIYXNoID0gc2hhNTEyO1xyXG5leHBvcnRzLmdldFNhbHQgPSBnZW5SYW5kb21TdHJpbmc7XHJcbmV4cG9ydHMuZGVjb2RlSldUID0gZGVjb2RlSldUO1xyXG5leHBvcnRzLmdldEpXVFNlY3JldCA9IGdldFNlY3JldDtcclxuZXhwb3J0cy5nZW5lcmF0ZVJlZnJlc2hUb2tlbiA9IGdlbmVyYXRlUmVmcmVzaFRva2VuO1xyXG5leHBvcnRzLmdldEhhc2hXaXRob3V0U2FsdCA9IHNoYTUxMk5vU2FsdDtcclxuZXhwb3J0cy5nZW5lcmF0ZUNvbm5lY3RDb2RlID0gZ2VuZXJhdGVDb25uZWN0Q29kZTsiLCJjb25zdCBoYXNoID0gcmVxdWlyZSgnLi4vYXV0aC9oYXNoJyk7XHJcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vLi4vLi4vbGliL2RiJykuZGVmYXVsdDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShyZXEsIHJlcykge1xyXG4gICAgbGV0IHNlcnZlciA9IGF3YWl0IGRiLmFueSgnU0VMRUNUIHNlcnZlcl9uYW1lLCBzZXJ2ZXJfaXAsIHNlcnZlcl9pZCBGUk9NIHNlcnZlciBXSEVSRSBzZXJ2ZXJfaWQgPSAkMScsIFtyZXEuYm9keS5pZF0pO1xyXG4gICAgaWYgKHNlcnZlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJyxcclxuICAgICAgICAgICAgZXJyb3I6ICdzZXJ2ZXJfbm9fZXhpc3QnLFxyXG4gICAgICAgICAgICBzZXJ2ZXI6IHt9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcclxuICAgICAgICBzZXJ2ZXI6IHNlcnZlclswXVxyXG4gICAgfSk7XHJcblxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZy1wcm9taXNlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=