webpackHotUpdate_N_E("pages/server/[server]",{

/***/ "./pages/server/[server]/index.js":
/*!****************************************!*\
  !*** ./pages/server/[server]/index.js ***!
  \****************************************/
/*! exports provided: __N_SSP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return __N_SSP; });
/* harmony import */ var _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/layout */ "./components/layout.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ "./node_modules/next/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../lib/validateServerAccess */ "./lib/validateServerAccess.js");
/* harmony import */ var _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_hooks_WindowSize__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/hooks/WindowSize */ "./components/hooks/WindowSize.js");
/* harmony import */ var _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../styles/server.module.css */ "./styles/server.module.css");
/* harmony import */ var _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_server_module_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/movieBackdrop */ "./components/movieBackdrop.js");
/* harmony import */ var _components_episodePoster__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/episodePoster */ "./components/episodePoster.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/movieBackdrop.module.css */ "./components/movieBackdrop.module.css");
/* harmony import */ var _components_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_components_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/dist/react-spring.esm.js");




var _jsxFileName = "/mnt/h/Code/Dose/Main Server/pages/server/[server]/index.js",
    _this = undefined,
    _s = $RefreshSig$();


var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


















var fetcher = function fetcher(url) {
  return node_fetch__WEBPACK_IMPORTED_MODULE_6___default()(url).then(function (r) {
    return r.json().then(function (result) {
      return result;
    });
  });
};

var main = function main(props) {
  _s();

  // props.server is from the SSR under this function
  var server = props.server;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      latestMovies = _useState[0],
      setLatesMovies = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      ongoingMovies = _useState2[0],
      setOngoingMovies = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      movieWatchList = _useState3[0],
      setMovieWatchList = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      ongoingShows = _useState4[0],
      setOngoingShows = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      newlyAddedMovies = _useState5[0],
      setNewlyAddedMovies = _useState5[1];

  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      newlyAddedShows = _useState6[0],
      setNewlyAddedShows = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      newlyAddedEpisodes = _useState7[0],
      setNewlyAddedEpisodes = _useState7[1];

  var _useState8 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      recommendedMovie = _useState8[0],
      setRecommendedMovie = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]),
      popularMovies = _useState9[0],
      setPopularMovies = _useState9[1];

  var loading = 0;

  var _useState10 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      loaded = _useState10[0],
      setLoaded = _useState10[1];

  var transitions = Object(react_spring__WEBPACK_IMPORTED_MODULE_18__["useTransition"])(newlyAddedMovies, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
    delay: 200,
    onRest: function onRest() {
      return setNewlyAddedMovies([]);
    }
  });
  var windowSize = Object(_components_hooks_WindowSize__WEBPACK_IMPORTED_MODULE_12__["default"])();
  var allContent = [];
  /**
   * Makes a query to the current active server for a list of movies
   * 
   * @param {string} genre 
   * @param {string} orderby 
   * @param {int} limit 
   */

  var getMovieList = /*#__PURE__*/function () {
    var _ref = Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var genre,
          orderby,
          limit,
          ongoing,
          watchlist,
          popular,
          _args = arguments;
      return _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              genre = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
              orderby = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
              limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 20;
              ongoing = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;
              watchlist = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
              popular = _args.length > 5 && _args[5] !== undefined ? _args[5] : false;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var url;

                if (ongoing) {
                  url = "".concat(server.server_ip, "/api/movies/list/ongoing?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                } else if (watchlist) {
                  url = "".concat(server.server_ip, "/api/movies/list/watchlist?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                } else if (popular) {
                  url = "".concat(server.server_ip, "/api/movies/list/popular?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                } else {
                  url = "".concat(server.server_ip, "/api/movies/list").concat(genre !== null ? '/genre/' + genre : '', "?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                }

                node_fetch__WEBPACK_IMPORTED_MODULE_6___default()(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    limit: 20
                  })
                }).then(function (r) {
                  return r.json();
                }).then(function (response) {
                  // Mark the movies active image
                  response.result.forEach(function (movie) {
                    var _iterator = _createForOfIteratorHelper(movie.images),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var image = _step.value;

                        if (image.active) {
                          if (image.type === 'BACKDROP') {
                            if (image.path === 'no_image') {
                              movie.backdrop = null;
                            } else {
                              movie.backdrop = image.path;
                            }
                          } else {
                            if (image.path === 'no_image') {
                              movie.backdrop = null;
                            } else {
                              movie.poster = image.path;
                            }
                          }

                          if (movie.backdrop != null && movie.poster != null) {
                            break;
                          }
                        }
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  });
                  resolve(response.result);
                });
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getMovieList() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Makes a query to the current active server for a list of new episodes
   * 
   * @param {string} genre 
   * @param {string} orderby 
   * @param {int} limit 
   */


  var getNewEpisodeList = /*#__PURE__*/function () {
    var _ref2 = Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var orderby,
          limit,
          _args2 = arguments;
      return _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              orderby = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
              limit = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 20;
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                var url;
                url = "".concat(server.server_ip, "/api/series/list/episodes?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                node_fetch__WEBPACK_IMPORTED_MODULE_6___default()(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    limit: 20
                  })
                }).then(function (r) {
                  return r.json();
                }).then(function (response) {
                  // Mark the movies active image
                  response.result.forEach(function (episode) {
                    var _iterator2 = _createForOfIteratorHelper(episode.images),
                        _step2;

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var image = _step2.value;

                        if (image.active) {
                          if (image.type === 'BACKDROP') {
                            if (image.path === 'no_image') {
                              episode.backdrop = null;
                            } else {
                              episode.backdrop = image.path;
                            }
                          } else if (image.type === 'POSTER') {
                            if (image.path === 'no_image') {
                              episode.poster = null;
                            } else {
                              episode.poster = image.path;
                            }
                          } else {
                            if (image.path === 'no_image') {
                              episode.backdrop = null;
                            } else {
                              episode.poster = image.path;
                            }
                          }

                          if (episode.backdrop != null && episode.poster != null) {
                            break;
                          }
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  });
                  console.log(response.result);
                  resolve(response.result);
                });
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getNewEpisodeList() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getShowList = /*#__PURE__*/function () {
    var _ref3 = Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3() {
      var genre,
          orderby,
          limit,
          ongoing,
          _args3 = arguments;
      return _mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              genre = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
              orderby = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 20;
              ongoing = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : false;
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                var url;

                if (ongoing) {
                  url = "".concat(server.server_ip, "/api/series/list/ongoing?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                } else {
                  url = "".concat(server.server_ip, "/api/series/list").concat(genre !== null ? '/genre/' + genre : '', "?").concat(orderby !== null ? 'orderby=' + orderby + '&' : '', "limit=").concat(limit, "&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'));
                }

                node_fetch__WEBPACK_IMPORTED_MODULE_6___default()(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    limit: 20
                  })
                }).then(function (r) {
                  return r.json();
                }).then(function (response) {
                  // Mark the movies active image
                  if (ongoing) {
                    response.upcoming.forEach(function (movie) {
                      var _iterator3 = _createForOfIteratorHelper(movie.images),
                          _step3;

                      try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                          var image = _step3.value;

                          if (image.active) {
                            if (image.type === 'BACKDROP') {
                              if (image.path === 'no_image') {
                                movie.backdrop = null;
                              } else {
                                movie.backdrop = image.path;
                              }
                            } else {
                              if (image.path === 'no_image') {
                                movie.backdrop = null;
                              } else {
                                movie.poster = image.path;
                              }
                            }

                            if (movie.backdrop != null && movie.poster != null) {
                              break;
                            }
                          }
                        }
                      } catch (err) {
                        _iterator3.e(err);
                      } finally {
                        _iterator3.f();
                      }
                    });
                    response.ongoing.forEach(function (movie) {
                      var _iterator4 = _createForOfIteratorHelper(movie.images),
                          _step4;

                      try {
                        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                          var image = _step4.value;

                          if (image.active) {
                            if (image.type === 'BACKDROP') {
                              if (image.path === 'no_image') {
                                movie.backdrop = null;
                              } else {
                                movie.backdrop = image.path;
                              }
                            } else {
                              if (image.path === 'no_image') {
                                movie.backdrop = null;
                              } else {
                                movie.poster = image.path;
                              }
                            }

                            if (movie.backdrop != null && movie.poster != null) {
                              break;
                            }
                          }
                        }
                      } catch (err) {
                        _iterator4.e(err);
                      } finally {
                        _iterator4.f();
                      }
                    });
                    resolve(response);
                    return;
                  }

                  response.result.forEach(function (movie) {
                    var _iterator5 = _createForOfIteratorHelper(movie.images),
                        _step5;

                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var image = _step5.value;

                        if (image.active) {
                          if (image.type === 'BACKDROP') {
                            if (image.path === 'no_image') {
                              movie.backdrop = null;
                            } else {
                              movie.backdrop = image.path;
                            }
                          } else {
                            if (image.path === 'no_image') {
                              movie.backdrop = null;
                            } else {
                              movie.poster = image.path;
                            }
                          }

                          if (movie.backdrop != null && movie.poster != null) {
                            break;
                          }
                        }
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }
                  });
                  resolve(response.result);
                });
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function getShowList() {
      return _ref3.apply(this, arguments);
    };
  }();

  var getActiveImage = function getActiveImage(images, type) {
    var _iterator6 = _createForOfIteratorHelper(images),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var image = _step6.value;

        if (image.type === type && image.active && image.path != "no_image") {
          return image;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return false;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    _lib_validateServerAccess__WEBPACK_IMPORTED_MODULE_11___default()(server, function (serverToken) {
      var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_16___default()(server.server_ip);
      socket.on("MOVIE", function (movie) {
        var _jsx;

        console.log(movie);
        var movieElements = newlyAddedMovies;
        var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
        movieElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx = {
          markAsDoneButton: true,
          id: movie.id,
          time: movie.watchtime,
          runtime: movie.runtime,
          title: movie.title,
          overview: movie.overview
        }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx, "runtime", movie.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx, "onClick", function onClick(id) {
          return selectMovie(movie.id);
        }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx, "__source", {
          fileName: _jsxFileName,
          lineNumber: 293,
          columnNumber: 21
        }), _jsx)));
        setNewlyAddedMovies(movieElements);
      }); // Get recommended video (random video right now)

      node_fetch__WEBPACK_IMPORTED_MODULE_6___default()("".concat(server.server_ip, "/api/movies/list/random?trailer=true&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken')), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      }).then(function (result) {
        if (result.status === 'success') {
          result.movie.activeLogo = getActiveImage(result.movie.images, 'LOGO');
          console.log(result);
          setRecommendedMovie(result.movie);
        } else {
          console.log("Error getting recommended movie");
        }
      }); // Get all the newest released movies (The slieshow)

      getMovieList(null, 'release_date', 5).then(function (movies) {
        movies.reverse();
        var movieElements = [];

        var _iterator7 = _createForOfIteratorHelper(movies),
            _step7;

        try {
          var _loop = function _loop() {
            var movie = _step7.value;
            var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/original/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
            movieElements.push(__jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Carousel"].Item, {
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 326,
                columnNumber: 25
              }
            }, __jsx("img", {
              className: "d-block w-100",
              src: img,
              alt: movie.title,
              style: {
                objectFit: 'cover',
                height: '90vh',
                minHeight: '500px',
                cursor: 'pointer'
              },
              onClick: function onClick() {
                selectMovie(movie.id);
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 327,
                columnNumber: 29
              }
            }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Carousel"].Caption, {
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 334,
                columnNumber: 29
              }
            }, __jsx("h3", {
              style: {
                textShadow: '0px 0px 6px #000'
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 335,
                columnNumber: 33
              }
            }, movie.title), __jsx("p", {
              style: {
                textShadow: '0px 0px 6px #000'
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 336,
                columnNumber: 33
              }
            }, movie.overview))));
          };

          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        loading++;
        setLatesMovies(movieElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get popular movies

      getMovieList(null, 'release_date', 20, false, false, true).then(function (movies) {
        movies.reverse();
        var movieElements = [];

        var _iterator8 = _createForOfIteratorHelper(movies),
            _step8;

        try {
          var _loop2 = function _loop2() {
            var _jsx2;

            var movie = _step8.value;
            var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
            movieElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx2 = {
              markAsDoneButton: true,
              id: movie.id,
              time: movie.watchtime,
              runtime: movie.runtime,
              title: movie.title,
              overview: movie.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx2, "runtime", movie.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx2, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx2, "onClick", function onClick(id) {
              return selectMovie(movie.id);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx2, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx2, "__source", {
              fileName: _jsxFileName,
              lineNumber: 357,
              columnNumber: 25
            }), _jsx2)));
          };

          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        loading++;
        setPopularMovies(movieElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get ongoing movies

      getMovieList(null, 'release_date', 20, true).then(function (movies) {
        movies.reverse();
        var movieElements = [];

        var _iterator9 = _createForOfIteratorHelper(movies),
            _step9;

        try {
          var _loop3 = function _loop3() {
            var _jsx3;

            var movie = _step9.value;
            var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
            movieElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx3 = {
              markAsDoneButton: true,
              id: movie.id,
              time: movie.watchtime,
              runtime: movie.runtime,
              title: movie.title,
              overview: movie.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx3, "runtime", movie.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx3, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx3, "onClick", function onClick(id) {
              return selectMovie(movie.id);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx3, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx3, "__source", {
              fileName: _jsxFileName,
              lineNumber: 376,
              columnNumber: 25
            }), _jsx3)));
          };

          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _loop3();
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        loading++;
        setOngoingMovies(movieElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get watchlist for movies

      getMovieList(null, 'release_date', 20, false, true).then(function (movies) {
        movies.reverse();
        var movieElements = [];

        var _iterator10 = _createForOfIteratorHelper(movies),
            _step10;

        try {
          var _loop4 = function _loop4() {
            var _jsx4;

            var movie = _step10.value;
            var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
            movieElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx4 = {
              markAsDoneButton: true,
              id: movie.id,
              time: movie.watchtime,
              runtime: movie.runtime,
              title: movie.title,
              overview: movie.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx4, "runtime", movie.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx4, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx4, "onClick", function onClick(id) {
              return selectMovie(movie.id);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx4, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx4, "__source", {
              fileName: _jsxFileName,
              lineNumber: 395,
              columnNumber: 25
            }), _jsx4)));
          };

          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            _loop4();
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        loading++;
        setMovieWatchList(movieElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get newly added movies

      getMovieList(null, 'added_date', 20).then(function (movies) {
        var movieElements = [];

        var _iterator11 = _createForOfIteratorHelper(movies),
            _step11;

        try {
          var _loop5 = function _loop5() {
            var _jsx5;

            var movie = _step11.value;
            var img = movie.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(movie.backdrop) : 'https://via.placeholder.com/2000x1000';
            movieElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx5 = {
              markAsDoneButton: true,
              id: movie.id,
              time: movie.watchtime,
              runtime: movie.runtime,
              title: movie.title,
              overview: movie.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx5, "runtime", movie.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx5, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx5, "onClick", function onClick(id) {
              return selectMovie(movie.id);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx5, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx5, "__source", {
              fileName: _jsxFileName,
              lineNumber: 413,
              columnNumber: 25
            }), _jsx5)));
          };

          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            _loop5();
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        loading++;
        setNewlyAddedMovies(movieElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get newly added shows

      getShowList(null, 'added_date', 20).then(function (shows) {
        var showElements = [];

        var _iterator12 = _createForOfIteratorHelper(shows),
            _step12;

        try {
          var _loop6 = function _loop6() {
            var _jsx6;

            var show = _step12.value;
            var img = show.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(show.backdrop) : 'https://via.placeholder.com/2000x1000';
            showElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx6 = {
              markAsDoneButton: true,
              id: show.id,
              time: show.watchtime,
              runtime: show.runtime,
              title: show.title,
              overview: show.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx6, "runtime", show.runtime), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx6, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx6, "onClick", function onClick(id) {
              return selectShow(show.id);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx6, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx6, "__source", {
              fileName: _jsxFileName,
              lineNumber: 431,
              columnNumber: 25
            }), _jsx6)));
          };

          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            _loop6();
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        loading++;
        setNewlyAddedShows(showElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      }); // Get ongoing shows

      getShowList(null, 'added_date', 20, true).then(function (result) {
        var showElements = [];

        var _iterator13 = _createForOfIteratorHelper(result.upcoming),
            _step13;

        try {
          var _loop7 = function _loop7() {
            var _jsx7;

            var show = _step13.value;
            var img = show.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(show.backdrop) : 'https://via.placeholder.com/2000x1000';
            showElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx7 = {
              showTitle: true,
              markAsDoneButton: true,
              id: show.id,
              time: show.time_watched,
              runtime: show.runtime,
              title: show.season_name + " - Episode " + show.episode_number,
              overview: show.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx7, "runtime", show.total_time), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx7, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx7, "onClick", function onClick(id) {
              return selectEpisode(show.show_id, show.season_number, show.episode_number, show.internalepisodeid);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx7, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx7, "__source", {
              fileName: _jsxFileName,
              lineNumber: 448,
              columnNumber: 25
            }), _jsx7)));
          };

          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            _loop7();
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }

        var _iterator14 = _createForOfIteratorHelper(result.ongoing),
            _step14;

        try {
          var _loop8 = function _loop8() {
            var _jsx8;

            var show = _step14.value;
            var img = show.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(show.backdrop) : 'https://via.placeholder.com/2000x1000';
            showElements.push(__jsx(_components_movieBackdrop__WEBPACK_IMPORTED_MODULE_14__["default"], (_jsx8 = {
              showTitle: true,
              markAsDoneButton: true,
              id: show.id,
              time: show.time_watched,
              runtime: show.runtime,
              title: show.season_name + " - Episode " + show.episode_number,
              overview: show.overview
            }, Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx8, "runtime", show.total_time), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx8, "backdrop", img), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx8, "onClick", function onClick(id) {
              return selectEpisode(show.show_id, show.season_number, show.episode_number, show.internalepisodeid);
            }), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx8, "__self", _this), Object(_mnt_h_Code_Dose_Main_Server_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_jsx8, "__source", {
              fileName: _jsxFileName,
              lineNumber: 455,
              columnNumber: 25
            }), _jsx8)));
          };

          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            _loop8();
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }

        loading++;
        setOngoingShows(showElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      });
      getNewEpisodeList('added_date', 20).then(function (episodes) {
        var episodeElements = [];

        var _iterator15 = _createForOfIteratorHelper(episodes),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var episode = _step15.value;
            var poster = episode.poster !== null ? "https://image.tmdb.org/t/p/w500/".concat(episode.poster) : 'https://via.placeholder.com/500x1000';
            var backdrop = episode.backdrop !== null ? "https://image.tmdb.org/t/p/w500/".concat(episode.backdrop) : 'https://via.placeholder.com/500x1000';
            episodeElements.push(__jsx(_components_episodePoster__WEBPACK_IMPORTED_MODULE_15__["default"], {
              show: episode.serie_id,
              season: episode.season,
              episode: episode.episode,
              poster: poster,
              internalEpisodeID: episode.internalepisodeid,
              backdrop: backdrop,
              onClick: function onClick(season, episode, show, internalEpisodeID) {
                return selectEpisode(show, season, episode, internalEpisodeID);
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 475,
                columnNumber: 25
              }
            }));
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }

        loading++;
        setNewlyAddedEpisodes(episodeElements);
      }).then(function () {
        if (loading == 7) {
          setLoaded(true);
        }
      });
    });
  }, [loading]);

  var selectMovie = function selectMovie(id) {
    next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push("/server/".concat(server.server_id, "/movies/video/").concat(id));
  };

  var selectShow = function selectShow(id) {
    next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push("/server/".concat(server.server_id, "/shows/video/").concat(id));
  };

  var selectEpisode = function selectEpisode(showID, seasonNumber, episodeNumber, internalEpisodeID) {
    next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push("/server/".concat(server.server_id, "/shows/video/").concat(showID, "/season/").concat(seasonNumber, "/episode/").concat(episodeNumber, "?internalID=").concat(internalEpisodeID));
  };

  var scrollLeft = function scrollLeft(id) {
    document.getElementById(id).scrollLeft -= window.innerWidth * 0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  };

  var scrollRight = function scrollRight(id) {
    document.getElementById(id).scrollLeft += window.innerWidth * 0.8;
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }; // LAYOUT //


  return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, !loaded && __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.loadingioSpinnerEclipse,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 517,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.ldio,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 518,
      columnNumber: 13
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 519,
      columnNumber: 17
    }
  }))), loaded && __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    searchEnabled: true,
    server: server,
    serverToken: js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 525,
      columnNumber: 9
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 526,
      columnNumber: 9
    }
  }), recommendedMovie != false && __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.recommended,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 530,
      columnNumber: 13
    }
  }, __jsx("video", {
    autoPlay: true,
    loop: true,
    preload: "auto",
    muted: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 531,
      columnNumber: 17
    }
  }, __jsx("source", {
    src: "".concat(server.server_ip, "/api/trailer/").concat(recommendedMovie["id"], "?type=MOVIE&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken')),
    type: "video/mp4",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 532,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.recommendedInformation,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 534,
      columnNumber: 17
    }
  }, recommendedMovie["activeLogo"] != false && __jsx("img", {
    src: "https://image.tmdb.org/t/p/original/".concat(recommendedMovie["activeLogo"].path),
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.logo,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 536,
      columnNumber: 21
    }
  }), recommendedMovie["activeLogo"] == false && __jsx("h1", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 539,
      columnNumber: 21
    }
  }, recommendedMovie["title"]), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 21
    }
  }, recommendedMovie["overview"]), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.controls,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 542,
      columnNumber: 21
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/".concat(server.server_id, "/movies/video/").concat(recommendedMovie["id"], "?autoPlay=true"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 543,
      columnNumber: 25
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/001-play-button.png"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 544,
      columnNumber: 29
    }
  })), __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/".concat(server.server_id, "/movies/video/").concat(recommendedMovie["id"]),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 546,
      columnNumber: 25
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/002-information.png"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 547,
      columnNumber: 29
    }
  }))))), __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 557,
      columnNumber: 9
    }
  }), __jsx("div", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 558,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Container"], {
    fluid: true,
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.contentRows,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 559,
      columnNumber: 13
    }
  }, popularMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 562,
      columnNumber: 25
    }
  }, "Popul\xE4rt just nu"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 563,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "popularMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 564,
      columnNumber: 29
    }
  }, popularMovies), popularMovies.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('popularMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 569,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 570,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('popularMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 572,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 573,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 578,
      columnNumber: 21
    }
  })), ongoingMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 584,
      columnNumber: 25
    }
  }, "P\xE5g\xE5ende filmer"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 585,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "ongoingMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 586,
      columnNumber: 29
    }
  }, ongoingMovies), ongoingMovies.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('ongoingMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 591,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 592,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('ongoingMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 594,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 595,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 600,
      columnNumber: 21
    }
  })), ongoingShows.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 606,
      columnNumber: 25
    }
  }, "P\xE5g\xE5ende serier"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 607,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "ongoingShows",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 608,
      columnNumber: 29
    }
  }, ongoingShows), ongoingShows.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('ongoingShows');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 613,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 614,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('ongoingShows');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 616,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 617,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 622,
      columnNumber: 21
    }
  })), newlyAddedMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/movies",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 628,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 628,
      columnNumber: 80
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 628,
      columnNumber: 108
    }
  }, "Nyligen tillagda filmer"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 629,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 630,
      columnNumber: 29
    }
  }, transitions(function (_ref4, item) {
    var opacity = _ref4.opacity;
    return __jsx(react_spring__WEBPACK_IMPORTED_MODULE_18__["animated"].div, {
      className: _components_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_17___default.a.backdrop,
      style: {
        opacity: opacity.to(item.op),
        transform: opacity.to(item.trans).to(function (y) {
          return "translate3d(0,".concat(y, "px,0)");
        })
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 632,
        columnNumber: 33
      }
    }, item);
  })), newlyAddedMovies.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('newlyAddedMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 646,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 647,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('newlyAddedMovies');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 649,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 650,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 655,
      columnNumber: 21
    }
  })), movieWatchList.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/movies",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 80
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 108
    }
  }, "Filmer att se senare"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 662,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "movieWatchList",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 663,
      columnNumber: 29
    }
  }, movieWatchList), movieWatchList.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('movieWatchList');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 668,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 669,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('movieWatchList');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 671,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 672,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 677,
      columnNumber: 21
    }
  })), newlyAddedEpisodes.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/shows",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 79
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 107
    }
  }, "Nyligen tillagda avsnitt"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 684,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedEpisodes",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 685,
      columnNumber: 29
    }
  }, newlyAddedEpisodes), newlyAddedEpisodes.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('newlyAddedEpisodes');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 690,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 691,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('newlyAddedEpisodes');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 693,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 694,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 699,
      columnNumber: 21
    }
  })), newlyAddedShows.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/shows",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705,
      columnNumber: 79
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 705,
      columnNumber: 107
    }
  }, "Nyligen tillagda serier"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 706,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedShows",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 707,
      columnNumber: 29
    }
  }, newlyAddedShows), newlyAddedShows.length * 480 > windowSize.width && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    onClick: function onClick() {
      return scrollLeft('newlyAddedShows');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 712,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 713,
      columnNumber: 41
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollButton,
    style: {
      right: '0'
    },
    onClick: function onClick() {
      return scrollRight('newlyAddedShows');
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 715,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 716,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 721,
      columnNumber: 21
    }
  }))))));
};

_s(main, "ZBeGzqzgI2GIF3f/+cEEYeOWOJc=", false, function () {
  return [react_spring__WEBPACK_IMPORTED_MODULE_18__["useTransition"], _components_hooks_WindowSize__WEBPACK_IMPORTED_MODULE_12__["default"]];
});

var __N_SSP = true;
/* harmony default export */ __webpack_exports__["default"] = (main); // Get the information about the server and send it to the front end before render (this is server-side)

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvc2VydmVyL1tzZXJ2ZXJdL2luZGV4LmpzIl0sIm5hbWVzIjpbImZldGNoZXIiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyIiwianNvbiIsInJlc3VsdCIsIm1haW4iLCJwcm9wcyIsInNlcnZlciIsInVzZVN0YXRlIiwibGF0ZXN0TW92aWVzIiwic2V0TGF0ZXNNb3ZpZXMiLCJvbmdvaW5nTW92aWVzIiwic2V0T25nb2luZ01vdmllcyIsIm1vdmllV2F0Y2hMaXN0Iiwic2V0TW92aWVXYXRjaExpc3QiLCJvbmdvaW5nU2hvd3MiLCJzZXRPbmdvaW5nU2hvd3MiLCJuZXdseUFkZGVkTW92aWVzIiwic2V0TmV3bHlBZGRlZE1vdmllcyIsIm5ld2x5QWRkZWRTaG93cyIsInNldE5ld2x5QWRkZWRTaG93cyIsIm5ld2x5QWRkZWRFcGlzb2RlcyIsInNldE5ld2x5QWRkZWRFcGlzb2RlcyIsInJlY29tbWVuZGVkTW92aWUiLCJzZXRSZWNvbW1lbmRlZE1vdmllIiwicG9wdWxhck1vdmllcyIsInNldFBvcHVsYXJNb3ZpZXMiLCJsb2FkaW5nIiwibG9hZGVkIiwic2V0TG9hZGVkIiwidHJhbnNpdGlvbnMiLCJ1c2VUcmFuc2l0aW9uIiwiZnJvbSIsIm9wYWNpdHkiLCJlbnRlciIsImxlYXZlIiwiZGVsYXkiLCJvblJlc3QiLCJ3aW5kb3dTaXplIiwidXNlV2luZG93U2l6ZSIsImFsbENvbnRlbnQiLCJnZXRNb3ZpZUxpc3QiLCJnZW5yZSIsIm9yZGVyYnkiLCJsaW1pdCIsIm9uZ29pbmciLCJ3YXRjaGxpc3QiLCJwb3B1bGFyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXJ2ZXJfaXAiLCJjb29raWUiLCJnZXQiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImZvckVhY2giLCJtb3ZpZSIsImltYWdlcyIsImltYWdlIiwiYWN0aXZlIiwidHlwZSIsInBhdGgiLCJiYWNrZHJvcCIsInBvc3RlciIsImdldE5ld0VwaXNvZGVMaXN0IiwiZXBpc29kZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRTaG93TGlzdCIsInVwY29taW5nIiwiZ2V0QWN0aXZlSW1hZ2UiLCJ1c2VFZmZlY3QiLCJ2YWxpZGF0ZVNlcnZlckFjY2VzcyIsInNlcnZlclRva2VuIiwic29ja2V0Iiwic29ja2V0SU9DbGllbnQiLCJvbiIsIm1vdmllRWxlbWVudHMiLCJpbWciLCJwdXNoIiwiaWQiLCJ3YXRjaHRpbWUiLCJydW50aW1lIiwidGl0bGUiLCJvdmVydmlldyIsInNlbGVjdE1vdmllIiwic3RhdHVzIiwiYWN0aXZlTG9nbyIsIm1vdmllcyIsInJldmVyc2UiLCJvYmplY3RGaXQiLCJoZWlnaHQiLCJtaW5IZWlnaHQiLCJjdXJzb3IiLCJ0ZXh0U2hhZG93Iiwic2hvd3MiLCJzaG93RWxlbWVudHMiLCJzaG93Iiwic2VsZWN0U2hvdyIsInRpbWVfd2F0Y2hlZCIsInNlYXNvbl9uYW1lIiwiZXBpc29kZV9udW1iZXIiLCJ0b3RhbF90aW1lIiwic2VsZWN0RXBpc29kZSIsInNob3dfaWQiLCJzZWFzb25fbnVtYmVyIiwiaW50ZXJuYWxlcGlzb2RlaWQiLCJlcGlzb2RlcyIsImVwaXNvZGVFbGVtZW50cyIsInNlcmllX2lkIiwic2Vhc29uIiwiaW50ZXJuYWxFcGlzb2RlSUQiLCJSb3V0ZXIiLCJzZXJ2ZXJfaWQiLCJzaG93SUQiLCJzZWFzb25OdW1iZXIiLCJlcGlzb2RlTnVtYmVyIiwic2Nyb2xsTGVmdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwic2Nyb2xsVG8iLCJzY3JvbGxYIiwic2Nyb2xsWSIsInNjcm9sbFJpZ2h0IiwiU3R5bGVzIiwibG9hZGluZ2lvU3Bpbm5lckVjbGlwc2UiLCJsZGlvIiwicmVjb21tZW5kZWQiLCJyZWNvbW1lbmRlZEluZm9ybWF0aW9uIiwibG9nbyIsImNvbnRyb2xzIiwicHJvY2VzcyIsImNvbG9yIiwiY29udGVudFJvd3MiLCJsZW5ndGgiLCJ0ZXh0VHJhbnNmb3JtIiwibW92aWVSb3ciLCJzY3JvbGxhYmxlIiwid2lkdGgiLCJzY3JvbGxCdXR0b24iLCJyaWdodCIsImRpdmlkZXIiLCJpdGVtIiwibW92aWVTdHlsZXMiLCJ0byIsIm9wIiwidHJhbnNmb3JtIiwidHJhbnMiLCJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUFDLEdBQUc7QUFBQSxTQUNqQkMsaURBQUssQ0FBQ0QsR0FBRCxDQUFMLENBQ0dFLElBREgsQ0FDUSxVQUFBQyxDQUFDLEVBQUk7QUFDVCxXQUFPQSxDQUFDLENBQUNDLElBQUYsR0FBU0YsSUFBVCxDQUFjLFVBQUFHLE1BQU0sRUFBSTtBQUMzQixhQUFPQSxNQUFQO0FBQ0gsS0FGTSxDQUFQO0FBR0QsR0FMSCxDQURpQjtBQUFBLENBQW5COztBQVNBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNDLEtBQUQsRUFBVztBQUFBOztBQUNwQjtBQUNBLE1BQUlDLE1BQU0sR0FBR0QsS0FBSyxDQUFDQyxNQUFuQjs7QUFGb0Isa0JBSW1CQyxzREFBUSxDQUFDLElBQUQsQ0FKM0I7QUFBQSxNQUliQyxZQUphO0FBQUEsTUFJQ0MsY0FKRDs7QUFBQSxtQkFLc0JGLHNEQUFRLENBQUMsRUFBRCxDQUw5QjtBQUFBLE1BS2JHLGFBTGE7QUFBQSxNQUtFQyxnQkFMRjs7QUFBQSxtQkFNd0JKLHNEQUFRLENBQUMsRUFBRCxDQU5oQztBQUFBLE1BTWJLLGNBTmE7QUFBQSxNQU1HQyxpQkFOSDs7QUFBQSxtQkFPb0JOLHNEQUFRLENBQUMsRUFBRCxDQVA1QjtBQUFBLE1BT2JPLFlBUGE7QUFBQSxN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QUEsSUFqQkEsQ0FqSlIsQ0FESixDQWpDQSxDQVZJLENBQVI7QUF1TkgsQ0EvckJEOztHQUFNL0ksSTtVQWdCa0IwQiwyRCxFQVlEUSxxRTs7OztBQXFxQlJsQyxtRUFBZixFLENBU0EiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvc2VydmVyL1tzZXJ2ZXJdLjA5ZGM5MmVjZDI3MTYyODRkNjhiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5b3V0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGF5b3V0J1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXHJcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xyXG5pbXBvcnQgY29va2llIGZyb20gJ2pzLWNvb2tpZSc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDYXJvdXNlbCwgQ29udGFpbmVyLCBSb3csIENvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB2YWxpZGF0ZVNlcnZlckFjY2VzcyBmcm9tICcuLi8uLi8uLi9saWIvdmFsaWRhdGVTZXJ2ZXJBY2Nlc3MnO1xyXG5pbXBvcnQgdXNlV2luZG93U2l6ZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2hvb2tzL1dpbmRvd1NpemUnO1xyXG5pbXBvcnQgU3R5bGVzIGZyb20gJy4uLy4uLy4uL3N0eWxlcy9zZXJ2ZXIubW9kdWxlLmNzcyc7XHJcbmltcG9ydCBNb3ZpZUJhY2tkcm9wIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbW92aWVCYWNrZHJvcCc7XHJcbmltcG9ydCBFcGlzb2RlUG9zdGVyIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZXBpc29kZVBvc3Rlcic7XHJcbmltcG9ydCBzb2NrZXRJT0NsaWVudCBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xyXG5pbXBvcnQgbW92aWVTdHlsZXMgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tb3ZpZUJhY2tkcm9wLm1vZHVsZS5jc3MnXHJcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkLCBzZXRJdGVtcyB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XHJcblxyXG5jb25zdCBmZXRjaGVyID0gdXJsID0+XHJcbiAgZmV0Y2godXJsKVxyXG4gICAgLnRoZW4ociA9PiB7XHJcbiAgICAgIHJldHVybiByLmpzb24oKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICApO1xyXG5cclxuY29uc3QgbWFpbiA9IChwcm9wcykgPT4ge1xyXG4gICAgLy8gcHJvcHMuc2VydmVyIGlzIGZyb20gdGhlIFNTUiB1bmRlciB0aGlzIGZ1bmN0aW9uXHJcbiAgICBsZXQgc2VydmVyID0gcHJvcHMuc2VydmVyO1xyXG4gICAgXHJcbiAgICBjb25zdCBbbGF0ZXN0TW92aWVzLCBzZXRMYXRlc01vdmllc10gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFtvbmdvaW5nTW92aWVzLCBzZXRPbmdvaW5nTW92aWVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFttb3ZpZVdhdGNoTGlzdCwgc2V0TW92aWVXYXRjaExpc3RdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW29uZ29pbmdTaG93cywgc2V0T25nb2luZ1Nob3dzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtuZXdseUFkZGVkTW92aWVzLCBzZXROZXdseUFkZGVkTW92aWVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtuZXdseUFkZGVkU2hvd3MsIHNldE5ld2x5QWRkZWRTaG93c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbbmV3bHlBZGRlZEVwaXNvZGVzLCBzZXROZXdseUFkZGVkRXBpc29kZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW3JlY29tbWVuZGVkTW92aWUsIHNldFJlY29tbWVuZGVkTW92aWVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW3BvcHVsYXJNb3ZpZXMsIHNldFBvcHVsYXJNb3ZpZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgbGV0IGxvYWRpbmcgPSAwO1xyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihuZXdseUFkZGVkTW92aWVzLCB7XHJcbiAgICAgICAgZnJvbTogeyBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgZW50ZXI6IHsgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgIGxlYXZlOiB7IG9wYWNpdHk6IDAgfSxcclxuICAgICAgICBkZWxheTogMjAwLFxyXG4gICAgICAgIG9uUmVzdDogKCkgPT4gc2V0TmV3bHlBZGRlZE1vdmllcyhbXSksXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSB1c2VXaW5kb3dTaXplKCk7XHJcbiAgICBsZXQgYWxsQ29udGVudCA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBxdWVyeSB0byB0aGUgY3VycmVudCBhY3RpdmUgc2VydmVyIGZvciBhIGxpc3Qgb2YgbW92aWVzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZW5yZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlcmJ5IFxyXG4gICAgICogQHBhcmFtIHtpbnR9IGxpbWl0IFxyXG4gICAgICovXHJcbiAgICBjb25zdCBnZXRNb3ZpZUxpc3QgPSBhc3luYyAoZ2VucmU9bnVsbCwgb3JkZXJieT1udWxsLCBsaW1pdD0yMCwgb25nb2luZz1mYWxzZSwgd2F0Y2hsaXN0PWZhbHNlLCBwb3B1bGFyPWZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVybDtcclxuICAgICAgICAgICAgaWYgKG9uZ29pbmcpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IGAke3NlcnZlci5zZXJ2ZXJfaXB9L2FwaS9tb3ZpZXMvbGlzdC9vbmdvaW5nPyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYod2F0Y2hsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvbW92aWVzL2xpc3Qvd2F0Y2hsaXN0PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYocG9wdWxhcikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL21vdmllcy9saXN0L3BvcHVsYXI/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvbW92aWVzL2xpc3Qke2dlbnJlICE9PSBudWxsID8gJy9nZW5yZS8nK2dlbnJlIDogJyd9PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXN1bHQuZm9yRWFjaChtb3ZpZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS50eXBlID09PSAnQkFDS0RST1AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBxdWVyeSB0byB0aGUgY3VycmVudCBhY3RpdmUgc2VydmVyIGZvciBhIGxpc3Qgb2YgbmV3IGVwaXNvZGVzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZW5yZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlcmJ5IFxyXG4gICAgICogQHBhcmFtIHtpbnR9IGxpbWl0IFxyXG4gICAgICovXHJcbiAgICAgICAgIGNvbnN0IGdldE5ld0VwaXNvZGVMaXN0ID0gYXN5bmMgKG9yZGVyYnk9bnVsbCwgbGltaXQ9MjApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmw7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvc2VyaWVzL2xpc3QvZXBpc29kZXM/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4gci5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzdWx0LmZvckVhY2goZXBpc29kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGltYWdlIG9mIGVwaXNvZGUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnR5cGUgPT09ICdCQUNLRFJPUCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZS5iYWNrZHJvcCA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGltYWdlLnR5cGUgPT09ICdQT1NURVInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UucGF0aCA9PT0gJ25vX2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZS5iYWNrZHJvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXBpc29kZS5iYWNrZHJvcCAhPSBudWxsICYmIGVwaXNvZGUucG9zdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFNob3dMaXN0ID0gYXN5bmMgKGdlbnJlPW51bGwsIG9yZGVyYnk9bnVsbCwgbGltaXQ9MjAsIG9uZ29pbmc9ZmFsc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsO1xyXG4gICAgICAgICAgICBpZiAob25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL3Nlcmllcy9saXN0L29uZ29pbmc/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvc2VyaWVzL2xpc3Qke2dlbnJlICE9PSBudWxsID8gJy9nZW5yZS8nK2dlbnJlIDogJyd9PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBpZiAob25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnVwY29taW5nLmZvckVhY2gobW92aWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBtb3ZpZS5pbWFnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UudHlwZSA9PT0gJ0JBQ0tEUk9QJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UucGF0aCA9PT0gJ25vX2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uub25nb2luZy5mb3JFYWNoKG1vdmllID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnR5cGUgPT09ICdCQUNLRFJPUCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5iYWNrZHJvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmllLmJhY2tkcm9wICE9IG51bGwgJiYgbW92aWUucG9zdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXN1bHQuZm9yRWFjaChtb3ZpZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS50eXBlID09PSAnQkFDS0RST1AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEFjdGl2ZUltYWdlID0gKGltYWdlcywgdHlwZSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UudHlwZSA9PT0gdHlwZSAmJiBpbWFnZS5hY3RpdmUgJiYgaW1hZ2UucGF0aCAhPSBcIm5vX2ltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICB2YWxpZGF0ZVNlcnZlckFjY2VzcyhzZXJ2ZXIsIChzZXJ2ZXJUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSBzb2NrZXRJT0NsaWVudChzZXJ2ZXIuc2VydmVyX2lwKTtcclxuICAgICAgICAgICAgc29ja2V0Lm9uKFwiTU9WSUVcIiwgbW92aWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW92aWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBuZXdseUFkZGVkTW92aWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IG1vdmllLmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHttb3ZpZS5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8yMDAweDEwMDAnIFxyXG4gICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldE5ld2x5QWRkZWRNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdldCByZWNvbW1lbmRlZCB2aWRlbyAocmFuZG9tIHZpZGVvIHJpZ2h0IG5vdylcclxuICAgICAgICAgICAgZmV0Y2goYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL21vdmllcy9saXN0L3JhbmRvbT90cmFpbGVyPXRydWUmdG9rZW49JHtjb29raWUuZ2V0KCdzZXJ2ZXJUb2tlbicpfWAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubW92aWUuYWN0aXZlTG9nbyA9IGdldEFjdGl2ZUltYWdlKHJlc3VsdC5tb3ZpZS5pbWFnZXMsICdMT0dPJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVjb21tZW5kZWRNb3ZpZShyZXN1bHQubW92aWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcmVjb21tZW5kZWQgbW92aWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgbmV3ZXN0IHJlbGVhc2VkIG1vdmllcyAoVGhlIHNsaWVzaG93KVxyXG4gICAgICAgICAgICBnZXRNb3ZpZUxpc3QobnVsbCwgJ3JlbGVhc2VfZGF0ZScsIDUpLnRoZW4obW92aWVzID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdmllcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92aWVFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbW92aWUgb2YgbW92aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IG1vdmllLmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL29yaWdpbmFsLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYXJvdXNlbC5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkLWJsb2NrIHctMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2ltZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e21vdmllLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7b2JqZWN0Rml0OiAnY292ZXInLCBoZWlnaHQ6ICc5MHZoJywgbWluSGVpZ2h0OiAnNTAwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge3NlbGVjdE1vdmllKG1vdmllLmlkKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhcm91c2VsLkNhcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPXt7dGV4dFNoYWRvdzogJzBweCAwcHggNnB4ICMwMDAnfX0+e21vdmllLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3t0ZXh0U2hhZG93OiAnMHB4IDBweCA2cHggIzAwMCd9fT57bW92aWUub3ZlcnZpZXd9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DYXJvdXNlbC5DYXB0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Nhcm91c2VsLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWRpbmcrK1xyXG4gICAgICAgICAgICAgICAgc2V0TGF0ZXNNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHBvcHVsYXIgbW92aWVzXHJcbiAgICAgICAgICAgIGdldE1vdmllTGlzdChudWxsLCAncmVsZWFzZV9kYXRlJywgMjAsIGZhbHNlLCBmYWxzZSwgdHJ1ZSkudGhlbihtb3ZpZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW92aWVzLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZpZUVsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtb3ZpZSBvZiBtb3ZpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gbW92aWUuYmFja2Ryb3AgIT09IG51bGwgPyBgaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzUwMC8ke21vdmllLmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXttb3ZpZS5pZH0gdGltZT17bW92aWUud2F0Y2h0aW1lfSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSB0aXRsZT17bW92aWUudGl0bGV9IG92ZXJ2aWV3PXttb3ZpZS5vdmVydmlld30gcnVudGltZT17bW92aWUucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RNb3ZpZShtb3ZpZS5pZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXRQb3B1bGFyTW92aWVzKG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBvbmdvaW5nIG1vdmllc1xyXG4gICAgICAgICAgICBnZXRNb3ZpZUxpc3QobnVsbCwgJ3JlbGVhc2VfZGF0ZScsIDIwLCB0cnVlKS50aGVuKG1vdmllcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZpZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1vdmllIG9mIG1vdmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBtb3ZpZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE9uZ29pbmdNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHdhdGNobGlzdCBmb3IgbW92aWVzXHJcbiAgICAgICAgICAgIGdldE1vdmllTGlzdChudWxsLCAncmVsZWFzZV9kYXRlJywgMjAsIGZhbHNlLCB0cnVlKS50aGVuKG1vdmllcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZpZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1vdmllIG9mIG1vdmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBtb3ZpZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE1vdmllV2F0Y2hMaXN0KG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBuZXdseSBhZGRlZCBtb3ZpZXNcclxuICAgICAgICAgICAgZ2V0TW92aWVMaXN0KG51bGwsICdhZGRlZF9kYXRlJywgMjApLnRoZW4obW92aWVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZpZUVsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtb3ZpZSBvZiBtb3ZpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gbW92aWUuYmFja2Ryb3AgIT09IG51bGwgPyBgaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzUwMC8ke21vdmllLmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXttb3ZpZS5pZH0gdGltZT17bW92aWUud2F0Y2h0aW1lfSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSB0aXRsZT17bW92aWUudGl0bGV9IG92ZXJ2aWV3PXttb3ZpZS5vdmVydmlld30gcnVudGltZT17bW92aWUucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RNb3ZpZShtb3ZpZS5pZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXROZXdseUFkZGVkTW92aWVzKG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBuZXdseSBhZGRlZCBzaG93c1xyXG4gICAgICAgICAgICBnZXRTaG93TGlzdChudWxsLCAnYWRkZWRfZGF0ZScsIDIwKS50aGVuKHNob3dzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzaG93RWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHNob3cgb2Ygc2hvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gc2hvdy5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7c2hvdy5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8yMDAweDEwMDAnIFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LndhdGNodGltZX0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy50aXRsZX0gb3ZlcnZpZXc9e3Nob3cub3ZlcnZpZXd9IHJ1bnRpbWU9e3Nob3cucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RTaG93KHNob3cuaWQpfT48L01vdmllQmFja2Ryb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWRpbmcrK1xyXG4gICAgICAgICAgICAgICAgc2V0TmV3bHlBZGRlZFNob3dzKHNob3dFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBHZXQgb25nb2luZyBzaG93c1xyXG4gICAgICAgICAgICBnZXRTaG93TGlzdChudWxsLCAnYWRkZWRfZGF0ZScsIDIwLCB0cnVlKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzaG93IG9mIHJlc3VsdC51cGNvbWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBzaG93LmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtzaG93LmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0VsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LnRpbWVfd2F0Y2hlZH0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy5zZWFzb25fbmFtZSArIFwiIC0gRXBpc29kZSBcIiArIHNob3cuZXBpc29kZV9udW1iZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ2aWV3PXtzaG93Lm92ZXJ2aWV3fSBydW50aW1lPXtzaG93LnRvdGFsX3RpbWV9IGJhY2tkcm9wPXtpbWd9IG9uQ2xpY2s9eyhpZCkgPT4gc2VsZWN0RXBpc29kZShzaG93LnNob3dfaWQsIHNob3cuc2Vhc29uX251bWJlciwgc2hvdy5lcGlzb2RlX251bWJlciwgc2hvdy5pbnRlcm5hbGVwaXNvZGVpZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2hvdyBvZiByZXN1bHQub25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBzaG93LmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtzaG93LmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0VsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LnRpbWVfd2F0Y2hlZH0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy5zZWFzb25fbmFtZSArIFwiIC0gRXBpc29kZSBcIiArIHNob3cuZXBpc29kZV9udW1iZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ2aWV3PXtzaG93Lm92ZXJ2aWV3fSBydW50aW1lPXtzaG93LnRvdGFsX3RpbWV9IGJhY2tkcm9wPXtpbWd9IG9uQ2xpY2s9eyhpZCkgPT4gc2VsZWN0RXBpc29kZShzaG93LnNob3dfaWQsIHNob3cuc2Vhc29uX251bWJlciwgc2hvdy5lcGlzb2RlX251bWJlciwgc2hvdy5pbnRlcm5hbGVwaXNvZGVpZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXRPbmdvaW5nU2hvd3Moc2hvd0VsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobG9hZGluZyA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZXROZXdFcGlzb2RlTGlzdCgnYWRkZWRfZGF0ZScsIDIwKS50aGVuKGVwaXNvZGVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlcGlzb2RlRWxlbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlcGlzb2RlIG9mIGVwaXNvZGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3RlciA9IGVwaXNvZGUucG9zdGVyICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtlcGlzb2RlLnBvc3Rlcn1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS81MDB4MTAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tkcm9wID0gZXBpc29kZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7ZXBpc29kZS5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS81MDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgZXBpc29kZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcGlzb2RlUG9zdGVyIHNob3c9e2VwaXNvZGUuc2VyaWVfaWR9IHNlYXNvbj17ZXBpc29kZS5zZWFzb259IGVwaXNvZGU9e2VwaXNvZGUuZXBpc29kZX0gcG9zdGVyPXtwb3N0ZXJ9IGludGVybmFsRXBpc29kZUlEPXtlcGlzb2RlLmludGVybmFsZXBpc29kZWlkfSBiYWNrZHJvcD17YmFja2Ryb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoc2Vhc29uLCBlcGlzb2RlLCBzaG93LCBpbnRlcm5hbEVwaXNvZGVJRCkgPT4gc2VsZWN0RXBpc29kZShzaG93LCBzZWFzb24sIGVwaXNvZGUsIGludGVybmFsRXBpc29kZUlEKX0+PC9FcGlzb2RlUG9zdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE5ld2x5QWRkZWRFcGlzb2RlcyhlcGlzb2RlRWxlbWVudHMpO1xyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgW2xvYWRpbmddKTtcclxuXHJcblxyXG4gICAgY29uc3Qgc2VsZWN0TW92aWUgPSAoaWQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L21vdmllcy92aWRlby8ke2lkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdFNob3cgPSAoaWQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L3Nob3dzL3ZpZGVvLyR7aWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0RXBpc29kZSA9IChzaG93SUQsIHNlYXNvbk51bWJlciwgZXBpc29kZU51bWJlciwgaW50ZXJuYWxFcGlzb2RlSUQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L3Nob3dzL3ZpZGVvLyR7c2hvd0lEfS9zZWFzb24vJHtzZWFzb25OdW1iZXJ9L2VwaXNvZGUvJHtlcGlzb2RlTnVtYmVyfT9pbnRlcm5hbElEPSR7aW50ZXJuYWxFcGlzb2RlSUR9YClcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IChpZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zY3JvbGxMZWZ0IC09ICh3aW5kb3cuaW5uZXJXaWR0aCkqMC44O1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzY3JvbGxSaWdodCA9IChpZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zY3JvbGxMZWZ0ICs9ICh3aW5kb3cuaW5uZXJXaWR0aCkqMC44O1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTEFZT1VUIC8vXHJcbiAgICByZXR1cm4gKDw+XHJcbiAgICAgICAgeyFsb2FkZWQgJiZcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5sb2FkaW5naW9TcGlubmVyRWNsaXBzZX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubGRpb30+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtsb2FkZWQgJiZcclxuXHJcbiAgICAgICAgPExheW91dCBzZWFyY2hFbmFibGVkIHNlcnZlcj17c2VydmVyfSBzZXJ2ZXJUb2tlbj17Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX0+XHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPC9IZWFkPlxyXG5cclxuICAgICAgICB7cmVjb21tZW5kZWRNb3ZpZSAhPSBmYWxzZSAmJlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnJlY29tbWVuZGVkfT5cclxuICAgICAgICAgICAgICAgIDx2aWRlbyAgYXV0b1BsYXk9e3RydWV9IGxvb3A9e3RydWV9IHByZWxvYWQ9XCJhdXRvXCIgbXV0ZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9e2Ake3NlcnZlci5zZXJ2ZXJfaXB9L2FwaS90cmFpbGVyLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfT90eXBlPU1PVklFJnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gfXR5cGU9XCJ2aWRlby9tcDRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC92aWRlbz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMucmVjb21tZW5kZWRJbmZvcm1hdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdICE9IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2BodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9vcmlnaW5hbC8ke3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdLnBhdGh9YH0gY2xhc3NOYW1lPXtTdHlsZXMubG9nb30gLz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdID09IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPntyZWNvbW1lbmRlZE1vdmllW1widGl0bGVcIl19PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+e3JlY29tbWVuZGVkTW92aWVbXCJvdmVydmlld1wiXX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5jb250cm9sc30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2Avc2VydmVyLyR7c2VydmVyLnNlcnZlcl9pZH0vbW92aWVzL3ZpZGVvLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfT9hdXRvUGxheT10cnVlYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzLzAwMS1wbGF5LWJ1dHRvbi5wbmdgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2Avc2VydmVyLyR7c2VydmVyLnNlcnZlcl9pZH0vbW92aWVzL3ZpZGVvLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy8wMDItaW5mb3JtYXRpb24ucG5nYH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICA8YnI+PC9icj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT5cclxuICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCBjbGFzc05hbWU9e1N0eWxlcy5jb250ZW50Um93c30+XHJcbiAgICAgICAgICAgIHtwb3B1bGFyTW92aWVzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5Qb3B1bMOkcnQganVzdCBudTwvaDI+ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicG9wdWxhck1vdmllc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwb3B1bGFyTW92aWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cG9wdWxhck1vdmllcy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ3BvcHVsYXJNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbEJ1dHRvbn0gc3R5bGU9e3tyaWdodDogJzAnfX0gb25DbGljaz17KCkgPT4gc2Nyb2xsUmlnaHQoJ3BvcHVsYXJNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB7b25nb2luZ01vdmllcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHN0eWxlPXt7dGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnfX0+UMOlZ8OlZW5kZSBmaWxtZXI8L2gyPiAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubW92aWVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm9uZ29pbmdNb3ZpZXNcIiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxhYmxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b25nb2luZ01vdmllc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdNb3ZpZXMubGVuZ3RoICogNDgwID4gd2luZG93U2l6ZS53aWR0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxMZWZ0KCdvbmdvaW5nTW92aWVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9sZWZ0LnN2Z2B9IHdpZHRoPVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCdvbmdvaW5nTW92aWVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8aHIgY2xhc3NOYW1lPXtTdHlsZXMuZGl2aWRlcn0+PC9ocj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge29uZ29pbmdTaG93cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHN0eWxlPXt7dGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnfX0+UMOlZ8OlZW5kZSBzZXJpZXI8L2gyPiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwib25nb2luZ1Nob3dzXCIgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsYWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdTaG93c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdTaG93cy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ29uZ29pbmdTaG93cycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvbGVmdC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCdvbmdvaW5nU2hvd3MnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGhyIGNsYXNzTmFtZT17U3R5bGVzLmRpdmlkZXJ9PjwvaHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkTW92aWVzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcIi9zZXJ2ZXIvXCIgKyBzZXJ2ZXIuc2VydmVyX2lkICsgXCIvbW92aWVzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIGZpbG1lcjwvaDI+PC9hPjwvTGluaz4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibmV3bHlBZGRlZE1vdmllc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNpdGlvbnMoKHsgb3BhY2l0eSB9LCBpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVkLmRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bW92aWVTdHlsZXMuYmFja2Ryb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eS50byhpdGVtLm9wKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBvcGFjaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50byhpdGVtLnRyYW5zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oeSA9PiBgdHJhbnNsYXRlM2QoMCwke3l9cHgsMClgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3bHlBZGRlZE1vdmllcy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ25ld2x5QWRkZWRNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBzdHlsZT17e3JpZ2h0OiAnMCd9fSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxSaWdodCgnbmV3bHlBZGRlZE1vdmllcycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvcmlnaHQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8aHIgY2xhc3NOYW1lPXtTdHlsZXMuZGl2aWRlcn0+PC9ocj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge21vdmllV2F0Y2hMaXN0Lmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcIi9zZXJ2ZXIvXCIgKyBzZXJ2ZXIuc2VydmVyX2lkICsgXCIvbW92aWVzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5GaWxtZXIgYXR0IHNlIHNlbmFyZTwvaDI+PC9hPjwvTGluaz4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW92aWVXYXRjaExpc3RcIiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxhYmxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW92aWVXYXRjaExpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb3ZpZVdhdGNoTGlzdC5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ21vdmllV2F0Y2hMaXN0Jyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9sZWZ0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbEJ1dHRvbn0gc3R5bGU9e3tyaWdodDogJzAnfX0gb25DbGljaz17KCkgPT4gc2Nyb2xsUmlnaHQoJ21vdmllV2F0Y2hMaXN0Jyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge25ld2x5QWRkZWRFcGlzb2Rlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvc2VydmVyL1wiICsgc2VydmVyLnNlcnZlcl9pZCArIFwiL3Nob3dzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIGF2c25pdHQ8L2gyPjwvYT48L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubW92aWVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm5ld2x5QWRkZWRFcGlzb2Rlc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkRXBpc29kZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkRXBpc29kZXMubGVuZ3RoICogNDgwID4gd2luZG93U2l6ZS53aWR0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxMZWZ0KCduZXdseUFkZGVkRXBpc29kZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBzdHlsZT17e3JpZ2h0OiAnMCd9fSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxSaWdodCgnbmV3bHlBZGRlZEVwaXNvZGVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvc2VydmVyL1wiICsgc2VydmVyLnNlcnZlcl9pZCArIFwiL3Nob3dzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIHNlcmllcjwvaDI+PC9hPjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibmV3bHlBZGRlZFNob3dzXCIgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsYWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93cy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ25ld2x5QWRkZWRTaG93cycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvbGVmdC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCduZXdseUFkZGVkU2hvd3MnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGhyIGNsYXNzTmFtZT17U3R5bGVzLmRpdmlkZXJ9PjwvaHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0xheW91dD5cclxuICAgICAgICB9XHJcbiAgICAgICAgPC8+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1haW47XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyIGFuZCBzZW5kIGl0IHRvIHRoZSBmcm9udCBlbmQgYmVmb3JlIHJlbmRlciAodGhpcyBpcyBzZXJ2ZXItc2lkZSlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XHJcbiAgICBsZXQgc2VydmVySWQgPSBjb250ZXh0LnBhcmFtcy5zZXJ2ZXI7XHJcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5TRVJWRVJfUE9SVH0ke3Byb2Nlc3MuZW52LlNFUlZFUl9TVUJfRk9MREVSfS9hcGkvc2VydmVycy9nZXRTZXJ2ZXJgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGlkOiBzZXJ2ZXJJZFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgIHNlcnZlcjogZGF0YS5zZXJ2ZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9