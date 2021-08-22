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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/head":
/*!****************************************************!*\
  !*** external "next/dist/next-server/lib/head.js" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/head.js");

/***/ }),

/***/ "../next-server/lib/to-base-64":
/*!**********************************************************!*\
  !*** external "next/dist/next-server/lib/to-base-64.js" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/to-base-64.js");

/***/ }),

/***/ "../next-server/server/image-config":
/*!***************************************************************!*\
  !*** external "next/dist/next-server/server/image-config.js" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/server/image-config.js");

/***/ }),

/***/ "./components/hooks/WindowSize.js":
/*!****************************************!*\
  !*** ./components/hooks/WindowSize.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useWindowSize; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useWindowSize() {
  const isClient = false;

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const {
    0: windowSize,
    1: setWindowSize
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(getSize);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

/***/ }),

/***/ "./components/layout.js":
/*!******************************!*\
  !*** ./components/layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.module.css */ "./components/layout.module.css");
/* harmony import */ var _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_layout_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search */ "./components/search.js");
/* harmony import */ var _movieBackdrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./movieBackdrop */ "./components/movieBackdrop.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks_WindowSize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/WindowSize */ "./components/hooks/WindowSize.js");
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/components/layout.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








function Layout({
  children,
  home,
  searchEnabled,
  server,
  relative,
  serverToken
}) {
  const windowSize = Object(_hooks_WindowSize__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const {
    0: searchResults,
    1: setSearchResults
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: isSearching,
    1: setIsSearching
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  let currentResults = [];
  let count = 0;
  searchEnabled = searchEnabled == undefined ? false : true;

  const selectMovie = id => {
    next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push(`/server/${server.server_id}/movies/video/${id}`);
  };

  const selectShow = id => {
    next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push(`/server/${server.server_id}/shows/video/${id}`);
  };

  const onSearch = result => {
    console.log("search enabled " + searchEnabled);
    console.log(result);
    let elements = [];

    for (let content of result) {
      let img;

      for (let image of content.images) {
        if (image.type === 'BACKDROP') {
          img = image.path !== 'no_image' ? `https://image.tmdb.org/t/p/w500/${image.path}` : 'https://via.placeholder.com/2000x1000';
          break;
        }
      }

      if (content.type === 'movie') {
        elements.push(__jsx(_movieBackdrop__WEBPACK_IMPORTED_MODULE_4__["default"], {
          showTitle: true,
          key: count,
          id: content.id,
          title: content.title,
          overview: content.overview,
          backdrop: img,
          onClick: id => selectMovie(content.id),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 15
          }
        }));
      } else if (content.type === 'serie') {
        elements.push(__jsx(_movieBackdrop__WEBPACK_IMPORTED_MODULE_4__["default"], {
          showTitle: true,
          key: count,
          id: content.id,
          title: content.title,
          overview: content.overview,
          backdrop: img,
          onClick: id => selectShow(content.id),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45,
            columnNumber: 15
          }
        }));
      }

      count++;
    }

    setIsSearching(true);
    setSearchResults(elements);
  };

  const onClose = () => {
    setIsSearching(false);
  };

  const scrollLeft = id => {
    document.getElementById(id).scrollLeft -= window.innerWidth * 0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  };

  const scrollRight = id => {
    document.getElementById(id).scrollLeft += window.innerWidth * 0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  };

  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }
  }, __jsx("link", {
    rel: "icon",
    type: "image/png",
    href: "../public/images/favicon.png",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 9
    }
  }), __jsx("link", {
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
    rel: "stylesheet",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }
  })), __jsx("header", {
    style: relative !== undefined ? {
      position: 'relative'
    } : {},
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 7
    }
  }, __jsx("img", {
    className: _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.logo,
    src: `${"http://localhost:3000"}/images/logo.png`,
    layout: "fill",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 9
    }
  }), searchEnabled && __jsx(_search__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClose: () => onClose(),
    searchEnabled: searchEnabled,
    server: server,
    serverToken: serverToken,
    onSearch: result => onSearch(result),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 11
    }
  })), isSearching && __jsx("div", {
    style: {
      position: 'relative',
      top: '115px'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize',
      margin: '0 0 15px 15px',
      color: 'white'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 11
    }
  }, "S\xF6kresultat"), __jsx("div", {
    className: _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.searchResultBox,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 9
    }
  }, __jsx("div", {
    id: "searchRow",
    className: _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.SearchResult,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 11
    }
  }, searchResults), searchResults.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.scrollButton,
    onClick: () => scrollLeft('searchRow'),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 45
    }
  }, __jsx("img", {
    src: `${"http://localhost:3000"}/images/left.svg`,
    width: "70",
    height: "70",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 49
    }
  })), __jsx("div", {
    className: _layout_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: () => scrollRight('searchRow'),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 45
    }
  }, __jsx("img", {
    src: `${"http://localhost:3000"}/images/right.svg`,
    width: "70",
    height: "70",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 49
    }
  }))))), !isSearching && __jsx("main", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 9
    }
  }, children));
}

/***/ }),

/***/ "./components/layout.module.css":
/*!**************************************!*\
  !*** ./components/layout.module.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"SearchResult": "layout_SearchResult__8uwQW",
	"searchResultBox": "layout_searchResultBox__2uEDl",
	"scrollButton": "layout_scrollButton__1DOSU",
	"logo": "layout_logo__EKJ3d"
};


/***/ }),

/***/ "./components/movieBackdrop.js":
/*!*************************************!*\
  !*** ./components/movieBackdrop.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovieBackdrop; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movieBackdrop.module.css */ "./components/movieBackdrop.module.css");
/* harmony import */ var _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/validateServerAccess */ "./lib/validateServerAccess.js");
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/components/movieBackdrop.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


class MovieBackdrop extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.overview = props.overview;
    this.poster = props.poster;
    this.runtime = props.runtime;
    this.backdrop = props.backdrop;
    this.id = props.id;
    this.time = props.time ? props.time : null;
    this.runtime = props.runtime ? props.runtime : null;
    this.markAsDoneButton = props.markAsDoneButton;
    this.showTitle = props.showTitle;
    this.multipleRows = props.multipleRows ? props.multipleRows : null;
    this.markAsWatched = this.markAsWatched.bind(this);
  }

  markAsWatched() {
    _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_2___default()(server, serverToken => {
      fetch(`${server.server_ip}/api/movies/${id}/setWatched?watched=true&token=${serverToken}`).then(r => r.json()).then(status => {
        if (status.success) {
          this.props.unMountMe();
        } else {
          console.log("ERROR MARKING AS WATCHED: " + status);
        }
      }).catch(err => {
        console.log(err);
      });
    });
  }

  getStyle() {
    if (this.showTitle) {
      return {
        opacity: '1'
      };
    } else {
      return {};
    }
  }

  getBackdropStyle() {
    let style = {
      backgroundImage: `url('${this.backdrop}')`
    };

    if (this.multipleRows) {
      style.marginBottom = "20px";
      style.width = "445px";
    }

    return style;
  }

  render() {
    return __jsx("div", {
      onClick: () => this.props.onClick(this.id),
      className: _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.backdrop,
      style: this.getBackdropStyle(),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 13
      }
    }, __jsx("h3", {
      className: _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.title,
      style: this.getStyle(),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 17
      }
    }, this.title), __jsx("p", {
      className: _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.overview,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 17
      }
    }, this.overview.substring(0, 150), this.overview.length > 150 ? '...' : ''), this.time != null && this.runtime != null && __jsx("progress", {
      className: _movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.progress,
      value: this.time,
      max: this.runtime,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 21
      }
    }));
  }

}

/***/ }),

/***/ "./components/movieBackdrop.module.css":
/*!*********************************************!*\
  !*** ./components/movieBackdrop.module.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"backdrop": "movieBackdrop_backdrop__2AK5W",
	"title": "movieBackdrop_title__Gj1-t",
	"overview": "movieBackdrop_overview__1S-fb",
	"progress": "movieBackdrop_progress__1eE6x",
	"setAsWatched": "movieBackdrop_setAsWatched__234CI"
};


/***/ }),

/***/ "./components/search.js":
/*!******************************!*\
  !*** ./components/search.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _search_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.module.css */ "./components/search.module.css");
/* harmony import */ var _search_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_search_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Form */ "react-bootstrap/Form");
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/validateServerAccess */ "./lib/validateServerAccess.js");
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var didyoumean__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! didyoumean */ "didyoumean");
/* harmony import */ var didyoumean__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(didyoumean__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/components/search.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





didyoumean__WEBPACK_IMPORTED_MODULE_5___default.a.threshold = 0.1;
class Search extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.server = props.server;
    this.serverToken = props.serverToken;
    this.series = [];
    this.movies = [];
    this.enabled = props.searchEnabled;
    this.search = this.search.bind(this);
    this.onClose = props.onClose;
    this.onSearch = props.onSearch;
    this.dataDownloaded = false;
  }
  /**
   * This is used to get all the movies/series from the server
   */


  getAllContent() {
    _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_4___default()(this.server, serverToken => {
      node_fetch__WEBPACK_IMPORTED_MODULE_3___default()(`${this.server.server_ip}/api/list?token=${serverToken}`).then(r => r.json()).then(content => {
        this.series = content.series;
        this.movies = content.movies;
      });
    });
  }

  search(event) {
    if (!this.dataDownloaded && this.enabled) {
      this.getAllContent();
      this.dataDownloaded = true;
    }

    let query = event.target.value;

    if (query === "") {
      this.onClose(); //this.onSearch([]);

      return;
    }

    let found = [];

    for (let movie of this.movies) {
      if (movie.title.toLowerCase().includes(query.toLowerCase())) {
        movie.type = 'movie';
        found.push(movie);
      }
    }

    for (let serie of this.series) {
      if (serie.title.toLowerCase().includes(query.toLowerCase())) {
        serie.type = 'serie';
        found.push(serie);
      }
    }

    console.log(found);
    this.onSearch(found);
  }

  render() {
    return __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default.a, {
      autoComplete: "off",
      className: _search_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.searchForm,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 13
      }
    }, __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_2___default.a.Control, {
      onInput: this.search,
      type: "text",
      placeholder: "S\xF6k..",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 17
      }
    }));
  }

}

/***/ }),

/***/ "./components/search.module.css":
/*!**************************************!*\
  !*** ./components/search.module.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"searchForm": "search_searchForm__1_CUA"
};


/***/ }),

/***/ "./components/serverBox.js":
/*!*********************************!*\
  !*** ./components/serverBox.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServerBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _serverBox_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serverBox.module.css */ "./components/serverBox.module.css");
/* harmony import */ var _serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_serverBox_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/components/serverBox.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


class ServerBox extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.imgRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.serverName = props.name;
    this.serverAdress = props.adress;
    this.checkStatus();
  }

  fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([fetch(url, options), new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))]);
  }

  checkStatus() {
    this.fetchWithTimeout(`${this.serverAdress}/api/ping`, {}, 5000).then(res => {
      // check so that the server we are pinging is responding to the request
      if (res.status == 200) {
        this.imgRef.current.classList.add(_serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.statusSuccess);
      } else {
        this.imgRef.current.classList.add(_serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.statusError);
      }
    }).catch(e => {
      this.imgRef.current.classList.add(_serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.statusError);
    });
  }

  render() {
    return __jsx("div", {
      onClick: this.props.onClick,
      className: _serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.server,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }
    }, __jsx("h5", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 17
      }
    }, this.serverName), __jsx("div", {
      className: _serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.statusBox,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 17
      }
    }, __jsx("img", {
      ref: this.imgRef,
      className: _serverBox_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.statusImage,
      width: "40",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 21
      }
    })), __jsx("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 17
      }
    }, this.serverAdress));
  }

}

/***/ }),

/***/ "./components/serverBox.module.css":
/*!*****************************************!*\
  !*** ./components/serverBox.module.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"server": "serverBox_server__1dt1H",
	"statusBox": "serverBox_statusBox__2j8E7",
	"statusImage": "serverBox_statusImage__1ADuU",
	"statusSuccess": "serverBox_statusSuccess__170AT",
	"statusError": "serverBox_statusError__3F84l"
};


/***/ }),

/***/ "./lib/lock.js":
/*!*********************!*\
  !*** ./lib/lock.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AsyncLock = __webpack_require__(/*! node-async-locks */ "node-async-locks").AsyncLock;

const lock = new AsyncLock();
module.exports = lock;

/***/ }),

/***/ "./lib/validateServerAccess.js":
/*!*************************************!*\
  !*** ./lib/validateServerAccess.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsCookie = _interopRequireDefault(__webpack_require__(/*! js-cookie */ "js-cookie"));

var _router = _interopRequireDefault(__webpack_require__(/*! next/router */ "next/router"));

var _lock = _interopRequireDefault(__webpack_require__(/*! ./lock */ "./lib/lock.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We have to use a lock to avoid race-condition if there are multiple calls to this function at the same time
const COOKIE_SETTINGS = {
  expires: 7
};

const validateServerAccess = async (server, cb) => {
  _lock.default.enter(async function (token) {
    let mainAccessToken = _jsCookie.default.get('token');

    const mainRefreshToken = _jsCookie.default.get('refreshToken');

    const mainAccessTokenValidTo = _jsCookie.default.get('validTo');

    const serverAccessToken = _jsCookie.default.get('serverToken');

    const serverAccessTokenValidTo = _jsCookie.default.get('serverValidTo'); // Fail-safe, this should never happen since we check it server-side in _app.js


    if (!mainTokenExist()) {
      console.log("Main token does not exist");

      _router.default.push('/');

      _lock.default.leave(token);

      return;
    }

    const currentTime = Date.now() / 1000;
    const mainAccessTokenValid = mainAccessTokenValidTo - currentTime >= 60; // If we have to get a new mainToken

    if (!mainAccessTokenValid) {
      console.log("Main token is expired");
      const newTokenInfo = await getNewMainToken(mainAccessToken, mainRefreshToken);
      console.log(newTokenInfo);

      if (newTokenInfo.status === 'success') {
        console.log("Got new main token");
        setMainToken(newTokenInfo.token, newTokenInfo.refreshToken, newTokenInfo.validTo);
        mainAccessToken = newTokenInfo.token;
      } else {
        console.log("Couldn't get a new main token"); // We couldn't get a new token (refresh-token probably too old)

        _lock.default.leave(token);

        _router.default.push('/');

        return;
      }
    } // If we haven't saved a serverToken


    if (!serverTokenExist()) {
      console.log("No serverToken saved");
      getServerToken(mainAccessToken, server).then(result => {
        console.log("Got a serverToken"); // We successfully got a new token

        setServerToken(result.token, result.validTo);

        _lock.default.leave(token);

        cb(result.token);
      }).catch(err => {
        console.log("Couldn't get a serverToken"); // We couldn't get a new token

        _lock.default.leave(token);

        _router.default.push('/');
      });
    } else {
      const serverAccessTokenValid = serverAccessTokenValidTo - currentTime >= 60; // If we have to get a new serverToken

      if (!serverAccessTokenValid) {
        console.log("serverToken was not valid");
        getServerToken(mainAccessToken, server).then(result => {
          // We successfully got a new token
          console.log("Got a new serverToken");
          setServerToken(result.token, result.validTo);

          _lock.default.leave(token);

          cb(result.token);
        }).catch(err => {
          // We couldn't get a new token
          console.log("Couldn't get a new serverToken");

          _lock.default.leave(token);

          _router.default.push('/');
        });
      } else {
        // If we have a valid mainToken and a valid serverToken
        _lock.default.leave(token);

        cb(serverAccessToken);
      }
    }
  });
};

const getNewMainToken = async (accessToken, refreshToken) => {
  const req = await fetch(`${"http://localhost:3000"}/api/auth/refreshToken`, {
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
  return newTokenInfo;
};

const getServerToken = (mainToken, server) => {
  console.log(server);
  return new Promise(async (resolve, reject) => {
    fetch(`${server.server_ip}/api/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: mainToken
      })
    }).then(r => r.json()).then(data => {
      if (data.status === 'success') {
        resolve({
          token: data.token,
          validTo: data.validTo
        });
      } else {
        console.log(data);
        reject();
      }
    });
  });
};

const serverTokenExist = () => {
  let accessToken = _jsCookie.default.get('serverToken');

  let validTo = _jsCookie.default.get('serverValidTo');

  return accessToken != null && accessToken != undefined && validTo != null && validTo != undefined;
};

const mainTokenExist = () => {
  const accessToken = _jsCookie.default.get('token');

  const refreshToken = _jsCookie.default.get('refreshToken');

  const validTo = _jsCookie.default.get('validTo');

  return accessToken != null && accessToken != undefined && refreshToken != null && refreshToken != undefined && validTo != null && validTo != undefined;
};

const setServerToken = (token, validTo) => {
  _jsCookie.default.set('serverToken', token, COOKIE_SETTINGS);

  _jsCookie.default.set('serverValidTo', validTo, COOKIE_SETTINGS);
};

const setMainToken = (token, refreshToken, validTo) => {
  _jsCookie.default.set('token', token, COOKIE_SETTINGS);

  _jsCookie.default.set('refreshToken', refreshToken, COOKIE_SETTINGS);

  _jsCookie.default.set('validTo', validTo, COOKIE_SETTINGS);
};

module.exports = validateServerAccess;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

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

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/head */ "../next-server/lib/head"));

var _toBase = __webpack_require__(/*! ../next-server/lib/to-base-64 */ "../next-server/lib/to-base-64");

var _imageConfig = __webpack_require__(/*! ../next-server/server/image-config */ "../next-server/server/image-config");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

if (true) {
  ;
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[]} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const percentSizes = [...sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)].map(m => parseInt(m[2]));

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    src: loader({
      src,
      quality,
      width: widths[last]
    }),
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', ')
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load((0, _extends2.default)({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
}

function Image(_ref) {
  let {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    loader = defaultImageLoader
  } = _ref,
      all = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "objectFit", "objectPosition", "loader"]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';
  let unsized = false;

  if ('unsized' in rest) {
    unsized = Boolean(rest.unsized); // Remove property so it's not spread into image:

    delete rest['unsized'];
  } else if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  if (true) {
    if (!src) {
      throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
        width,
        height,
        quality
      })}`);
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(',')}.`);
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`);
    }

    if (priority && loading === 'lazy') {
      throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
    }

    if (unsized) {
      throw new Error(`Image with src "${src}" has deprecated "unsized" property, which was removed in favor of the "layout='fill'" property`);
    }
  }

  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  const [setRef, isIntersected] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    visibility: isVisible ? 'inherit' : 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
    }
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  if (unsized) {
    wrapperStyle = undefined;
    sizerStyle = undefined;
    imgStyle = undefined;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: `data:image/svg+xml;base64,${(0, _toBase.toBase64)(sizerSvg)}`
  }) : null) : null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    ref: setRef,
    style: imgStyle
  })), priority ?
  /*#__PURE__*/
  // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src // @ts-ignore: imagesrcset is not yet in the link element type
    ,
    imagesrcset: imgAttributes.srcSet // @ts-ignore: imagesizes is not yet in the link element type
    ,
    imagesizes: imgAttributes.sizes
  })) : null);
} //BUILT IN LOADERS


function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width];
  let paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return `${root}${normalizeSrc(src)}${paramsString}`;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (true) {
    const missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
        src,
        width,
        quality
      })}`);
    }

    if (src.startsWith('//')) {
      throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://err.sh/next.js/next-image-unconfigured-host`);
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout */ "./components/layout.js");
/* harmony import */ var _styles_index_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/index.module.css */ "./styles/index.module.css");
/* harmony import */ var _styles_index_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_index_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swr */ "swr");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_serverBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/serverBox */ "./components/serverBox.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! js-cookie */ "js-cookie");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/mnt/h/Code/Dose/Main Server/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






 // Fetcher for useSWR, redirect to login if not authorized

const fetcher = url => fetch(url).then(r => {
  return r.json().then(result => {
    console.log(result);
    console.log(result["servers"].length);

    if (result["servers"].length != 1) {
      return result;
    } else {
      let server = result["servers"][0];
      js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.set('server', JSON.stringify({
        id: server.server_id,
        name: server.server_name,
        ip: server.server_ip
      }));
      next_router__WEBPACK_IMPORTED_MODULE_6___default.a.push(`/server/${server.server_id}`);
    }
  });
});

const chooseServer = server => {
  js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.set('server', JSON.stringify({
    id: server.server_id,
    name: server.server_name,
    ip: server.server_ip
  }));
  next_router__WEBPACK_IMPORTED_MODULE_6___default.a.push(`/server/${server.server_id}`);
};

function Home() {
  const {
    data,
    error
  } = swr__WEBPACK_IMPORTED_MODULE_4___default()(`${"http://localhost:3000"}/api/servers/getServers?token=${js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('token')}`, fetcher);
  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    home: true,
    relative: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), data && data.servers && __jsx("div", {
    className: _styles_index_module_css__WEBPACK_IMPORTED_MODULE_3___default.a.servers,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }, data.servers.map((server, i) => __jsx(_components_serverBox__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onClick: () => chooseServer(server),
    name: server.server_name,
    adress: server.server_ip,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 42
    }
  }))), !data && __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  }, "Loading"), error && __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }
  }, "fel"));
}

/***/ }),

/***/ "./styles/index.module.css":
/*!*********************************!*\
  !*** ./styles/index.module.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"servers": "styles_servers__38LB5"
};


/***/ }),

/***/ "didyoumean":
/*!*****************************!*\
  !*** external "didyoumean" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("didyoumean");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "node-async-locks":
/*!***********************************!*\
  !*** external "node-async-locks" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-async-locks");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap/Form":
/*!***************************************!*\
  !*** external "react-bootstrap/Form" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Form");

/***/ }),

/***/ "swr":
/*!**********************!*\
  !*** external "swr" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swr");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9oZWFkLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi90by1iYXNlLTY0LmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci9pbWFnZS1jb25maWcuanNcIiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2hvb2tzL1dpbmRvd1NpemUuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9sYXlvdXQubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21vdmllQmFja2Ryb3AuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tb3ZpZUJhY2tkcm9wLm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWFyY2gubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlcnZlckJveC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlcnZlckJveC5tb2R1bGUuY3NzIiwid2VicGFjazovLy8uL2xpYi9sb2NrLmpzIiwid2VicGFjazovLy8uL2xpYi92YWxpZGF0ZVNlcnZlckFjY2Vzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvaW1hZ2UudHN4Iiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvcmVxdWVzdC1pZGxlLWNhbGxiYWNrLnRzIiwid2VicGFjazovLy8uLi8uLi9jbGllbnQvdXNlLWludGVyc2VjdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL2luZGV4Lm1vZHVsZS5jc3MiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGlkeW91bWVhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzLWNvb2tpZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5leHQvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS1hc3luYy1sb2Nrc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWJvb3RzdHJhcC9Gb3JtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3dyXCIiXSwibmFtZXMiOlsidXNlV2luZG93U2l6ZSIsImlzQ2xpZW50IiwiZ2V0U2l6ZSIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlubmVySGVpZ2h0Iiwid2luZG93U2l6ZSIsInNldFdpbmRvd1NpemUiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImhhbmRsZVJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiTGF5b3V0IiwiY2hpbGRyZW4iLCJob21lIiwic2VhcmNoRW5hYmxlZCIsInNlcnZlciIsInJlbGF0aXZlIiwic2VydmVyVG9rZW4iLCJzZWFyY2hSZXN1bHRzIiwic2V0U2VhcmNoUmVzdWx0cyIsImlzU2VhcmNoaW5nIiwic2V0SXNTZWFyY2hpbmciLCJjdXJyZW50UmVzdWx0cyIsImNvdW50Iiwic2VsZWN0TW92aWUiLCJpZCIsIlJvdXRlciIsInB1c2giLCJzZXJ2ZXJfaWQiLCJzZWxlY3RTaG93Iiwib25TZWFyY2giLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiZWxlbWVudHMiLCJjb250ZW50IiwiaW1nIiwiaW1hZ2UiLCJpbWFnZXMiLCJ0eXBlIiwicGF0aCIsInRpdGxlIiwib3ZlcnZpZXciLCJvbkNsb3NlIiwic2Nyb2xsTGVmdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxUbyIsInNjcm9sbFgiLCJzY3JvbGxZIiwic2Nyb2xsUmlnaHQiLCJwb3NpdGlvbiIsInN0eWxlcyIsImxvZ28iLCJwcm9jZXNzIiwidG9wIiwidGV4dFRyYW5zZm9ybSIsIm1hcmdpbiIsImNvbG9yIiwic2VhcmNoUmVzdWx0Qm94IiwiU2VhcmNoUmVzdWx0IiwibGVuZ3RoIiwic2Nyb2xsQnV0dG9uIiwicmlnaHQiLCJNb3ZpZUJhY2tkcm9wIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwicG9zdGVyIiwicnVudGltZSIsImJhY2tkcm9wIiwidGltZSIsIm1hcmtBc0RvbmVCdXR0b24iLCJzaG93VGl0bGUiLCJtdWx0aXBsZVJvd3MiLCJtYXJrQXNXYXRjaGVkIiwiYmluZCIsInZhbGlkYXRlU2VydmVyQWNjZXNzIiwiZmV0Y2giLCJzZXJ2ZXJfaXAiLCJ0aGVuIiwiciIsImpzb24iLCJzdGF0dXMiLCJzdWNjZXNzIiwidW5Nb3VudE1lIiwiY2F0Y2giLCJlcnIiLCJnZXRTdHlsZSIsIm9wYWNpdHkiLCJnZXRCYWNrZHJvcFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJtYXJnaW5Cb3R0b20iLCJyZW5kZXIiLCJvbkNsaWNrIiwic3Vic3RyaW5nIiwicHJvZ3Jlc3MiLCJkaWRZb3VNZWFuIiwidGhyZXNob2xkIiwiU2VhcmNoIiwic2VyaWVzIiwibW92aWVzIiwiZW5hYmxlZCIsInNlYXJjaCIsImRhdGFEb3dubG9hZGVkIiwiZ2V0QWxsQ29udGVudCIsImV2ZW50IiwicXVlcnkiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZvdW5kIiwibW92aWUiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwic2VyaWUiLCJTdHlsZSIsInNlYXJjaEZvcm0iLCJTZXJ2ZXJCb3giLCJpbWdSZWYiLCJjcmVhdGVSZWYiLCJzZXJ2ZXJOYW1lIiwibmFtZSIsInNlcnZlckFkcmVzcyIsImFkcmVzcyIsImNoZWNrU3RhdHVzIiwiZmV0Y2hXaXRoVGltZW91dCIsInVybCIsIm9wdGlvbnMiLCJ0aW1lb3V0IiwiUHJvbWlzZSIsInJhY2UiLCJfIiwicmVqZWN0Iiwic2V0VGltZW91dCIsIkVycm9yIiwicmVzIiwiY3VycmVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0YXR1c1N1Y2Nlc3MiLCJzdGF0dXNFcnJvciIsImUiLCJzdGF0dXNCb3giLCJzdGF0dXNJbWFnZSIsIkFzeW5jTG9jayIsInJlcXVpcmUiLCJsb2NrIiwibW9kdWxlIiwiZXhwb3J0cyIsIkNPT0tJRV9TRVRUSU5HUyIsImV4cGlyZXMiLCJjYiIsImVudGVyIiwidG9rZW4iLCJtYWluQWNjZXNzVG9rZW4iLCJjb29raWUiLCJnZXQiLCJtYWluUmVmcmVzaFRva2VuIiwibWFpbkFjY2Vzc1Rva2VuVmFsaWRUbyIsInNlcnZlckFjY2Vzc1Rva2VuIiwic2VydmVyQWNjZXNzVG9rZW5WYWxpZFRvIiwibWFpblRva2VuRXhpc3QiLCJsZWF2ZSIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsIm5vdyIsIm1haW5BY2Nlc3NUb2tlblZhbGlkIiwibmV3VG9rZW5JbmZvIiwiZ2V0TmV3TWFpblRva2VuIiwic2V0TWFpblRva2VuIiwicmVmcmVzaFRva2VuIiwidmFsaWRUbyIsInNlcnZlclRva2VuRXhpc3QiLCJnZXRTZXJ2ZXJUb2tlbiIsInNldFNlcnZlclRva2VuIiwic2VydmVyQWNjZXNzVG9rZW5WYWxpZCIsImFjY2Vzc1Rva2VuIiwicmVxIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibWFpblRva2VuIiwicmVzb2x2ZSIsImRhdGEiLCJzZXQiLCJnbG9iYWwiLCJWQUxJRF9MT0FESU5HX1ZBTFVFUyIsImxvYWRlcnMiLCJWQUxJRF9MQVlPVVRfVkFMVUVTIiwiZGV2aWNlU2l6ZXMiLCJpbWFnZVNpemVzIiwibG9hZGVyIiwiZG9tYWlucyIsImltYWdlQ29uZmlnRGVmYXVsdCIsImFsbFNpemVzIiwiY29uZmlnRGV2aWNlU2l6ZXMiLCJhIiwic2l6ZXMiLCJsYXlvdXQiLCJwZXJjZW50U2l6ZXMiLCJtIiwicGFyc2VJbnQiLCJzbWFsbGVzdFJhdGlvIiwiTWF0aCIsIndpZHRocyIsInMiLCJraW5kIiwidyIsInAiLCJzcmNTZXQiLCJnZXRXaWR0aHMiLCJsYXN0Iiwic3JjIiwiaSIsImxvYWQiLCJyb290IiwiVkFMSURfTE9BREVSUyIsImNvbmZpZ0xvYWRlciIsInVub3B0aW1pemVkIiwicHJpb3JpdHkiLCJhbGwiLCJyZXN0IiwidW5zaXplZCIsIkJvb2xlYW4iLCJsb2FkaW5nIiwiaXNMYXp5Iiwicm9vdE1hcmdpbiIsImRpc2FibGVkIiwiaXNWaXNpYmxlIiwid2lkdGhJbnQiLCJnZXRJbnQiLCJoZWlnaHRJbnQiLCJxdWFsaXR5SW50IiwiaW1nU3R5bGUiLCJ2aXNpYmlsaXR5IiwibGVmdCIsImJvdHRvbSIsImJveFNpemluZyIsInBhZGRpbmciLCJib3JkZXIiLCJkaXNwbGF5IiwibWluV2lkdGgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsInF1b3RpZW50IiwicGFkZGluZ1RvcCIsImlzTmFOIiwid3JhcHBlclN0eWxlIiwib3ZlcmZsb3ciLCJzaXplclN0eWxlIiwic2l6ZXJTdmciLCJpbWdBdHRyaWJ1dGVzIiwiZ2VuZXJhdGVJbWdBdHRycyIsInF1YWxpdHkiLCJwYXJhbXMiLCJwYXJhbXNTdHJpbmciLCJub3JtYWxpemVTcmMiLCJtaXNzaW5nVmFsdWVzIiwicGFyc2VkU3JjIiwiY29uZmlnRG9tYWlucyIsImhvc3RuYW1lIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJzdGFydCIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwiY2xlYXJUaW1lb3V0IiwiaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJpc0Rpc2FibGVkIiwidW5vYnNlcnZlIiwic2V0UmVmIiwiZWwiLCJvYnNlcnZlIiwic2V0VmlzaWJsZSIsImlkbGVDYWxsYmFjayIsImNyZWF0ZU9ic2VydmVyIiwib2JzZXJ2ZXIiLCJvYnNlcnZlcnMiLCJpbnN0YW5jZSIsImVudHJpZXMiLCJlbnRyeSIsImNhbGxiYWNrIiwiZmV0Y2hlciIsInNlcnZlcl9uYW1lIiwiaXAiLCJjaG9vc2VTZXJ2ZXIiLCJIb21lIiwiZXJyb3IiLCJ1c2VTV1IiLCJzZXJ2ZXJzIiwibWFwIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtR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O0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FmRixDQURGO0FBb0JELEM7Ozs7Ozs7Ozs7O0FDN0REO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNIQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxnQyIsImZpbGUiOiJwYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2hlYWQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi90by1iYXNlLTY0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIpOyIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVdpbmRvd1NpemUoKSB7XG4gICAgY29uc3QgaXNDbGllbnQgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JztcbiAgXG4gICAgZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBpc0NsaWVudCA/IHdpbmRvdy5pbm5lcldpZHRoIDogdW5kZWZpbmVkLFxuICAgICAgICBoZWlnaHQ6IGlzQ2xpZW50ID8gd2luZG93LmlubmVySGVpZ2h0IDogdW5kZWZpbmVkXG4gICAgICB9O1xuICAgIH1cbiAgXG4gICAgY29uc3QgW3dpbmRvd1NpemUsIHNldFdpbmRvd1NpemVdID0gdXNlU3RhdGUoZ2V0U2l6ZSk7XG4gIFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIWlzQ2xpZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZnVuY3Rpb24gaGFuZGxlUmVzaXplKCkge1xuICAgICAgICBzZXRXaW5kb3dTaXplKGdldFNpemUoKSk7XG4gICAgICB9XG4gIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgfSwgW10pOyAvLyBFbXB0eSBhcnJheSBlbnN1cmVzIHRoYXQgZWZmZWN0IGlzIG9ubHkgcnVuIG9uIG1vdW50IGFuZCB1bm1vdW50XG4gIFxuICAgIHJldHVybiB3aW5kb3dTaXplO1xuICB9IiwiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vbGF5b3V0Lm1vZHVsZS5jc3MnXHJcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9zZWFyY2gnO1xyXG5pbXBvcnQge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IE1vdmllQmFja2Ryb3AgZnJvbSAnLi9tb3ZpZUJhY2tkcm9wJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcclxuaW1wb3J0IHVzZVdpbmRvd1NpemUgZnJvbSAnLi9ob29rcy9XaW5kb3dTaXplJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiwgaG9tZSwgc2VhcmNoRW5hYmxlZCwgc2VydmVyLCByZWxhdGl2ZSwgc2VydmVyVG9rZW59KSB7XHJcbiAgY29uc3Qgd2luZG93U2l6ZSA9IHVzZVdpbmRvd1NpemUoKTtcclxuICBjb25zdCBbc2VhcmNoUmVzdWx0cywgc2V0U2VhcmNoUmVzdWx0c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2lzU2VhcmNoaW5nLCBzZXRJc1NlYXJjaGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgbGV0IGN1cnJlbnRSZXN1bHRzID0gW107XHJcbiAgbGV0IGNvdW50ID0gMDtcclxuICBzZWFyY2hFbmFibGVkID0gc2VhcmNoRW5hYmxlZCA9PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRydWU7XHJcblxyXG4gIGNvbnN0IHNlbGVjdE1vdmllID0gKGlkKSA9PiB7XHJcbiAgICAgIFJvdXRlci5wdXNoKGAvc2VydmVyLyR7c2VydmVyLnNlcnZlcl9pZH0vbW92aWVzL3ZpZGVvLyR7aWR9YCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzZWxlY3RTaG93ID0gKGlkKSA9PiB7XHJcbiAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L3Nob3dzL3ZpZGVvLyR7aWR9YCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvblNlYXJjaCA9IChyZXN1bHQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGVuYWJsZWQgXCIgKyBzZWFyY2hFbmFibGVkKVxyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgbGV0IGVsZW1lbnRzID0gW11cclxuICAgICAgZm9yIChsZXQgY29udGVudCBvZiByZXN1bHQpIHtcclxuICAgICAgICAgIGxldCBpbWc7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBjb250ZW50LmltYWdlcykge1xyXG4gICAgICAgICAgICAgIGlmIChpbWFnZS50eXBlID09PSAnQkFDS0RST1AnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGltZyA9IGltYWdlLnBhdGggIT09ICdub19pbWFnZScgPyBgaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzUwMC8ke2ltYWdlLnBhdGh9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ21vdmllJykge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBrZXk9e2NvdW50fSBpZD17Y29udGVudC5pZH0gdGl0bGU9e2NvbnRlbnQudGl0bGV9IG92ZXJ2aWV3PXtjb250ZW50Lm92ZXJ2aWV3fSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKGNvbnRlbnQuaWQpfT48L01vdmllQmFja2Ryb3A+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ3NlcmllJykge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBrZXk9e2NvdW50fSBpZD17Y29udGVudC5pZH0gdGl0bGU9e2NvbnRlbnQudGl0bGV9IG92ZXJ2aWV3PXtjb250ZW50Lm92ZXJ2aWV3fSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdFNob3coY29udGVudC5pZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICAgIHNldElzU2VhcmNoaW5nKHRydWUpO1xyXG4gICAgICBzZXRTZWFyY2hSZXN1bHRzKGVsZW1lbnRzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICBzZXRJc1NlYXJjaGluZyhmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzY3JvbGxMZWZ0ID0gKGlkKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc2Nyb2xsTGVmdCAtPSAod2luZG93LmlubmVyV2lkdGgpKjAuODtcclxuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgKyAxKTtcclxuICB9XHJcbiAgY29uc3Qgc2Nyb2xsUmlnaHQgPSAoaWQpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnNjcm9sbExlZnQgKz0gKHdpbmRvdy5pbm5lcldpZHRoKSowLjg7XHJcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5zY3JvbGxYLCB3aW5kb3cuc2Nyb2xsWSArIDEpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIFxyXG4gICAgICAgIHR5cGU9XCJpbWFnZS9wbmdcIiBcclxuICAgICAgICBocmVmPVwiLi4vcHVibGljL2ltYWdlcy9mYXZpY29uLnBuZ1wiIC8+XHJcbiAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRAMzAwJmRpc3BsYXk9c3dhcFwiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxoZWFkZXIgc3R5bGU9e3JlbGF0aXZlICE9PSB1bmRlZmluZWQgPyB7cG9zaXRpb246ICdyZWxhdGl2ZSd9IDoge319PlxyXG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPXtzdHlsZXMubG9nb30gc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvbG9nby5wbmdgfSBsYXlvdXQ9XCJmaWxsXCI+PC9pbWc+XHJcbiAgICAgICAge3NlYXJjaEVuYWJsZWQgJiZcclxuICAgICAgICAgIDxTZWFyY2ggb25DbG9zZT17KCkgPT4gb25DbG9zZSgpfSBzZWFyY2hFbmFibGVkPXtzZWFyY2hFbmFibGVkfSBzZXJ2ZXI9e3NlcnZlcn0gc2VydmVyVG9rZW49e3NlcnZlclRva2VufSBvblNlYXJjaD17KHJlc3VsdCkgPT4gb25TZWFyY2gocmVzdWx0KX0+PC9TZWFyY2g+fVxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICAge2lzU2VhcmNoaW5nICYmXHJcbiAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJywgdG9wOiAnMTE1cHgnfX0+XHJcbiAgICAgICAgICA8aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZScsIG1hcmdpbjogJzAgMCAxNXB4IDE1cHgnLCBjb2xvcjogJ3doaXRlJ319PlPDtmtyZXN1bHRhdDwvaDI+ICBcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNlYXJjaFJlc3VsdEJveH0+XHJcbiAgICAgICAgICA8ZGl2IGlkPVwic2VhcmNoUm93XCIgY2xhc3NOYW1lPXtzdHlsZXMuU2VhcmNoUmVzdWx0fT5cclxuICAgICAgICAgICAge3NlYXJjaFJlc3VsdHN9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtzZWFyY2hSZXN1bHRzLmxlbmd0aCAqIDQ4MCA+IHdpbmRvd1NpemUud2lkdGggJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ3NlYXJjaFJvdycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9sZWZ0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCdzZWFyY2hSb3cnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvcmlnaHQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICB9XHJcblxyXG4gICAgICB7IWlzU2VhcmNoaW5nICYmXHJcbiAgICAgICAgPG1haW4+e2NoaWxkcmVufTwvbWFpbj5cclxuICAgICAgfVxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59IiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiU2VhcmNoUmVzdWx0XCI6IFwibGF5b3V0X1NlYXJjaFJlc3VsdF9fOHV3UVdcIixcblx0XCJzZWFyY2hSZXN1bHRCb3hcIjogXCJsYXlvdXRfc2VhcmNoUmVzdWx0Qm94X18ydUVEbFwiLFxuXHRcInNjcm9sbEJ1dHRvblwiOiBcImxheW91dF9zY3JvbGxCdXR0b25fXzFET1NVXCIsXG5cdFwibG9nb1wiOiBcImxheW91dF9sb2dvX19FS0ozZFwiXG59O1xuIiwiaW1wb3J0IHN0eWxlIGZyb20gJy4vbW92aWVCYWNrZHJvcC5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHZhbGlkYXRlU2VydmVyQWNjZXNzIGZyb20gJy4uL2xpYi92YWxpZGF0ZVNlcnZlckFjY2Vzcyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aWVCYWNrZHJvcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gcHJvcHMudGl0bGU7XHJcbiAgICAgICAgdGhpcy5vdmVydmlldyA9IHByb3BzLm92ZXJ2aWV3O1xyXG4gICAgICAgIHRoaXMucG9zdGVyID0gcHJvcHMucG9zdGVyXHJcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcHJvcHMucnVudGltZTtcclxuICAgICAgICB0aGlzLmJhY2tkcm9wID0gcHJvcHMuYmFja2Ryb3A7XHJcbiAgICAgICAgdGhpcy5pZCA9IHByb3BzLmlkO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHByb3BzLnRpbWUgPyBwcm9wcy50aW1lIDogbnVsbDtcclxuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBwcm9wcy5ydW50aW1lID8gcHJvcHMucnVudGltZSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXJrQXNEb25lQnV0dG9uID0gcHJvcHMubWFya0FzRG9uZUJ1dHRvbjtcclxuICAgICAgICB0aGlzLnNob3dUaXRsZSA9IHByb3BzLnNob3dUaXRsZTtcclxuICAgICAgICB0aGlzLm11bHRpcGxlUm93cyA9IHByb3BzLm11bHRpcGxlUm93cyA/IHByb3BzLm11bHRpcGxlUm93cyA6IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMubWFya0FzV2F0Y2hlZCA9IHRoaXMubWFya0FzV2F0Y2hlZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcmtBc1dhdGNoZWQoKSB7XHJcbiAgICAgICAgdmFsaWRhdGVTZXJ2ZXJBY2Nlc3Moc2VydmVyLCAoc2VydmVyVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgZmV0Y2goYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL21vdmllcy8ke2lkfS9zZXRXYXRjaGVkP3dhdGNoZWQ9dHJ1ZSZ0b2tlbj0ke3NlcnZlclRva2VufWApXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKHN0YXR1cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnVuTW91bnRNZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIE1BUktJTkcgQVMgV0FUQ0hFRDogXCIgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpdGxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7b3BhY2l0eTogJzEnfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJhY2tkcm9wU3R5bGUoKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJyR7dGhpcy5iYWNrZHJvcH0nKWBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVSb3dzKSB7XHJcbiAgICAgICAgICAgIHN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMjBweFwiO1xyXG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IFwiNDQ1cHhcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5pZCl9IGNsYXNzTmFtZT17c3R5bGUuYmFja2Ryb3B9IHN0eWxlPXt0aGlzLmdldEJhY2tkcm9wU3R5bGUoKX0+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtzdHlsZS50aXRsZX0gc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+e3RoaXMudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGUub3ZlcnZpZXd9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLm92ZXJ2aWV3LnN1YnN0cmluZygwLCAxNTApfXt0aGlzLm92ZXJ2aWV3Lmxlbmd0aCA+IDE1MCA/ICcuLi4nIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy50aW1lICE9IG51bGwgJiYgdGhpcy5ydW50aW1lICE9IG51bGwgJiZcclxuICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3MgY2xhc3NOYW1lPXtzdHlsZS5wcm9ncmVzc30gdmFsdWU9e3RoaXMudGltZX0gbWF4PXt0aGlzLnJ1bnRpbWV9PjwvcHJvZ3Jlc3M+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImJhY2tkcm9wXCI6IFwibW92aWVCYWNrZHJvcF9iYWNrZHJvcF9fMkFLNVdcIixcblx0XCJ0aXRsZVwiOiBcIm1vdmllQmFja2Ryb3BfdGl0bGVfX0dqMS10XCIsXG5cdFwib3ZlcnZpZXdcIjogXCJtb3ZpZUJhY2tkcm9wX292ZXJ2aWV3X18xUy1mYlwiLFxuXHRcInByb2dyZXNzXCI6IFwibW92aWVCYWNrZHJvcF9wcm9ncmVzc19fMWVFNnhcIixcblx0XCJzZXRBc1dhdGNoZWRcIjogXCJtb3ZpZUJhY2tkcm9wX3NldEFzV2F0Y2hlZF9fMjM0Q0lcIlxufTtcbiIsImltcG9ydCBTdHlsZSBmcm9tICcuL3NlYXJjaC5tb2R1bGUuY3NzJztcbmltcG9ydCBGb3JtIGZyb20gJ3JlYWN0LWJvb3RzdHJhcC9Gb3JtJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xuaW1wb3J0IHZhbGlkYXRlU2VydmVyQWNjZXNzIGZyb20gJy4uL2xpYi92YWxpZGF0ZVNlcnZlckFjY2Vzcyc7XG5pbXBvcnQgZGlkWW91TWVhbiBmcm9tICdkaWR5b3VtZWFuJztcbmRpZFlvdU1lYW4udGhyZXNob2xkID0gMC4xO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnNlcnZlciA9IHByb3BzLnNlcnZlcjtcbiAgICAgICAgdGhpcy5zZXJ2ZXJUb2tlbiA9IHByb3BzLnNlcnZlclRva2VuO1xuICAgICAgICB0aGlzLnNlcmllcyA9IFtdO1xuICAgICAgICB0aGlzLm1vdmllcyA9IFtdO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBwcm9wcy5zZWFyY2hFbmFibGVkO1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHRoaXMuc2VhcmNoLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbG9zZSA9IHByb3BzLm9uQ2xvc2U7XG4gICAgICAgIHRoaXMub25TZWFyY2ggPSBwcm9wcy5vblNlYXJjaDtcbiAgICAgICAgdGhpcy5kYXRhRG93bmxvYWRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdXNlZCB0byBnZXQgYWxsIHRoZSBtb3ZpZXMvc2VyaWVzIGZyb20gdGhlIHNlcnZlclxuICAgICAqL1xuICAgIGdldEFsbENvbnRlbnQoKSB7XG4gICAgICAgIHZhbGlkYXRlU2VydmVyQWNjZXNzKHRoaXMuc2VydmVyLCAoc2VydmVyVG9rZW4pID0+IHtcbiAgICAgICAgICAgIGZldGNoKGAke3RoaXMuc2VydmVyLnNlcnZlcl9pcH0vYXBpL2xpc3Q/dG9rZW49JHtzZXJ2ZXJUb2tlbn1gKVxuICAgICAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VyaWVzID0gY29udGVudC5zZXJpZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZXMgPSBjb250ZW50Lm1vdmllcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWFyY2goZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFEb3dubG9hZGVkICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5nZXRBbGxDb250ZW50KCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFEb3dubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAvL3RoaXMub25TZWFyY2goW10pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmb3VuZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBtb3ZpZSBvZiB0aGlzLm1vdmllcykge1xuICAgICAgICAgICAgaWYgKG1vdmllLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBtb3ZpZS50eXBlID0gJ21vdmllJ1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2gobW92aWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHNlcmllIG9mIHRoaXMuc2VyaWVzKSB7XG4gICAgICAgICAgICBpZiAoc2VyaWUudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIHNlcmllLnR5cGUgPSAnc2VyaWUnO1xuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goc2VyaWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGZvdW5kKTtcbiAgICAgICB0aGlzLm9uU2VhcmNoKGZvdW5kKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Rm9ybSBhdXRvQ29tcGxldGU9XCJvZmZcIiBjbGFzc05hbWU9e1N0eWxlLnNlYXJjaEZvcm19PlxuICAgICAgICAgICAgICAgIDxGb3JtLkNvbnRyb2wgb25JbnB1dD17dGhpcy5zZWFyY2h9IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTw7ZrLi5cIiAvPlxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICApXG4gICAgfVxufSIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInNlYXJjaEZvcm1cIjogXCJzZWFyY2hfc2VhcmNoRm9ybV9fMV9DVUFcIlxufTtcbiIsImltcG9ydCBzdHlsZSBmcm9tICcuL3NlcnZlckJveC5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlckJveCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmltZ1JlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJOYW1lID0gcHJvcHMubmFtZTtcclxuICAgICAgICB0aGlzLnNlcnZlckFkcmVzcyA9IHByb3BzLmFkcmVzcztcclxuICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hXaXRoVGltZW91dCh1cmwsIG9wdGlvbnMsIHRpbWVvdXQgPSA1MDAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmFjZShbXHJcbiAgICAgICAgICAgIGZldGNoKHVybCwgb3B0aW9ucyksXHJcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcigndGltZW91dCcpKSwgdGltZW91dCkpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGF0dXMoKSB7XHJcbiAgICAgICAgdGhpcy5mZXRjaFdpdGhUaW1lb3V0KGAke3RoaXMuc2VydmVyQWRyZXNzfS9hcGkvcGluZ2AsIHt9LCA1MDAwKSAgICBcclxuICAgICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHNvIHRoYXQgdGhlIHNlcnZlciB3ZSBhcmUgcGluZ2luZyBpcyByZXNwb25kaW5nIHRvIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ1JlZi5jdXJyZW50LmNsYXNzTGlzdC5hZGQoc3R5bGUuc3RhdHVzU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ1JlZi5jdXJyZW50LmNsYXNzTGlzdC5hZGQoc3R5bGUuc3RhdHVzRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nUmVmLmN1cnJlbnQuY2xhc3NMaXN0LmFkZChzdHlsZS5zdGF0dXNFcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfSBjbGFzc05hbWU9e3N0eWxlLnNlcnZlcn0+XHJcbiAgICAgICAgICAgICAgICA8aDU+e3RoaXMuc2VydmVyTmFtZX08L2g1PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlLnN0YXR1c0JveH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyByZWY9e3RoaXMuaW1nUmVmfSBjbGFzc05hbWU9e3N0eWxlLnN0YXR1c0ltYWdlfSB3aWR0aD1cIjQwXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5zZXJ2ZXJBZHJlc3N9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwic2VydmVyXCI6IFwic2VydmVyQm94X3NlcnZlcl9fMWR0MUhcIixcblx0XCJzdGF0dXNCb3hcIjogXCJzZXJ2ZXJCb3hfc3RhdHVzQm94X18yajhFN1wiLFxuXHRcInN0YXR1c0ltYWdlXCI6IFwic2VydmVyQm94X3N0YXR1c0ltYWdlX18xQUR1VVwiLFxuXHRcInN0YXR1c1N1Y2Nlc3NcIjogXCJzZXJ2ZXJCb3hfc3RhdHVzU3VjY2Vzc19fMTcwQVRcIixcblx0XCJzdGF0dXNFcnJvclwiOiBcInNlcnZlckJveF9zdGF0dXNFcnJvcl9fM0Y4NGxcIlxufTtcbiIsInZhciBBc3luY0xvY2sgPSByZXF1aXJlKCdub2RlLWFzeW5jLWxvY2tzJykuQXN5bmNMb2NrO1xuY29uc3QgbG9jayA9IG5ldyBBc3luY0xvY2soKTtcbm1vZHVsZS5leHBvcnRzID0gbG9jazsiLCJpbXBvcnQgY29va2llIGZyb20gJ2pzLWNvb2tpZSc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcbi8vIFdlIGhhdmUgdG8gdXNlIGEgbG9jayB0byBhdm9pZCByYWNlLWNvbmRpdGlvbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY2FsbHMgdG8gdGhpcyBmdW5jdGlvbiBhdCB0aGUgc2FtZSB0aW1lXG5pbXBvcnQgbG9jayBmcm9tICcuL2xvY2snO1xuXG5jb25zdCBDT09LSUVfU0VUVElOR1MgPSB7XG4gICAgZXhwaXJlczogN1xufVxuXG5jb25zdCB2YWxpZGF0ZVNlcnZlckFjY2VzcyA9IGFzeW5jIChzZXJ2ZXIsIGNiKSA9PiB7XG4gICAgbG9jay5lbnRlcihhc3luYyBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgbGV0ICAgbWFpbkFjY2Vzc1Rva2VuICAgICAgICAgID0gY29va2llLmdldCgndG9rZW4nKTtcbiAgICAgICAgY29uc3QgbWFpblJlZnJlc2hUb2tlbiAgICAgICAgID0gY29va2llLmdldCgncmVmcmVzaFRva2VuJyk7XG4gICAgICAgIGNvbnN0IG1haW5BY2Nlc3NUb2tlblZhbGlkVG8gICA9IGNvb2tpZS5nZXQoJ3ZhbGlkVG8nKTtcbiAgICAgICAgY29uc3Qgc2VydmVyQWNjZXNzVG9rZW4gICAgICAgID0gY29va2llLmdldCgnc2VydmVyVG9rZW4nKTtcbiAgICAgICAgY29uc3Qgc2VydmVyQWNjZXNzVG9rZW5WYWxpZFRvID0gY29va2llLmdldCgnc2VydmVyVmFsaWRUbycpO1xuICAgIFxuICAgICAgICAvLyBGYWlsLXNhZmUsIHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiBzaW5jZSB3ZSBjaGVjayBpdCBzZXJ2ZXItc2lkZSBpbiBfYXBwLmpzXG4gICAgICAgIGlmICghbWFpblRva2VuRXhpc3QoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYWluIHRva2VuIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgICAgICAgICAgUm91dGVyLnB1c2goJy8nKTtcbiAgICAgICAgICAgIGxvY2subGVhdmUodG9rZW4pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lICAgICAgICAgID0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgIGNvbnN0IG1haW5BY2Nlc3NUb2tlblZhbGlkID0gKG1haW5BY2Nlc3NUb2tlblZhbGlkVG8gLSBjdXJyZW50VGltZSkgPj0gNjA7XG4gICAgXG4gICAgICAgIC8vIElmIHdlIGhhdmUgdG8gZ2V0IGEgbmV3IG1haW5Ub2tlblxuICAgICAgICBpZiAoIW1haW5BY2Nlc3NUb2tlblZhbGlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1haW4gdG9rZW4gaXMgZXhwaXJlZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Rva2VuSW5mbyA9IGF3YWl0IGdldE5ld01haW5Ub2tlbihtYWluQWNjZXNzVG9rZW4sIG1haW5SZWZyZXNoVG9rZW4pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3VG9rZW5JbmZvKTtcbiAgICAgICAgICAgIGlmIChuZXdUb2tlbkluZm8uc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBuZXcgbWFpbiB0b2tlblwiKVxuICAgICAgICAgICAgICAgIHNldE1haW5Ub2tlbihuZXdUb2tlbkluZm8udG9rZW4sIG5ld1Rva2VuSW5mby5yZWZyZXNoVG9rZW4sIG5ld1Rva2VuSW5mby52YWxpZFRvKTtcbiAgICAgICAgICAgICAgICBtYWluQWNjZXNzVG9rZW4gPSBuZXdUb2tlbkluZm8udG9rZW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGRuJ3QgZ2V0IGEgbmV3IG1haW4gdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgLy8gV2UgY291bGRuJ3QgZ2V0IGEgbmV3IHRva2VuIChyZWZyZXNoLXRva2VuIHByb2JhYmx5IHRvbyBvbGQpXG4gICAgICAgICAgICAgICAgbG9jay5sZWF2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgUm91dGVyLnB1c2goJy8nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gSWYgd2UgaGF2ZW4ndCBzYXZlZCBhIHNlcnZlclRva2VuXG4gICAgICAgIGlmICghc2VydmVyVG9rZW5FeGlzdCgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNlcnZlclRva2VuIHNhdmVkXCIpO1xuICAgICAgICAgICAgZ2V0U2VydmVyVG9rZW4obWFpbkFjY2Vzc1Rva2VuLCBzZXJ2ZXIpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR290IGEgc2VydmVyVG9rZW5cIik7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc3VjY2Vzc2Z1bGx5IGdvdCBhIG5ldyB0b2tlblxuICAgICAgICAgICAgICAgIHNldFNlcnZlclRva2VuKHJlc3VsdC50b2tlbiwgcmVzdWx0LnZhbGlkVG8pO1xuICAgICAgICAgICAgICAgIGxvY2subGVhdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgIGNiKHJlc3VsdC50b2tlbik7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ291bGRuJ3QgZ2V0IGEgc2VydmVyVG9rZW5cIik7XG4gICAgICAgICAgICAgICAgLy8gV2UgY291bGRuJ3QgZ2V0IGEgbmV3IHRva2VuXG4gICAgICAgICAgICAgICAgbG9jay5sZWF2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgUm91dGVyLnB1c2goJy8nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyQWNjZXNzVG9rZW5WYWxpZCA9IChzZXJ2ZXJBY2Nlc3NUb2tlblZhbGlkVG8gLSBjdXJyZW50VGltZSkgPj0gNjA7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHRvIGdldCBhIG5ldyBzZXJ2ZXJUb2tlblxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXJBY2Nlc3NUb2tlblZhbGlkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXJ2ZXJUb2tlbiB3YXMgbm90IHZhbGlkXCIpO1xuICAgICAgICAgICAgICAgIGdldFNlcnZlclRva2VuKG1haW5BY2Nlc3NUb2tlbiwgc2VydmVyKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHN1Y2Nlc3NmdWxseSBnb3QgYSBuZXcgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3QgYSBuZXcgc2VydmVyVG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIHNldFNlcnZlclRva2VuKHJlc3VsdC50b2tlbiwgcmVzdWx0LnZhbGlkVG8pO1xuICAgICAgICAgICAgICAgICAgICBsb2NrLmxlYXZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0LnRva2VuKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjb3VsZG4ndCBnZXQgYSBuZXcgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VsZG4ndCBnZXQgYSBuZXcgc2VydmVyVG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2subGVhdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBSb3V0ZXIucHVzaCgnLycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgdmFsaWQgbWFpblRva2VuIGFuZCBhIHZhbGlkIHNlcnZlclRva2VuXG4gICAgICAgICAgICAgICAgbG9jay5sZWF2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgY2Ioc2VydmVyQWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxufVxuXG5jb25zdCBnZXROZXdNYWluVG9rZW4gPSBhc3luYyAoYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbikgPT4ge1xuICAgIGNvbnN0IHJlcSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2FwaS9hdXRoL3JlZnJlc2hUb2tlbmAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgcmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW5cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IG5ld1Rva2VuSW5mbyA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgcmV0dXJuIG5ld1Rva2VuSW5mbztcbn1cblxuY29uc3QgZ2V0U2VydmVyVG9rZW4gPSAobWFpblRva2VuLCBzZXJ2ZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzZXJ2ZXIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZldGNoKGAke3NlcnZlci5zZXJ2ZXJfaXB9L2FwaS9hdXRoL3ZhbGlkYXRlYCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdG9rZW46IG1haW5Ub2tlblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHIpID0+IHIuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IGRhdGEudG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkVG86IGRhdGEudmFsaWRUb1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHNlcnZlclRva2VuRXhpc3QgPSAoKSA9PiB7XG4gICAgbGV0IGFjY2Vzc1Rva2VuICA9IGNvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyk7XG4gICAgbGV0IHZhbGlkVG8gICAgICA9IGNvb2tpZS5nZXQoJ3NlcnZlclZhbGlkVG8nKTtcbiAgICByZXR1cm4gYWNjZXNzVG9rZW4gICE9IG51bGwgICYmIGFjY2Vzc1Rva2VuICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICB2YWxpZFRvICAgICAgIT0gbnVsbCAmJiB2YWxpZFRvICAgICAgIT0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBtYWluVG9rZW5FeGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiAgPSBjb29raWUuZ2V0KCd0b2tlbicpO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGNvb2tpZS5nZXQoJ3JlZnJlc2hUb2tlbicpO1xuICAgIGNvbnN0IHZhbGlkVG8gICAgICA9IGNvb2tpZS5nZXQoJ3ZhbGlkVG8nKTtcbiAgICByZXR1cm4gYWNjZXNzVG9rZW4gICE9IG51bGwgJiYgYWNjZXNzVG9rZW4gICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICByZWZyZXNoVG9rZW4gIT0gbnVsbCAmJiByZWZyZXNoVG9rZW4gIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgIHZhbGlkVG8gICAgICAhPSBudWxsICYmIHZhbGlkVG8gICAgICAhPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHNldFNlcnZlclRva2VuID0gKHRva2VuLCB2YWxpZFRvKSA9PiB7XG4gICAgY29va2llLnNldCgnc2VydmVyVG9rZW4nLCB0b2tlbiwgQ09PS0lFX1NFVFRJTkdTKTtcbiAgICBjb29raWUuc2V0KCdzZXJ2ZXJWYWxpZFRvJywgdmFsaWRUbywgQ09PS0lFX1NFVFRJTkdTKTtcbn0gXG5cbmNvbnN0IHNldE1haW5Ub2tlbiA9ICh0b2tlbiwgcmVmcmVzaFRva2VuLCB2YWxpZFRvKSA9PiB7XG4gICAgY29va2llLnNldCgndG9rZW4nLCB0b2tlbiwgQ09PS0lFX1NFVFRJTkdTKTtcbiAgICBjb29raWUuc2V0KCdyZWZyZXNoVG9rZW4nLCByZWZyZXNoVG9rZW4sIENPT0tJRV9TRVRUSU5HUyk7XG4gICAgY29va2llLnNldCgndmFsaWRUbycsIHZhbGlkVG8sIENPT0tJRV9TRVRUSU5HUyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVTZXJ2ZXJBY2Nlc3M7IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEhlYWQgZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL2hlYWQnXG5pbXBvcnQgeyB0b0Jhc2U2NCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi90by1iYXNlLTY0J1xuaW1wb3J0IHtcbiAgSW1hZ2VDb25maWcsXG4gIGltYWdlQ29uZmlnRGVmYXVsdCxcbiAgTG9hZGVyVmFsdWUsXG4gIFZBTElEX0xPQURFUlMsXG59IGZyb20gJy4uL25leHQtc2VydmVyL3NlcnZlci9pbWFnZS1jb25maWcnXG5pbXBvcnQgeyB1c2VJbnRlcnNlY3Rpb24gfSBmcm9tICcuL3VzZS1pbnRlcnNlY3Rpb24nXG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICA7KGdsb2JhbCBhcyBhbnkpLl9fTkVYVF9JTUFHRV9JTVBPUlRFRCA9IHRydWVcbn1cblxuY29uc3QgVkFMSURfTE9BRElOR19WQUxVRVMgPSBbJ2xhenknLCAnZWFnZXInLCB1bmRlZmluZWRdIGFzIGNvbnN0XG50eXBlIExvYWRpbmdWYWx1ZSA9IHR5cGVvZiBWQUxJRF9MT0FESU5HX1ZBTFVFU1tudW1iZXJdXG5cbmV4cG9ydCB0eXBlIEltYWdlTG9hZGVyID0gKHJlc29sdmVyUHJvcHM6IEltYWdlTG9hZGVyUHJvcHMpID0+IHN0cmluZ1xuXG5leHBvcnQgdHlwZSBJbWFnZUxvYWRlclByb3BzID0ge1xuICBzcmM6IHN0cmluZ1xuICB3aWR0aDogbnVtYmVyXG4gIHF1YWxpdHk/OiBudW1iZXJcbn1cblxudHlwZSBEZWZhdWx0SW1hZ2VMb2FkZXJQcm9wcyA9IEltYWdlTG9hZGVyUHJvcHMgJiB7IHJvb3Q6IHN0cmluZyB9XG5cbmNvbnN0IGxvYWRlcnMgPSBuZXcgTWFwPFxuICBMb2FkZXJWYWx1ZSxcbiAgKHByb3BzOiBEZWZhdWx0SW1hZ2VMb2FkZXJQcm9wcykgPT4gc3RyaW5nXG4+KFtcbiAgWydpbWdpeCcsIGltZ2l4TG9hZGVyXSxcbiAgWydjbG91ZGluYXJ5JywgY2xvdWRpbmFyeUxvYWRlcl0sXG4gIFsnYWthbWFpJywgYWthbWFpTG9hZGVyXSxcbiAgWydkZWZhdWx0JywgZGVmYXVsdExvYWRlcl0sXG5dKVxuXG5jb25zdCBWQUxJRF9MQVlPVVRfVkFMVUVTID0gW1xuICAnZmlsbCcsXG4gICdmaXhlZCcsXG4gICdpbnRyaW5zaWMnLFxuICAncmVzcG9uc2l2ZScsXG4gIHVuZGVmaW5lZCxcbl0gYXMgY29uc3RcbnR5cGUgTGF5b3V0VmFsdWUgPSB0eXBlb2YgVkFMSURfTEFZT1VUX1ZBTFVFU1tudW1iZXJdXG5cbnR5cGUgSW1nRWxlbWVudFN0eWxlID0gTm9uTnVsbGFibGU8SlNYLkludHJpbnNpY0VsZW1lbnRzWydpbWcnXVsnc3R5bGUnXT5cblxuZXhwb3J0IHR5cGUgSW1hZ2VQcm9wcyA9IE9taXQ8XG4gIEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW1nJ10sXG4gICdzcmMnIHwgJ3NyY1NldCcgfCAncmVmJyB8ICd3aWR0aCcgfCAnaGVpZ2h0JyB8ICdsb2FkaW5nJyB8ICdzdHlsZSdcbj4gJiB7XG4gIHNyYzogc3RyaW5nXG4gIGxvYWRlcj86IEltYWdlTG9hZGVyXG4gIHF1YWxpdHk/OiBudW1iZXIgfCBzdHJpbmdcbiAgcHJpb3JpdHk/OiBib29sZWFuXG4gIGxvYWRpbmc/OiBMb2FkaW5nVmFsdWVcbiAgdW5vcHRpbWl6ZWQ/OiBib29sZWFuXG4gIG9iamVjdEZpdD86IEltZ0VsZW1lbnRTdHlsZVsnb2JqZWN0Rml0J11cbiAgb2JqZWN0UG9zaXRpb24/OiBJbWdFbGVtZW50U3R5bGVbJ29iamVjdFBvc2l0aW9uJ11cbn0gJiAoXG4gICAgfCB7XG4gICAgICAgIHdpZHRoPzogbmV2ZXJcbiAgICAgICAgaGVpZ2h0PzogbmV2ZXJcbiAgICAgICAgLyoqIEBkZXByZWNhdGVkIFVzZSBgbGF5b3V0PVwiZmlsbFwiYCBpbnN0ZWFkICovXG4gICAgICAgIHVuc2l6ZWQ6IHRydWVcbiAgICAgIH1cbiAgICB8IHsgd2lkdGg/OiBuZXZlcjsgaGVpZ2h0PzogbmV2ZXI7IGxheW91dDogJ2ZpbGwnIH1cbiAgICB8IHtcbiAgICAgICAgd2lkdGg6IG51bWJlciB8IHN0cmluZ1xuICAgICAgICBoZWlnaHQ6IG51bWJlciB8IHN0cmluZ1xuICAgICAgICBsYXlvdXQ/OiBFeGNsdWRlPExheW91dFZhbHVlLCAnZmlsbCc+XG4gICAgICB9XG4gIClcblxuY29uc3Qge1xuICBkZXZpY2VTaXplczogY29uZmlnRGV2aWNlU2l6ZXMsXG4gIGltYWdlU2l6ZXM6IGNvbmZpZ0ltYWdlU2l6ZXMsXG4gIGxvYWRlcjogY29uZmlnTG9hZGVyLFxuICBwYXRoOiBjb25maWdQYXRoLFxuICBkb21haW5zOiBjb25maWdEb21haW5zLFxufSA9XG4gICgocHJvY2Vzcy5lbnYuX19ORVhUX0lNQUdFX09QVFMgYXMgYW55KSBhcyBJbWFnZUNvbmZpZykgfHwgaW1hZ2VDb25maWdEZWZhdWx0XG4vLyBzb3J0IHNtYWxsZXN0IHRvIGxhcmdlc3RcbmNvbnN0IGFsbFNpemVzID0gWy4uLmNvbmZpZ0RldmljZVNpemVzLCAuLi5jb25maWdJbWFnZVNpemVzXVxuY29uZmlnRGV2aWNlU2l6ZXMuc29ydCgoYSwgYikgPT4gYSAtIGIpXG5hbGxTaXplcy5zb3J0KChhLCBiKSA9PiBhIC0gYilcblxuZnVuY3Rpb24gZ2V0V2lkdGhzKFxuICB3aWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICBsYXlvdXQ6IExheW91dFZhbHVlLFxuICBzaXplczogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiB7IHdpZHRoczogbnVtYmVyW107IGtpbmQ6ICd3JyB8ICd4JyB9IHtcbiAgaWYgKHNpemVzICYmIChsYXlvdXQgPT09ICdmaWxsJyB8fCBsYXlvdXQgPT09ICdyZXNwb25zaXZlJykpIHtcbiAgICAvLyBGaW5kIGFsbCB0aGUgXCJ2d1wiIHBlcmNlbnQgc2l6ZXMgdXNlZCBpbiB0aGUgc2l6ZXMgcHJvcFxuICAgIGNvbnN0IHBlcmNlbnRTaXplcyA9IFsuLi5zaXplcy5tYXRjaEFsbCgvKF58XFxzKSgxP1xcZD9cXGQpdncvZyldLm1hcCgobSkgPT5cbiAgICAgIHBhcnNlSW50KG1bMl0pXG4gICAgKVxuICAgIGlmIChwZXJjZW50U2l6ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzbWFsbGVzdFJhdGlvID0gTWF0aC5taW4oLi4ucGVyY2VudFNpemVzKSAqIDAuMDFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoczogYWxsU2l6ZXMuZmlsdGVyKFxuICAgICAgICAgIChzKSA9PiBzID49IGNvbmZpZ0RldmljZVNpemVzWzBdICogc21hbGxlc3RSYXRpb1xuICAgICAgICApLFxuICAgICAgICBraW5kOiAndycsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHdpZHRoczogYWxsU2l6ZXMsIGtpbmQ6ICd3JyB9XG4gIH1cbiAgaWYgKFxuICAgIHR5cGVvZiB3aWR0aCAhPT0gJ251bWJlcicgfHxcbiAgICBsYXlvdXQgPT09ICdmaWxsJyB8fFxuICAgIGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnXG4gICkge1xuICAgIHJldHVybiB7IHdpZHRoczogY29uZmlnRGV2aWNlU2l6ZXMsIGtpbmQ6ICd3JyB9XG4gIH1cblxuICBjb25zdCB3aWR0aHMgPSBbXG4gICAgLi4ubmV3IFNldChcbiAgICAgIC8vID4gVGhpcyBtZWFucyB0aGF0IG1vc3QgT0xFRCBzY3JlZW5zIHRoYXQgc2F5IHRoZXkgYXJlIDN4IHJlc29sdXRpb24sXG4gICAgICAvLyA+IGFyZSBhY3R1YWxseSAzeCBpbiB0aGUgZ3JlZW4gY29sb3IsIGJ1dCBvbmx5IDEuNXggaW4gdGhlIHJlZCBhbmRcbiAgICAgIC8vID4gYmx1ZSBjb2xvcnMuIFNob3dpbmcgYSAzeCByZXNvbHV0aW9uIGltYWdlIGluIHRoZSBhcHAgdnMgYSAyeFxuICAgICAgLy8gPiByZXNvbHV0aW9uIGltYWdlIHdpbGwgYmUgdmlzdWFsbHkgdGhlIHNhbWUsIHRob3VnaCB0aGUgM3ggaW1hZ2VcbiAgICAgIC8vID4gdGFrZXMgc2lnbmlmaWNhbnRseSBtb3JlIGRhdGEuIEV2ZW4gdHJ1ZSAzeCByZXNvbHV0aW9uIHNjcmVlbnMgYXJlXG4gICAgICAvLyA+IHdhc3RlZnVsIGFzIHRoZSBodW1hbiBleWUgY2Fubm90IHNlZSB0aGF0IGxldmVsIG9mIGRldGFpbCB3aXRob3V0XG4gICAgICAvLyA+IHNvbWV0aGluZyBsaWtlIGEgbWFnbmlmeWluZyBnbGFzcy5cbiAgICAgIC8vIGh0dHBzOi8vYmxvZy50d2l0dGVyLmNvbS9lbmdpbmVlcmluZy9lbl91cy90b3BpY3MvaW5mcmFzdHJ1Y3R1cmUvMjAxOS9jYXBwaW5nLWltYWdlLWZpZGVsaXR5LW9uLXVsdHJhLWhpZ2gtcmVzb2x1dGlvbi1kZXZpY2VzLmh0bWxcbiAgICAgIFt3aWR0aCwgd2lkdGggKiAyIC8qLCB3aWR0aCAqIDMqL10ubWFwKFxuICAgICAgICAodykgPT4gYWxsU2l6ZXMuZmluZCgocCkgPT4gcCA+PSB3KSB8fCBhbGxTaXplc1thbGxTaXplcy5sZW5ndGggLSAxXVxuICAgICAgKVxuICAgICksXG4gIF1cbiAgcmV0dXJuIHsgd2lkdGhzLCBraW5kOiAneCcgfVxufVxuXG50eXBlIEdlbkltZ0F0dHJzRGF0YSA9IHtcbiAgc3JjOiBzdHJpbmdcbiAgdW5vcHRpbWl6ZWQ6IGJvb2xlYW5cbiAgbGF5b3V0OiBMYXlvdXRWYWx1ZVxuICBsb2FkZXI6IEltYWdlTG9hZGVyXG4gIHdpZHRoPzogbnVtYmVyXG4gIHF1YWxpdHk/OiBudW1iZXJcbiAgc2l6ZXM/OiBzdHJpbmdcbn1cblxudHlwZSBHZW5JbWdBdHRyc1Jlc3VsdCA9IHtcbiAgc3JjOiBzdHJpbmdcbiAgc3JjU2V0OiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgc2l6ZXM6IHN0cmluZyB8IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUltZ0F0dHJzKHtcbiAgc3JjLFxuICB1bm9wdGltaXplZCxcbiAgbGF5b3V0LFxuICB3aWR0aCxcbiAgcXVhbGl0eSxcbiAgc2l6ZXMsXG4gIGxvYWRlcixcbn06IEdlbkltZ0F0dHJzRGF0YSk6IEdlbkltZ0F0dHJzUmVzdWx0IHtcbiAgaWYgKHVub3B0aW1pemVkKSB7XG4gICAgcmV0dXJuIHsgc3JjLCBzcmNTZXQ6IHVuZGVmaW5lZCwgc2l6ZXM6IHVuZGVmaW5lZCB9XG4gIH1cblxuICBjb25zdCB7IHdpZHRocywga2luZCB9ID0gZ2V0V2lkdGhzKHdpZHRoLCBsYXlvdXQsIHNpemVzKVxuICBjb25zdCBsYXN0ID0gd2lkdGhzLmxlbmd0aCAtIDFcblxuICByZXR1cm4ge1xuICAgIHNyYzogbG9hZGVyKHsgc3JjLCBxdWFsaXR5LCB3aWR0aDogd2lkdGhzW2xhc3RdIH0pLFxuICAgIHNpemVzOiAhc2l6ZXMgJiYga2luZCA9PT0gJ3cnID8gJzEwMHZ3JyA6IHNpemVzLFxuICAgIHNyY1NldDogd2lkdGhzXG4gICAgICAubWFwKFxuICAgICAgICAodywgaSkgPT5cbiAgICAgICAgICBgJHtsb2FkZXIoeyBzcmMsIHF1YWxpdHksIHdpZHRoOiB3IH0pfSAke1xuICAgICAgICAgICAga2luZCA9PT0gJ3cnID8gdyA6IGkgKyAxXG4gICAgICAgICAgfSR7a2luZH1gXG4gICAgICApXG4gICAgICAuam9pbignLCAnKSxcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRJbnQoeDogdW5rbm93bik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4geFxuICB9XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoeCwgMTApXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBkZWZhdWx0SW1hZ2VMb2FkZXIobG9hZGVyUHJvcHM6IEltYWdlTG9hZGVyUHJvcHMpIHtcbiAgY29uc3QgbG9hZCA9IGxvYWRlcnMuZ2V0KGNvbmZpZ0xvYWRlcilcbiAgaWYgKGxvYWQpIHtcbiAgICByZXR1cm4gbG9hZCh7IHJvb3Q6IGNvbmZpZ1BhdGgsIC4uLmxvYWRlclByb3BzIH0pXG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIGBVbmtub3duIFwibG9hZGVyXCIgZm91bmQgaW4gXCJuZXh0LmNvbmZpZy5qc1wiLiBFeHBlY3RlZDogJHtWQUxJRF9MT0FERVJTLmpvaW4oXG4gICAgICAnLCAnXG4gICAgKX0uIFJlY2VpdmVkOiAke2NvbmZpZ0xvYWRlcn1gXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW1hZ2Uoe1xuICBzcmMsXG4gIHNpemVzLFxuICB1bm9wdGltaXplZCA9IGZhbHNlLFxuICBwcmlvcml0eSA9IGZhbHNlLFxuICBsb2FkaW5nLFxuICBjbGFzc05hbWUsXG4gIHF1YWxpdHksXG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIG9iamVjdEZpdCxcbiAgb2JqZWN0UG9zaXRpb24sXG4gIGxvYWRlciA9IGRlZmF1bHRJbWFnZUxvYWRlcixcbiAgLi4uYWxsXG59OiBJbWFnZVByb3BzKSB7XG4gIGxldCByZXN0OiBQYXJ0aWFsPEltYWdlUHJvcHM+ID0gYWxsXG4gIGxldCBsYXlvdXQ6IE5vbk51bGxhYmxlPExheW91dFZhbHVlPiA9IHNpemVzID8gJ3Jlc3BvbnNpdmUnIDogJ2ludHJpbnNpYydcbiAgbGV0IHVuc2l6ZWQgPSBmYWxzZVxuICBpZiAoJ3Vuc2l6ZWQnIGluIHJlc3QpIHtcbiAgICB1bnNpemVkID0gQm9vbGVhbihyZXN0LnVuc2l6ZWQpXG4gICAgLy8gUmVtb3ZlIHByb3BlcnR5IHNvIGl0J3Mgbm90IHNwcmVhZCBpbnRvIGltYWdlOlxuICAgIGRlbGV0ZSByZXN0Wyd1bnNpemVkJ11cbiAgfSBlbHNlIGlmICgnbGF5b3V0JyBpbiByZXN0KSB7XG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBsYXlvdXQgaWYgdGhlIHVzZXIgc3BlY2lmaWVkIG9uZTpcbiAgICBpZiAocmVzdC5sYXlvdXQpIGxheW91dCA9IHJlc3QubGF5b3V0XG5cbiAgICAvLyBSZW1vdmUgcHJvcGVydHkgc28gaXQncyBub3Qgc3ByZWFkIGludG8gaW1hZ2U6XG4gICAgZGVsZXRlIHJlc3RbJ2xheW91dCddXG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmICghc3JjKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSBpcyBtaXNzaW5nIHJlcXVpcmVkIFwic3JjXCIgcHJvcGVydHkuIE1ha2Ugc3VyZSB5b3UgcGFzcyBcInNyY1wiIGluIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgeyB3aWR0aCwgaGVpZ2h0LCBxdWFsaXR5IH1cbiAgICAgICAgKX1gXG4gICAgICApXG4gICAgfVxuICAgIGlmICghVkFMSURfTEFZT1VUX1ZBTFVFUy5pbmNsdWRlcyhsYXlvdXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibGF5b3V0XCIgcHJvcGVydHkuIFByb3ZpZGVkIFwiJHtsYXlvdXR9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xBWU9VVF9WQUxVRVMubWFwKFxuICAgICAgICAgIFN0cmluZ1xuICAgICAgICApLmpvaW4oJywnKX0uYFxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoIVZBTElEX0xPQURJTkdfVkFMVUVTLmluY2x1ZGVzKGxvYWRpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibG9hZGluZ1wiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bG9hZGluZ31cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTE9BRElOR19WQUxVRVMubWFwKFxuICAgICAgICAgIFN0cmluZ1xuICAgICAgICApLmpvaW4oJywnKX0uYFxuICAgICAgKVxuICAgIH1cbiAgICBpZiAocHJpb3JpdHkgJiYgbG9hZGluZyA9PT0gJ2xhenknKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBib3RoIFwicHJpb3JpdHlcIiBhbmQgXCJsb2FkaW5nPSdsYXp5J1wiIHByb3BlcnRpZXMuIE9ubHkgb25lIHNob3VsZCBiZSB1c2VkLmBcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHVuc2l6ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGRlcHJlY2F0ZWQgXCJ1bnNpemVkXCIgcHJvcGVydHksIHdoaWNoIHdhcyByZW1vdmVkIGluIGZhdm9yIG9mIHRoZSBcImxheW91dD0nZmlsbCdcIiBwcm9wZXJ0eWBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBsZXQgaXNMYXp5ID1cbiAgICAhcHJpb3JpdHkgJiYgKGxvYWRpbmcgPT09ICdsYXp5JyB8fCB0eXBlb2YgbG9hZGluZyA9PT0gJ3VuZGVmaW5lZCcpXG4gIGlmIChzcmMgJiYgc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jhc2ljc19vZl9IVFRQL0RhdGFfVVJJc1xuICAgIHVub3B0aW1pemVkID0gdHJ1ZVxuICAgIGlzTGF6eSA9IGZhbHNlXG4gIH1cblxuICBjb25zdCBbc2V0UmVmLCBpc0ludGVyc2VjdGVkXSA9IHVzZUludGVyc2VjdGlvbjxIVE1MSW1hZ2VFbGVtZW50Pih7XG4gICAgcm9vdE1hcmdpbjogJzIwMHB4JyxcbiAgICBkaXNhYmxlZDogIWlzTGF6eSxcbiAgfSlcbiAgY29uc3QgaXNWaXNpYmxlID0gIWlzTGF6eSB8fCBpc0ludGVyc2VjdGVkXG5cbiAgY29uc3Qgd2lkdGhJbnQgPSBnZXRJbnQod2lkdGgpXG4gIGNvbnN0IGhlaWdodEludCA9IGdldEludChoZWlnaHQpXG4gIGNvbnN0IHF1YWxpdHlJbnQgPSBnZXRJbnQocXVhbGl0eSlcblxuICBsZXQgd3JhcHBlclN0eWxlOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddWydzdHlsZSddIHwgdW5kZWZpbmVkXG4gIGxldCBzaXplclN0eWxlOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddWydzdHlsZSddIHwgdW5kZWZpbmVkXG4gIGxldCBzaXplclN2Zzogc3RyaW5nIHwgdW5kZWZpbmVkXG4gIGxldCBpbWdTdHlsZTogSW1nRWxlbWVudFN0eWxlIHwgdW5kZWZpbmVkID0ge1xuICAgIHZpc2liaWxpdHk6IGlzVmlzaWJsZSA/ICdpbmhlcml0JyA6ICdoaWRkZW4nLFxuXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIHJpZ2h0OiAwLFxuXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgcGFkZGluZzogMCxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBtYXJnaW46ICdhdXRvJyxcblxuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDAlJyxcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcblxuICAgIG9iamVjdEZpdCxcbiAgICBvYmplY3RQb3NpdGlvbixcbiAgfVxuICBpZiAoXG4gICAgdHlwZW9mIHdpZHRoSW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBoZWlnaHRJbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbGF5b3V0ICE9PSAnZmlsbCdcbiAgKSB7XG4gICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiAvPlxuICAgIGNvbnN0IHF1b3RpZW50ID0gaGVpZ2h0SW50IC8gd2lkdGhJbnRcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gaXNOYU4ocXVvdGllbnQpID8gJzEwMCUnIDogYCR7cXVvdGllbnQgKiAxMDB9JWBcbiAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwicmVzcG9uc2l2ZVwiIC8+XG4gICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgIH1cbiAgICAgIHNpemVyU3R5bGUgPSB7IGRpc3BsYXk6ICdibG9jaycsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBwYWRkaW5nVG9wIH1cbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ludHJpbnNpYycpIHtcbiAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiaW50cmluc2ljXCIgLz5cbiAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBtYXJnaW46IDAsXG4gICAgICB9XG4gICAgICBzaXplclN0eWxlID0ge1xuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgIH1cbiAgICAgIHNpemVyU3ZnID0gYDxzdmcgd2lkdGg9XCIke3dpZHRoSW50fVwiIGhlaWdodD1cIiR7aGVpZ2h0SW50fVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2ZXJzaW9uPVwiMS4xXCIvPmBcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ZpeGVkJykge1xuICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJmaXhlZFwiIC8+XG4gICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICBoZWlnaHQ6IGhlaWdodEludCxcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIHdpZHRoSW50ID09PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBoZWlnaHRJbnQgPT09ICd1bmRlZmluZWQnICYmXG4gICAgbGF5b3V0ID09PSAnZmlsbCdcbiAgKSB7XG4gICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgbGF5b3V0PVwiZmlsbFwiIC8+XG4gICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcblxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgcmlnaHQ6IDAsXG5cbiAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiAvPlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG11c3QgdXNlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIiBwcm9wZXJ0aWVzIG9yIFwibGF5b3V0PSdmaWxsJ1wiIHByb3BlcnR5LmBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBsZXQgaW1nQXR0cmlidXRlczogR2VuSW1nQXR0cnNSZXN1bHQgPSB7XG4gICAgc3JjOlxuICAgICAgJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNycsXG4gICAgc3JjU2V0OiB1bmRlZmluZWQsXG4gICAgc2l6ZXM6IHVuZGVmaW5lZCxcbiAgfVxuXG4gIGlmIChpc1Zpc2libGUpIHtcbiAgICBpbWdBdHRyaWJ1dGVzID0gZ2VuZXJhdGVJbWdBdHRycyh7XG4gICAgICBzcmMsXG4gICAgICB1bm9wdGltaXplZCxcbiAgICAgIGxheW91dCxcbiAgICAgIHdpZHRoOiB3aWR0aEludCxcbiAgICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gICAgICBzaXplcyxcbiAgICAgIGxvYWRlcixcbiAgICB9KVxuICB9XG5cbiAgaWYgKHVuc2l6ZWQpIHtcbiAgICB3cmFwcGVyU3R5bGUgPSB1bmRlZmluZWRcbiAgICBzaXplclN0eWxlID0gdW5kZWZpbmVkXG4gICAgaW1nU3R5bGUgPSB1bmRlZmluZWRcbiAgfVxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3dyYXBwZXJTdHlsZX0+XG4gICAgICB7c2l6ZXJTdHlsZSA/IChcbiAgICAgICAgPGRpdiBzdHlsZT17c2l6ZXJTdHlsZX0+XG4gICAgICAgICAge3NpemVyU3ZnID8gKFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49e3RydWV9XG4gICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICBzcmM9e2BkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCR7dG9CYXNlNjQoc2l6ZXJTdmcpfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPGltZ1xuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgey4uLmltZ0F0dHJpYnV0ZXN9XG4gICAgICAgIGRlY29kaW5nPVwiYXN5bmNcIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgcmVmPXtzZXRSZWZ9XG4gICAgICAgIHN0eWxlPXtpbWdTdHlsZX1cbiAgICAgIC8+XG4gICAgICB7cHJpb3JpdHkgPyAoXG4gICAgICAgIC8vIE5vdGUgaG93IHdlIG9taXQgdGhlIGBocmVmYCBhdHRyaWJ1dGUsIGFzIGl0IHdvdWxkIG9ubHkgYmUgcmVsZXZhbnRcbiAgICAgICAgLy8gZm9yIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgYGltYWdlc3Jjc2V0YCwgYW5kIGluIHRob3NlIGNhc2VzXG4gICAgICAgIC8vIGl0IHdvdWxkIGxpa2VseSBjYXVzZSB0aGUgaW5jb3JyZWN0IGltYWdlIHRvIGJlIHByZWxvYWRlZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2VtYW50aWNzLmh0bWwjYXR0ci1saW5rLWltYWdlc3Jjc2V0XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxsaW5rXG4gICAgICAgICAgICBrZXk9e1xuICAgICAgICAgICAgICAnX19uaW1nLScgK1xuICAgICAgICAgICAgICBpbWdBdHRyaWJ1dGVzLnNyYyArXG4gICAgICAgICAgICAgIGltZ0F0dHJpYnV0ZXMuc3JjU2V0ICtcbiAgICAgICAgICAgICAgaW1nQXR0cmlidXRlcy5zaXplc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVsPVwicHJlbG9hZFwiXG4gICAgICAgICAgICBhcz1cImltYWdlXCJcbiAgICAgICAgICAgIGhyZWY9e2ltZ0F0dHJpYnV0ZXMuc3JjU2V0ID8gdW5kZWZpbmVkIDogaW1nQXR0cmlidXRlcy5zcmN9XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNyY3NldCBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZVxuICAgICAgICAgICAgaW1hZ2VzcmNzZXQ9e2ltZ0F0dHJpYnV0ZXMuc3JjU2V0fVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogaW1hZ2VzaXplcyBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZVxuICAgICAgICAgICAgaW1hZ2VzaXplcz17aW1nQXR0cmlidXRlcy5zaXplc31cbiAgICAgICAgICA+PC9saW5rPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vL0JVSUxUIElOIExPQURFUlNcblxuZnVuY3Rpb24gbm9ybWFsaXplU3JjKHNyYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHNyY1swXSA9PT0gJy8nID8gc3JjLnNsaWNlKDEpIDogc3JjXG59XG5cbmZ1bmN0aW9uIGltZ2l4TG9hZGVyKHtcbiAgcm9vdCxcbiAgc3JjLFxuICB3aWR0aCxcbiAgcXVhbGl0eSxcbn06IERlZmF1bHRJbWFnZUxvYWRlclByb3BzKTogc3RyaW5nIHtcbiAgLy8gRGVtbzogaHR0cHM6Ly9zdGF0aWMuaW1naXgubmV0L2RhaXN5LnBuZz9mb3JtYXQ9YXV0byZmaXQ9bWF4Jnc9MzAwXG4gIGNvbnN0IHBhcmFtcyA9IFsnYXV0bz1mb3JtYXQnLCAnZml0PW1heCcsICd3PScgKyB3aWR0aF1cbiAgbGV0IHBhcmFtc1N0cmluZyA9ICcnXG4gIGlmIChxdWFsaXR5KSB7XG4gICAgcGFyYW1zLnB1c2goJ3E9JyArIHF1YWxpdHkpXG4gIH1cblxuICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgIHBhcmFtc1N0cmluZyA9ICc/JyArIHBhcmFtcy5qb2luKCcmJylcbiAgfVxuICByZXR1cm4gYCR7cm9vdH0ke25vcm1hbGl6ZVNyYyhzcmMpfSR7cGFyYW1zU3RyaW5nfWBcbn1cblxuZnVuY3Rpb24gYWthbWFpTG9hZGVyKHsgcm9vdCwgc3JjLCB3aWR0aCB9OiBEZWZhdWx0SW1hZ2VMb2FkZXJQcm9wcyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9P2ltd2lkdGg9JHt3aWR0aH1gXG59XG5cbmZ1bmN0aW9uIGNsb3VkaW5hcnlMb2FkZXIoe1xuICByb290LFxuICBzcmMsXG4gIHdpZHRoLFxuICBxdWFsaXR5LFxufTogRGVmYXVsdEltYWdlTG9hZGVyUHJvcHMpOiBzdHJpbmcge1xuICAvLyBEZW1vOiBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZW1vL2ltYWdlL3VwbG9hZC93XzMwMCxjX2xpbWl0LHFfYXV0by90dXJ0bGVzLmpwZ1xuICBjb25zdCBwYXJhbXMgPSBbJ2ZfYXV0bycsICdjX2xpbWl0JywgJ3dfJyArIHdpZHRoLCAncV8nICsgKHF1YWxpdHkgfHwgJ2F1dG8nKV1cbiAgbGV0IHBhcmFtc1N0cmluZyA9IHBhcmFtcy5qb2luKCcsJykgKyAnLydcbiAgcmV0dXJuIGAke3Jvb3R9JHtwYXJhbXNTdHJpbmd9JHtub3JtYWxpemVTcmMoc3JjKX1gXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRMb2FkZXIoe1xuICByb290LFxuICBzcmMsXG4gIHdpZHRoLFxuICBxdWFsaXR5LFxufTogRGVmYXVsdEltYWdlTG9hZGVyUHJvcHMpOiBzdHJpbmcge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbnN0IG1pc3NpbmdWYWx1ZXMgPSBbXVxuXG4gICAgLy8gdGhlc2Ugc2hvdWxkIGFsd2F5cyBiZSBwcm92aWRlZCBidXQgbWFrZSBzdXJlIHRoZXkgYXJlXG4gICAgaWYgKCFzcmMpIG1pc3NpbmdWYWx1ZXMucHVzaCgnc3JjJylcbiAgICBpZiAoIXdpZHRoKSBtaXNzaW5nVmFsdWVzLnB1c2goJ3dpZHRoJylcblxuICAgIGlmIChtaXNzaW5nVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE5leHQgSW1hZ2UgT3B0aW1pemF0aW9uIHJlcXVpcmVzICR7bWlzc2luZ1ZhbHVlcy5qb2luKFxuICAgICAgICAgICcsICdcbiAgICAgICAgKX0gdG8gYmUgcHJvdmlkZWQuIE1ha2Ugc3VyZSB5b3UgcGFzcyB0aGVtIGFzIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgeyBzcmMsIHdpZHRoLCBxdWFsaXR5IH1cbiAgICAgICAgKX1gXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHNyYy5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgdG8gcGFyc2Ugc3JjIFwiJHtzcmN9XCIgb24gXFxgbmV4dC9pbWFnZVxcYCwgcHJvdG9jb2wtcmVsYXRpdmUgVVJMICgvLykgbXVzdCBiZSBjaGFuZ2VkIHRvIGFuIGFic29sdXRlIFVSTCAoaHR0cDovLyBvciBodHRwczovLylgXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKCFzcmMuc3RhcnRzV2l0aCgnLycpICYmIGNvbmZpZ0RvbWFpbnMpIHtcbiAgICAgIGxldCBwYXJzZWRTcmM6IFVSTFxuICAgICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkU3JjID0gbmV3IFVSTChzcmMpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmFpbGVkIHRvIHBhcnNlIHNyYyBcIiR7c3JjfVwiIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGlmIHVzaW5nIHJlbGF0aXZlIGltYWdlIGl0IG11c3Qgc3RhcnQgd2l0aCBhIGxlYWRpbmcgc2xhc2ggXCIvXCIgb3IgYmUgYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbmZpZ0RvbWFpbnMuaW5jbHVkZXMocGFyc2VkU3JjLmhvc3RuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgc3JjIHByb3AgKCR7c3JjfSkgb24gXFxgbmV4dC9pbWFnZVxcYCwgaG9zdG5hbWUgXCIke3BhcnNlZFNyYy5ob3N0bmFtZX1cIiBpcyBub3QgY29uZmlndXJlZCB1bmRlciBpbWFnZXMgaW4geW91ciBcXGBuZXh0LmNvbmZpZy5qc1xcYFxcbmAgK1xuICAgICAgICAgICAgYFNlZSBtb3JlIGluZm86IGh0dHBzOi8vZXJyLnNoL25leHQuanMvbmV4dC1pbWFnZS11bmNvbmZpZ3VyZWQtaG9zdGBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBgJHtyb290fT91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX0mdz0ke3dpZHRofSZxPSR7cXVhbGl0eSB8fCA3NX1gXG59XG4iLCJ0eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUgPSBhbnlcbnR5cGUgUmVxdWVzdElkbGVDYWxsYmFja09wdGlvbnMgPSB7XG4gIHRpbWVvdXQ6IG51bWJlclxufVxudHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUgPSB7XG4gIHJlYWRvbmx5IGRpZFRpbWVvdXQ6IGJvb2xlYW5cbiAgdGltZVJlbWFpbmluZzogKCkgPT4gbnVtYmVyXG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgcmVxdWVzdElkbGVDYWxsYmFjazogKFxuICAgICAgY2FsbGJhY2s6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkLFxuICAgICAgb3B0cz86IFJlcXVlc3RJZGxlQ2FsbGJhY2tPcHRpb25zXG4gICAgKSA9PiBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlXG4gICAgY2FuY2VsSWRsZUNhbGxiYWNrOiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpID0+IHZvaWRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoXG4gICAgY2I6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkXG4gICk6IE5vZGVKUy5UaW1lb3V0IHtcbiAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2Ioe1xuICAgICAgICBkaWRUaW1lb3V0OiBmYWxzZSxcbiAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCA1MCAtIChEYXRlLm5vdygpIC0gc3RhcnQpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LCAxKVxuICB9XG5cbmV4cG9ydCBjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2sgPVxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKVxuICB9XG4iLCJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICByZXF1ZXN0SWRsZUNhbGxiYWNrLFxuICBjYW5jZWxJZGxlQ2FsbGJhY2ssXG59IGZyb20gJy4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrJ1xuXG50eXBlIFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IFBpY2s8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0LCAncm9vdE1hcmdpbic+XG50eXBlIFVzZUludGVyc2VjdGlvbiA9IHsgZGlzYWJsZWQ/OiBib29sZWFuIH0gJiBVc2VJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRcbnR5cGUgT2JzZXJ2ZUNhbGxiYWNrID0gKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZFxudHlwZSBPYnNlcnZlciA9IHtcbiAgaWQ6IHN0cmluZ1xuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcbiAgZWxlbWVudHM6IE1hcDxFbGVtZW50LCBPYnNlcnZlQ2FsbGJhY2s+XG59XG5cbmNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gdHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSW50ZXJzZWN0aW9uPFQgZXh0ZW5kcyBFbGVtZW50Pih7XG4gIHJvb3RNYXJnaW4sXG4gIGRpc2FibGVkLFxufTogVXNlSW50ZXJzZWN0aW9uKTogWyhlbGVtZW50OiBUIHwgbnVsbCkgPT4gdm9pZCwgYm9vbGVhbl0ge1xuICBjb25zdCBpc0Rpc2FibGVkOiBib29sZWFuID0gZGlzYWJsZWQgfHwgIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyXG5cbiAgY29uc3QgdW5vYnNlcnZlID0gdXNlUmVmPEZ1bmN0aW9uPigpXG4gIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIGNvbnN0IHNldFJlZiA9IHVzZUNhbGxiYWNrKFxuICAgIChlbDogVCB8IG51bGwpID0+IHtcbiAgICAgIGlmICh1bm9ic2VydmUuY3VycmVudCkge1xuICAgICAgICB1bm9ic2VydmUuY3VycmVudCgpXG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc2FibGVkIHx8IHZpc2libGUpIHJldHVyblxuXG4gICAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSkge1xuICAgICAgICB1bm9ic2VydmUuY3VycmVudCA9IG9ic2VydmUoXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgKGlzVmlzaWJsZSkgPT4gaXNWaXNpYmxlICYmIHNldFZpc2libGUoaXNWaXNpYmxlKSxcbiAgICAgICAgICB7IHJvb3RNYXJnaW4gfVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNEaXNhYmxlZCwgcm9vdE1hcmdpbiwgdmlzaWJsZV1cbiAgKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgIGNvbnN0IGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gc2V0VmlzaWJsZSh0cnVlKSlcbiAgICAgICAgcmV0dXJuICgpID0+IGNhbmNlbElkbGVDYWxsYmFjayhpZGxlQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9LCBbdmlzaWJsZV0pXG5cbiAgcmV0dXJuIFtzZXRSZWYsIHZpc2libGVdXG59XG5cbmZ1bmN0aW9uIG9ic2VydmUoXG4gIGVsZW1lbnQ6IEVsZW1lbnQsXG4gIGNhbGxiYWNrOiBPYnNlcnZlQ2FsbGJhY2ssXG4gIG9wdGlvbnM6IFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdFxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHsgaWQsIG9ic2VydmVyLCBlbGVtZW50cyB9ID0gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucylcbiAgZWxlbWVudHMuc2V0KGVsZW1lbnQsIGNhbGxiYWNrKVxuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudClcbiAgcmV0dXJuIGZ1bmN0aW9uIHVub2JzZXJ2ZSgpOiB2b2lkIHtcbiAgICBlbGVtZW50cy5kZWxldGUoZWxlbWVudClcbiAgICBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudClcblxuICAgIC8vIERlc3Ryb3kgb2JzZXJ2ZXIgd2hlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byB3YXRjaDpcbiAgICBpZiAoZWxlbWVudHMuc2l6ZSA9PT0gMCkge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICBvYnNlcnZlcnMuZGVsZXRlKGlkKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBvYnNlcnZlcnMgPSBuZXcgTWFwPHN0cmluZywgT2JzZXJ2ZXI+KClcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKG9wdGlvbnM6IFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdCk6IE9ic2VydmVyIHtcbiAgY29uc3QgaWQgPSBvcHRpb25zLnJvb3RNYXJnaW4gfHwgJydcbiAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJzLmdldChpZClcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlXG4gIH1cblxuICBjb25zdCBlbGVtZW50cyA9IG5ldyBNYXA8RWxlbWVudCwgT2JzZXJ2ZUNhbGxiYWNrPigpXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBlbGVtZW50cy5nZXQoZW50cnkudGFyZ2V0KVxuICAgICAgY29uc3QgaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwXG4gICAgICBpZiAoY2FsbGJhY2sgJiYgaXNWaXNpYmxlKSB7XG4gICAgICAgIGNhbGxiYWNrKGlzVmlzaWJsZSlcbiAgICAgIH1cbiAgICB9KVxuICB9LCBvcHRpb25zKVxuXG4gIG9ic2VydmVycy5zZXQoXG4gICAgaWQsXG4gICAgKGluc3RhbmNlID0ge1xuICAgICAgaWQsXG4gICAgICBvYnNlcnZlcixcbiAgICAgIGVsZW1lbnRzLFxuICAgIH0pXG4gIClcbiAgcmV0dXJuIGluc3RhbmNlXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvaW1hZ2UnKVxuIiwiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL2xheW91dCdcbmltcG9ydCBzdHlsZSBmcm9tICcuLi9zdHlsZXMvaW5kZXgubW9kdWxlLmNzcyc7XG5pbXBvcnQgdXNlU1dSIGZyb20gJ3N3cic7XG5pbXBvcnQgU2VydmVyQm94IGZyb20gJy4uL2NvbXBvbmVudHMvc2VydmVyQm94JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IGNvb2tpZSBmcm9tICdqcy1jb29raWUnO1xuXG4vLyBGZXRjaGVyIGZvciB1c2VTV1IsIHJlZGlyZWN0IHRvIGxvZ2luIGlmIG5vdCBhdXRob3JpemVkXG5jb25zdCBmZXRjaGVyID0gdXJsID0+XG4gIGZldGNoKHVybClcbiAgICAudGhlbihyID0+IHtcbiAgICAgIHJldHVybiByLmpzb24oKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W1wic2VydmVyc1wiXS5sZW5ndGgpXG4gICAgICAgIGlmKHJlc3VsdFtcInNlcnZlcnNcIl0ubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBzZXJ2ZXIgPSByZXN1bHRbXCJzZXJ2ZXJzXCJdWzBdXG4gICAgICAgICAgY29va2llLnNldCgnc2VydmVyJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgaWQ6IHNlcnZlci5zZXJ2ZXJfaWQsXG4gICAgICAgICAgICBuYW1lOiBzZXJ2ZXIuc2VydmVyX25hbWUsXG4gICAgICAgICAgICBpcDogc2VydmVyLnNlcnZlcl9pcFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcbmNvbnN0IGNob29zZVNlcnZlciA9IHNlcnZlciA9PiB7XG4gIGNvb2tpZS5zZXQoJ3NlcnZlcicsIEpTT04uc3RyaW5naWZ5KHtcbiAgICBpZDogc2VydmVyLnNlcnZlcl9pZCxcbiAgICBuYW1lOiBzZXJ2ZXIuc2VydmVyX25hbWUsXG4gICAgaXA6IHNlcnZlci5zZXJ2ZXJfaXBcbiAgfSkpO1xuICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9YCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHVzZVNXUihgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9hcGkvc2VydmVycy9nZXRTZXJ2ZXJzP3Rva2VuPSR7Y29va2llLmdldCgndG9rZW4nKX1gLCBmZXRjaGVyKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQgaG9tZSByZWxhdGl2ZT5cbiAgICAgIDxIZWFkPlxuICAgICAgPC9IZWFkPlxuICAgICAge2RhdGEgJiYgZGF0YS5zZXJ2ZXJzICYmXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGUuc2VydmVyc30+XG4gICAgICAgIHtkYXRhLnNlcnZlcnMubWFwKChzZXJ2ZXIsIGkpID0+IDxTZXJ2ZXJCb3ggb25DbGljaz17KCkgPT4gY2hvb3NlU2VydmVyKHNlcnZlcil9IG5hbWU9e3NlcnZlci5zZXJ2ZXJfbmFtZX0gYWRyZXNzPXtzZXJ2ZXIuc2VydmVyX2lwfT48L1NlcnZlckJveD4pfVxuICAgICAgPC9kaXY+XG4gICAgICB9XG5cblxuICAgICAgeyFkYXRhICYmXG4gICAgICA8aDE+TG9hZGluZzwvaDE+XG4gICAgICB9XG5cbiAgICAgIHtlcnJvciAmJlxuICAgICAgPGgxPmZlbDwvaDE+XG4gICAgICB9XG4gICAgPC9MYXlvdXQ+XG4gIClcbn1cbiIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInNlcnZlcnNcIjogXCJzdHlsZXNfc2VydmVyc19fMzhMQjVcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRpZHlvdW1lYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianMtY29va2llXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3JvdXRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWFzeW5jLWxvY2tzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtYm9vdHN0cmFwL0Zvcm1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3dyXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=