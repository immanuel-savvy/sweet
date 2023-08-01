import { GLOBALS, REVIEWS, VIDEO_REVIEWS } from "../ds/conn";
import { remove_image, remove_video, save_image, save_video } from "./utils";

const GLOBALS_verified_reviews = "verified_reviews";

const approve_review = (req, res) => {
  let { review } = req.params;

  let globals = GLOBALS.readone({ global: GLOBALS_verified_reviews });
  if (globals)
    GLOBALS.update(
      { global: GLOBALS_verified_reviews },
      { reviews: { $push: review } }
    );
  else
    GLOBALS.write({
      global: GLOBALS_verified_reviews,
      review: new Array(review),
    });

  REVIEWS.update(review, { verified: true });

  res.end();
};

const reviews = (req, res) => {
  let { limit, verified } = req.body;

  let reviews;
  let verified_reviews = GLOBALS.readone({
    global: GLOBALS_verified_reviews,
  });

  if (!verified_reviews) reviews = new Array();
  else reviews = verified_reviews.reviews;

  if (Number(limit) > 0 && reviews.length) reviews = reviews.slice(0, limit);

  reviews = REVIEWS.read(verified ? reviews : null, {
    exclude: verified ? null : reviews,
    limit,
  });

  res.json({ ok: true, message: "reviews fetched", data: reviews });
};

const new_review = (req, res) => {
  let review = req.body;

  review.image = save_image(review.image);

  let result;

  if (review._id) result = REVIEWS.update(review._id, review);
  else result = REVIEWS.write(review);

  review._id = result._id;
  review.created = result.created;

  if (!req.body._id)
    if (review.verified)
      if (!!GLOBALS.readone({ global: GLOBALS_verified_reviews }))
        GLOBALS.update(
          { global: GLOBALS_verified_reviews },
          { reviews: { $push: review._id } }
        );
      else
        GLOBALS.write({
          global: GLOBALS_verified_reviews,
          reviews: new Array(review._id),
        });

  res.json({ ok: true, message: "review added", data: review });
};

const remove_review = (req, res) => {
  let { review } = req.params;

  let review_ = REVIEWS.readone(review);
  if (!review_) return res.end();

  review_.image && !review_.user && remove_image(review_.image);
  review_.verified &&
    GLOBALS.update(
      { global: GLOBALS_verified_reviews },
      { reviews: { $splice: review } }
    );

  REVIEWS.remove(review);

  res.json({ ok: true, message: "review removed", data: review });
};

const GLOBAL_alumni_overview = "alumni_overview";

const alumni_overview = (req, res) => {
  let alumni_overview_ = GLOBALS.readone({ global: GLOBAL_alumni_overview });

  res.json({ ok: true, message: "alumni overview", data: alumni_overview_ });
};

const update_alumni_overview = (req, res) => {
  let { video, thumbnail, text, title, image_hash } = req.body;

  (video = save_video(video)), (thumbnail = save_image(thumbnail));

  let alumni_overview = GLOBALS.readone({ global: GLOBAL_alumni_overview });
  alumni_overview &&
    (thumbnail.startsWith("data") && remove_image(alumni_overview.thumbnail),
    video.startsWith("data") && remove_video(alumni_overview.video));

  GLOBALS.update(
    { global: GLOBAL_alumni_overview },
    {
      video,
      thumbnail,
      image_hash,
      text,
      title,
    }
  );

  res.json({
    ok: true,
    message: "alumni overview updated",
    data: { video, thumbnail },
  });
};

const new_video_review = (req, res) => {
  let { thumbnail, url, _id, image_hash } = req.body;

  thumbnail = save_image(thumbnail);
  url = save_video(url);

  let result;
  if (_id) result = VIDEO_REVIEWS.update(_id, { thumbnail, url, image_hash });
  else result = VIDEO_REVIEWS.write({ thumbnail, url, image_hash });

  res.json({ ok: true, data: { thumbnail, url, _id: result._id } });
};

const update_video_review = (req, res) => new_video_review(req, res);

const remove_video_review = (req, res) => {
  let { review } = req.params;

  VIDEO_REVIEWS.remove(review);

  res.end();
};

const video_reviews = (req, res) => {
  let { limit } = req.body;

  res.json({
    ok: true,
    data: VIDEO_REVIEWS.read(null, { limit: Number(limit) }),
  });
};

export {
  update_alumni_overview,
  alumni_overview,
  GLOBAL_alumni_overview,
  update_video_review,
  remove_review,
  remove_video_review,
  video_reviews,
  new_review,
  approve_review,
  new_video_review,
  reviews,
};
