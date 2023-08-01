"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify_operator = exports.update_driver = exports.update_category = exports.unverified_operators = exports.send_report = exports.request_to_become_an_operator = exports.report_categories = exports.remove_driver = exports.remove_category = exports.operators = exports.operator = exports.drivers = exports.driver_page = exports.driver = exports.create_category = exports.add_driver = void 0;
var _conn = require("../ds/conn");
var _users = require("./users");
var _utils = require("./utils");
var _starter = require("./starter");
var _emails = require("./emails");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var request_to_become_an_operator = function request_to_become_an_operator(req, res) {
  var documents = req.body;
  var ID = documents.ID,
    cac = documents.cac,
    user = documents.user,
    image = documents.image,
    image_filename = documents.image_filename,
    cac_filename = documents.cac_filename,
    ID_filename = documents.ID_filename;
  documents.image = (0, _utils.save_image)(image, image_filename);
  documents.cac = (0, _utils.save_file)(cac, cac_filename);
  documents.ID = (0, _utils.save_file)(ID, ID_filename);
  delete documents.cac_filename;
  delete documents.image_filename;
  delete documents.ID_filename;
  var result = _conn.OPERATORS.write(documents);
  documents._id = result._id;
  documents.created = result.created;
  _conn.USERS.update(user, {
    operator: result._id,
    operator_status: "pending"
  });
  _conn.GLOBALS.update({
    global: _starter.GLOBAL_pending_operators
  }, {
    operators: {
      $push: result._id
    }
  });
  res.json({
    ok: true,
    message: "operator request sent",
    data: documents
  });
};
exports.request_to_become_an_operator = request_to_become_an_operator;
var unverified_operators = function unverified_operators(req, res) {
  var data = _conn.GLOBALS.readone({
    global: _starter.GLOBAL_pending_operators
  });
  res.json({
    ok: true,
    message: "unverified operators",
    data: _conn.OPERATORS.read(data.operators)
  });
};
exports.unverified_operators = unverified_operators;
var driver_page = function driver_page(req, res) {
  var driver = req.params.driver;
  if (!driver) return res.end();
  driver = _conn.DRIVERS.readone(driver);
  if (!driver) return res.end();
  if (driver.reports && driver.reports.length) {
    var cats = _conn.CATEGORIES.read(driver.reports.map(function (r) {
      return r.report;
    }));
    driver.reports = driver.reports.map(function (r) {
      r.report = cats.find(function (c) {
        return c._id === r.report;
      });
      return r;
    });
  } else driver.reports = new Array();
  res.json({
    ok: true,
    data: {
      driver: driver,
      operator: _conn.OPERATORS.readone(driver.operator)
    }
  });
};
exports.driver_page = driver_page;
var verify_operator = function verify_operator(req, res) {
  var operator = req.params.operator;
  var c_operator = _conn.OPERATORS.readone(operator);
  if (!c_operator) return res.json({
    ok: false,
    data: {
      message: "operator not found"
    }
  });else if (c_operator.verified) return res.json({
    ok: true,
    data: {
      message: "operator verified already"
    }
  });
  _conn.GLOBALS.update({
    global: _starter.GLOBAL_pending_operators
  }, {
    operators: {
      $splice: operator
    }
  });
  operator = _conn.OPERATORS.update(operator, {
    verified: Date.now()
  });
  if (operator) {
    _conn.USERS.update(operator.user, {
      operator_status: "verified"
    });
    var _operator = operator,
      user = _operator.user;
    var director_name = "".concat(user.firstname, " ").concat(user.lastname);
    (0, _users.send_mail)({
      recipient: user.email,
      recipient_name: "".concat(director_name),
      subject: "[SWEET-One] Operator Verified",
      html: (0, _emails.operator_verified)(operator)
    });
  }
  res.json({
    ok: true,
    message: "verify operator",
    data: {
      verified: !!(operator && operator.verified)
    }
  });
};
exports.verify_operator = verify_operator;
var operator = function operator(req, res) {
  var operator_ = req.params.operator;
  res.json({
    ok: true,
    message: "operator",
    data: _conn.OPERATORS.readone({
      _id: operator_
    })
  });
};
exports.operator = operator;
var operators = function operators(req, res) {
  var limit = req.params.limit;
  var operators = _conn.OPERATORS.read(null, {
    limit: Number(limit)
  }).filter(function (v) {
    return v.verified;
  });
  res.json({
    ok: true,
    message: "operators",
    data: operators
  });
};
exports.operators = operators;
var drivers = function drivers(req, res) {
  var _req$body = req.body,
    query = _req$body.query,
    limit = _req$body.limit,
    skip = _req$body.skip,
    data;
  if (query && query.operator) data = _conn.OPERATOR_DRIVERS.read(query, {
    limit: limit,
    skip: skip
  });else data = _conn.DRIVERS.read(query, {
    limit: limit,
    skip: skip
  });
  res.json({
    ok: true,
    data: data
  });
};
exports.drivers = drivers;
var add_driver = function add_driver(req, res) {
  var driver = req.body;
  driver.image = (0, _utils.save_image)(driver.image);
  driver.driver_license = (0, _utils.save_image)(driver.driver_license);
  var result = _conn.DRIVERS.write(driver);
  driver._id = result._id;
  driver.created = result.created;
  _conn.OPERATOR_DRIVERS.write({
    driver: driver._id,
    operator: driver.operator
  });
  res.json({
    ok: true,
    data: driver
  });
};
exports.add_driver = add_driver;
var update_driver = function update_driver(req, res) {
  var driver = req.body;
  if (!driver._id) return res.end();
  driver.image = (0, _utils.save_image)(driver.image);
  driver.driver_license = (0, _utils.save_image)(driver.driver_license);
  var result = _conn.DRIVERS.update(driver._id, driver);
  driver._id = result._id;
  driver.created = result.created;
  res.json({
    ok: true,
    data: driver
  });
};
exports.update_driver = update_driver;
var remove_driver = function remove_driver(req, res) {
  var _req$body2 = req.body,
    driver = _req$body2.driver,
    operator = _req$body2.operator;
  if (!driver) return res.end();
  var result = _conn.DRIVERS.remove(driver);
  if (result) {
    (0, _utils.remove_image)(result.image);
    (0, _utils.remove_image)(result.driver_license);
  }
  _conn.OPERATOR_DRIVERS.remove({
    driver: driver,
    operator: operator
  });
  res.end();
};
exports.remove_driver = remove_driver;
var driver = function driver(req, res) {
  var query = req.body.query;
  res.json({
    ok: true,
    data: _conn.DRIVERS.readone(query)
  });
};
exports.driver = driver;
var create_category = function create_category(req, res) {
  var cat = req.body;
  cat.calculators = new Array();
  var result = _conn.CATEGORIES.write(cat);
  res.json({
    ok: true,
    message: "category created",
    data: {
      _id: result._id,
      created: result.created
    }
  });
};
exports.create_category = create_category;
var update_category = function update_category(req, res) {
  var cat = req.body;
  _conn.CATEGORIES.update(cat._id, _objectSpread({}, cat));
  res.json({
    ok: true,
    message: "Category updated",
    data: {
      _id: cat._id,
      created: cat.created
    }
  });
};
exports.update_category = update_category;
var remove_category = function remove_category(req, res) {
  var category = req.params.category;
  _conn.CATEGORIES.remove(category);
  res.end();
};
exports.remove_category = remove_category;
var report_categories = function report_categories(req, res) {
  res.json({
    ok: true,
    data: _conn.CATEGORIES.read()
  });
};
exports.report_categories = report_categories;
var send_report = function send_report(req, res) {
  var report = req.body;
  report.resolved = false;
  var result = _conn.REPORTS.write(report);
  _conn.CATEGORIES.update(report.category, {
    reports: {
      $inc: 1
    }
  });
  var driver = _conn.DRIVERS.readone(report.driver);
  var rep = driver.reports || new Array(),
    found;
  rep = rep.map(function (r) {
    if (r.report === report.category) {
      found = true;
      r.count++;
    }
    return r;
  });
  if (!found) rep = _construct(Array, _toConsumableArray(rep).concat([{
    report: report.category,
    count: 1
  }]));
  _conn.DRIVERS.update(report.driver, {
    reports: rep
  });
  res.json({
    ok: true,
    data: {
      _id: result._id
    }
  });
};
exports.send_report = send_report;