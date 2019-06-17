/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/SDCserver.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./SDCpostgreSQL/index.js":
/*!********************************!*\
  !*** ./SDCpostgreSQL/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar _require = __webpack_require__(/*! pg */ \"pg\"),\n    Pool = _require.Pool,\n    _require2 = __webpack_require__(/*! ./seeds/seeder.js */ \"./SDCpostgreSQL/seeds/seeder.js\"),\n    totalHosts = _require2.totalHosts;\n/******************* DATABASE CONNECTION ********************/\n\n\nvar pool =  true ? new Pool({\n  user: process.env.PSQL_USER,\n  host: process.env.PSQL_HOST,\n  database: 'hostprofiles',\n  password: process.env.PSQL_PASSWORD,\n  port: 5432\n}) : undefined;\n/******************* HELPER FUNCTION ***********************/\n\nvar formatData = function formatData(array, host_id) {\n  var data = {\n    cohosts: {},\n    languages: {}\n  },\n      cohosts = 0,\n      languages = 0;\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var arr = _step.value;\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var obj = _step2.value;\n\n          if (!obj.language) {\n            if (obj.id === host_id) {\n              data.host = obj;\n            } else {\n              data.cohosts[\"cohost\".concat(++cohosts)] = {\n                name: obj.name,\n                datejoined: obj.datejoined,\n                hosturl: obj.hosturl\n              };\n            }\n          } else {\n            data.languages[\"language\".concat(++languages)] = obj.language;\n          }\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n            _iterator2[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  return data;\n};\n\nvar weightedRandomHost = function weightedRandomHost() {\n  var rand = Math.random() * 19.368,\n      block,\n      weightedHostId;\n  block = rand > 9.14 ? 10 : rand > 4.61 ? 9 : rand > 2.44 ? 8 : rand > 1.32 ? 7 : rand > 0.70 ? 6 : rand > 0.36 ? 5 : rand > 0.16 ? 4 : rand > 0.06 ? 3 : rand > 0.01 ? 2 : 1, weightedHostId = Math.ceil(Math.random() * 1000000) + (block - 1) * 1000000;\n  return weightedHostId;\n};\n/******************* QUERY FUNCTIONS **********************/\n\n\nvar getLastHostEntry = function getLastHostEntry(cb) {\n  var hostsQueryString = \"SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;\",\n      langQueryString = \"SELECT DISTINCT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;\";\n  var data, formattedData;\n  pool.query(hostsQueryString, [totalHosts], function (err, result1) {\n    if (err) {\n      return console.error(err.message);\n    }\n\n    pool.query(langQueryString, [totalHosts], function (err, result2) {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, totalHosts);\n      cb(formattedData);\n    });\n  });\n};\n\nvar getRandomHost = function getRandomHost(cb) {\n  var hostsQueryString = \"SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;\",\n      langQueryString = \"SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;\",\n      randomHostId = weightedRandomHost();\n  var data, formattedData;\n  pool.query(hostsQueryString, [randomHostId], function (err, result1) {\n    if (err) {\n      console.error(err.message);\n    }\n\n    pool.query(langQueryString, [randomHostId], function (err, result2) {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, randomHostId);\n      cb(formattedData);\n    });\n  });\n};\n\nvar getHost = function getHost(host, cb) {\n  var hostsQueryString = \"SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;\",\n      langQueryString = \"SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;\";\n  var data, formattedData;\n  pool.query(hostsQueryString, [host], function (err, result1) {\n    if (err) {\n      console.error(err.message);\n    }\n\n    pool.query(langQueryString, [host], function (err, result2) {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, host);\n      cb(formattedData);\n    });\n  });\n};\n/******************* EXPORTS *******************/\n\n\nmodule.exports = {\n  pool: pool,\n  getLastHostEntry: getLastHostEntry,\n  getRandomHost: getRandomHost,\n  getHost: getHost\n};\n\n//# sourceURL=webpack:///./SDCpostgreSQL/index.js?");

/***/ }),

/***/ "./SDCpostgreSQL/seeds/seeder.js":
/*!***************************************!*\
  !*** ./SDCpostgreSQL/seeds/seeder.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/******************** GLOBAL VARIABLES **********************/\nvar lastSeededHost = 0,\n    lastSeededJoin = 1,\n    totalHosts = 10000000,\n    transactionCount = 1,\n    transactions = 100,\n    transaction = 100001;\n/******************** SEND THEM OUT TO THE WORLD +++++++++++++++*/\n\nmodule.exports = {\n  lastSeededHost: lastSeededHost,\n  lastSeededJoin: lastSeededJoin,\n  totalHosts: totalHosts,\n  transactionCount: transactionCount,\n  transactions: transactions,\n  transaction: transaction\n};\n\n//# sourceURL=webpack:///./SDCpostgreSQL/seeds/seeder.js?");

/***/ }),

/***/ "./client/App.jsx":
/*!************************!*\
  !*** ./client/App.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Host_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Host.jsx */ \"./client/components/Host.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n // import style from './main.scss';\n\nvar App =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(App, _React$Component);\n\n  function App(props) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));\n    _this.state = {\n      'id': Math.ceil(Math.random() * 100) // 'id': 1 // no co-hosts\n      // 'id': 9 // one co-host\n      // 'id': 5 // two co-hosts\n\n    };\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Host_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        id: this.state.id\n      });\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n;\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('host'));\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./client/App.jsx?");

/***/ }),

/***/ "./client/components/CoHosts.jsx":
/*!***************************************!*\
  !*** ./client/components/CoHosts.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CoHosts; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction CoHosts(props) {\n  var length = Object.keys(props.coHosts).length;\n  var header = length > 0 ? 'Co-hosts' : 'Co-host';\n  var coHostsArray = [];\n\n  for (var key in props.coHosts) {\n    coHostsArray.push(props.coHosts[key]);\n  }\n\n  if (Object.keys(props.coHosts).length !== 0) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"cohosts-container\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"cohosts-header\"\n    }, header), coHostsArray.map(function (coHost, i) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: i < length - 1 ? 'cohost' : 'cohost-last',\n        key: i\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        className: \"cohost-picture\",\n        src: coHost.hosturl\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"cohost-info\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"cohost-name\"\n      }, coHost.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"cohost-date-joined\"\n      }, \"Joined in \", coHost.datejoined)));\n    }));\n  } else {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null);\n  }\n}\n\n//# sourceURL=webpack:///./client/components/CoHosts.jsx?");

/***/ }),

/***/ "./client/components/DescriptionBox.jsx":
/*!**********************************************!*\
  !*** ./client/components/DescriptionBox.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DescriptionBox; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CoHosts_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CoHosts.jsx */ \"./client/components/CoHosts.jsx\");\n\n\nfunction DescriptionBox(props) {\n  if (props.interaction === 'none') {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"description-box\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"hi-im\"\n    }, \"Hi, I'm \", props.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"description\"\n    }, props.description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CoHosts_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      coHosts: props.coHosts\n    }));\n  } else {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"description-box\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"hi-im\"\n    }, \"Hi, I'm \", props.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"description\"\n    }, props.description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"interaction-header\"\n    }, \"Interaction with guests\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"interaction\"\n    }, props.interaction), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CoHosts_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      coHosts: props.coHosts\n    }));\n  }\n}\n\n//# sourceURL=webpack:///./client/components/DescriptionBox.jsx?");

/***/ }),

/***/ "./client/components/Host.jsx":
/*!************************************!*\
  !*** ./client/components/Host.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Host; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _PhotoBoxContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoBoxContainer.jsx */ \"./client/components/PhotoBoxContainer.jsx\");\n/* harmony import */ var _DescriptionBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DescriptionBox.jsx */ \"./client/components/DescriptionBox.jsx\");\n/* harmony import */ var _StatsBox_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatsBox.jsx */ \"./client/components/StatsBox.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar Host =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Host, _React$Component);\n\n  function Host(props) {\n    var _this;\n\n    _classCallCheck(this, Host);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Host).call(this, props));\n    _this.state = {\n      id: _this.props.id || -1,\n      name: '',\n      description: '',\n      interaction: '',\n      coHosts: {},\n      dateJoined: '',\n      languages: [],\n      responseRate: '',\n      responseTime: '',\n      hostUrl: ''\n    };\n    _this.getHost = _this.getHost.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(Host, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.getHost();\n    }\n  }, {\n    key: \"getHost\",\n    value: function getHost() {\n      var _this2 = this;\n\n      fetch(\"http://\".concat(window.location.hostname, \":3005/postgres/randomentry\")).then(function (response) {\n        return response.json();\n      }).then(function (result) {\n        var host = result.host,\n            cohosts = result.cohosts,\n            languages = result.languages;\n\n        _this2.setState({\n          id: host.id,\n          name: host.name,\n          description: host.description,\n          interaction: host.interaction,\n          coHosts: cohosts,\n          dateJoined: host.datejoined,\n          languages: languages,\n          responseRate: host.responserate,\n          responseTime: host.responsetime,\n          hostUrl: host.hosturl\n        });\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var length = Object.keys(this.state.coHosts).length;\n      var greeting = length > 0 ? 'Meet your hosts' : 'Meet your host';\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"host-profile\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"greeting\"\n      }, greeting), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"host-info\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoBoxContainer_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        name: this.state.name,\n        hostUrl: this.state.hostUrl\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"info-container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DescriptionBox_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        name: this.state.name,\n        description: this.state.description,\n        interaction: this.state.interaction,\n        coHosts: this.state.coHosts\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StatsBox_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        dateJoined: this.state.dateJoined,\n        languages: this.state.languages,\n        responseRate: this.state.responseRate,\n        responseTime: this.state.responseTime\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"divider\"\n      }));\n    }\n  }]);\n\n  return Host;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./client/components/Host.jsx?");

/***/ }),

/***/ "./client/components/PhotoBoxContainer.jsx":
/*!*************************************************!*\
  !*** ./client/components/PhotoBoxContainer.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PhotoBoxContainer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction PhotoBoxContainer(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"photo-box-container\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"photo-box\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    id: \"photo-box-link\",\n    href: \"http://lilbub.com/about\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    id: \"host-image\",\n    src: props.hostUrl,\n    title: props.name,\n    alt: props.name\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"script-name\"\n  }, props.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    id: \"below-image-link\",\n    href: \"http://lilbub.com/about\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    id: \"below-image-button\"\n  }, \"CONTACT\")));\n}\n\n//# sourceURL=webpack:///./client/components/PhotoBoxContainer.jsx?");

/***/ }),

/***/ "./client/components/StatsBox.jsx":
/*!****************************************!*\
  !*** ./client/components/StatsBox.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StatsBox; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction StatsBox(props) {\n  var languages = Object.keys(props.languages) === 2 ? \"\".concat(props.languages.language1, \", \").concat(props.languages.language2) : \"\".concat(props.languages.language1);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"stats-box\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"stats\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"joined-in\"\n  }, \"Joined in \", props.dateJoined), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"languages\"\n  }, \"Languages: \", languages), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"response-rate\"\n  }, \"Response rate: \", props.responseRate), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"response-time\"\n  }, \"Response time: \", props.responseTime)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    id: \"button-link\",\n    href: \"http://lilbub.com/about\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    id: \"main-button\"\n  }, \"CONTACT\")));\n}\n\n//# sourceURL=webpack:///./client/components/StatsBox.jsx?");

/***/ }),

/***/ "./server/SDCserver.js":
/*!*****************************!*\
  !*** ./server/SDCserver.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _client_App_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client/App.jsx */ \"./client/App.jsx\");\n__webpack_require__(/*! newrelic */ \"newrelic\");\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\"),\n    bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"),\n    cors = __webpack_require__(/*! cors */ \"cors\"),\n    path = __webpack_require__(/*! path */ \"path\"),\n    fs = __webpack_require__(/*! fs */ \"fs\"),\n    _require = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\"),\n    getLastHostEntry = _require.getLastHostEntry,\n    _require2 = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\"),\n    getRandomHost = _require2.getRandomHost,\n    _require3 = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\"),\n    getHost = _require3.getHost;\n\nvar port = process.env.PORT || 3005,\n    app = express();\napp.use(cors());\napp.use(express[\"static\"](path.join(__dirname + '/../public')));\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded());\n/********************* ROUTES ACCESSING POSTGRES ************************/\n\napp.get('/', function (req, res) {\n  var app = react_dom_server__WEBPACK_IMPORTED_MODULE_1___default.a.rendorToString(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_App_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)),\n      indexFile = path.resolve('../public/index.html');\n  fs.readFile(indexFile, 'utf8', function (err, data) {\n    if (err) {\n      console.error('error trying to SSR: ', err.message);\n      return res.status.length(500).send('Shucks, thought we had it....');\n    }\n\n    return res.send(data.replace(\"<div id=\\\"host\\\"> </div>\", \"<div id=\\\"host\\\">\".concat(app, \"</div>\")));\n  });\n});\napp.get('/postgres/lastentry', function (req, res) {\n  getLastHostEntry(function (data) {\n    if (!data) {\n      console.log('error retrieving last entry');\n      return res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\napp.get('/postgres/randomentry', function (req, res) {\n  getRandomHost(function (data) {\n    if (!data) {\n      console.log('error retrieving random entry');\n      return res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\napp.get('./postgres/host', function (req, res) {\n  getHost(req.body, function () {\n    if (!data) {\n      console.error('error retrieveing host');\n      res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\n/******************** HEY! LISTIN!! **********************/\n\napp.listen(port, function () {\n  console.log(\"listening on port \".concat(port));\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server/SDCserver.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "newrelic":
/*!***************************!*\
  !*** external "newrelic" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"newrelic\");\n\n//# sourceURL=webpack:///external_%22newrelic%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ })

/******/ });