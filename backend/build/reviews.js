"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.video_reviews = exports.update_video_review = exports.update_alumni_overview = exports.reviews = exports.remove_video_review = exports.remove_review = exports.new_video_review = exports.new_review = exports.approve_review = exports.alumni_overview = exports.GLOBAL_alumni_overview = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
var GLOBALS_verified_reviews = "verified_reviews";
var approve_review = function approve_review(req, res) {
  var review = req.params.review;
  var globals = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (globals) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    review: new Array(review)
  });
  _conn.REVIEWS.update(review, {
    verified: true
  });
  res.end();
};
exports.approve_review = approve_review;
var reviews = function reviews(req, res) {
  var _req$body = req.body,
    limit = _req$body.limit,
    verified = _req$body.verified;
  var reviews;
  var verified_reviews = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (!verified_reviews) reviews = new Array();else reviews = verified_reviews.reviews;
  if (Number(limit) > 0 && reviews.length) reviews = reviews.slice(0, limit);
  reviews = _conn.REVIEWS.read(verified ? reviews : null, {
    exclude: verified ? null : reviews,
    limit: limit
  });
  res.json({
    ok: true,
    message: "reviews fetched",
    data: reviews
  });
};
exports.reviews = reviews;
var new_review = function new_review(req, res) {
  var review = req.body;
  review.image = (0, _utils.save_image)(review.image);
  var result;
  if (review._id) result = _conn.REVIEWS.update(review._id, review);else result = _conn.REVIEWS.write(review);
  review._id = result._id;
  review.created = result.created;
  if (!req.body._id) if (review.verified) if (!!_conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  })) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review._id
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    reviews: new Array(review._id)
  });
  res.json({
    ok: true,
    message: "review added",
    data: review
  });
};
exports.new_review = new_review;
var remove_review = function remove_review(req, res) {
  var review = req.params.review;
  var review_ = _conn.REVIEWS.readone(review);
  if (!review_) return res.end();
  review_.image && !review_.user && (0, _utils.remove_image)(review_.image);
  review_.verified && _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $splice: review
    }
  });
  _conn.REVIEWS.remove(review);
  res.json({
    ok: true,
    message: "review removed",
    data: review
  });
};
exports.remove_review = remove_review;
var GLOBAL_alumni_overview = "alumni_overview";
exports.GLOBAL_alumni_overview = GLOBAL_alumni_overview;
var alumni_overview = function alumni_overview(req, res) {
  var alumni_overview_ = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  res.json({
    ok: true,
    message: "alumni overview",
    data: alumni_overview_
  });
};
exports.alumni_overview = alumni_overview;
var update_alumni_overview = function update_alumni_overview(req, res) {
  var _req$body2 = req.body,
    video = _req$body2.video,
    thumbnail = _req$body2.thumbnail,
    text = _req$body2.text,
    title = _req$body2.title,
    image_hash = _req$body2.image_hash;
  video = (0, _utils.save_video)(video), thumbnail = (0, _utils.save_image)(thumbnail);
  var alumni_overview = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  alumni_overview && (thumbnail.startsWith("data") && (0, _utils.remove_image)(alumni_overview.thumbnail), video.startsWith("data") && (0, _utils.remove_video)(alumni_overview.video));
  _conn.GLOBALS.update({
    global: GLOBAL_alumni_overview
  }, {
    video: video,
    thumbnail: thumbnail,
    image_hash: image_hash,
    text: text,
    title: title
  });
  res.json({
    ok: true,
    message: "alumni overview updated",
    data: {
      video: video,
      thumbnail: thumbnail
    }
  });
};
exports.update_alumni_overview = update_alumni_overview;
var new_video_review = function new_video_review(req, res) {
  var _req$body3 = req.body,
    thumbnail = _req$body3.thumbnail,
    url = _req$body3.url,
    _id = _req$body3._id,
    image_hash = _req$body3.image_hash;
  thumbnail = (0, _utils.save_image)(thumbnail);
  url = (0, _utils.save_video)(url);
  var result;
  if (_id) result = _conn.VIDEO_REVIEWS.update(_id, {
    thumbnail: thumbnail,
    url: url,
    image_hash: image_hash
  });else result = _conn.VIDEO_REVIEWS.write({
    thumbnail: thumbnail,
    url: url,
    image_hash: image_hash
  });
  res.json({
    ok: true,
    data: {
      thumbnail: thumbnail,
      url: url,
      _id: result._id
    }
  });
};
exports.new_video_review = new_video_review;
var update_video_review = function update_video_review(req, res) {
  return new_video_review(req, res);
};
exports.update_video_review = update_video_review;
var remove_video_review = function remove_video_review(req, res) {
  var review = req.params.review;
  _conn.VIDEO_REVIEWS.remove(review);
  res.end();
};
exports.remove_video_review = remove_video_review;
var video_reviews = function video_reviews(req, res) {
  var limit = req.body.limit;
  res.json({
    ok: true,
    data: _conn.VIDEO_REVIEWS.read(null, {
      limit: Number(limit)
    })
  });
};
exports.video_reviews = video_reviews;