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
          lineNumber: 292,
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
                lineNumber: 325,
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
                lineNumber: 326,
                columnNumber: 29
              }
            }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Carousel"].Caption, {
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 333,
                columnNumber: 29
              }
            }, __jsx("h3", {
              style: {
                textShadow: '0px 0px 6px #000'
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 334,
                columnNumber: 33
              }
            }, movie.title), __jsx("p", {
              style: {
                textShadow: '0px 0px 6px #000'
              },
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 335,
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
              lineNumber: 356,
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
              lineNumber: 375,
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
              lineNumber: 394,
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
              lineNumber: 412,
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
              lineNumber: 430,
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
              lineNumber: 447,
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
              lineNumber: 454,
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
                lineNumber: 474,
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
      lineNumber: 516,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.ldio,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 517,
      columnNumber: 13
    }
  }, __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 518,
      columnNumber: 17
    }
  }))), loaded && __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    searchEnabled: true,
    server: server,
    serverToken: js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken'),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 524,
      columnNumber: 9
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 525,
      columnNumber: 9
    }
  }), recommendedMovie != false && __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.recommended,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 529,
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
      lineNumber: 530,
      columnNumber: 17
    }
  }, __jsx("source", {
    src: "".concat(server.server_ip, "/api/trailer/").concat(recommendedMovie["id"], "?type=MOVIE&token=").concat(js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('serverToken')),
    type: "video/mp4",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 531,
      columnNumber: 21
    }
  })), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.recommendedInformation,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 533,
      columnNumber: 17
    }
  }, recommendedMovie["activeLogo"] != false && __jsx("img", {
    src: "https://image.tmdb.org/t/p/original/".concat(recommendedMovie["activeLogo"].path),
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.logo,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 535,
      columnNumber: 21
    }
  }), recommendedMovie["activeLogo"] == false && __jsx("h1", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 538,
      columnNumber: 21
    }
  }, recommendedMovie["title"]), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 540,
      columnNumber: 21
    }
  }, recommendedMovie["overview"]), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.controls,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 21
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/".concat(server.server_id, "/movies/video/").concat(recommendedMovie["id"], "?autoPlay=true"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 542,
      columnNumber: 25
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/001-play-button.png"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 543,
      columnNumber: 29
    }
  })), __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/".concat(server.server_id, "/movies/video/").concat(recommendedMovie["id"]),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 545,
      columnNumber: 25
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/002-information.png"),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 546,
      columnNumber: 29
    }
  }))))), __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 556,
      columnNumber: 9
    }
  }), __jsx("div", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 557,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Container"], {
    fluid: true,
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.contentRows,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 558,
      columnNumber: 13
    }
  }, popularMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 561,
      columnNumber: 25
    }
  }, "Popul\xE4rt just nu"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 562,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "popularMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 563,
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
      lineNumber: 568,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 569,
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
      lineNumber: 571,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 572,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 577,
      columnNumber: 21
    }
  })), ongoingMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 583,
      columnNumber: 25
    }
  }, "P\xE5g\xE5ende filmer"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 584,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "ongoingMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 585,
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
      lineNumber: 590,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 591,
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
      lineNumber: 593,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 594,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 599,
      columnNumber: 21
    }
  })), ongoingShows.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 605,
      columnNumber: 25
    }
  }, "P\xE5g\xE5ende serier"), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 606,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "ongoingShows",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 607,
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
      lineNumber: 612,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 613,
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
      lineNumber: 615,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 616,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 621,
      columnNumber: 21
    }
  })), newlyAddedMovies.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/movies",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 627,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 627,
      columnNumber: 80
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 627,
      columnNumber: 108
    }
  }, "Nyligen tillagda filmer"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 628,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedMovies",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 629,
      columnNumber: 29
    }
  }, transitions(function (_ref4, item) {
    var opacity = _ref4.opacity;
    return __jsx(react_spring__WEBPACK_IMPORTED_MODULE_18__["animated"].div, {
      className: _components_movieBackdrop_module_css__WEBPACK_IMPORTED_MODULE_17___default.a.backdrop,
      key: item.id,
      style: opacity,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 631,
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
      lineNumber: 642,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 643,
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
      lineNumber: 645,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 646,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 651,
      columnNumber: 21
    }
  })), movieWatchList.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/movies",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 657,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 657,
      columnNumber: 80
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 657,
      columnNumber: 108
    }
  }, "Filmer att se senare"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 658,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "movieWatchList",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 659,
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
      lineNumber: 664,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 665,
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
      lineNumber: 667,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 668,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 673,
      columnNumber: 21
    }
  })), newlyAddedEpisodes.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/shows",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 79
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 107
    }
  }, "Nyligen tillagda avsnitt"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 680,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedEpisodes",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 681,
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
      lineNumber: 686,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 687,
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
      lineNumber: 689,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 690,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 695,
      columnNumber: 21
    }
  })), newlyAddedShows.length > 0 && __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "/server/" + server.server_id + "/shows",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 25
    }
  }, __jsx("a", {
    style: {
      color: 'white'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 79
    }
  }, __jsx("h2", {
    style: {
      textTransform: 'capitalize'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 107
    }
  }, "Nyligen tillagda serier"))), __jsx("div", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.movieRow,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 702,
      columnNumber: 25
    }
  }, __jsx("div", {
    id: "newlyAddedShows",
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.scrollable,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 703,
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
      lineNumber: 708,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/left.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 709,
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
      lineNumber: 711,
      columnNumber: 37
    }
  }, __jsx("img", {
    src: "".concat("http://localhost:3000", "/images/right.svg"),
    width: "70",
    height: "70",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 712,
      columnNumber: 41
    }
  })))), __jsx("hr", {
    className: _styles_server_module_css__WEBPACK_IMPORTED_MODULE_13___default.a.divider,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 717,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvc2VydmVyL1tzZXJ2ZXJdL2luZGV4LmpzIl0sIm5hbWVzIjpbImZldGNoZXIiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyIiwianNvbiIsInJlc3VsdCIsIm1haW4iLCJwcm9wcyIsInNlcnZlciIsInVzZVN0YXRlIiwibGF0ZXN0TW92aWVzIiwic2V0TGF0ZXNNb3ZpZXMiLCJvbmdvaW5nTW92aWVzIiwic2V0T25nb2luZ01vdmllcyIsIm1vdmllV2F0Y2hMaXN0Iiwic2V0TW92aWVXYXRjaExpc3QiLCJvbmdvaW5nU2hvd3MiLCJzZXRPbmdvaW5nU2hvd3MiLCJuZXdseUFkZGVkTW92aWVzIiwic2V0TmV3bHlBZGRlZE1vdmllcyIsIm5ld2x5QWRkZWRTaG93cyIsInNldE5ld2x5QWRkZWRTaG93cyIsIm5ld2x5QWRkZWRFcGlzb2RlcyIsInNldE5ld2x5QWRkZWRFcGlzb2RlcyIsInJlY29tbWVuZGVkTW92aWUiLCJzZXRSZWNvbW1lbmRlZE1vdmllIiwicG9wdWxhck1vdmllcyIsInNldFBvcHVsYXJNb3ZpZXMiLCJsb2FkaW5nIiwibG9hZGVkIiwic2V0TG9hZGVkIiwidHJhbnNpdGlvbnMiLCJ1c2VUcmFuc2l0aW9uIiwiZnJvbSIsIm9wYWNpdHkiLCJlbnRlciIsImRlbGF5Iiwib25SZXN0Iiwid2luZG93U2l6ZSIsInVzZVdpbmRvd1NpemUiLCJhbGxDb250ZW50IiwiZ2V0TW92aWVMaXN0IiwiZ2VucmUiLCJvcmRlcmJ5IiwibGltaXQiLCJvbmdvaW5nIiwid2F0Y2hsaXN0IiwicG9wdWxhciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VydmVyX2lwIiwiY29va2llIiwiZ2V0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJmb3JFYWNoIiwibW92aWUiLCJpbWFnZXMiLCJpbWFnZSIsImFjdGl2ZSIsInR5cGUiLCJwYXRoIiwiYmFja2Ryb3AiLCJwb3N0ZXIiLCJnZXROZXdFcGlzb2RlTGlzdCIsImVwaXNvZGUiLCJjb25zb2xlIiwibG9nIiwiZ2V0U2hvd0xpc3QiLCJ1cGNvbWluZyIsImdldEFjdGl2ZUltYWdlIiwidXNlRWZmZWN0IiwidmFsaWRhdGVTZXJ2ZXJBY2Nlc3MiLCJzZXJ2ZXJUb2tlbiIsInNvY2tldCIsInNvY2tldElPQ2xpZW50Iiwib24iLCJtb3ZpZUVsZW1lbnRzIiwiaW1nIiwicHVzaCIsImlkIiwid2F0Y2h0aW1lIiwicnVudGltZSIsInRpdGxlIiwib3ZlcnZpZXciLCJzZWxlY3RNb3ZpZSIsInN0YXR1cyIsImFjdGl2ZUxvZ28iLCJtb3ZpZXMiLCJyZXZlcnNlIiwib2JqZWN0Rml0IiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwiY3Vyc29yIiwidGV4dFNoYWRvdyIsInNob3dzIiwic2hvd0VsZW1lbnRzIiwic2hvdyIsInNlbGVjdFNob3ciLCJ0aW1lX3dhdGNoZWQiLCJzZWFzb25fbmFtZSIsImVwaXNvZGVfbnVtYmVyIiwidG90YWxfdGltZSIsInNlbGVjdEVwaXNvZGUiLCJzaG93X2lkIiwic2Vhc29uX251bWJlciIsImludGVybmFsZXBpc29kZWlkIiwiZXBpc29kZXMiLCJlcGlzb2RlRWxlbWVudHMiLCJzZXJpZV9pZCIsInNlYXNvbiIsImludGVybmFsRXBpc29kZUlEIiwiUm91dGVyIiwic2VydmVyX2lkIiwic2hvd0lEIiwic2Vhc29uTnVtYmVyIiwiZXBpc29kZU51bWJlciIsInNjcm9sbExlZnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInNjcm9sbFRvIiwic2Nyb2xsWCIsInNjcm9sbFkiLCJzY3JvbGxSaWdodCIsIlN0eWxlcyIsImxvYWRpbmdpb1NwaW5uZXJFY2xpcHNlIiwibGRpbyIsInJlY29tbWVuZGVkIiwicmVjb21tZW5kZWRJbmZvcm1hdGlvbiIsImxvZ28iLCJjb250cm9scyIsInByb2Nlc3MiLCJjb2xvciIsImNvbnRlbnRSb3dzIiwibGVuZ3RoIiwidGV4dFRyYW5zZm9ybSIsIm1vdmllUm93Iiwic2Nyb2xsYWJsZSIsIndpZHRoIiwic2Nyb2xsQnV0dG9uIiwicmlnaHQiLCJkaXZpZGVyIiwiaXRlbSIsIm1vdmllU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUFDLEdBQUc7QUFBQSxTQUNqQkMsaURBQUssQ0FBQ0QsR0FBRCxDQUFMLENBQ0dFLElBREgsQ0FDUSxVQUFBQyxDQUFDLEVBQUk7QUFDVCxXQUFPQSxDQUFDLENBQUNDLElBQUYsR0FBU0YsSUFBVCxDQUFjLFVBQUFHLE1BQU0sRUFBSTtBQUMzQixhQUFPQSxNQUFQO0FBQ0gsS0FGTSxDQUFQO0FBR0QsR0FMSCxDQURpQjtBQUFBLENBQW5COztBQVNBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNDLEtBQUQsRUFBVztBQUFBOztBQUNwQjtBQUNBLE1BQUlDLE1BQU0sR0FBR0QsS0FBSyxDQUFDQyxNQUFuQjs7QUFGb0Isa0JBSW1CQyxzREFBUSxDQUFDLElBQUQsQ0FKM0I7QUFBQSxNQUliQyxZQUphO0FBQUEsTUFJQ0MsY0FKRDs7QUFBQSxtQkFLc0JGLHNEQUFRLENBQUMsRUFBRCxDQUw5QjtBQUFBLE1BS2JHLGFBTGE7QUFBQSxNQUtFQyxnQkFMRjs7QUFBQSxtQkFNd0JKLHNEQUFRLENBQUMsRUFBRCxDQU5oQztBQUFBLE1BTWJLLGNBTmE7QUFBQSxNQU1HQyxpQkFOSDs7QUFBQSxtQkFPb0JOLHNEQUFRLENBQUMsRUFBRCxDQVA1QjtBQUFBLE1BT2JPLFlBUGE7QUFBQSxNQU9DQyxlQVBEOztBQUFBLG1CQVE0QlIsc0RBQVEsQ0FBQyxFQUFELENB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RyxVQUFVLENBQUMyRyxLQUExQyxJQUNHLG1FQUNJO0FBQUssYUFBUyxFQUFFZCxpRUFBTSxDQUFDZSxZQUF2QjtBQUFxQyxXQUFPLEVBQUU7QUFBQSxhQUFNeEIsVUFBVSxDQUFDLGlCQUFELENBQWhCO0FBQUEsS0FBOUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQUssT0FBRyxZQUFLZ0IsdUJBQUwscUJBQVI7QUFBbUUsU0FBSyxFQUFDLElBQXpFO0FBQThFLFVBQU0sRUFBQyxJQUFyRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosQ0FESixFQUlJO0FBQUssYUFBUyxFQUFFUCxpRUFBTSxDQUFDZSxZQUF2QjtBQUFxQyxTQUFLLEVBQUU7QUFBQ0MsV0FBSyxFQUFFO0FBQVIsS0FBNUM7QUFBMEQsV0FBTyxFQUFFO0FBQUEsYUFBTWpCLFdBQVcsQ0FBQyxpQkFBRCxDQUFqQjtBQUFBLEtBQW5FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFLLE9BQUcsWUFBS1EsdUJBQUwsc0JBQVI7QUFBb0UsU0FBSyxFQUFDLElBQTFFO0FBQStFLFVBQU0sRUFBQyxJQUF0RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosQ0FKSixDQUxSLENBRkosRUFpQkE7QUFBSSxhQUFTLEVBQUVQLGlFQUFNLENBQUNpQixPQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBakJBLENBOUlSLENBREosQ0FqQ0EsQ0FWSSxDQUFSO0FBb05ILENBM3JCRDs7R0FBTTlJLEk7VUFnQmtCMEIsMkQsRUFXRE8scUU7Ozs7QUFrcUJSakMsbUVBQWYsRSxDQVNBIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL3NlcnZlci9bc2VydmVyXS43NzI4YTg4Y2RmNWQ2MjRjNWE4MC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xheW91dCdcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcclxuaW1wb3J0IGNvb2tpZSBmcm9tICdqcy1jb29raWUnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQ2Fyb3VzZWwsIENvbnRhaW5lciwgUm93LCBDb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQgdmFsaWRhdGVTZXJ2ZXJBY2Nlc3MgZnJvbSAnLi4vLi4vLi4vbGliL3ZhbGlkYXRlU2VydmVyQWNjZXNzJztcclxuaW1wb3J0IHVzZVdpbmRvd1NpemUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9ob29rcy9XaW5kb3dTaXplJztcclxuaW1wb3J0IFN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvc2VydmVyLm1vZHVsZS5jc3MnO1xyXG5pbXBvcnQgTW92aWVCYWNrZHJvcCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL21vdmllQmFja2Ryb3AnO1xyXG5pbXBvcnQgRXBpc29kZVBvc3RlciBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2VwaXNvZGVQb3N0ZXInO1xyXG5pbXBvcnQgc29ja2V0SU9DbGllbnQgZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcclxuaW1wb3J0IG1vdmllU3R5bGVzIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbW92aWVCYWNrZHJvcC5tb2R1bGUuY3NzJ1xyXG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCwgc2V0SXRlbXMgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xyXG5cclxuY29uc3QgZmV0Y2hlciA9IHVybCA9PlxyXG4gIGZldGNoKHVybClcclxuICAgIC50aGVuKHIgPT4ge1xyXG4gICAgICByZXR1cm4gci5qc29uKCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbmNvbnN0IG1haW4gPSAocHJvcHMpID0+IHtcclxuICAgIC8vIHByb3BzLnNlcnZlciBpcyBmcm9tIHRoZSBTU1IgdW5kZXIgdGhpcyBmdW5jdGlvblxyXG4gICAgbGV0IHNlcnZlciA9IHByb3BzLnNlcnZlcjtcclxuICAgIFxyXG4gICAgY29uc3QgW2xhdGVzdE1vdmllcywgc2V0TGF0ZXNNb3ZpZXNdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgICBjb25zdCBbb25nb2luZ01vdmllcywgc2V0T25nb2luZ01vdmllc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbbW92aWVXYXRjaExpc3QsIHNldE1vdmllV2F0Y2hMaXN0XSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtvbmdvaW5nU2hvd3MsIHNldE9uZ29pbmdTaG93c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbbmV3bHlBZGRlZE1vdmllcywgc2V0TmV3bHlBZGRlZE1vdmllc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBjb25zdCBbbmV3bHlBZGRlZFNob3dzLCBzZXROZXdseUFkZGVkU2hvd3NdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW25ld2x5QWRkZWRFcGlzb2Rlcywgc2V0TmV3bHlBZGRlZEVwaXNvZGVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtyZWNvbW1lbmRlZE1vdmllLCBzZXRSZWNvbW1lbmRlZE1vdmllXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IFtwb3B1bGFyTW92aWVzLCBzZXRQb3B1bGFyTW92aWVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGxldCBsb2FkaW5nID0gMDtcclxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuXHJcbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24obmV3bHlBZGRlZE1vdmllcywge1xyXG4gICAgICAgIGZyb206IHsgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgIGVudGVyOiB7IG9wYWNpdHk6IDEgfSxcclxuICAgICAgICBkZWxheTogMjAwLFxyXG4gICAgICAgIG9uUmVzdDogKCkgPT4gc2V0TmV3bHlBZGRlZE1vdmllcyhbXSksXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSB1c2VXaW5kb3dTaXplKCk7XHJcbiAgICBsZXQgYWxsQ29udGVudCA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBxdWVyeSB0byB0aGUgY3VycmVudCBhY3RpdmUgc2VydmVyIGZvciBhIGxpc3Qgb2YgbW92aWVzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZW5yZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlcmJ5IFxyXG4gICAgICogQHBhcmFtIHtpbnR9IGxpbWl0IFxyXG4gICAgICovXHJcbiAgICBjb25zdCBnZXRNb3ZpZUxpc3QgPSBhc3luYyAoZ2VucmU9bnVsbCwgb3JkZXJieT1udWxsLCBsaW1pdD0yMCwgb25nb2luZz1mYWxzZSwgd2F0Y2hsaXN0PWZhbHNlLCBwb3B1bGFyPWZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVybDtcclxuICAgICAgICAgICAgaWYgKG9uZ29pbmcpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IGAke3NlcnZlci5zZXJ2ZXJfaXB9L2FwaS9tb3ZpZXMvbGlzdC9vbmdvaW5nPyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYod2F0Y2hsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvbW92aWVzL2xpc3Qvd2F0Y2hsaXN0PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYocG9wdWxhcikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL21vdmllcy9saXN0L3BvcHVsYXI/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvbW92aWVzL2xpc3Qke2dlbnJlICE9PSBudWxsID8gJy9nZW5yZS8nK2dlbnJlIDogJyd9PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXN1bHQuZm9yRWFjaChtb3ZpZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS50eXBlID09PSAnQkFDS0RST1AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBxdWVyeSB0byB0aGUgY3VycmVudCBhY3RpdmUgc2VydmVyIGZvciBhIGxpc3Qgb2YgbmV3IGVwaXNvZGVzXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnZW5yZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlcmJ5IFxyXG4gICAgICogQHBhcmFtIHtpbnR9IGxpbWl0IFxyXG4gICAgICovXHJcbiAgICAgICAgIGNvbnN0IGdldE5ld0VwaXNvZGVMaXN0ID0gYXN5bmMgKG9yZGVyYnk9bnVsbCwgbGltaXQ9MjApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmw7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvc2VyaWVzL2xpc3QvZXBpc29kZXM/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4gci5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucmVzdWx0LmZvckVhY2goZXBpc29kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGltYWdlIG9mIGVwaXNvZGUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnR5cGUgPT09ICdCQUNLRFJPUCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZS5iYWNrZHJvcCA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGltYWdlLnR5cGUgPT09ICdQT1NURVInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UucGF0aCA9PT0gJ25vX2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZS5iYWNrZHJvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXBpc29kZS5iYWNrZHJvcCAhPSBudWxsICYmIGVwaXNvZGUucG9zdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFNob3dMaXN0ID0gYXN5bmMgKGdlbnJlPW51bGwsIG9yZGVyYnk9bnVsbCwgbGltaXQ9MjAsIG9uZ29pbmc9ZmFsc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsO1xyXG4gICAgICAgICAgICBpZiAob25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL3Nlcmllcy9saXN0L29uZ29pbmc/JHtvcmRlcmJ5ICE9PSBudWxsID8gJ29yZGVyYnk9JytvcmRlcmJ5KycmJyA6ICcnfWxpbWl0PSR7bGltaXR9JnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtzZXJ2ZXIuc2VydmVyX2lwfS9hcGkvc2VyaWVzL2xpc3Qke2dlbnJlICE9PSBudWxsID8gJy9nZW5yZS8nK2dlbnJlIDogJyd9PyR7b3JkZXJieSAhPT0gbnVsbCA/ICdvcmRlcmJ5PScrb3JkZXJieSsnJicgOiAnJ31saW1pdD0ke2xpbWl0fSZ0b2tlbj0ke2Nvb2tpZS5nZXQoJ3NlcnZlclRva2VuJyl9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIHRoZSBtb3ZpZXMgYWN0aXZlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBpZiAob25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnVwY29taW5nLmZvckVhY2gobW92aWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBtb3ZpZS5pbWFnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UudHlwZSA9PT0gJ0JBQ0tEUk9QJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UucGF0aCA9PT0gJ25vX2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLnBvc3RlciA9IGltYWdlLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uub25nb2luZy5mb3JFYWNoKG1vdmllID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnR5cGUgPT09ICdCQUNLRFJPUCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5iYWNrZHJvcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmllLmJhY2tkcm9wICE9IG51bGwgJiYgbW92aWUucG9zdGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5yZXN1bHQuZm9yRWFjaChtb3ZpZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgbW92aWUuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS50eXBlID09PSAnQkFDS0RST1AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnBhdGggPT09ICdub19pbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aWUuYmFja2Ryb3AgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gaW1hZ2UucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZS5wYXRoID09PSAnbm9faW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmllLmJhY2tkcm9wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpZS5wb3N0ZXIgPSBpbWFnZS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92aWUuYmFja2Ryb3AgIT0gbnVsbCAmJiBtb3ZpZS5wb3N0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEFjdGl2ZUltYWdlID0gKGltYWdlcywgdHlwZSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UudHlwZSA9PT0gdHlwZSAmJiBpbWFnZS5hY3RpdmUgJiYgaW1hZ2UucGF0aCAhPSBcIm5vX2ltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICB2YWxpZGF0ZVNlcnZlckFjY2VzcyhzZXJ2ZXIsIChzZXJ2ZXJUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSBzb2NrZXRJT0NsaWVudChzZXJ2ZXIuc2VydmVyX2lwKTtcclxuICAgICAgICAgICAgc29ja2V0Lm9uKFwiTU9WSUVcIiwgbW92aWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW92aWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBuZXdseUFkZGVkTW92aWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IG1vdmllLmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHttb3ZpZS5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8yMDAweDEwMDAnIFxyXG4gICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldE5ld2x5QWRkZWRNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH0pOyAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdldCByZWNvbW1lbmRlZCB2aWRlbyAocmFuZG9tIHZpZGVvIHJpZ2h0IG5vdylcclxuICAgICAgICAgICAgZmV0Y2goYCR7c2VydmVyLnNlcnZlcl9pcH0vYXBpL21vdmllcy9saXN0L3JhbmRvbT90cmFpbGVyPXRydWUmdG9rZW49JHtjb29raWUuZ2V0KCdzZXJ2ZXJUb2tlbicpfWAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubW92aWUuYWN0aXZlTG9nbyA9IGdldEFjdGl2ZUltYWdlKHJlc3VsdC5tb3ZpZS5pbWFnZXMsICdMT0dPJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVjb21tZW5kZWRNb3ZpZShyZXN1bHQubW92aWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcmVjb21tZW5kZWQgbW92aWVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGFsbCB0aGUgbmV3ZXN0IHJlbGVhc2VkIG1vdmllcyAoVGhlIHNsaWVzaG93KVxyXG4gICAgICAgICAgICBnZXRNb3ZpZUxpc3QobnVsbCwgJ3JlbGVhc2VfZGF0ZScsIDUpLnRoZW4obW92aWVzID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdmllcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92aWVFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbW92aWUgb2YgbW92aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IG1vdmllLmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL29yaWdpbmFsLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYXJvdXNlbC5JdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkLWJsb2NrIHctMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2ltZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e21vdmllLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7b2JqZWN0Rml0OiAnY292ZXInLCBoZWlnaHQ6ICc5MHZoJywgbWluSGVpZ2h0OiAnNTAwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge3NlbGVjdE1vdmllKG1vdmllLmlkKX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhcm91c2VsLkNhcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPXt7dGV4dFNoYWRvdzogJzBweCAwcHggNnB4ICMwMDAnfX0+e21vdmllLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3t0ZXh0U2hhZG93OiAnMHB4IDBweCA2cHggIzAwMCd9fT57bW92aWUub3ZlcnZpZXd9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DYXJvdXNlbC5DYXB0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Nhcm91c2VsLkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWRpbmcrK1xyXG4gICAgICAgICAgICAgICAgc2V0TGF0ZXNNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHBvcHVsYXIgbW92aWVzXHJcbiAgICAgICAgICAgIGdldE1vdmllTGlzdChudWxsLCAncmVsZWFzZV9kYXRlJywgMjAsIGZhbHNlLCBmYWxzZSwgdHJ1ZSkudGhlbihtb3ZpZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW92aWVzLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZpZUVsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtb3ZpZSBvZiBtb3ZpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gbW92aWUuYmFja2Ryb3AgIT09IG51bGwgPyBgaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzUwMC8ke21vdmllLmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXttb3ZpZS5pZH0gdGltZT17bW92aWUud2F0Y2h0aW1lfSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSB0aXRsZT17bW92aWUudGl0bGV9IG92ZXJ2aWV3PXttb3ZpZS5vdmVydmlld30gcnVudGltZT17bW92aWUucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RNb3ZpZShtb3ZpZS5pZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXRQb3B1bGFyTW92aWVzKG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBvbmdvaW5nIG1vdmllc1xyXG4gICAgICAgICAgICBnZXRNb3ZpZUxpc3QobnVsbCwgJ3JlbGVhc2VfZGF0ZScsIDIwLCB0cnVlKS50aGVuKG1vdmllcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZpZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1vdmllIG9mIG1vdmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBtb3ZpZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE9uZ29pbmdNb3ZpZXMobW92aWVFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHdhdGNobGlzdCBmb3IgbW92aWVzXHJcbiAgICAgICAgICAgIGdldE1vdmllTGlzdChudWxsLCAncmVsZWFzZV9kYXRlJywgMjAsIGZhbHNlLCB0cnVlKS50aGVuKG1vdmllcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZpZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmllRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1vdmllIG9mIG1vdmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBtb3ZpZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7bW92aWUuYmFja2Ryb3B9YCA6ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMjAwMHgxMDAwJyBcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIG1hcmtBc0RvbmVCdXR0b24gaWQ9e21vdmllLmlkfSB0aW1lPXttb3ZpZS53YXRjaHRpbWV9IHJ1bnRpbWU9e21vdmllLnJ1bnRpbWV9IHRpdGxlPXttb3ZpZS50aXRsZX0gb3ZlcnZpZXc9e21vdmllLm92ZXJ2aWV3fSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSBiYWNrZHJvcD17aW1nfSBvbkNsaWNrPXsoaWQpID0+IHNlbGVjdE1vdmllKG1vdmllLmlkKX0+PC9Nb3ZpZUJhY2tkcm9wPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE1vdmllV2F0Y2hMaXN0KG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBuZXdseSBhZGRlZCBtb3ZpZXNcclxuICAgICAgICAgICAgZ2V0TW92aWVMaXN0KG51bGwsICdhZGRlZF9kYXRlJywgMjApLnRoZW4obW92aWVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZpZUVsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtb3ZpZSBvZiBtb3ZpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gbW92aWUuYmFja2Ryb3AgIT09IG51bGwgPyBgaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvdzUwMC8ke21vdmllLmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgbW92aWVFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXttb3ZpZS5pZH0gdGltZT17bW92aWUud2F0Y2h0aW1lfSBydW50aW1lPXttb3ZpZS5ydW50aW1lfSB0aXRsZT17bW92aWUudGl0bGV9IG92ZXJ2aWV3PXttb3ZpZS5vdmVydmlld30gcnVudGltZT17bW92aWUucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RNb3ZpZShtb3ZpZS5pZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXROZXdseUFkZGVkTW92aWVzKG1vdmllRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihsb2FkaW5nID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBuZXdseSBhZGRlZCBzaG93c1xyXG4gICAgICAgICAgICBnZXRTaG93TGlzdChudWxsLCAnYWRkZWRfZGF0ZScsIDIwKS50aGVuKHNob3dzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzaG93RWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHNob3cgb2Ygc2hvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gc2hvdy5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7c2hvdy5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8yMDAweDEwMDAnIFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFbGVtZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW92aWVCYWNrZHJvcCBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LndhdGNodGltZX0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy50aXRsZX0gb3ZlcnZpZXc9e3Nob3cub3ZlcnZpZXd9IHJ1bnRpbWU9e3Nob3cucnVudGltZX0gYmFja2Ryb3A9e2ltZ30gb25DbGljaz17KGlkKSA9PiBzZWxlY3RTaG93KHNob3cuaWQpfT48L01vdmllQmFja2Ryb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvYWRpbmcrK1xyXG4gICAgICAgICAgICAgICAgc2V0TmV3bHlBZGRlZFNob3dzKHNob3dFbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBHZXQgb25nb2luZyBzaG93c1xyXG4gICAgICAgICAgICBnZXRTaG93TGlzdChudWxsLCAnYWRkZWRfZGF0ZScsIDIwLCB0cnVlKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hvd0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzaG93IG9mIHJlc3VsdC51cGNvbWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBzaG93LmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtzaG93LmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0VsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LnRpbWVfd2F0Y2hlZH0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy5zZWFzb25fbmFtZSArIFwiIC0gRXBpc29kZSBcIiArIHNob3cuZXBpc29kZV9udW1iZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ2aWV3PXtzaG93Lm92ZXJ2aWV3fSBydW50aW1lPXtzaG93LnRvdGFsX3RpbWV9IGJhY2tkcm9wPXtpbWd9IG9uQ2xpY2s9eyhpZCkgPT4gc2VsZWN0RXBpc29kZShzaG93LnNob3dfaWQsIHNob3cuc2Vhc29uX251bWJlciwgc2hvdy5lcGlzb2RlX251bWJlciwgc2hvdy5pbnRlcm5hbGVwaXNvZGVpZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2hvdyBvZiByZXN1bHQub25nb2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBzaG93LmJhY2tkcm9wICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtzaG93LmJhY2tkcm9wfWAgOiAnaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzIwMDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0VsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb3ZpZUJhY2tkcm9wIHNob3dUaXRsZSBtYXJrQXNEb25lQnV0dG9uIGlkPXtzaG93LmlkfSB0aW1lPXtzaG93LnRpbWVfd2F0Y2hlZH0gcnVudGltZT17c2hvdy5ydW50aW1lfSB0aXRsZT17c2hvdy5zZWFzb25fbmFtZSArIFwiIC0gRXBpc29kZSBcIiArIHNob3cuZXBpc29kZV9udW1iZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ2aWV3PXtzaG93Lm92ZXJ2aWV3fSBydW50aW1lPXtzaG93LnRvdGFsX3RpbWV9IGJhY2tkcm9wPXtpbWd9IG9uQ2xpY2s9eyhpZCkgPT4gc2VsZWN0RXBpc29kZShzaG93LnNob3dfaWQsIHNob3cuc2Vhc29uX251bWJlciwgc2hvdy5lcGlzb2RlX251bWJlciwgc2hvdy5pbnRlcm5hbGVwaXNvZGVpZCl9PjwvTW92aWVCYWNrZHJvcD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9hZGluZysrXHJcbiAgICAgICAgICAgICAgICBzZXRPbmdvaW5nU2hvd3Moc2hvd0VsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobG9hZGluZyA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZXROZXdFcGlzb2RlTGlzdCgnYWRkZWRfZGF0ZScsIDIwKS50aGVuKGVwaXNvZGVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlcGlzb2RlRWxlbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlcGlzb2RlIG9mIGVwaXNvZGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3RlciA9IGVwaXNvZGUucG9zdGVyICE9PSBudWxsID8gYGh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL3c1MDAvJHtlcGlzb2RlLnBvc3Rlcn1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS81MDB4MTAwMCc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tkcm9wID0gZXBpc29kZS5iYWNrZHJvcCAhPT0gbnVsbCA/IGBodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC93NTAwLyR7ZXBpc29kZS5iYWNrZHJvcH1gIDogJ2h0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS81MDB4MTAwMCcgXHJcbiAgICAgICAgICAgICAgICAgICAgZXBpc29kZUVsZW1lbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFcGlzb2RlUG9zdGVyIHNob3c9e2VwaXNvZGUuc2VyaWVfaWR9IHNlYXNvbj17ZXBpc29kZS5zZWFzb259IGVwaXNvZGU9e2VwaXNvZGUuZXBpc29kZX0gcG9zdGVyPXtwb3N0ZXJ9IGludGVybmFsRXBpc29kZUlEPXtlcGlzb2RlLmludGVybmFsZXBpc29kZWlkfSBiYWNrZHJvcD17YmFja2Ryb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoc2Vhc29uLCBlcGlzb2RlLCBzaG93LCBpbnRlcm5hbEVwaXNvZGVJRCkgPT4gc2VsZWN0RXBpc29kZShzaG93LCBzZWFzb24sIGVwaXNvZGUsIGludGVybmFsRXBpc29kZUlEKX0+PC9FcGlzb2RlUG9zdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nKytcclxuICAgICAgICAgICAgICAgIHNldE5ld2x5QWRkZWRFcGlzb2RlcyhlcGlzb2RlRWxlbWVudHMpO1xyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgW2xvYWRpbmddKTtcclxuXHJcblxyXG4gICAgY29uc3Qgc2VsZWN0TW92aWUgPSAoaWQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L21vdmllcy92aWRlby8ke2lkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdFNob3cgPSAoaWQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L3Nob3dzL3ZpZGVvLyR7aWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0RXBpc29kZSA9IChzaG93SUQsIHNlYXNvbk51bWJlciwgZXBpc29kZU51bWJlciwgaW50ZXJuYWxFcGlzb2RlSUQpID0+IHtcclxuICAgICAgICBSb3V0ZXIucHVzaChgL3NlcnZlci8ke3NlcnZlci5zZXJ2ZXJfaWR9L3Nob3dzL3ZpZGVvLyR7c2hvd0lEfS9zZWFzb24vJHtzZWFzb25OdW1iZXJ9L2VwaXNvZGUvJHtlcGlzb2RlTnVtYmVyfT9pbnRlcm5hbElEPSR7aW50ZXJuYWxFcGlzb2RlSUR9YClcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IChpZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zY3JvbGxMZWZ0IC09ICh3aW5kb3cuaW5uZXJXaWR0aCkqMC44O1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzY3JvbGxSaWdodCA9IChpZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zY3JvbGxMZWZ0ICs9ICh3aW5kb3cuaW5uZXJXaWR0aCkqMC44O1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAxKTtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTEFZT1VUIC8vXHJcbiAgICByZXR1cm4gKDw+XHJcbiAgICAgICAgeyFsb2FkZWQgJiZcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5sb2FkaW5naW9TcGlubmVyRWNsaXBzZX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubGRpb30+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHtsb2FkZWQgJiZcclxuXHJcbiAgICAgICAgPExheW91dCBzZWFyY2hFbmFibGVkIHNlcnZlcj17c2VydmVyfSBzZXJ2ZXJUb2tlbj17Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX0+XHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPC9IZWFkPlxyXG5cclxuICAgICAgICB7cmVjb21tZW5kZWRNb3ZpZSAhPSBmYWxzZSAmJlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnJlY29tbWVuZGVkfT5cclxuICAgICAgICAgICAgICAgIDx2aWRlbyAgYXV0b1BsYXk9e3RydWV9IGxvb3A9e3RydWV9IHByZWxvYWQ9XCJhdXRvXCIgbXV0ZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9e2Ake3NlcnZlci5zZXJ2ZXJfaXB9L2FwaS90cmFpbGVyLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfT90eXBlPU1PVklFJnRva2VuPSR7Y29va2llLmdldCgnc2VydmVyVG9rZW4nKX1gfXR5cGU9XCJ2aWRlby9tcDRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC92aWRlbz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMucmVjb21tZW5kZWRJbmZvcm1hdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdICE9IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2BodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9vcmlnaW5hbC8ke3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdLnBhdGh9YH0gY2xhc3NOYW1lPXtTdHlsZXMubG9nb30gLz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAge3JlY29tbWVuZGVkTW92aWVbXCJhY3RpdmVMb2dvXCJdID09IGZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPntyZWNvbW1lbmRlZE1vdmllW1widGl0bGVcIl19PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+e3JlY29tbWVuZGVkTW92aWVbXCJvdmVydmlld1wiXX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5jb250cm9sc30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2Avc2VydmVyLyR7c2VydmVyLnNlcnZlcl9pZH0vbW92aWVzL3ZpZGVvLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfT9hdXRvUGxheT10cnVlYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzLzAwMS1wbGF5LWJ1dHRvbi5wbmdgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2Avc2VydmVyLyR7c2VydmVyLnNlcnZlcl9pZH0vbW92aWVzL3ZpZGVvLyR7cmVjb21tZW5kZWRNb3ZpZVtcImlkXCJdfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy8wMDItaW5mb3JtYXRpb24ucG5nYH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICA8YnI+PC9icj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT5cclxuICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCBjbGFzc05hbWU9e1N0eWxlcy5jb250ZW50Um93c30+XHJcbiAgICAgICAgICAgIHtwb3B1bGFyTW92aWVzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5Qb3B1bMOkcnQganVzdCBudTwvaDI+ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicG9wdWxhck1vdmllc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwb3B1bGFyTW92aWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cG9wdWxhck1vdmllcy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ3BvcHVsYXJNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbEJ1dHRvbn0gc3R5bGU9e3tyaWdodDogJzAnfX0gb25DbGljaz17KCkgPT4gc2Nyb2xsUmlnaHQoJ3BvcHVsYXJNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB7b25nb2luZ01vdmllcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHN0eWxlPXt7dGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnfX0+UMOlZ8OlZW5kZSBmaWxtZXI8L2gyPiAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubW92aWVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm9uZ29pbmdNb3ZpZXNcIiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxhYmxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b25nb2luZ01vdmllc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdNb3ZpZXMubGVuZ3RoICogNDgwID4gd2luZG93U2l6ZS53aWR0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxMZWZ0KCdvbmdvaW5nTW92aWVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9sZWZ0LnN2Z2B9IHdpZHRoPVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCdvbmdvaW5nTW92aWVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8aHIgY2xhc3NOYW1lPXtTdHlsZXMuZGl2aWRlcn0+PC9ocj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge29uZ29pbmdTaG93cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHN0eWxlPXt7dGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnfX0+UMOlZ8OlZW5kZSBzZXJpZXI8L2gyPiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwib25nb2luZ1Nob3dzXCIgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsYWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdTaG93c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29uZ29pbmdTaG93cy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ29uZ29pbmdTaG93cycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvbGVmdC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCdvbmdvaW5nU2hvd3MnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGhyIGNsYXNzTmFtZT17U3R5bGVzLmRpdmlkZXJ9PjwvaHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkTW92aWVzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcIi9zZXJ2ZXIvXCIgKyBzZXJ2ZXIuc2VydmVyX2lkICsgXCIvbW92aWVzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIGZpbG1lcjwvaDI+PC9hPjwvTGluaz4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibmV3bHlBZGRlZE1vdmllc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNpdGlvbnMoKHsgb3BhY2l0eSB9LCBpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGVkLmRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17bW92aWVTdHlsZXMuYmFja2Ryb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtvcGFjaXR5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmV3bHlBZGRlZE1vdmllcy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ25ld2x5QWRkZWRNb3ZpZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBzdHlsZT17e3JpZ2h0OiAnMCd9fSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxSaWdodCgnbmV3bHlBZGRlZE1vdmllcycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvcmlnaHQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICAgICAgICA8aHIgY2xhc3NOYW1lPXtTdHlsZXMuZGl2aWRlcn0+PC9ocj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge21vdmllV2F0Y2hMaXN0Lmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtcIi9zZXJ2ZXIvXCIgKyBzZXJ2ZXIuc2VydmVyX2lkICsgXCIvbW92aWVzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5GaWxtZXIgYXR0IHNlIHNlbmFyZTwvaDI+PC9hPjwvTGluaz4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW92aWVXYXRjaExpc3RcIiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxhYmxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bW92aWVXYXRjaExpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttb3ZpZVdhdGNoTGlzdC5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ21vdmllV2F0Y2hMaXN0Jyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9sZWZ0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbEJ1dHRvbn0gc3R5bGU9e3tyaWdodDogJzAnfX0gb25DbGljaz17KCkgPT4gc2Nyb2xsUmlnaHQoJ21vdmllV2F0Y2hMaXN0Jyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge25ld2x5QWRkZWRFcGlzb2Rlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvc2VydmVyL1wiICsgc2VydmVyLnNlcnZlcl9pZCArIFwiL3Nob3dzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIGF2c25pdHQ8L2gyPjwvYT48L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMubW92aWVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm5ld2x5QWRkZWRFcGlzb2Rlc1wiIGNsYXNzTmFtZT17U3R5bGVzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkRXBpc29kZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuZXdseUFkZGVkRXBpc29kZXMubGVuZ3RoICogNDgwID4gd2luZG93U2l6ZS53aWR0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxMZWZ0KCduZXdseUFkZGVkRXBpc29kZXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL2xlZnQuc3ZnYH0gd2lkdGg9XCI3MFwiIGhlaWdodD1cIjcwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsQnV0dG9ufSBzdHlsZT17e3JpZ2h0OiAnMCd9fSBvbkNsaWNrPXsoKSA9PiBzY3JvbGxSaWdodCgnbmV3bHlBZGRlZEVwaXNvZGVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2Ake3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUl9VUkx9L2ltYWdlcy9yaWdodC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9e1N0eWxlcy5kaXZpZGVyfT48L2hyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93cy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17XCIvc2VydmVyL1wiICsgc2VydmVyLnNlcnZlcl9pZCArIFwiL3Nob3dzXCJ9PjxhIHN0eWxlPXt7Y29sb3I6ICd3aGl0ZSd9fT48aDIgc3R5bGU9e3t0ZXh0VHJhbnNmb3JtOiAnY2FwaXRhbGl6ZSd9fT5OeWxpZ2VuIHRpbGxhZ2RhIHNlcmllcjwvaDI+PC9hPjwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5tb3ZpZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibmV3bHlBZGRlZFNob3dzXCIgY2xhc3NOYW1lPXtTdHlsZXMuc2Nyb2xsYWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge25ld2x5QWRkZWRTaG93cy5sZW5ndGggKiA0ODAgPiB3aW5kb3dTaXplLndpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IG9uQ2xpY2s9eygpID0+IHNjcm9sbExlZnQoJ25ld2x5QWRkZWRTaG93cycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVJfVVJMfS9pbWFnZXMvbGVmdC5zdmdgfSB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiNzBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlcy5zY3JvbGxCdXR0b259IHN0eWxlPXt7cmlnaHQ6ICcwJ319IG9uQ2xpY2s9eygpID0+IHNjcm9sbFJpZ2h0KCduZXdseUFkZGVkU2hvd3MnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0VSVkVSX1VSTH0vaW1hZ2VzL3JpZ2h0LnN2Z2B9IHdpZHRoPVwiNzBcIiBoZWlnaHQ9XCI3MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGhyIGNsYXNzTmFtZT17U3R5bGVzLmRpdmlkZXJ9PjwvaHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0xheW91dD5cclxuICAgICAgICB9XHJcbiAgICAgICAgPC8+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1haW47XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyIGFuZCBzZW5kIGl0IHRvIHRoZSBmcm9udCBlbmQgYmVmb3JlIHJlbmRlciAodGhpcyBpcyBzZXJ2ZXItc2lkZSlcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XHJcbiAgICBsZXQgc2VydmVySWQgPSBjb250ZXh0LnBhcmFtcy5zZXJ2ZXI7XHJcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5TRVJWRVJfUE9SVH0ke3Byb2Nlc3MuZW52LlNFUlZFUl9TVUJfRk9MREVSfS9hcGkvc2VydmVycy9nZXRTZXJ2ZXJgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIGlkOiBzZXJ2ZXJJZFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChyKSA9PiByLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgIHNlcnZlcjogZGF0YS5zZXJ2ZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9