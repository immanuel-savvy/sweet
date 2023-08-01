"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stats = exports.paystack_secret_key = exports.get_admins = exports.domain_name = exports.create_admin = exports.client_domain = exports.admin_login = void 0;
var _conn = require("../ds/conn");
var domain_name = "https://dev.seminar.com";
exports.domain_name = domain_name;
var client_domain = "http://seminar.com";
exports.client_domain = client_domain;
var paystack_secret_key = "sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb";
exports.paystack_secret_key = paystack_secret_key;
var admin_login = function admin_login(req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    password = _req$body.password;
  var admin = _conn.ADMINSTRATORS.readone({
    email: email && email.toLowerCase()
  });
  if (admin) {
    var hash = _conn.ADMIN_HASH.readone({
      admin: admin._id
    });
    res.json(hash.key === password ? {
      ok: true,
      message: "admin logged-in",
      data: {
        admin: admin
      }
    } : {
      ok: false,
      data: {
        message: "incorrect password"
      }
    });
  } else res.json({
    ok: false,
    data: {
      message: "admin not found"
    }
  });
};
exports.admin_login = admin_login;
var get_admins = function get_admins(req, res) {
  var admins = _conn.ADMINSTRATORS.read();
  res.json({
    ok: true,
    message: "adminstrators fetched",
    data: admins
  });
};
exports.get_admins = get_admins;
var create_admin = function create_admin(req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    password = _req$body2.password,
    firstname = _req$body2.firstname,
    lastname = _req$body2.lastname;
  var admin = {
    email: email && email.toLowerCase(),
    firstname: firstname,
    lastname: lastname
  };
  var result = _conn.ADMINSTRATORS.write(admin);
  admin._id = result._id;
  admin.created = result.created;
  _conn.ADMIN_HASH.write({
    admin: admin._id,
    key: password
  });
  res.json({
    ok: true,
    message: "admin created",
    data: admin
  });
};
exports.create_admin = create_admin;
var stats = function stats(req, res) {
  var stats_ = new Array();
  res.json({
    ok: true,
    message: "stats",
    data: stats_
  });
};
exports.stats = stats;