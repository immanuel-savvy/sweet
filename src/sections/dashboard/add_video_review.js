import React from "react";
import { Col } from "react-bootstrap";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import Video from "../../components/video";

class Add_video_review extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { review } = this.props;

    this.state = {
      ...review,
      image: review?.thumbnail,
      image_file_hash: review?.image_hash,
      show_vid: true,
    };
  }

  submit = async () => {
    this.setState({ uploading: true });
    let { on_submit } = this.props;
    let { image, thumbnail, url, _id, image_file_hash, image_hash } =
      this.state;
    image = image || image;

    let video = {
      thumbnail: image || thumbnail,
      url,
      _id,
      image_hash: image_file_hash || image_hash,
    };
    let res = await post_request(
      _id ? "update_video_review" : "new_video_review",
      video
    );

    video.url = res.url;
    video.thumbnail = res.thumbnail;

    on_submit && on_submit(video);

    this.setState({ uploading: false });
  };

  render() {
    let { toggle } = this.props;
    let {
      image,
      url,
      url_file_loading,
      show_vid,
      image_file_loading,
      uploading,
    } = this.state;

    return (
      <div className="ed_view_box">
        <Modal_form_title title="Video Review" toggle={toggle} />

        <div className="row justify-content-center mb-3">
          {(image || url) && show_vid ? (
            <Col lg={6} md={6} sm={12} className="align-items-center">
              {
                <Video
                  url={
                    url?.startsWith("data") ? url : `${domain}/videos/${url}`
                  }
                  thumbnail={image}
                />
              }
            </Col>
          ) : null}
        </div>
        <hr />
        <div className="row ">
          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Thumbnail *</label>
                {image_file_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) =>
                        this.handle_file(e, "image", null, null, true)
                      }
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>
              <div className="form-group smalls">
                <label>Video *</label>
                {url_file_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="video/*"
                      onChange={(e) => this.handle_file(e, "url")}
                      control
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>

              <Stretch_button
                title="Submit"
                loading={uploading}
                action={this.submit}
                disabled={!url || !image}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Add_video_review;
