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
  OPERATORS,
  TRENDING_ARTICLES,
  GLOBALS;

const ds_conn = () => {
  gds = new GDS("sweet_foundation").sync();

  ADMINSTRATORS = gds.folder("adminstrators");
  USERS = gds.folder("users");
  CATEGORIES = gds.folder("categories");
  REPORTS = gds.folder("reports");
  DRIVERS = gds.folder("drivers");
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
  USERS,
  ARTICLES,
  CATEGORIES,
  ARTICLE_CATEGORIES,
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
