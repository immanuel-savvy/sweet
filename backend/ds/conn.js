import GDS from "generalised-datastore";

let gds;

let USERS,
  ADMINSTRATORS,
  ADMIN_HASH,
  USERS_HASH,
  REVIEWS,
  DRIVERS,
  OPERATOR_DRIVERS,
  VIDEO_REVIEWS,
  ARTICLES,
  ARTICLE_CATEGORIES,
  CATEGORIES,
  COMMENTS,
  REPLIES,
  REPORTS,
  BIR,
  OPERATORS,
  TRENDING_ARTICLES,
  VEHICLES,
  OPERATOR_VEHICLES,
  GLOBALS;

const ds_conn = () => {
  gds = new GDS("sweet_foundation").sync();

  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  VEHICLES = gds.folder("vehicles");
  OPERATOR_VEHICLES = gds.folder("operator_vehicles", "operator", "vehicle");
  CATEGORIES = gds.folder("categories");
  REPORTS = gds.folder("reports");
  DRIVERS = gds.folder("drivers", null, "vehicle");
  BIR = gds.folder("bir", null, "user");
  OPERATOR_DRIVERS = gds.folder("operator_drivers", "operator", "driver");
  OPERATORS = gds.folder("operators", null, "user");
  ARTICLE_CATEGORIES = gds.folder("article_categories");
  ARTICLES = gds.folder("articles", null, "categories");
  TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  GLOBALS = gds.folder("globals", "global");
  USERS_HASH = gds.folder("user_hash", "user");
  REVIEWS = gds.folder("reviews");
  COMMENTS = gds.folder("comments", "item");
  REPLIES = gds.folder("replies", "comment");
  VIDEO_REVIEWS = gds.folder("video_reviews");
};

export {
  gds,
  OPERATORS,
  BIR,
  USERS,
  ARTICLES,
  CATEGORIES,
  ARTICLE_CATEGORIES,
  OPERATOR_VEHICLES,
  VEHICLES,
  TRENDING_ARTICLES,
  REPORTS,
  ADMIN_HASH,
  ADMINSTRATORS,
  REVIEWS,
  COMMENTS,
  DRIVERS,
  OPERATOR_DRIVERS,
  REPLIES,
  VIDEO_REVIEWS,
  GLOBALS,
  USERS_HASH,
};
export default ds_conn;
