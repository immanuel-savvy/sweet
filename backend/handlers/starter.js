import {
  ADMINSTRATORS,
  ADMIN_HASH,
  GLOBALS,
  USERS,
  USERS_HASH,
} from "../ds/conn";
import { GLOBAL_trending_articles } from "./articles";
import { GLOBAL_alumni_overview } from "./reviews";
import {
  GLOBALS_about_statement,
  GLOBALS_mission_statement,
  GLOBALS_vision_statement,
  GLOBAL_donation_section,
  GLOBAL_live_training,
  GLOBAL_logo,
} from "./settings";

let default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";

let GLOBAL_pending_operators = "pending_operators";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Sweet",
      lastname: "One",
      image: "logo_single.png",
      email: "admin@sweet-one.org".toLowerCase(),
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  let user_ = USERS.readone(default_user);
  if (!user_) {
    USERS.write({
      _id: default_user,
      firstname: "Sweet",
      lastname: "One",
      verified: true,
      email: "sweet.one@gmail.com",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }

  !GLOBALS.readone({ global: GLOBALS_mission_statement }) &&
    GLOBALS.write({ global: GLOBALS_mission_statement });

  !GLOBALS.readone({ global: GLOBALS_vision_statement }) &&
    GLOBALS.write({ global: GLOBALS_vision_statement });

  !GLOBALS.readone({ global: GLOBALS_about_statement }) &&
    GLOBALS.write({ global: GLOBALS_about_statement });

  !GLOBALS.readone({ global: GLOBAL_alumni_overview }) &&
    GLOBALS.write({ global: GLOBAL_alumni_overview });

  !GLOBALS.readone({ global: GLOBAL_live_training }) &&
    GLOBALS.write({ global: GLOBAL_live_training });

  !GLOBALS.readone({ global: GLOBAL_donation_section }) &&
    GLOBALS.write({ global: GLOBAL_donation_section });

  !GLOBALS.readone({ global: GLOBAL_logo }) &&
    GLOBALS.write({ global: GLOBAL_logo });

  !GLOBALS.readone({ global: GLOBAL_pending_operators }) &&
    GLOBALS.write({ global: GLOBAL_pending_operators, operators: new Array() });

  !GLOBALS.readone({ global: GLOBAL_trending_articles }) &&
    GLOBALS.write({ global: GLOBAL_trending_articles, articles: new Array() });
};

export { create_default_admin, default_user, GLOBAL_pending_operators };
