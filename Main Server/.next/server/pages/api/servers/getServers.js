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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/servers/getServers.js");
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

/***/ "./pages/api/servers/getServers.js":
/*!*****************************************!*\
  !*** ./pages/api/servers/getServers.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handle; });
const hash = __webpack_require__(/*! ../auth/hash */ "./pages/api/auth/hash.js");

const db = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js").default;

async function handle(req, res) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "*");
  let user = hash.decodeJWT(req.query.token); // Not authenticated

  if (user === false) {
    res.status(200).json({
      status: 'error',
      error: 'unauthorized',
      servers: []
    });
    return;
  }

  let servers = await db.any('SELECT server_name, server_ip, server_id FROM server WHERE server_id IN (SELECT server_id FROM user_server WHERE user_id = $1)', [user.userId]);
  res.status(200).json({
    "servers": servers
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2RiLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL2hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL3NlcnZlcnMvZ2V0U2VydmVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZy1wcm9taXNlXCIiXSwibmFtZXMiOlsicGdwIiwicmVxdWlyZSIsInVzZXIiLCJwYXNzd29yZCIsImhvc3QiLCJwb3J0IiwiZGF0YWJhc2UiLCJkYiIsImNyeXB0byIsImp3dFNlY3JldCIsImp3dCIsImdlblJhbmRvbVN0cmluZyIsImxlbmd0aCIsInJhbmRvbUJ5dGVzIiwiTWF0aCIsImNlaWwiLCJ0b1N0cmluZyIsInNsaWNlIiwic2hhNTEyIiwic2FsdCIsImhhc2giLCJjcmVhdGVIbWFjIiwidXBkYXRlIiwidmFsdWUiLCJkaWdlc3QiLCJzaGE1MTJOb1NhbHQiLCJzdHJpbmciLCJkZWNvZGVKV1QiLCJ0b2tlbiIsImlnbm9yZUV4cGlyYXRpb24iLCJkZWNvZGVkIiwidW5kZWZpbmVkIiwidmVyaWZ5IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRTZWNyZXQiLCJnZW5lcmF0ZVJlZnJlc2hUb2tlbiIsImNoYXJhY3RlcnMiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVDb25uZWN0Q29kZSIsImV4cG9ydHMiLCJnZXRIYXNoIiwiZ2V0U2FsdCIsImdldEpXVFNlY3JldCIsImdldEhhc2hXaXRob3V0U2FsdCIsImRlZmF1bHQiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJxdWVyeSIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsInNlcnZlcnMiLCJhbnki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LElBQWhCLENBQXFCO0FBQ2pCRCxZQUFNLEVBQUUsT0FEUztBQUVqQkUsV0FBSyxFQUFFLGNBRlU7QUFHakJDLGFBQU8sRUFBRTtBQUhRLEtBQXJCO0FBS0E7QUFDSDs7QUFDRCxNQUFJQSxPQUFPLEdBQUcsTUFBTXBELEVBQUUsQ0FBQ3FELEdBQUgsQ0FBTyxnSUFBUCxFQUF5SSxDQUFDMUQsSUFBSSxDQUFDMkQsTUFBTixDQUF6SSxDQUFwQjtBQUNBUixLQUFHLENBQUNHLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUNqQixlQUFXRTtBQURNLEdBQXJCO0FBSUgsQzs7Ozs7Ozs7Ozs7QUN0QkQsbUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoicGFnZXMvYXBpL3NlcnZlcnMvZ2V0U2VydmVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvYXBpL3NlcnZlcnMvZ2V0U2VydmVycy5qc1wiKTtcbiIsImNvbnN0IHBncCA9IHJlcXVpcmUoJ3BnLXByb21pc2UnKSgpO1xyXG5cclxuY29uc3QgdXNlciA9IFwicG9zdGdyZXNcIjtcclxuY29uc3QgcGFzc3dvcmQgPSBcImFkbWluXCI7XHJcbmNvbnN0IGhvc3QgPSBcIjEyNy4wLjAuMVwiO1xyXG5jb25zdCBwb3J0ID0gNTQzMjtcclxuY29uc3QgZGF0YWJhc2UgPSBcImRvc2VcIjtcclxuXHJcbmNvbnN0IGRiID0gcGdwKGBwb3N0Z3JlczovLyR7dXNlcn06JHtwYXNzd29yZH1AJHtob3N0fToke3BvcnR9LyR7ZGF0YWJhc2V9YCk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRiOyIsImNvbnN0IGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xyXG5jb25zdCBqd3RTZWNyZXQgPSAnU1VQRVJTRUNSRVRFMjAyMjAnO1xyXG5jb25zdCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0ZXMgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzIGkuZSBzYWx0XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gTGVuZ3RoIG9mIHRoZSByYW5kb20gc3RyaW5nLlxyXG4gKi9cclxudmFyIGdlblJhbmRvbVN0cmluZyA9IGZ1bmN0aW9uKGxlbmd0aCl7XHJcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKE1hdGguY2VpbChsZW5ndGgvMikpXHJcbiAgICAgICAgICAgIC50b1N0cmluZygnaGV4JykgLyoqIGNvbnZlcnQgdG8gaGV4YWRlY2ltYWwgZm9ybWF0ICovXHJcbiAgICAgICAgICAgIC5zbGljZSgwLGxlbmd0aCk7ICAgLyoqIHJldHVybiByZXF1aXJlZCBudW1iZXIgb2YgY2hhcmFjdGVycyAqL1xyXG59XHJcblxyXG4vKipcclxuICogaGFzaCBwYXNzd29yZCB3aXRoIHNoYTUxMi5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIExpc3Qgb2YgcmVxdWlyZWQgZmllbGRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2FsdCAtIERhdGEgdG8gYmUgdmFsaWRhdGVkLlxyXG4gKi9cclxudmFyIHNoYTUxMiA9IGZ1bmN0aW9uKHBhc3N3b3JkLCBzYWx0KXtcclxuICAgIHZhciBoYXNoID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHNhbHQpOyAvKiogSGFzaGluZyBhbGdvcml0aG0gc2hhNTEyICovXHJcbiAgICBoYXNoLnVwZGF0ZShwYXNzd29yZCk7XHJcbiAgICB2YXIgdmFsdWUgPSBoYXNoLmRpZ2VzdCgnaGV4Jyk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYXNoIHBhc3N3b3JkIHdpdGggc2hhNTEyLlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFN0cmluZyB0byBiZSBlbmNyeXB0ZWRcclxuICovXHJcbiB2YXIgc2hhNTEyTm9TYWx0ID0gZnVuY3Rpb24oc3RyaW5nKXtcclxuICAgIHZhciBoYXNoID0gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTUxMicsIHN0cmluZyk7IC8qKiBIYXNoaW5nIGFsZ29yaXRobSBzaGE1MTIgKi9cclxuICAgIHZhciB2YWx1ZSA9IGhhc2guZGlnZXN0KCdoZXgnKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjb2RlSldUKHRva2VuLCBpZ25vcmVFeHBpcmF0aW9uPWZhbHNlKSB7XHJcbiAgICBsZXQgZGVjb2RlZDtcclxuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIGp3dFNlY3JldCwge1xyXG4gICAgICAgICAgICBpZ25vcmVFeHBpcmF0aW9uOiBpZ25vcmVFeHBpcmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciwgdG9rZW4gZ2FtbWFsPyBoYXNoLmpzXCIpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlY29kZWQpIHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWNyZXQoKSB7XHJcbiAgICByZXR1cm4gand0U2VjcmV0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVJlZnJlc2hUb2tlbigpIHtcclxuICAgIGxldCB0b2tlbiAgICAgICAgICAgPSAnJztcclxuICAgIGxldCBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XHJcbiAgICBsZXQgbGVuZ3RoID0gMjAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0b2tlbiArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ29ubmVjdENvZGUobGVuZ3RoPTQpIHtcclxuICAgIGxldCB0b2tlbiAgICAgICAgICAgPSAnJztcclxuICAgIGxldCBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcclxuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgIHRva2VuICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuZXhwb3J0cy5nZXRIYXNoID0gc2hhNTEyO1xyXG5leHBvcnRzLmdldFNhbHQgPSBnZW5SYW5kb21TdHJpbmc7XHJcbmV4cG9ydHMuZGVjb2RlSldUID0gZGVjb2RlSldUO1xyXG5leHBvcnRzLmdldEpXVFNlY3JldCA9IGdldFNlY3JldDtcclxuZXhwb3J0cy5nZW5lcmF0ZVJlZnJlc2hUb2tlbiA9IGdlbmVyYXRlUmVmcmVzaFRva2VuO1xyXG5leHBvcnRzLmdldEhhc2hXaXRob3V0U2FsdCA9IHNoYTUxMk5vU2FsdDtcclxuZXhwb3J0cy5nZW5lcmF0ZUNvbm5lY3RDb2RlID0gZ2VuZXJhdGVDb25uZWN0Q29kZTsiLCJjb25zdCBoYXNoID0gcmVxdWlyZSgnLi4vYXV0aC9oYXNoJyk7XHJcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vLi4vLi4vbGliL2RiJykuZGVmYXVsdDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShyZXEsIHJlcykge1xyXG4gICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgXCIqXCIpO1xyXG4gICAgcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsIFwiKlwiKTtcclxuICAgIGxldCB1c2VyID0gaGFzaC5kZWNvZGVKV1QocmVxLnF1ZXJ5LnRva2VuKTtcclxuXHJcbiAgICAvLyBOb3QgYXV0aGVudGljYXRlZFxyXG4gICAgaWYgKHVzZXIgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdGF0dXM6ICdlcnJvcicsXHJcbiAgICAgICAgICAgIGVycm9yOiAndW5hdXRob3JpemVkJyxcclxuICAgICAgICAgICAgc2VydmVyczogW11cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgc2VydmVycyA9IGF3YWl0IGRiLmFueSgnU0VMRUNUIHNlcnZlcl9uYW1lLCBzZXJ2ZXJfaXAsIHNlcnZlcl9pZCBGUk9NIHNlcnZlciBXSEVSRSBzZXJ2ZXJfaWQgSU4gKFNFTEVDVCBzZXJ2ZXJfaWQgRlJPTSB1c2VyX3NlcnZlciBXSEVSRSB1c2VyX2lkID0gJDEpJywgW3VzZXIudXNlcklkXSk7XHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgXCJzZXJ2ZXJzXCI6IHNlcnZlcnNcclxuICAgIH0pO1xyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGctcHJvbWlzZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9