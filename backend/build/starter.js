"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_user = exports.create_default_admin = exports.GLOBAL_pending_operators = void 0;
var _conn = require("../ds/conn");
var _articles = require("./articles");
var _reviews = require("./reviews");
var _settings = require("./settings");
var default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";
exports.default_user = default_user;
var GLOBAL_pending_operators = "pending_operators";
exports.GLOBAL_pending_operators = GLOBAL_pending_operators;
var create_default_admin = function create_default_admin() {
  if (!_conn.ADMINSTRATORS.readone(default_admin)) {
    _conn.ADMINSTRATORS.write({
      firstname: "Sweet",
      lastname: "One",
      image: "logo_single.png",
      email: "admin@sweet-one.org".toLowerCase(),
      _id: default_admin
    });
    _conn.ADMIN_HASH.write({
      admin: default_admin,
      key: "adminstrator#1"
    });
  }
  var user_ = _conn.USERS.readone(default_user);
  if (!user_) {
    _conn.USERS.write({
      _id: default_user,
      firstname: "Sweet",
      lastname: "One",
      verified: true,
      email: "sweet.one@gmail.com"
    });
    _conn.USERS_HASH.write({
      user: default_user,
      key: "adminstrator#1"
    });
  }
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_mission_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_mission_statement
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_vision_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_vision_statement
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_about_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_about_statement
  });
  !_conn.GLOBALS.readone({
    global: _reviews.GLOBAL_alumni_overview
  }) && _conn.GLOBALS.write({
    global: _reviews.GLOBAL_alumni_overview
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_live_training
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_live_training
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_donation_section
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_donation_section
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_logo
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_logo
  });
  !_conn.GLOBALS.readone({
    global: GLOBAL_pending_operators
  }) && _conn.GLOBALS.write({
    global: GLOBAL_pending_operators,
    operators: new Array()
  });
  !_conn.GLOBALS.readone({
    global: _articles.GLOBAL_trending_articles
  }) && _conn.GLOBALS.write({
    global: _articles.GLOBAL_trending_articles,
    articles: new Array()
  });
};
exports.create_default_admin = create_default_admin;