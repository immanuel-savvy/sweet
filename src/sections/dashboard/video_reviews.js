import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Add_review from "../../components/add_review";
import Loadindicator from "../../components/loadindicator";
import Video_review from "../../components/video_review";
import { emitter } from "../../Sweet";
import { scroll_to_top } from "../footer";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Video_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let video_reviews = await post_request("video_reviews");

    if (!Array.isArray(video_reviews)) video_reviews = new Array();

    this.setState({ video_reviews });

    this.new_video_review = (review) => {
      let { video_reviews } = this.state;
      video_reviews = new Array(review, ...video_reviews);
      this.setState({ video_reviews });
    };

    emitter.listen("new_video_review", this.new_video_review);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_video_review", this.new_video_review);
  };

  remove_review = async (review_id) => {
    let { video_reviews } = this.state;

    if (!window.confirm("Are you sure to remove review?")) return;

    video_reviews = video_reviews.filter((review) => review._id !== review_id);
    this.setState({ video_reviews });

    await post_request(`remove_video_review/${review_id}`);
  };

  toggle_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      review_to_update: null,
    });

  add_new_review_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a href="#" class="add_new_btn">
            <i class="fas fa-plus-circle mr-1"></i>Add Video Review
          </a>
        </div>
      </div>
    );

  render() {
    let { video_reviews, show_form, review_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage video_reviews"
          on_click={this.toggle_form}
          hide={
            show_form ||
            !video_reviews ||
            (video_reviews && !video_reviews.length)
          }
          title="add review"
        />

        <div className="row">
          {show_form ? (
            <div>
              <Add_review
                review={review_to_update}
                video
                toggle={this.toggle_form}
                admin
              />
              <hr />
            </div>
          ) : null}

          {video_reviews ? (
            video_reviews.length ? (
              video_reviews.map((review) => (
                <Video_review
                  class_name="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                  review={review}
                  update={() =>
                    this.setState(
                      { review_to_update: review, show_form: true },
                      scroll_to_top
                    )
                  }
                  remove={() => this.remove_review(review._id)}
                />
              ))
            ) : (
              <div className="my-5 d-flex justify-content-center">
                <div>
                  <p className="h4">No Reviews yet.</p>
                  <br />
                  {this.add_new_review_btn()}
                </div>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Video_reviews;
