"use strict";

exports.__esModule = true;
exports.useInViewport = exports.handleViewport = exports.default = exports.customProps = void 0;

var _handleViewport = _interopRequireDefault(require("./lib/handleViewport"));

exports.handleViewport = _handleViewport.default;

var _useInViewport = _interopRequireDefault(require("./lib/useInViewport"));

exports.useInViewport = _useInViewport.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customProps = ['inViewport', 'enterCount', 'leaveCount'];
exports.customProps = customProps;
var _default = _handleViewport.default;
exports.default = _default;