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

eval("__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst {\n  Pool\n} = __webpack_require__(/*! pg */ \"pg\"),\n      {\n  totalHosts\n} = __webpack_require__(/*! ./seeds/seeder.js */ \"./SDCpostgreSQL/seeds/seeder.js\");\n/******************* DATABASE CONNECTION ********************/\n\n\nconst pool =  true ? new Pool({\n  user: process.env.PSQL_USER,\n  host: process.env.PSQL_HOST,\n  database: 'hostprofiles',\n  password: process.env.PSQL_PASSWORD,\n  port: 5432\n}) : undefined;\n/******************* HELPER FUNCTION ***********************/\n\nconst formatData = (array, host_id) => {\n  let data = {\n    cohosts: {},\n    languages: {}\n  },\n      cohosts = 0,\n      languages = 0;\n\n  for (let arr of array) {\n    for (let obj of arr) {\n      if (!obj.language) {\n        if (obj.id === host_id) {\n          data.host = obj;\n        } else {\n          data.cohosts[`cohost${++cohosts}`] = {\n            name: obj.name,\n            datejoined: obj.datejoined,\n            hosturl: obj.hosturl\n          };\n        }\n      } else {\n        data.languages[`language${++languages}`] = obj.language;\n      }\n    }\n  }\n\n  return data;\n};\n\nconst weightedRandomHost = () => {\n  let rand = Math.random() * 19.368,\n      block,\n      weightedHostId;\n  block = rand > 9.14 ? 10 : rand > 4.61 ? 9 : rand > 2.44 ? 8 : rand > 1.32 ? 7 : rand > 0.70 ? 6 : rand > 0.36 ? 5 : rand > 0.16 ? 4 : rand > 0.06 ? 3 : rand > 0.01 ? 2 : 1, weightedHostId = Math.ceil(Math.random() * 1000000) + (block - 1) * 1000000;\n  return weightedHostId;\n};\n/******************* QUERY FUNCTIONS **********************/\n\n\nconst getLastHostEntry = cb => {\n  const hostsQueryString = `SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,\n        langQueryString = `SELECT DISTINCT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`;\n  let data, formattedData;\n  pool.query(hostsQueryString, [totalHosts], (err, result1) => {\n    if (err) {\n      return console.error(err.message);\n    }\n\n    pool.query(langQueryString, [totalHosts], (err, result2) => {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, totalHosts);\n      cb(formattedData);\n    });\n  });\n};\n\nconst getRandomHost = cb => {\n  const hostsQueryString = `SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,\n        langQueryString = `SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`,\n        randomHostId = weightedRandomHost();\n  let data, formattedData;\n  pool.query(hostsQueryString, [randomHostId], (err, result1) => {\n    if (err) {\n      console.error(err.message);\n    }\n\n    pool.query(langQueryString, [randomHostId], (err, result2) => {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, randomHostId);\n      cb(formattedData);\n    });\n  });\n};\n\nconst getHost = (host, cb) => {\n  const hostsQueryString = `SELECT DISTINCT hosts.id, hosts.name, hosts.description, hosts.interaction, hosts.datejoined, hosts.responserate, hosts.responsetime, hosts.hosturl FROM hosts INNER JOIN cohosts ON cohosts.host_id=$1 WHERE hosts.id=$1 OR hosts.id=cohosts.cohost_id;`,\n        langQueryString = `SELECT languages.language FROM languages INNER JOIN hostlangs ON hostlangs.host_id=$1 WHERE languages.id=hostlangs.lang_id;`;\n  let data, formattedData;\n  pool.query(hostsQueryString, [host], (err, result1) => {\n    if (err) {\n      console.error(err.message);\n    }\n\n    pool.query(langQueryString, [host], (err, result2) => {\n      if (err) {\n        return console.error(err.message);\n      }\n\n      data = [result1.rows, result2.rows];\n      formattedData = formatData(data, host);\n      cb(formattedData);\n    });\n  });\n};\n/******************* EXPORTS *******************/\n\n\nmodule.exports = {\n  pool,\n  getLastHostEntry,\n  getRandomHost,\n  getHost\n};\n\n//# sourceURL=webpack:///./SDCpostgreSQL/index.js?");

/***/ }),

/***/ "./SDCpostgreSQL/seeds/seeder.js":
/*!***************************************!*\
  !*** ./SDCpostgreSQL/seeds/seeder.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/******************** GLOBAL VARIABLES **********************/\nlet lastSeededHost = 0,\n    lastSeededJoin = 1,\n    totalHosts = 10000000,\n    transactionCount = 1,\n    transactions = 100,\n    transaction = 100001;\n/******************** SEND THEM OUT TO THE WORLD +++++++++++++++*/\n\nmodule.exports = {\n  lastSeededHost,\n  lastSeededJoin,\n  totalHosts,\n  transactionCount,\n  transactions,\n  transaction\n};\n\n//# sourceURL=webpack:///./SDCpostgreSQL/seeds/seeder.js?");

/***/ }),

/***/ "./server/SDCserver.js":
/*!*****************************!*\
  !*** ./server/SDCserver.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./server/renderer.js\");\n__webpack_require__(/*! newrelic */ \"newrelic\");\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst express = __webpack_require__(/*! express */ \"express\"),\n      bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"),\n      cors = __webpack_require__(/*! cors */ \"cors\"),\n      path = __webpack_require__(/*! path */ \"path\"),\n      fs = __webpack_require__(/*! fs */ \"fs\"),\n      {\n  getLastHostEntry\n} = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\"),\n      {\n  getRandomHost\n} = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\"),\n      {\n  getHost\n} = __webpack_require__(/*! ../SDCpostgreSQL/index.js */ \"./SDCpostgreSQL/index.js\");\n\n\nconst port = process.env.PORT || 3005,\n      app = express();\napp.use(cors());\napp.use(express.static(path.join(__dirname + '/../public')));\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded());\n/********************* ROUTES ACCESSING POSTGRES ************************/\n\napp.get('/', (req, res) => {\n  fs.readFile('../public/index.html', 'utf8', (err, data) => {\n    const html = Object(_renderer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(data);\n    res.send(html);\n  });\n});\napp.get('/postgres/lastentry', (req, res) => {\n  getLastHostEntry(data => {\n    if (!data) {\n      console.log('error retrieving last entry');\n      return res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\napp.get('/postgres/randomentry', (req, res) => {\n  getRandomHost(data => {\n    if (!data) {\n      console.log('error retrieving random entry');\n      return res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\napp.get('./postgres/host', (req, res) => {\n  getHost(req.body, () => {\n    if (!data) {\n      console.error('error retrieveing host');\n      res.send(400);\n    }\n\n    return res.send(data);\n  });\n});\n/******************** HEY! LISTIN!! **********************/\n\napp.listen(port, () => {\n  console.log(`listening on port ${port}`);\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server/SDCserver.js?");

/***/ }),

/***/ "./server/renderer.js":
/*!****************************!*\
  !*** ./server/renderer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/server/renderer.js: Unexpected token (7:45)\\n\\n\\u001b[0m \\u001b[90m  5 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  6 | \\u001b[39m\\u001b[36mconst\\u001b[39m renderer \\u001b[33m=\\u001b[39m (html) \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m  7 | \\u001b[39m  \\u001b[36mconst\\u001b[39m serverHTML \\u001b[33m=\\u001b[39m \\u001b[33mReactDOM\\u001b[39m\\u001b[33m.\\u001b[39mrenderToString(\\u001b[33m<\\u001b[39m\\u001b[33mHost\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m)\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m                                             \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  8 | \\u001b[39m        regex \\u001b[33m=\\u001b[39m \\u001b[33m/\\u001b[39m(\\u001b[33m<\\u001b[39m\\u001b[33mdiv\\u001b[39m id\\u001b[33m=\\u001b[39m\\u001b[32m\\\"host\\\"\\u001b[39m\\u001b[33m>\\u001b[39m)(\\u001b[33m<\\u001b[39m\\u001b[37m\\u001b[41m\\u001b[1m\\\\\\u001b[22m\\u001b[49m\\u001b[39m\\u001b[33m/\\u001b[39mdiv\\u001b[33m>\\u001b[39m)\\u001b[33m/\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  9 | \\u001b[39m  html \\u001b[33m=\\u001b[39m html\\u001b[33m.\\u001b[39mreplace(regex\\u001b[33m,\\u001b[39m (original\\u001b[33m,\\u001b[39m div1\\u001b[33m,\\u001b[39m div2) \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m    \\u001b[36mreturn\\u001b[39m div1 \\u001b[33m+\\u001b[39m serverHTML \\u001b[33m+\\u001b[39m div2\\u001b[33m;\\u001b[39m\\u001b[0m\\n    at Parser.raise (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:6322:17)\\n    at Parser.unexpected (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:7638:16)\\n    at Parser.parseExprAtom (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8799:20)\\n    at Parser.parseExprSubscripts (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8385:23)\\n    at Parser.parseMaybeUnary (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8365:21)\\n    at Parser.parseExprOps (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8252:23)\\n    at Parser.parseMaybeConditional (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8225:23)\\n    at Parser.parseMaybeAssign (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8172:21)\\n    at Parser.parseExprListItem (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:9449:18)\\n    at Parser.parseCallExpressionArguments (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8592:22)\\n    at Parser.parseSubscript (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8487:29)\\n    at Parser.parseSubscripts (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8406:19)\\n    at Parser.parseExprSubscripts (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8395:17)\\n    at Parser.parseMaybeUnary (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8365:21)\\n    at Parser.parseExprOps (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8252:23)\\n    at Parser.parseMaybeConditional (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8225:23)\\n    at Parser.parseMaybeAssign (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8172:21)\\n    at Parser.parseVar (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:10415:26)\\n    at Parser.parseVarStatement (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:10234:10)\\n    at Parser.parseStatementContent (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:9830:21)\\n    at Parser.parseStatement (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:9763:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:10340:25)\\n    at Parser.parseBlockBody (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:10327:10)\\n    at Parser.parseBlock (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:10311:10)\\n    at Parser.parseFunctionBody (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:9382:24)\\n    at Parser.parseArrowExpression (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:9323:10)\\n    at Parser.parseParenAndDistinguishExpression (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8960:12)\\n    at Parser.parseExprAtom (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8731:21)\\n    at Parser.parseExprSubscripts (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8385:23)\\n    at Parser.parseMaybeUnary (/Users/trevormarkel/Documents/Galvanize/SDC1/host-profile/node_modules/@babel/parser/lib/index.js:8365:21)\");\n\n//# sourceURL=webpack:///./server/renderer.js?");

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

/***/ })

/******/ });