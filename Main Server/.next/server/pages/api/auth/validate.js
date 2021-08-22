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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/validate.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./pages/api/auth/validate.js":
/*!************************************!*\
  !*** ./pages/api/auth/validate.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handle; });
const hash = __webpack_require__(/*! ../auth/hash */ "./pages/api/auth/hash.js");

async function handle(req, res) {
  let user = hash.decodeJWT(req.body.token);
  let username = ''; // Not authenticated

  if (user !== false) {
    username = user.username;
    console.log(`${username} just validated.`);
  }

  res.status(200).json({
    valid: user !== false,
    username: username
  });
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2F1dGgvaGFzaC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiJdLCJuYW1lcyI6WyJjcnlwdG8iLCJyZXF1aXJlIiwiand0U2VjcmV0Iiwiand0IiwiZ2VuUmFuZG9tU3RyaW5nIiwibGVuZ3RoIiwicmFuZG9tQnl0ZXMiLCJNYXRoIiwiY2VpbCIsInRvU3RyaW5nIiwic2xpY2UiLCJzaGE1MTIiLCJwYXNzd29yZCIsInNhbHQiLCJoYXNoIiwiY3JlYXRlSG1hYyIsInVwZGF0ZSIsInZhbHVlIiwiZGlnZXN0Iiwic2hhNTEyTm9TYWx0Iiwic3RyaW5nIiwiZGVjb2RlSldUIiwidG9rZW4iLCJpZ25vcmVFeHBpcmF0aW9uIiwiZGVjb2RlZCIsInVuZGVmaW5lZCIsInZlcmlmeSIsImUiLCJjb25zb2xlIiwibG9nIiwiZ2V0U2VjcmV0IiwiZ2VuZXJhdGVSZWZyZXNoVG9rZW4iLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc0xlbmd0aCIsImkiLCJjaGFyQXQiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29ubmVjdENvZGUiLCJleHBvcnRzIiwiZ2V0SGFzaCIsImdldFNhbHQiLCJnZXRKV1RTZWNyZXQiLCJnZXRIYXNoV2l0aG91dFNhbHQiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJ1c2VyIiwiYm9keSIsInVzZXJuYW1lIiwic3RhdHVzIiwianNvbiIsInZhbGlkIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FB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QkEsbUJBQTlCLEM7Ozs7Ozs7Ozs7OztBQzNGQTtBQUFBO0FBQUEsTUFBTXhCLElBQUksR0FBR2IsbUJBQU8sQ0FBQyw4Q0FBRCxDQUFwQjs7QUFHZSxlQUFlMkMsTUFBZixDQUFzQkMsR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDO0FBQzNDLE1BQUlDLElBQUksR0FBR2pDLElBQUksQ0FBQ08sU0FBTCxDQUFld0IsR0FBRyxDQUFDRyxJQUFKLENBQVMxQixLQUF4QixDQUFYO0FBQ0EsTUFBSTJCLFFBQVEsR0FBRyxFQUFmLENBRjJDLENBSzNDOztBQUNBLE1BQUlGLElBQUksS0FBSyxLQUFiLEVBQW9CO0FBQ2hCRSxZQUFRLEdBQUdGLElBQUksQ0FBQ0UsUUFBaEI7QUFDQXJCLFdBQU8sQ0FBQ0MsR0FBUixDQUFhLEdBQUVvQixRQUFTLGtCQUF4QjtBQUNIOztBQUNESCxLQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUNqQkMsU0FBSyxFQUFFTCxJQUFJLEtBQUssS0FEQztBQUVqQkUsWUFBUSxFQUFFQTtBQUZPLEdBQXJCO0FBSUg7QUFBQSxDOzs7Ozs7Ozs7OztBQ2pCRCxtQzs7Ozs7Ozs7Ozs7QUNBQSx5QyIsImZpbGUiOiJwYWdlcy9hcGkvYXV0aC92YWxpZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vLi4vLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvYXBpL2F1dGgvdmFsaWRhdGUuanNcIik7XG4iLCJjb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcclxuY29uc3Qgand0U2VjcmV0ID0gJ1NVUEVSU0VDUkVURTIwMjIwJztcclxuY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdGVzIHJhbmRvbSBzdHJpbmcgb2YgY2hhcmFjdGVycyBpLmUgc2FsdFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIExlbmd0aCBvZiB0aGUgcmFuZG9tIHN0cmluZy5cclxuICovXHJcbnZhciBnZW5SYW5kb21TdHJpbmcgPSBmdW5jdGlvbihsZW5ndGgpe1xyXG4gICAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcyhNYXRoLmNlaWwobGVuZ3RoLzIpKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpIC8qKiBjb252ZXJ0IHRvIGhleGFkZWNpbWFsIGZvcm1hdCAqL1xyXG4gICAgICAgICAgICAuc2xpY2UoMCxsZW5ndGgpOyAgIC8qKiByZXR1cm4gcmVxdWlyZWQgbnVtYmVyIG9mIGNoYXJhY3RlcnMgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIGhhc2ggcGFzc3dvcmQgd2l0aCBzaGE1MTIuXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgLSBMaXN0IG9mIHJlcXVpcmVkIGZpZWxkcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHNhbHQgLSBEYXRhIHRvIGJlIHZhbGlkYXRlZC5cclxuICovXHJcbnZhciBzaGE1MTIgPSBmdW5jdGlvbihwYXNzd29yZCwgc2FsdCl7XHJcbiAgICB2YXIgaGFzaCA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGE1MTInLCBzYWx0KTsgLyoqIEhhc2hpbmcgYWxnb3JpdGhtIHNoYTUxMiAqL1xyXG4gICAgaGFzaC51cGRhdGUocGFzc3dvcmQpO1xyXG4gICAgdmFyIHZhbHVlID0gaGFzaC5kaWdlc3QoJ2hleCcpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogaGFzaCBwYXNzd29yZCB3aXRoIHNoYTUxMi5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBTdHJpbmcgdG8gYmUgZW5jcnlwdGVkXHJcbiAqL1xyXG4gdmFyIHNoYTUxMk5vU2FsdCA9IGZ1bmN0aW9uKHN0cmluZyl7XHJcbiAgICB2YXIgaGFzaCA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGE1MTInLCBzdHJpbmcpOyAvKiogSGFzaGluZyBhbGdvcml0aG0gc2hhNTEyICovXHJcbiAgICB2YXIgdmFsdWUgPSBoYXNoLmRpZ2VzdCgnaGV4Jyk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlY29kZUpXVCh0b2tlbiwgaWdub3JlRXhwaXJhdGlvbj1mYWxzZSkge1xyXG4gICAgbGV0IGRlY29kZWQ7XHJcbiAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCB8fCB0b2tlbiA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBqd3RTZWNyZXQsIHtcclxuICAgICAgICAgICAgaWdub3JlRXhwaXJhdGlvbjogaWdub3JlRXhwaXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IsIHRva2VuIGdhbW1hbD8gaGFzaC5qc1wiKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWNvZGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VjcmV0KCkge1xyXG4gICAgcmV0dXJuIGp3dFNlY3JldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVSZWZyZXNoVG9rZW4oKSB7XHJcbiAgICBsZXQgdG9rZW4gICAgICAgICAgID0gJyc7XHJcbiAgICBsZXQgY2hhcmFjdGVycyAgICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICBsZXQgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xyXG4gICAgbGV0IGxlbmd0aCA9IDIwMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdG9rZW4gKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRva2VuO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbm5lY3RDb2RlKGxlbmd0aD00KSB7XHJcbiAgICBsZXQgdG9rZW4gICAgICAgICAgID0gJyc7XHJcbiAgICBsZXQgY2hhcmFjdGVycyAgICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XHJcbiAgICBsZXQgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyApIHtcclxuICAgICAgICB0b2tlbiArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbmV4cG9ydHMuZ2V0SGFzaCA9IHNoYTUxMjtcclxuZXhwb3J0cy5nZXRTYWx0ID0gZ2VuUmFuZG9tU3RyaW5nO1xyXG5leHBvcnRzLmRlY29kZUpXVCA9IGRlY29kZUpXVDtcclxuZXhwb3J0cy5nZXRKV1RTZWNyZXQgPSBnZXRTZWNyZXQ7XHJcbmV4cG9ydHMuZ2VuZXJhdGVSZWZyZXNoVG9rZW4gPSBnZW5lcmF0ZVJlZnJlc2hUb2tlbjtcclxuZXhwb3J0cy5nZXRIYXNoV2l0aG91dFNhbHQgPSBzaGE1MTJOb1NhbHQ7XHJcbmV4cG9ydHMuZ2VuZXJhdGVDb25uZWN0Q29kZSA9IGdlbmVyYXRlQ29ubmVjdENvZGU7IiwiY29uc3QgaGFzaCA9IHJlcXVpcmUoJy4uL2F1dGgvaGFzaCcpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShyZXEsIHJlcykge1xyXG4gICAgbGV0IHVzZXIgPSBoYXNoLmRlY29kZUpXVChyZXEuYm9keS50b2tlbik7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAnJztcclxuXHJcblxyXG4gICAgLy8gTm90IGF1dGhlbnRpY2F0ZWRcclxuICAgIGlmICh1c2VyICE9PSBmYWxzZSkge1xyXG4gICAgICAgIHVzZXJuYW1lID0gdXNlci51c2VybmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt1c2VybmFtZX0ganVzdCB2YWxpZGF0ZWQuYCk7XHJcbiAgICB9XHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgdmFsaWQ6IHVzZXIgIT09IGZhbHNlLFxyXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=