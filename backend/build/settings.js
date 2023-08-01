"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_vision = exports.update_mission = exports.update_live_training = exports.update_donation_section = exports.update_banner = exports.update_about_statement = exports.remove_banner = exports.mission_vision_statement = exports.logo_update = exports.live_training = exports.entry = exports.donation_section = exports.banners_et_logo = exports.add_banner = exports.about_statement = exports.GLOBAL_logo = exports.GLOBAL_live_training = exports.GLOBAL_donation_section = exports.GLOBAL_banner_stuff = exports.GLOBALS_vision_statement = exports.GLOBALS_mission_statement = exports.GLOBALS_about_statement = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
var GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_about_statement = "about_statement";
exports.GLOBALS_about_statement = GLOBALS_about_statement;
exports.GLOBALS_vision_statement = GLOBALS_vision_statement;
exports.GLOBALS_mission_statement = GLOBALS_mission_statement;
var mission_vision_statement = function mission_vision_statement(req, res) {
  var vision = _conn.GLOBALS.readone({
      global: GLOBALS_vision_statement
    }),
    mission = _conn.GLOBALS.readone({
      global: GLOBALS_mission_statement
    });
  res.json({
    ok: true,
    data: {
      vision: vision,
      mission: mission
    }
  });
};
exports.mission_vision_statement = mission_vision_statement;
var update_mission = function update_mission(req, res) {
  var _req$body = req.body,
    mission_statement = _req$body.mission_statement,
    mission_title = _req$body.mission_title,
    mission = _req$body.mission,
    mission_file_hash = _req$body.mission_file_hash;
  if (!mission || !mission_file_hash || !mission_statement) return res.end();
  mission = (0, _utils.save_image)(mission);
  _conn.GLOBALS.update({
    global: GLOBALS_mission_statement
  }, {
    mission_statement: mission_statement,
    mission_title: mission_title,
    mission: mission,
    mission_file_hash: mission_file_hash
  });
  res.json({
    ok: true,
    data: {
      mission: mission
    }
  });
};
exports.update_mission = update_mission;
var update_vision = function update_vision(req, res) {
  var _req$body2 = req.body,
    vision_statement = _req$body2.vision_statement,
    vision_title = _req$body2.vision_title,
    vision = _req$body2.vision,
    vision_file_hash = _req$body2.vision_file_hash;
  if (!vision || !vision_file_hash || !vision_statement) return res.end();
  vision = (0, _utils.save_image)(vision);
  _conn.GLOBALS.update({
    global: GLOBALS_vision_statement
  }, {
    vision_statement: vision_statement,
    vision_title: vision_title,
    vision: vision,
    vision_file_hash: vision_file_hash
  });
  res.json({
    ok: true,
    data: {
      vision: vision
    }
  });
};
exports.update_vision = update_vision;
var update_about_statement = function update_about_statement(req, res) {
  var _req$body3 = req.body,
    about_statement = _req$body3.about_statement,
    bullets = _req$body3.bullets,
    more_details = _req$body3.more_details,
    image = _req$body3.image,
    image_file_hash = _req$body3.image_file_hash;
  if (!image || !image_file_hash || !about_statement) return res.end();
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBALS_about_statement
  }, {
    about_statement: about_statement,
    image: image,
    bullets: bullets,
    more_details: more_details,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image
    }
  });
};
exports.update_about_statement = update_about_statement;
var about_statement = function about_statement(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBALS_about_statement
    })
  });
};
exports.about_statement = about_statement;
var entry = function entry(req, res) {
  res.json({
    ok: true,
    data: {
      about: _conn.GLOBALS.readone({
        global: GLOBALS_about_statement
      }),
      vision: _conn.GLOBALS.readone({
        global: GLOBALS_vision_statement
      }),
      mission: _conn.GLOBALS.readone({
        global: GLOBALS_mission_statement
      }),
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      }),
      report_categories: _conn.CATEGORIES.read()
    }
  });
};
exports.entry = entry;
var GLOBAL_live_training = "live_training";
exports.GLOBAL_live_training = GLOBAL_live_training;
var update_live_training = function update_live_training(req, res) {
  var _req$body4 = req.body,
    title = _req$body4.title,
    description = _req$body4.description,
    video = _req$body4.video,
    thumbnail = _req$body4.thumbnail,
    thumbnail_hash = _req$body4.thumbnail_hash;
  video = (0, _utils.save_video)(video);
  thumbnail = (0, _utils.save_image)(thumbnail);
  _conn.GLOBALS.update({
    global: GLOBAL_live_training
  }, {
    title: title,
    description: description,
    video: video,
    thumbnail: thumbnail,
    thumbnail_hash: thumbnail_hash
  });
  res.json({
    ok: true,
    data: {
      video: video,
      thumbnail: thumbnail
    }
  });
};
exports.update_live_training = update_live_training;
var live_training = function live_training(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_live_training
    })
  });
};
exports.live_training = live_training;
var GLOBAL_donation_section = "donation_section";
exports.GLOBAL_donation_section = GLOBAL_donation_section;
var donation_section = function donation_section(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_donation_section
    })
  });
};
exports.donation_section = donation_section;
var update_donation_section = function update_donation_section(req, res) {
  var _req$body5 = req.body,
    title = _req$body5.title,
    text = _req$body5.text,
    image = _req$body5.image,
    image_file_hash = _req$body5.image_file_hash;
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBAL_donation_section
  }, {
    title: title,
    text: text,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image
    }
  });
};
exports.update_donation_section = update_donation_section;
var GLOBAL_banner_stuff = "banner_stuff";
exports.GLOBAL_banner_stuff = GLOBAL_banner_stuff;
var add_banner = function add_banner(req, res) {
  var _req$body6 = req.body,
    image = _req$body6.image,
    title = _req$body6.title,
    sub_text = _req$body6.sub_text;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.write({
    global: GLOBAL_banner_stuff,
    image: image,
    title: title,
    sub_text: sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: image,
      created: result.created
    }
  });
};
exports.add_banner = add_banner;
var update_banner = function update_banner(req, res) {
  var _req$body7 = req.body,
    image = _req$body7.image,
    title = _req$body7.title,
    _id = _req$body7._id,
    sub_text = _req$body7.sub_text;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    _id: _id,
    global: GLOBAL_banner_stuff
  }, {
    image: image,
    title: title,
    sub_text: sub_text
  });
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: image,
      created: result.created
    }
  });
};
exports.update_banner = update_banner;
var remove_banner = function remove_banner(req, res) {
  var banner = req.params.banner;
  console.log(banner);
  _conn.GLOBALS.remove({
    global: GLOBAL_banner_stuff,
    _id: banner
  });
  res.end();
};
exports.remove_banner = remove_banner;
var GLOBAL_logo = "logo";
exports.GLOBAL_logo = GLOBAL_logo;
var logo_update = function logo_update(req, res) {
  var logo = req.body.logo;
  if (logo && logo.startsWith("data")) {
    var prev_logo = _conn.GLOBALS.readone({
      global: GLOBAL_logo
    });
    (0, _utils.remove_image)(prev_logo.logo);
  }
  logo = (0, _utils.save_image)(logo);
  _conn.GLOBALS.update({
    global: GLOBAL_logo
  }, {
    logo: logo
  });
  res.json({
    ok: true,
    data: {
      logo: logo
    }
  });
};
exports.logo_update = logo_update;
var banners_et_logo = function banners_et_logo(req, res) {
  res.json({
    ok: true,
    data: {
      banners: _conn.GLOBALS.read({
        global: GLOBAL_banner_stuff
      }),
      logo: _conn.GLOBALS.readone({
        global: GLOBAL_logo
      })
    }
  });
};
exports.banners_et_logo = banners_et_logo;