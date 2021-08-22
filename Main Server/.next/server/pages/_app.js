module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.AppInitialProps = _utils.AppInitialProps;
exports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn(`Warning: the \`Container\` in \`_app\` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated`);
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error(`Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated`);
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DoseApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/global.css */ "./styles/global.css");
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookies */ "cookies");
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(cookies__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/pages/_app.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






function DoseApp({
  Component,
  pageProps
}) {
  return __jsx(Component, _extends({}, pageProps, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 12
    }
  }));
}

DoseApp.getInitialProps = async appContext => {
  const cookies = new cookies__WEBPACK_IMPORTED_MODULE_5___default.a(appContext.ctx.req, appContext.ctx.res); // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await next_app__WEBPACK_IMPORTED_MODULE_4___default.a.getInitialProps(appContext); // Allowed pages without auth

  const noAuthPages = ['/login', '/_error'];

  for (const noAuthPage of noAuthPages) {
    if (appContext.ctx.pathname == noAuthPage) {
      return _objectSpread({}, appProps);
    }
  } // Only runs server side


  if (appContext.ctx.res) {
    if (!tokenExist(appContext.ctx.req.cookies)) {
      console.log("No token saved");
      return redirectToLogin(appContext.ctx.res);
    }

    let accessToken = appContext.ctx.req.cookies.token;
    let refreshToken = appContext.ctx.req.cookies.refreshToken;
    let validTo = appContext.ctx.req.cookies.validTo;
    const currentTime = Date.now() / 1000;
    const accessTokenValid = validTo - currentTime >= 60;
    console.log("Access token valid: " + accessTokenValid);

    if (accessTokenValid) {
      return _objectSpread({}, appProps);
    } // If access token has expired or is about to expire


    const req = await fetch(`http://localhost:${process.env.SERVER_PORT}${process.env.SERVER_SUB_FOLDER}/api/auth/refreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: accessToken,
        refreshToken: refreshToken
      })
    });
    const newTokenInfo = await req.json();

    if (newTokenInfo.status === 'success') {
      console.log(newTokenInfo);
      saveTokenInfo(cookies, newTokenInfo.token, newTokenInfo.refreshToken, newTokenInfo.validTo);
      console.log("Refreshed token");
      return _objectSpread({}, appProps);
    } else {
      clearTokenInfo(cookies);
      console.log("Couldn't get new token");
      return redirectToLogin(appContext.ctx.res);
    }
  } else {
    console.log("klient");
    return _objectSpread({}, appProps);
  }
};

function tokenExist(cookies) {
  let accessToken = cookies.token;
  let refreshToken = cookies.refreshToken;
  let validTo = cookies.validTo;
  return accessToken != null && accessToken != undefined && refreshToken != null && refreshToken != undefined && validTo != null && validTo != undefined;
}

function redirectToLogin(res) {
  res.writeHead(302, {
    Location: `${process.env.SERVER_SUB_FOLDER}/login`
  });
  res.end();
  return {};
}

function saveTokenInfo(cookies, accessToken, refreshToken, validTo) {
  cookies.set('token', accessToken, {
    httpOnly: false
  });
  cookies.set('refreshToken', refreshToken, {
    httpOnly: false
  });
  cookies.set('validTo', validTo, {
    httpOnly: false
  });
}

function clearTokenInfo(cookies) {
  cookies.set('token', null);
  cookies.set('refreshToken', null);
  cookies.set('validTo', null);
}

/***/ }),

/***/ "./styles/global.css":
/*!***************************!*\
  !*** ./styles/global.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "cookies":
/*!**************************!*\
  !*** external "cookies" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookies");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovLy8uL3BhZ2VzL19hcHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiJdLCJuYW1lcyI6WyJwYWdlUHJvcHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZENhdGNoIiwicmVuZGVyIiwiX19OX1NTRyIsInVybCIsImNyZWF0ZVVybCIsIkFwcCIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJ3YXJuQ29udGFpbmVyIiwiY29uc29sZSIsIndhcm5VcmwiLCJwIiwiYmFjayIsInJvdXRlciIsInB1c2giLCJwdXNoVG8iLCJwdXNoUm91dGUiLCJhcyIsInB1c2hVcmwiLCJyZXBsYWNlIiwicmVwbGFjZVRvIiwicmVwbGFjZVJvdXRlIiwicmVwbGFjZVVybCIsIkRvc2VBcHAiLCJhcHBDb250ZXh0IiwiY29va2llcyIsIkNvb2tpZXMiLCJjdHgiLCJyZXEiLCJyZXMiLCJhcHBQcm9wcyIsIm5vQXV0aFBhZ2VzIiwibm9BdXRoUGFnZSIsInBhdGhuYW1lIiwidG9rZW5FeGlzdCIsImxvZyIsInJlZGlyZWN0VG9Mb2dpbiIsImFjY2Vzc1Rva2VuIiwidG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJ2YWxpZFRvIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiYWNjZXNzVG9rZW5WYWxpZCIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIlNFUlZFUl9QT1JUIiwiU0VSVkVSX1NVQl9GT0xERVIiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJuZXdUb2tlbkluZm8iLCJqc29uIiwic3RhdHVzIiwic2F2ZVRva2VuSW5mbyIsImNsZWFyVG9rZW5JbmZvIiwidW5kZWZpbmVkIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJlbmQiLCJzZXQiLCJodHRwT25seSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBLCtEOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQSxpQkFB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QXFCLElBQXJCO0FBQ0F2QyxTQUFPLENBQUN1QyxHQUFSLENBQVksY0FBWixFQUE0QixJQUE1QjtBQUNBdkMsU0FBTyxDQUFDdUMsR0FBUixDQUFZLFNBQVosRUFBdUIsSUFBdkI7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dELG9DOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2FwcCcpXG4iLCJpbXBvcnQgUmVhY3QsIHsgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBleGVjT25jZSxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlLFxuICBOZXh0V2ViVml0YWxzTWV0cmljLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9jbGllbnQvcm91dGVyJ1xuXG5leHBvcnQgeyBBcHBJbml0aWFsUHJvcHMgfVxuXG5leHBvcnQgeyBOZXh0V2ViVml0YWxzTWV0cmljIH1cblxuZXhwb3J0IHR5cGUgQXBwQ29udGV4dCA9IEFwcENvbnRleHRUeXBlPFJvdXRlcj5cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHM8UCA9IHt9PiA9IEFwcFByb3BzVHlwZTxSb3V0ZXIsIFA+XG5cbi8qKlxuICogYEFwcGAgY29tcG9uZW50IGlzIHVzZWQgZm9yIGluaXRpYWxpemUgb2YgcGFnZXMuIEl0IGFsbG93cyBmb3Igb3ZlcndyaXRpbmcgYW5kIGZ1bGwgY29udHJvbCBvZiB0aGUgYHBhZ2VgIGluaXRpYWxpemF0aW9uLlxuICogVGhpcyBhbGxvd3MgZm9yIGtlZXBpbmcgc3RhdGUgYmV0d2VlbiBuYXZpZ2F0aW9uLCBjdXN0b20gZXJyb3IgaGFuZGxpbmcsIGluamVjdGluZyBhZGRpdGlvbmFsIGRhdGEuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGFwcEdldEluaXRpYWxQcm9wcyh7XG4gIENvbXBvbmVudCxcbiAgY3R4LFxufTogQXBwQ29udGV4dCk6IFByb21pc2U8QXBwSW5pdGlhbFByb3BzPiB7XG4gIGNvbnN0IHBhZ2VQcm9wcyA9IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpXG4gIHJldHVybiB7IHBhZ2VQcm9wcyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcDxQID0ge30sIENQID0ge30sIFMgPSB7fT4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gIFAgJiBBcHBQcm9wczxDUD4sXG4gIFNcbj4ge1xuICBzdGF0aWMgb3JpZ0dldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wc1xuICBzdGF0aWMgZ2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG5cbiAgLy8gS2VwdCBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgLy8gV2hlbiBzb21lb25lIGVuZGVkIEFwcCB0aGV5IGNvdWxkIGNhbGwgYHN1cGVyLmNvbXBvbmVudERpZENhdGNoYC5cbiAgLy8gQGRlcHJlY2F0ZWQgVGhpcyBtZXRob2QgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gRXJyb3JzIGFyZSBjYXVnaHQgYXQgdGhlIHRvcCBsZXZlbFxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcjogRXJyb3IsIF9lcnJvckluZm86IEVycm9ySW5mbyk6IHZvaWQge1xuICAgIHRocm93IGVycm9yXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByb3V0ZXIsIENvbXBvbmVudCwgcGFnZVByb3BzLCBfX05fU1NHLCBfX05fU1NQIH0gPSB0aGlzXG4gICAgICAucHJvcHMgYXMgQXBwUHJvcHM8Q1A+XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ucGFnZVByb3BzfVxuICAgICAgICB7XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgYWRkIHRoZSBsZWdhY3kgVVJMIHByb3AgaWYgaXQncyB1c2luZyBub24tbGVnYWN5XG4gICAgICAgICAgLy8gbWV0aG9kcyBsaWtlIGdldFN0YXRpY1Byb3BzIGFuZCBnZXRTZXJ2ZXJTaWRlUHJvcHNcbiAgICAgICAgICAuLi4oIShfX05fU1NHIHx8IF9fTl9TU1ApID8geyB1cmw6IGNyZWF0ZVVybChyb3V0ZXIpIH0gOiB7fSlcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxubGV0IHdhcm5Db250YWluZXI6ICgpID0+IHZvaWRcbmxldCB3YXJuVXJsOiAoKSA9PiB2b2lkXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5Db250YWluZXIgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYFdhcm5pbmc6IHRoZSBcXGBDb250YWluZXJcXGAgaW4gXFxgX2FwcFxcYCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvYXBwLWNvbnRhaW5lci1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcblxuICB3YXJuVXJsID0gZXhlY09uY2UoKCkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgV2FybmluZzogdGhlICd1cmwnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vZXJyLnNoL3ZlcmNlbC9uZXh0LmpzL3VybC1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcbn1cblxuLy8gQGRlcHJlY2F0ZWQgbm9vcCBmb3Igbm93IHVudGlsIHJlbW92YWxcbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIocDogYW55KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuQ29udGFpbmVyKClcbiAgcmV0dXJuIHAuY2hpbGRyZW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybChyb3V0ZXI6IFJvdXRlcikge1xuICAvLyBUaGlzIGlzIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCByZWZlcmVuY2VzIHRoZSByb3V0ZXIgb2JqZWN0IGF0IGNhbGwgdGltZVxuICBjb25zdCB7IHBhdGhuYW1lLCBhc1BhdGgsIHF1ZXJ5IH0gPSByb3V0ZXJcbiAgcmV0dXJuIHtcbiAgICBnZXQgcXVlcnkoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcXVlcnlcbiAgICB9LFxuICAgIGdldCBwYXRobmFtZSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBwYXRobmFtZVxuICAgIH0sXG4gICAgZ2V0IGFzUGF0aCgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBhc1BhdGhcbiAgICB9LFxuICAgIGJhY2s6ICgpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJvdXRlci5iYWNrKClcbiAgICB9LFxuICAgIHB1c2g6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucHVzaCh1cmwsIGFzKVxuICAgIH0sXG4gICAgcHVzaFRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcHVzaFJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHB1c2hVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucHVzaChwdXNoUm91dGUsIHB1c2hVcmwpXG4gICAgfSxcbiAgICByZXBsYWNlOiAodXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UodXJsLCBhcylcbiAgICB9LFxuICAgIHJlcGxhY2VUbzogKGhyZWY6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIGNvbnN0IHJlcGxhY2VSb3V0ZSA9IGFzID8gaHJlZiA6ICcnXG4gICAgICBjb25zdCByZXBsYWNlVXJsID0gYXMgfHwgaHJlZlxuXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UocmVwbGFjZVJvdXRlLCByZXBsYWNlVXJsKVxuICAgIH0sXG4gIH1cbn1cbiIsImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcyc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgQXBwIGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IENvb2tpZXMgZnJvbSAnY29va2llcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvc2VBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG59XHJcblxyXG5Eb3NlQXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChhcHBDb250ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBjb29raWVzID0gbmV3IENvb2tpZXMoYXBwQ29udGV4dC5jdHgucmVxLCBhcHBDb250ZXh0LmN0eC5yZXMpXHJcbiAgICAvLyBjYWxscyBwYWdlJ3MgYGdldEluaXRpYWxQcm9wc2AgYW5kIGZpbGxzIGBhcHBQcm9wcy5wYWdlUHJvcHNgXHJcbiAgICBjb25zdCBhcHBQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoYXBwQ29udGV4dCk7XHJcbiBcclxuICAgIC8vIEFsbG93ZWQgcGFnZXMgd2l0aG91dCBhdXRoXHJcbiAgICBjb25zdCBub0F1dGhQYWdlcyA9IFsnL2xvZ2luJywgJy9fZXJyb3InXTtcclxuIFxyXG4gICAgZm9yIChjb25zdCBub0F1dGhQYWdlIG9mIG5vQXV0aFBhZ2VzKSB7XHJcbiAgICAgICAgaWYgKGFwcENvbnRleHQuY3R4LnBhdGhuYW1lID09IG5vQXV0aFBhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgLi4uYXBwUHJvcHMgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IHJ1bnMgc2VydmVyIHNpZGVcclxuICAgaWYgKGFwcENvbnRleHQuY3R4LnJlcykge1xyXG4gICAgICAgIGlmICghdG9rZW5FeGlzdChhcHBDb250ZXh0LmN0eC5yZXEuY29va2llcykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyB0b2tlbiBzYXZlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0VG9Mb2dpbihhcHBDb250ZXh0LmN0eC5yZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBsZXQgYWNjZXNzVG9rZW4gID0gYXBwQ29udGV4dC5jdHgucmVxLmNvb2tpZXMudG9rZW47XHJcbiAgICAgICBsZXQgcmVmcmVzaFRva2VuID0gYXBwQ29udGV4dC5jdHgucmVxLmNvb2tpZXMucmVmcmVzaFRva2VuO1xyXG4gICAgICAgbGV0IHZhbGlkVG8gICAgICA9IGFwcENvbnRleHQuY3R4LnJlcS5jb29raWVzLnZhbGlkVG87XHJcblxyXG4gICAgICAgY29uc3QgY3VycmVudFRpbWUgICAgICA9IERhdGUubm93KCkgLyAxMDAwO1xyXG4gICAgICAgY29uc3QgYWNjZXNzVG9rZW5WYWxpZCA9ICh2YWxpZFRvIC0gY3VycmVudFRpbWUpID49IDYwO1xyXG5cclxuICAgICAgIGNvbnNvbGUubG9nKFwiQWNjZXNzIHRva2VuIHZhbGlkOiBcIiArIGFjY2Vzc1Rva2VuVmFsaWQpO1xyXG5cclxuICAgICAgIGlmIChhY2Nlc3NUb2tlblZhbGlkKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIHsgLi4uYXBwUHJvcHMgfTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAvLyBJZiBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWQgb3IgaXMgYWJvdXQgdG8gZXhwaXJlXHJcbiAgICAgICBjb25zdCByZXEgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlNFUlZFUl9QT1JUfSR7cHJvY2Vzcy5lbnYuU0VSVkVSX1NVQl9GT0xERVJ9L2FwaS9hdXRoL3JlZnJlc2hUb2tlbmAsIHtcclxuICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxyXG4gICAgICAgICAgICAgICByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlblxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICBjb25zdCBuZXdUb2tlbkluZm8gPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgICAgaWYgKG5ld1Rva2VuSW5mby5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1Rva2VuSW5mbyk7XHJcbiAgICAgICAgICAgc2F2ZVRva2VuSW5mbyhjb29raWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3VG9rZW5JbmZvLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmV3VG9rZW5JbmZvLnJlZnJlc2hUb2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Rva2VuSW5mby52YWxpZFRvKTtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hlZCB0b2tlblwiKTtcclxuICAgICAgICAgICByZXR1cm4geyAuLi5hcHBQcm9wcyB9O1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBjbGVhclRva2VuSW5mbyhjb29raWVzKTtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxkbid0IGdldCBuZXcgdG9rZW5cIik7XHJcbiAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0VG9Mb2dpbihhcHBDb250ZXh0LmN0eC5yZXMpO1xyXG4gICAgICAgfVxyXG4gICB9IGVsc2Uge1xyXG4gICAgICAgY29uc29sZS5sb2coXCJrbGllbnRcIik7XHJcbiAgICAgICByZXR1cm4geyAuLi5hcHBQcm9wcyB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9rZW5FeGlzdChjb29raWVzKSB7XHJcbiAgICBsZXQgYWNjZXNzVG9rZW4gID0gY29va2llcy50b2tlbjtcclxuICAgIGxldCByZWZyZXNoVG9rZW4gPSBjb29raWVzLnJlZnJlc2hUb2tlbjtcclxuICAgIGxldCB2YWxpZFRvICAgICAgPSBjb29raWVzLnZhbGlkVG87XHJcbiAgICByZXR1cm4gYWNjZXNzVG9rZW4gICE9IG51bGwgICYmIGFjY2Vzc1Rva2VuICE9IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgIHJlZnJlc2hUb2tlbiAhPSBudWxsICYmIHJlZnJlc2hUb2tlbiAhPSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICB2YWxpZFRvICAgICAgIT0gbnVsbCAmJiB2YWxpZFRvICAgICAgIT0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWRpcmVjdFRvTG9naW4ocmVzKSB7XHJcbiAgICByZXMud3JpdGVIZWFkKDMwMiwgeyBMb2NhdGlvbjogYCR7cHJvY2Vzcy5lbnYuU0VSVkVSX1NVQl9GT0xERVJ9L2xvZ2luYCB9KTtcclxuICAgIHJlcy5lbmQoKTtcclxuICAgIHJldHVybiB7fTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVRva2VuSW5mbyhjb29raWVzLCBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCB2YWxpZFRvKSB7XHJcbiAgICBjb29raWVzLnNldCgndG9rZW4nLCBhY2Nlc3NUb2tlbiwge1xyXG4gICAgICAgIGh0dHBPbmx5OiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBjb29raWVzLnNldCgncmVmcmVzaFRva2VuJywgcmVmcmVzaFRva2VuLCB7XHJcbiAgICAgICAgaHR0cE9ubHk6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIGNvb2tpZXMuc2V0KCd2YWxpZFRvJywgdmFsaWRUbywge1xyXG4gICAgICAgIGh0dHBPbmx5OiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyVG9rZW5JbmZvKGNvb2tpZXMpIHtcclxuICAgIGNvb2tpZXMuc2V0KCd0b2tlbicsIG51bGwpO1xyXG4gICAgY29va2llcy5zZXQoJ3JlZnJlc2hUb2tlbicsIG51bGwpO1xyXG4gICAgY29va2llcy5zZXQoJ3ZhbGlkVG8nLCBudWxsKTtcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==