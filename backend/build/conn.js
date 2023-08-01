"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gds = exports.default = exports.VIDEO_REVIEWS = exports.USERS_HASH = exports.USERS = exports.TRENDING_ARTICLES = exports.REVIEWS = exports.REPORTS = exports.REPLIES = exports.OPERATOR_DRIVERS = exports.OPERATORS = exports.GLOBALS = exports.DRIVERS = exports.COMMENTS = exports.CATEGORIES = exports.ARTICLE_CATEGORIES = exports.ARTICLES = exports.ADMIN_HASH = exports.ADMINSTRATORS = void 0;
var _generalisedDatastore = _interopRequireDefault(require("generalised-datastore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var gds;
exports.gds = gds;
var USERS, ADMINSTRATORS, ADMIN_HASH, USERS_HASH, REVIEWS, DRIVERS, OPERATOR_DRIVERS, VIDEO_REVIEWS, ARTICLES, ARTICLE_CATEGORIES, CATEGORIES, COMMENTS, REPLIES, REPORTS, OPERATORS, TRENDING_ARTICLES, GLOBALS;
exports.GLOBALS = GLOBALS;
exports.TRENDING_ARTICLES = TRENDING_ARTICLES;
exports.OPERATORS = OPERATORS;
exports.REPORTS = REPORTS;
exports.REPLIES = REPLIES;
exports.COMMENTS = COMMENTS;
exports.CATEGORIES = CATEGORIES;
exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES;
exports.ARTICLES = ARTICLES;
exports.VIDEO_REVIEWS = VIDEO_REVIEWS;
exports.OPERATOR_DRIVERS = OPERATOR_DRIVERS;
exports.DRIVERS = DRIVERS;
exports.REVIEWS = REVIEWS;
exports.USERS_HASH = USERS_HASH;
exports.ADMIN_HASH = ADMIN_HASH;
exports.ADMINSTRATORS = ADMINSTRATORS;
exports.USERS = USERS;
var ds_conn = function ds_conn() {
  exports.gds = gds = new _generalisedDatastore.default("sweet_foundation").sync();
  exports.ADMINSTRATORS = ADMINSTRATORS = gds.folder("adminstrators");
  exports.USERS = USERS = gds.folder("users");
  exports.CATEGORIES = CATEGORIES = gds.folder("categories");
  exports.REPORTS = REPORTS = gds.folder("reports");
  exports.DRIVERS = DRIVERS = gds.folder("drivers");
  exports.OPERATOR_DRIVERS = OPERATOR_DRIVERS = gds.folder("operator_drivers", "operator", "driver");
  exports.OPERATORS = OPERATORS = gds.folder("operators", null, "user");
  exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES = gds.folder("article_categories");
  exports.ARTICLES = ARTICLES = gds.folder("articles", null, "categories");
  exports.TRENDING_ARTICLES = TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  exports.ADMIN_HASH = ADMIN_HASH = gds.folder("admin_hash", "admin");
  exports.GLOBALS = GLOBALS = gds.folder("globals", "global");
  exports.USERS_HASH = USERS_HASH = gds.folder("user_hash", "user");
  exports.REVIEWS = REVIEWS = gds.folder("reviews");
  exports.COMMENTS = COMMENTS = gds.folder("comments", "item");
  exports.REPLIES = REPLIES = gds.folder("replies", "comment");
  exports.VIDEO_REVIEWS = VIDEO_REVIEWS = gds.folder("video_reviews");
};
var _default = ds_conn;
exports.default = _default;