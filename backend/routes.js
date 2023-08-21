import {
  login,
  signup,
  update_user,
  user,
  users,
  user_by_email,
  verify_email,
} from "./handlers/users";
import { admin_login, create_admin, get_admins, stats } from "./handlers/admin";
import {
  about_statement,
  entry,
  mission_vision_statement,
  update_about_statement,
  live_training,
  update_live_training,
  update_mission,
  update_vision,
  donation_section,
  update_donation_section,
  remove_banner,
  add_banner,
  update_banner,
  logo_update,
  banners_et_logo,
} from "./handlers/settings";
import {
  add_article_category,
  article,
  articles,
  article_categories,
  article_viewed,
  comments,
  comment_dislike,
  comment_heart,
  comment_like,
  comment_rating,
  get_replies,
  new_article,
  new_comment,
  new_reply,
  remove_article,
  remove_article_category,
  remove_trending_article,
  search_articles,
  trending_articles,
  update_article,
  update_article_category,
} from "./handlers/articles";
import {
  alumni_overview,
  approve_review,
  new_review,
  new_video_review,
  remove_review,
  remove_video_review,
  reviews,
  update_alumni_overview,
  update_video_review,
  video_reviews,
} from "./handlers/reviews";
import {
  add_driver,
  create_category,
  driver,
  driver_page,
  drivers,
  operator,
  operators,
  remove_category,
  remove_driver,
  report_categories,
  request_to_become_an_operator,
  send_report,
  unverified_operators,
  update_category,
  update_driver,
  verify_operator,
  remove_vehicle,
  update_vehicle,
  add_vehicle,
  update_vehicle_driver,
  vehicles,
} from "./handlers/operators";
import { add_bir, bir, birs, remove_bir } from "./handlers/bir";

const router = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
  app.get("/stats", stats);
  app.get("/about_statement", about_statement);
  app.get("/mission_vision_statement", mission_vision_statement);
  app.get("/entry", entry);
  app.get("/birs", birs);
  app.get("/bir/:_id", bir);
  app.get("/trending_articles/:limit", trending_articles);
  app.get("/article/:article", article);
  app.get("/comments/:article/:skip", comments);
  app.get("/article_categories", article_categories);
  app.get("/testimonials", alumni_overview);
  app.get("/live_training", live_training);
  app.get("/banners_et_logo", banners_et_logo);
  app.get("/donation_section", donation_section);
  app.get("/operator/:operator", operator);
  app.get("/report_categories", report_categories);
  app.get("/operators/:limit", operators);
  app.get("/driver_page/:driver", driver_page);
  app.get("/unverified_operators", unverified_operators);

  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/users", users);
  app.post("/user_by_email", user_by_email);
  app.post("/create_admin", create_admin);
  app.post("/update_user/:user", update_user);
  app.post("/verify_email", verify_email);
  app.post("/admin_login", admin_login);

  app.post("/video_reviews", video_reviews);
  app.post("/new_video_review", new_video_review);
  app.post("/update_video_review", update_video_review);
  app.post("/remove_video_review/:review", remove_video_review);

  app.post("/update_donation_section", update_donation_section);
  app.post("/update_live_training", update_live_training);

  app.post("/remove_trending_article/:trending", remove_trending_article);
  app.post("/articles", articles);
  app.post("/new_reply", new_reply);
  app.post("/new_comment", new_comment);
  app.post("/article_viewed/:article", article_viewed);
  app.post("/search_articles", search_articles);
  app.post("/get_replies", get_replies);
  app.post("/new_article", new_article);
  app.post("/remove_article_category/:category", remove_article_category);
  app.post("/add_article_category", add_article_category);
  app.post("/update_article_category", update_article_category);
  app.post("/update_article", update_article);
  app.post("/remove_article/:article", remove_article);
  app.post("/comment_like", comment_like);
  app.post("/comment_dislike", comment_dislike);
  app.post("/comment_heart", comment_heart);
  app.post("/comment_rating", comment_rating);

  app.post("/update_testimonial_overview", update_alumni_overview);
  app.post("/approve_review/:review", approve_review);
  app.post("/new_review", new_review);
  app.post("/remove_review/:review", remove_review);
  app.post("/reviews", reviews);

  app.post("/request_to_become_an_operator", request_to_become_an_operator);
  app.post("/verify_operator/:operator", verify_operator);
  app.post("/add_driver", add_driver);
  app.post("/drivers", drivers);
  app.post("/remove_vehicle", remove_vehicle);
  app.post("/add_vehicle", add_vehicle);
  app.post("/update_vehicle_driver", update_vehicle_driver);
  app.post("/update_vehicle", update_vehicle);
  app.post("/remove_driver", remove_driver);
  app.post("/update_driver", update_driver);
  app.post("/driver", driver);
  app.post("/remove_category/:category", remove_category);
  app.post("/create_category", create_category);
  app.post("/update_category", update_category);
  app.post("/send_report", send_report);
  app.post("/add_bir", add_bir);
  app.post("/remove_bir/:bir", remove_bir);

  app.post("/vehicles", vehicles);
  app.post("/update_vision", update_vision);
  app.post("/update_mission", update_mission);
  app.post("/update_about_statement", update_about_statement);

  app.post("/add_banner", add_banner);
  app.post("/update_banner", update_banner);
  app.post("/logo_update", logo_update);
  app.post("/remove_banner/:banner", remove_banner);
};

export default router;
